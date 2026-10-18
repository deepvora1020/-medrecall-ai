import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import Anthropic from "@anthropic-ai/sdk";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.post("/api/ask", async (req, res) => {
  const { question } = req.body || {};

  if (!question?.trim()) {
    return res.status(400).json({ error: "Enter a question." });
  }

  if (!client) {
    return res.json({
      answer: "Demo mode: add ANTHROPIC_API_KEY to enable Claude."
    });
  }

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 700,
      system: "You are MedRecall AI, a concise medical exam study assistant.",
      messages: [{ role: "user", content: question }]
    });

    const answer = message.content
      .filter(x => x.type === "text")
      .map(x => x.text)
      .join("\n");

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed." });
  }
});

export default app;
