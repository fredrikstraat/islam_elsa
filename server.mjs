import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function loadEnvFile() {
  try {
    const file = await readFile(join(__dirname, ".env"), "utf8");
    for (const line of file.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }
      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) {
        continue;
      }
      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed.slice(separatorIndex + 1).trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch (error) {
    // It is fine if the project uses shell env vars instead of a .env file.
  }
}

await loadEnvFile();

const port = Number(process.env.PORT || 8124);
const host = process.env.HOST || "0.0.0.0";
const openAiApiKey = process.env.OPENAI_API_KEY || "";
const model = process.env.OPENAI_MODEL || "gpt-5-mini";

const publicFiles = new Map([
  ["/", "index.html"],
  ["/index.html", "index.html"],
  ["/styles.css", "styles.css"],
  ["/app.js", "app.js"],
  ["/questions.json", "questions.json"]
]);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

const rawQuestions = JSON.parse(await readFile(join(__dirname, "questions.json"), "utf8"));
const questionsById = new Map(rawQuestions.map((question) => [question.id, question]));

const gradeSchema = {
  type: "object",
  properties: {
    verdict: {
      type: "string",
      enum: ["correct", "almost", "incorrect"]
    },
    feedback_title: { type: "string" },
    feedback_text: { type: "string" },
    coach_tip: { type: "string" },
    correct_answer: { type: "string" }
  },
  required: ["verdict", "feedback_title", "feedback_text", "coach_tip", "correct_answer"],
  additionalProperties: false
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

function getOutputText(data) {
  if (typeof data.output_text === "string" && data.output_text.length > 0) {
    return data.output_text;
  }

  for (const item of data.output || []) {
    if (item.type !== "message") {
      continue;
    }
    for (const content of item.content || []) {
      if (content.type === "output_text" && typeof content.text === "string") {
        return content.text;
      }
      if (content.type === "refusal") {
        throw new Error(content.refusal || "Modellen ville inte svara.");
      }
    }
  }

  throw new Error("Kunde inte läsa OpenAI-svaret.");
}

async function gradeWithOpenAI(question, answer, playerName) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiApiKey}`
    },
    body: JSON.stringify({
      model,
      instructions:
        "Du är en varm, lekfull och noggrann AI-domare för ett Roblox-inspirerat quiz för en 11-åring. Bedöm bara utifrån källtexten i SOURCE_EXCERPT och facitfälten i payloaden. För flervalsfrågor är bara exact correctAnswer korrekt. För textfrågor ska du vara snäll med små stavfel och godkänna korta svar med samma innebörd. Om svaret är på väg men missar en viktig detalj, använd verdict 'almost'. Skriv på enkel svenska. Håll feedback_title till högst 6 ord, feedback_text till högst 2 korta meningar och coach_tip till 1 kort mening.",
      input: JSON.stringify(
        {
          playerName,
          questionType: question.type,
          question: question.question,
          answer,
          options: question.options || [],
          correctAnswer: question.correctAnswer,
          acceptedAnswers: question.acceptedAnswers || [],
          sourceExcerpt: question.sourceExcerpt,
          explanation: question.explanation
        },
        null,
        2
      ),
      text: {
        format: {
          type: "json_schema",
          name: "quiz_grade",
          strict: true,
          schema: gradeSchema
        }
      }
    })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "OpenAI-anropet misslyckades.");
  }

  return JSON.parse(getOutputText(data));
}

async function serveStatic(requestPath, response) {
  const fileName = publicFiles.get(requestPath);
  if (!fileName) {
    sendJson(response, 404, { error: "Hittade inte filen." });
    return;
  }

  const filePath = join(__dirname, fileName);
  const file = await readFile(filePath);
  response.writeHead(200, {
    "Content-Type": contentTypes[extname(fileName)] || "application/octet-stream"
  });
  response.end(file);
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

  try {
    if (request.method === "GET" && url.pathname === "/api/status") {
      sendJson(response, 200, {
        configured: Boolean(openAiApiKey),
        model,
        message: openAiApiKey
          ? "AI-domaren är redo."
          : "Sätt OPENAI_API_KEY i terminalen innan du startar servern."
      });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/grade-answer") {
      if (!openAiApiKey) {
        sendJson(response, 503, {
          error: "OPENAI_API_KEY saknas. Starta servern med en API-nyckel."
        });
        return;
      }

      const body = JSON.parse((await readBody(request)) || "{}");
      const question = questionsById.get(body.questionId);
      const answer = typeof body.answer === "string" ? body.answer.trim() : "";
      const playerName = typeof body.playerName === "string" ? body.playerName.trim().slice(0, 30) : "Roblox-stjärna";

      if (!question) {
        sendJson(response, 400, { error: "Ogiltig fraga." });
        return;
      }

      if (!answer || answer.length > 160) {
        sendJson(response, 400, { error: "Skicka ett kort svar mellan 1 och 160 tecken." });
        return;
      }

      const grade = await gradeWithOpenAI(question, answer, playerName || "Roblox-stjärna");
      sendJson(response, 200, { grade });
      return;
    }

    if (request.method === "GET") {
      await serveStatic(url.pathname, response);
      return;
    }

    sendJson(response, 405, { error: "Metoden stöds inte." });
  } catch (error) {
    sendJson(response, 500, {
      error: error instanceof Error ? error.message : "Något gick fel i servern."
    });
  }
});

server.listen(port, host, () => {
  console.log(`AI quiz server running on http://${host}:${port}`);
});
