import fetch from "node-fetch";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load knowledge base
let knowledgeBase = [];
try {
  const kbPath = join(__dirname, "..", "knowledge-base.json");
  const kbData = readFileSync(kbPath, "utf-8");
  knowledgeBase = JSON.parse(kbData);
} catch (err) {
  console.error("Error loading knowledge base:", err);
}

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const { question } = req.body;
    const userQuestion = question || "Say hello briefly.";

    // Load knowledge base
    const kb = knowledgeBase || [];
    const context = kb
      .slice(0, 12)
      .map((d, i) => `[${i + 1}] ${d.title}\n${d.text}`)
      .join("\n\n");

    const system = `
You are MC, a small butterfly assistant on Masha's portfolio.
Tone: warm, brief, specific, not hype. Stick to Masha and her work. If unsure, say so and ask a short follow-up.
Use the context below when helpful.

Context:
${context || "(no extra context loaded)"}
`.trim();

    const messages = [
      { role: "system", content: system },
      { role: "user", content: userQuestion },
    ];

    // Call OpenAI API
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.6,
        max_tokens: 300,
      }),
    });

    const data = await resp.json();
    const answer =
      data.choices?.[0]?.message?.content?.trim() || "I'm not sure yet.";

    res.status(200).json({ answer });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
