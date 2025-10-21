import fetch from "node-fetch";

export const handler = async (event) => {
  try {
    const { question } = JSON.parse(event.body || "{}");

    // Load your knowledge JSON
    const kbUrl = process.env.KNOWLEDGE_BASE_URL;
    let kb = [];
    if (kbUrl) {
      try { kb = await (await fetch(kbUrl)).json(); } catch {}
    }
    const context = kb.slice(0, 12).map((d,i)=>`[${i+1}] ${d.title}\n${d.text}`).join("\n\n");

    const system = `
You are MC, a small butterfly assistant on Masha's portfolio.
Tone: warm, brief, specific, not hype. Stick to Masha and her work. If unsure, say so and ask a short follow-up.
Use the context below when helpful.

Context:
${context || "(no extra context loaded)"}
`.trim();

    const messages = [
      { role: "system", content: system },
      { role: "user", content: question || "Say hello briefly." }
    ];

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.6,
        max_tokens: 300
      })
    });

    const data = await resp.json();
    const answer = data.choices?.[0]?.message?.content?.trim() || "I'm not sure yet.";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ answer })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
  }
};
