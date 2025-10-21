export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { question } = req.body;
    const userQuestion = question || "Say hello briefly.";

    // Simple response logic based on common questions
    let answer = "I'm not sure yet.";

    if (
      userQuestion.toLowerCase().includes("hello") ||
      userQuestion.toLowerCase().includes("hi")
    ) {
      answer =
        "Hi! I'm MC, Masha's butterfly assistant! 🦋 Ask me about her work, education, or projects!";
    } else if (
      userQuestion.toLowerCase().includes("who") &&
      userQuestion.toLowerCase().includes("masha")
    ) {
      answer =
        "Masha (Mariia Cherep) is a Psychology student at NYU with minors in Business, Social Entrepreneurship & Philosophy. She's the co-founder of Threadress and has experience at DRESSX!";
    } else if (userQuestion.toLowerCase().includes("threadress")) {
      answer =
        "Threadress is Masha's startup that connects real-time boutique inventory to shoppers! It bridges online search and in-store retail experiences. Check it out at threadress.it.com!";
    } else if (
      userQuestion.toLowerCase().includes("education") ||
      userQuestion.toLowerCase().includes("school")
    ) {
      answer =
        "Masha is studying Psychology at NYU (expected graduation May 2026) with a 3.85 GPA. She also went to Blair Academy for high school with a perfect 4.0 GPA!";
    } else if (
      userQuestion.toLowerCase().includes("work") ||
      userQuestion.toLowerCase().includes("experience")
    ) {
      answer =
        "Masha has worked at DRESSX (Sustainability & Marketing roles), DevolaTech (Growth Analyst), and Dragon Capital (Investment Banking). She's also in the Rise accelerator by Barclays!";
    } else if (userQuestion.toLowerCase().includes("skills")) {
      answer =
        "Masha knows Python, Figma, SPSS, Node.js, and speaks Ukrainian, Russian, and French! She's into fashion tech, DJing, and philosophy of AI.";
    } else {
      answer =
        "That's interesting! I'm still learning about Masha's work. Could you ask me something more specific about her education, projects, or experience?";
    }

    res.status(200).json({ answer });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}