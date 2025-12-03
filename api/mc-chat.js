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
    const userQuestion = (question || "Say hello briefly.").toLowerCase();

    // Function to find relevant knowledge base entries
    function findRelevantEntries(query) {
      const queryWords = query.split(/\s+/);
      return knowledgeBase
        .map((entry, index) => {
          const titleLower = entry.title.toLowerCase();
          const textLower = entry.text.toLowerCase();
          let score = 0;
          
          // Check title matches
          queryWords.forEach(word => {
            if (titleLower.includes(word)) score += 3;
            if (textLower.includes(word)) score += 1;
          });
          
          return { entry, score, index };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score);
    }

    // Advanced response logic using knowledge base
    let answer = "I'm not sure yet.";

    // Greetings
    if (
      userQuestion.includes("hello") ||
      userQuestion.includes("hi") ||
      userQuestion.includes("hey")
    ) {
      answer =
        "Hi! I'm MC, Masha's butterfly assistant! 🦋 Ask me about her work, education, projects, or experience!";
    }
    // Who is Masha?
    else if (
      (userQuestion.includes("who") && userQuestion.includes("masha")) ||
      userQuestion.includes("who is masha")
    ) {
      answer =
        "Masha (Mariia Cherep) is a Psychology student at NYU with minors in Business, Tech Entrepreneurship & Philosophy. She's the co-founder of Threadress, a startup connecting shoppers with boutique inventory. Originally from Kyiv, Ukraine, she moved to the US for boarding school and stayed due to the war. She's passionate about building products at the intersection of technology, fashion, and consumer experience.";
    }
    // What does she do now?
    else if (
      userQuestion.includes("what does she do") ||
      userQuestion.includes("what does masha do") ||
      (userQuestion.includes("do") && userQuestion.includes("now"))
    ) {
      answer =
        "Masha is currently a student at NYU (graduating May 2026) and the co-founder of Threadress, a platform that uses AI to connect shoppers with real-time boutique inventory. She's also in the Rise accelerator by Barclays and recently won 1st place at the NYU Stern AI Fintech Hackathon with her team's NEXUS project.";
    }
    // What is Threadress?
    else if (
      userQuestion.includes("threadress") ||
      userQuestion.includes("what is threadress")
    ) {
      answer =
        "Threadress (threadress.it.com) is Masha's startup that uses AI to connect shoppers with real-time boutique inventory. When you search for something like 'flowy summer dress,' it uses multimodal embeddings to understand your intent and shows you actual in-stock items from local boutiques. They're currently prototyping a virtual try-on system using MediaPipe.";
    }
    // What is her background?
    else if (
      userQuestion.includes("background") ||
      (userQuestion.includes("where") && userQuestion.includes("from"))
    ) {
      answer =
        "Masha is originally from Kyiv, Ukraine. She moved to the US for boarding school in New Jersey during junior year, then stayed due to the war in Ukraine (since 2022). She's studying Psychology at NYU with minors in Business, Tech Entrepreneurship & Philosophy. Her entrepreneurial journey started with founding Naked Confidence, a perfume brand in Ukraine, before building Threadress.";
    }
    // What are her superpowers?
    else if (
      userQuestion.includes("superpower") ||
      userQuestion.includes("strength") ||
      userQuestion.includes("what is she good at")
    ) {
      answer =
        "Masha's superpowers: Building products that solve real problems (Threadress, NEXUS), understanding both technical and business sides (can code and do market research), connecting dots across industries (fashion tech, retail, AI), and learning quickly by building (self-taught multimodal embeddings, vector databases, MediaPipe). She's also multilingual (Ukrainian, Russian, French) and great at user research.";
    }
    // What kind of roles does she want?
    else if (
      userQuestion.includes("role") ||
      userQuestion.includes("job") ||
      userQuestion.includes("looking for") ||
      userQuestion.includes("want to work")
    ) {
      answer =
        "Masha is looking for product management roles in fashion tech, retail tech, or AI/ML applications. She's interested in Product Manager, Product Analyst, or Technical Product Manager positions. She's available for internships, full-time roles, or consulting opportunities starting May 2026. She thrives in fast-paced, collaborative environments building innovative solutions.";
    }
    // What does she love outside of work?
    else if (
      userQuestion.includes("love") ||
      userQuestion.includes("interest") ||
      userQuestion.includes("hobby") ||
      userQuestion.includes("outside of work")
    ) {
      answer =
        "Outside of work, Masha loves: Matcha hunting (exploring new spots), DJing and music production, reading sci-fi books, interior design, UI/UX design, EDM, traveling, philosophy of AI, and 'vibe-coding' - coding in environments that spark creativity. She's also passionate about fashion tech and creative problem-solving.";
    }
    // How can I collaborate with her?
    else if (
      userQuestion.includes("collaborate") ||
      userQuestion.includes("work together") ||
      userQuestion.includes("contact") ||
      userQuestion.includes("reach out")
    ) {
      answer =
        "You can reach Masha at mc9271@nyu.edu or (203) 571-7354. She's open to collaborations on product projects, hackathons, fashion tech initiatives, or AI/ML applications. She's particularly interested in working on projects at the intersection of technology, fashion, and consumer experience. She's also available for product management roles starting May 2026.";
    }
    // Search knowledge base for relevant entries
    else {
      const relevant = findRelevantEntries(userQuestion);
      
      if (relevant.length > 0) {
        // Get top entry only, keep it concise
        const topEntry = relevant[0].entry;
        // Truncate long answers to first 2-3 sentences
        const sentences = topEntry.text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        answer = sentences.slice(0, 2).join('. ').trim() + (sentences.length > 2 ? '.' : '');
      } else {
        answer =
          "That's interesting! I'm still learning about Masha's work. Could you ask me something more specific about her education, projects, work experience, or background?";
      }
    }

    res.status(200).json({ answer });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
