# islam_elsa

Roblox-inspirerad quiz-app om islam för barn, med OpenAI-bedömning av både flervalsfrågor och textsvar.

## Starta lokalt

```bash
node server.mjs
```

Öppna sedan `http://127.0.0.1:8124`.

## Deploy på Render

Appen kan deployas som en Render Web Service.

- Repository: `https://github.com/fredrikstraat/islam_elsa`
- Start Command: `npm start`
- Build Command: `npm install`
- Miljövariabler:
  - `OPENAI_API_KEY`
  - `OPENAI_MODEL=gpt-5-mini`
  - `HOST=0.0.0.0`

Projektet innehåller också `render.yaml` för enklare setup via Blueprint.
