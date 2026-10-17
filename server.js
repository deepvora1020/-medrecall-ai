import "dotenv/config";
import express from "express";
import Anthropic from "@anthropic-ai/sdk";

const app = express();
const port = process.env.PORT || 3000;
const client = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

app.use(express.json());
app.use(express.static("public"));

app.post("/api/ask", async (req, res) => {
  const { question } = req.body || {};
  if (!question?.trim()) return res.status(400).json({ error: "Enter a question." });

  if (!client) {
    return res.json({
      answer: "Demo mode: add ANTHROPIC_API_KEY to .env to enable Claude-powered answers."
    });
  }

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 700,
      system:
        "You are MedRecall AI, a concise medical exam study assistant. Explain concepts accurately, focus on high-yield distinctions, and clearly say when a question needs clinical judgment. Do not invent citations.",
      messages: [{ role: "user", content: question }]
    });

    const answer = message.content
      .filter(x => x.type === "text")
      .map(x => x.text)
      .join("\n");

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed. Check your API key and server logs." });
  }
});

app.listen(port, () => {
  console.log(`MedRecall AI running on http://localhost:${port}`);
});
