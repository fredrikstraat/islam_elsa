import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import {
  getQuestionById,
  gradingRubric,
  questionBank,
  studySections
} from "./data/study-data.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, "public");

loadEnvFile();

const PORT = Number(process.env.PORT || 8124);
const HOST = (process.env.HOST || "127.0.0.1").trim();
const OPENAI_API_KEY = String(process.env.OPENAI_API_KEY || "")
  .split(/\s+/)
  .find((value) => value.startsWith("sk-")) || "";
const OPENAI_MODEL = (process.env.OPENAI_MODEL || "gpt-5-mini").trim();

const STATIC_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

const feedbackSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "gradeBand",
    "encouragement",
    "whatWasGood",
    "nextStep",
    "miniHint",
    "idealAnswer"
  ],
  properties: {
    gradeBand: {
      type: "string",
      enum: ["Säkert", "På väg", "Öva lite till"]
    },
    encouragement: {
      type: "string"
    },
    whatWasGood: {
      type: "array",
      items: { type: "string" },
      minItems: 2,
      maxItems: 3
    },
    nextStep: {
      type: "string"
    },
    miniHint: {
      type: "string"
    },
    idealAnswer: {
      type: "string"
    }
  }
};

const coachSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "questionInSimpleWords",
    "firstStep",
    "sentenceStarter",
    "bookConnection",
    "lookForWords"
  ],
  properties: {
    questionInSimpleWords: {
      type: "string"
    },
    firstStep: {
      type: "string"
    },
    sentenceStarter: {
      type: "string"
    },
    bookConnection: {
      type: "string"
    },
    lookForWords: {
      type: "array",
      items: {
        type: "string"
      },
      minItems: 2,
      maxItems: 5
    }
  }
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host}`);

    if (request.method === "GET" && url.pathname === "/api/status") {
      return sendJson(response, 200, {
        ok: true,
        configured: Boolean(OPENAI_API_KEY),
        model: OPENAI_MODEL
      });
    }

    if (request.method === "GET" && url.pathname === "/api/questions") {
      return sendJson(response, 200, {
        focusCount: questionBank.filter((question) => question.isFocus).length,
        questions: questionBank.map((question) => ({
          id: question.id,
          section: question.section,
          sectionLabel: question.sectionLabel,
          level: question.level,
          isFocus: Boolean(question.isFocus),
          focusLabel: question.focusLabel || "",
          prompt: question.prompt,
          hint: question.hint,
          starter: question.starter
        }))
      });
    }

    if (request.method === "POST" && url.pathname === "/api/evaluate") {
      const body = await readJsonBody(request);
      const question = getQuestionById(body.questionId);

      if (!question) {
        return sendJson(response, 404, {
          error: "Frågan hittades inte."
        });
      }

      const answer = typeof body.answer === "string" ? body.answer.trim() : "";

      if (answer.length < 3) {
        return sendJson(response, 400, {
          error: "Skriv lite mer först."
        });
      }

      if (!OPENAI_API_KEY) {
        return sendJson(response, 503, {
          error: "OpenAI-nyckel saknas. Lägg in OPENAI_API_KEY i .env och starta om servern."
        });
      }

      const feedback = await evaluateAnswer({
        question,
        answer
      });

      return sendJson(response, 200, { feedback });
    }

    if (request.method === "POST" && url.pathname === "/api/coach") {
      const body = await readJsonBody(request);
      const question = getQuestionById(body.questionId);

      if (!question) {
        return sendJson(response, 404, {
          error: "Frågan hittades inte."
        });
      }

      const coach = OPENAI_API_KEY
        ? await coachQuestion({ question })
        : buildLocalCoachHelp(question);

      return sendJson(response, 200, { coach });
    }

    if (request.method === "GET") {
      return serveStatic(url.pathname, response);
    }

    sendJson(response, 405, { error: "Metoden stöds inte." });
  } catch (error) {
    console.error(error);
    sendJson(response, 500, {
      error: "Något gick fel i servern."
    });
  }
}).listen(PORT, HOST, () => {
  console.log(`Religion-appen kör på http://${HOST}:${PORT}`);
});

async function evaluateAnswer({ question, answer }) {
  const section = studySections.find((item) => item.id === question.section);

  const systemPrompt = [
    "Du är en varm, tydlig och boknära religionscoach för en 11-åring i årskurs 5.",
    "Du bedömer bara utifrån materialet nedan och hittar inte på extra fakta.",
    "Frågorna handlar om att jämföra judendom, kristendom och islam.",
    "Skriv mycket enkel svenska. Korta meningar. Trygg ton. Ingen skam eller press.",
    "Använd tre band: Säkert, På väg och Öva lite till.",
    "Säkert betyder att det viktigaste är med och att svaret visar tydlig förståelse.",
    "På väg betyder att eleven är på rätt spår men att en viktig del saknas.",
    "Öva lite till betyder att svaret är för tunt eller blandar ihop viktiga delar.",
    "Ge alltid 2 eller 3 korta styrkor, ett tydligt nästa steg, en mini-ledtråd och ett starkare exempel-svar.",
    "Var extra varm om eleven inte riktigt får till det.",
    "Nämn inte att du är en AI och skriv inte om poäng."
  ].join(" ");

  const userPrompt = {
    topic: "Judendom, kristendom och islam",
    sectionTitle: section?.title || question.sectionLabel,
    sectionSummary: section?.summary || [],
    gradingRubric,
    question: {
      prompt: question.prompt,
      level: question.level,
      shortAnswer: question.shortAnswer,
      mustMention: question.mustMention,
      goodToMention: question.goodToMention,
      stretchPoints: question.stretchPoints
    },
    studentAnswer: answer,
    outputRules: [
      "encouragement ska vara max 18 ord",
      "whatWasGood ska innehålla 2 eller 3 korta punkter",
      "nextStep ska vara konkret och lätt att göra direkt",
      "miniHint ska vara extra kort och boknära",
      "idealAnswer ska vara 1-3 enkla meningar"
    ]
  };

  const payload = await requestOpenAIJson({
    systemPrompt,
    userPrompt,
    schemaName: "religion_feedback",
    schema: feedbackSchema,
    maxOutputTokens: 800
  });

  const rawText = extractOutputText(payload);

  if (!rawText) {
    console.error("OpenAI payload without readable feedback:");
    console.error(JSON.stringify(payload, null, 2));
    throw new Error("OpenAI svarade utan läsbar feedback.");
  }

  return JSON.parse(rawText);
}

