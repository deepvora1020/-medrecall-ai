# MedRecall AI

MedRecall AI is an open-source, focused AI study assistant for medical exam revision.

## What it does
- Ask a medical concept or exam question.
- Get concise, high-yield explanations.
- Compare differentials and mechanisms.
- Uses Anthropic Claude when an API key is configured.
- Runs locally with Node.js and Express.

## Run locally

```bash
npm install
cp .env.example .env
# Add your Anthropic API key to .env
npm start
```

Then open http://localhost:3000

## Why Claude?
Claude is used as the reasoning layer for concise educational explanations. The app keeps the API key on the server rather than exposing it in browser code.

## Roadmap
- Save revision history
- Flashcard generation
- Image/PDF question extraction
- Spaced-repetition review
- Subject-specific exam modes

## Disclaimer
For educational use only. Not a substitute for professional medical advice.
