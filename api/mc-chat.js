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
    // Search knowledge base for relevant entries
    else {
      const relevant = findRelevantEntries(userQuestion);
      
      if (relevant.length > 0) {
        // Get top 1-2 most relevant entries
        const topEntry = relevant[0].entry;
        answer = topEntry.text;
        
        // If multiple highly relevant entries, combine them
        if (relevant.length > 1 && relevant[1].score >= 2) {
          const secondEntry = relevant[1].entry;
          // Only combine if they're different topics
          if (topEntry.title !== secondEntry.title) {
            answer = `${topEntry.text}\n\n${secondEntry.text}`;
          }
        }
      } else {
        // Fallback for common questions
        if (userQuestion.includes("who") && userQuestion.includes("masha")) {
          const personalInfo = knowledgeBase.find(e => e.title.includes("Personal Information"));
          answer = personalInfo ? personalInfo.text : "I'm not sure yet.";
        } else {
          answer =
            "That's interesting! I'm still learning about Masha's work. Could you ask me something more specific about her education, projects, work experience, or background?";
        }
      }
    }

    res.status(200).json({ answer });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