async function coachQuestion({ question }) {
  const section = studySections.find((item) => item.id === question.section);

  const systemPrompt = [
    "Du är en lugn och varm religionscoach för en 11-åring.",
    "Du ska hjälpa eleven förstå frågan utan att ge bort hela svaret.",
    "Skriv mycket enkel svenska med korta meningar.",
    "Hjälpen ska vara boknära och bygga på faktabladen om judendom, kristendom och islam.",
    "Först förklara frågan, ge sedan ett litet första steg, en startmening och en boknära ledtråd.",
    "Ge inte ett fullt facit."
  ].join(" ");

  const userPrompt = {
    sectionTitle: section?.title || question.sectionLabel,
    sectionSummary: section?.summary || [],
    question: {
      prompt: question.prompt,
      hint: question.hint,
      starter: question.starter,
      bookSupport: question.bookSupport || "",
      shortAnswer: question.shortAnswer,
      mustMention: question.mustMention
    },
    outputRules: [
      "questionInSimpleWords ska vara 1-2 korta meningar",
      "firstStep ska vara ett litet tankesteg",
      "sentenceStarter ska vara en enkel början på svaret",
      "bookConnection ska låta som en boknära ledtråd och inte ett helt facit",
      "lookForWords ska vara 2 till 5 ord eller begrepp",
      "ge inte hela svaret"
    ]
  };

  const payload = await requestOpenAIJson({
    systemPrompt,
    userPrompt,
    schemaName: "religion_coach_help",
    schema: coachSchema,
    maxOutputTokens: 300
  });

  const rawText = extractOutputText(payload);

  if (!rawText) {
    console.error("OpenAI coach payload without readable text:");
    console.error(JSON.stringify(payload, null, 2));
    return buildLocalCoachHelp(question);
  }

  try {
    return JSON.parse(rawText);
  } catch (error) {
    console.error("OpenAI coach text could not be parsed as JSON:");
    console.error(rawText);
    console.error(error);
    return buildLocalCoachHelp(question);
  }
}

function buildLocalCoachHelp(question) {
  return {
    questionInSimpleWords: `Frågan vill att du visar att du förstår: ${question.prompt}`,
    firstStep: question.hint,
    sentenceStarter: question.starter,
    bookConnection: question.bookSupport || question.shortAnswer,
    lookForWords: (question.mustMention || []).slice(0, 4)
  };
}

async function requestOpenAIJson({
  systemPrompt,
  userPrompt,
  schemaName,
  schema,
  maxOutputTokens
}) {
  const apiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify(userPrompt, null, 2) }
      ],
      reasoning: {
        effort: "low"
      },
      text: {
        format: {
          type: "json_schema",
          name: schemaName,
          strict: true,
          schema
        }
      },
      max_output_tokens: maxOutputTokens
    })
  });

  const payload = await apiResponse.json();

  if (!apiResponse.ok) {
    const message =
      payload?.error?.message ||
      "OpenAI-svaret gick inte att hämta just nu.";
    throw new Error(message);
  }

  return payload;
}

function extractOutputText(payload) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text;
  }

  if (Array.isArray(payload.output_text) && payload.output_text.length > 0) {
    return payload.output_text.join("");
  }

  if (!Array.isArray(payload.output)) {
    return "";
  }

  for (const item of payload.output) {
    if (!Array.isArray(item.content)) {
      continue;
    }

    for (const content of item.content) {
      if (
        (content.type === "output_text" || content.type === "text") &&
        typeof content.text === "string"
      ) {
        return content.text;
      }

      if (typeof content?.text?.value === "string") {
        return content.text.value;
      }

      if (typeof content?.json === "object" && content.json) {
        return JSON.stringify(content.json);
      }

      if (typeof content?.arguments === "string") {
        return content.arguments;
      }
    }
  }

  return "";
}

async function serveStatic(pathname, response) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const filePath = normalize(join(publicDir, safePath));
  const extension = extname(filePath);

  try {
    if (!filePath.startsWith(publicDir)) {
      throw new Error("Unsafe path");
    }

    const file = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": STATIC_TYPES[extension] || "application/octet-stream"
    });
    response.end(file);
  } catch {
    sendJson(response, 404, { error: "Sidan hittades inte." });
  }
}

async function readJsonBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(payload));
}

function loadEnvFile() {
  const envPath = join(__dirname, ".env");

  try {
    const contents = readFileSync(envPath, "utf8");

    contents.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        return;
      }

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) {
        return;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed.slice(separatorIndex + 1).trim();

      if (key && !process.env[key]) {
        process.env[key] = value;
      }
    });
  } catch {}
}
