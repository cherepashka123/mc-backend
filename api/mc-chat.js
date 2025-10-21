import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const { question } = req.body;

    // Load your knowledge JSON
    const kbUrl = process.env.KNOWLEDGE_BASE_URL;
    let kb = [];
    if (kbUrl) {
      try {
        kb = await (await fetch(kbUrl)).json();
      } catch {}
    }
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

    // For free option, we'll use a simple response system
    // You can replace this with Google Gemini API (free tier) later
    const userQuestion = question || "Say hello briefly.";
    
    // Simple response logic based on common questions
    let answer = "I'm not sure yet.";
    
    if (userQuestion.toLowerCase().includes("hello") || userQuestion.toLowerCase().includes("hi")) {
      answer = "Hi! I'm MC, Masha's butterfly assistant! 🦋 Ask me about her work, education, or projects!";
    } else if (userQuestion.toLowerCase().includes("who") && userQuestion.toLowerCase().includes("masha")) {
      answer = "Masha (Mariia Cherep) is a Psychology student at NYU with minors in Business, Social Entrepreneurship & Philosophy. She's the co-founder of Threadress and has experience at DRESSX!";
    } else if (userQuestion.toLowerCase().includes("threadress")) {
      answer = "Threadress is Masha's startup that connects real-time boutique inventory to shoppers! It bridges online search and in-store retail experiences. Check it out at threadress.it.com!";
    } else if (userQuestion.toLowerCase().includes("education") || userQuestion.toLowerCase().includes("school")) {
      answer = "Masha is studying Psychology at NYU (expected graduation May 2026) with a 3.85 GPA. She also went to Blair Academy for high school with a perfect 4.0 GPA!";
    } else if (userQuestion.toLowerCase().includes("work") || userQuestion.toLowerCase().includes("experience")) {
      answer = "Masha has worked at DRESSX (Sustainability & Marketing roles), DevolaTech (Growth Analyst), and Dragon Capital (Investment Banking). She's also in the Rise accelerator by Barclays!";
    } else if (userQuestion.toLowerCase().includes("skills")) {
      answer = "Masha knows Python, Figma, SPSS, Node.js, and speaks Ukrainian, Russian, and French! She's into fashion tech, DJing, and philosophy of AI.";
    } else {
      answer = "That's interesting! I'm still learning about Masha's work. Could you ask me something more specific about her education, projects, or experience?";
    }

    res.status(200).json({ answer });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}