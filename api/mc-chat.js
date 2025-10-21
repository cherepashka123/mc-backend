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

    // Advanced response logic with comprehensive information
    let answer = "I'm not sure yet.";

    // Greetings
    if (
      userQuestion.toLowerCase().includes("hello") ||
      userQuestion.toLowerCase().includes("hi") ||
      userQuestion.toLowerCase().includes("hey")
    ) {
      answer =
        "Hi! I'm MC, Masha's butterfly assistant! 🦋 Ask me about her work, education, projects, or experience!";
    }
    // About Masha
    else if (
      userQuestion.toLowerCase().includes("who") &&
      userQuestion.toLowerCase().includes("masha")
    ) {
      answer =
        "Masha (Mariia Cherep) is a Psychology student at NYU with minors in Business, Social Entrepreneurship & Philosophy. She's the co-founder of Threadress, has experience at DRESSX, and is originally from Kyiv, Ukraine. She moved to the US for boarding school and due to the war in Ukraine.";
    }
    // Threadress - detailed
    else if (
      userQuestion.toLowerCase().includes("threadress") ||
      userQuestion.toLowerCase().includes("startup") ||
      userQuestion.toLowerCase().includes("company")
    ) {
      answer =
        "Threadress is Masha's innovative startup that connects real-time boutique inventory to shoppers with reserve/prepay pickup options. It bridges online search and in-store retail experiences. The platform features real-time boutique inventory search, natural-language queries, and vector search testing. Masha and her co-founder Clara launched the prototype at threadress.it.com and conducted customer discovery with 50+ NYC boutiques. They're also part of the Rise accelerator by Barclays!";
    }
    // Education - detailed
    else if (
      userQuestion.toLowerCase().includes("education") ||
      userQuestion.toLowerCase().includes("school") ||
      userQuestion.toLowerCase().includes("university") ||
      userQuestion.toLowerCase().includes("nyu")
    ) {
      answer =
        "Masha is studying Psychology at NYU (expected graduation May 2026) with a 3.85 GPA. Her minors are in Business, Social Entrepreneurship & Philosophy. She's involved in Luxury & Retail Association, Stern Founders Challenge Society, and was a Business-Technology-Entrepreneurship Pitch Finalist. She also attended Blair Academy for high school with a perfect 4.0 GPA, studying Microeconomics, Calculus, Psychology, and French.";
    }
    // Work experience - detailed
    else if (
      userQuestion.toLowerCase().includes("work") ||
      userQuestion.toLowerCase().includes("experience") ||
      userQuestion.toLowerCase().includes("job") ||
      userQuestion.toLowerCase().includes("dressx") ||
      userQuestion.toLowerCase().includes("devolatech") ||
      userQuestion.toLowerCase().includes("dragon capital")
    ) {
      answer =
        "Masha has extensive experience: At DRESSX (Sustainability & Marketing roles), she contributed to Digital Fashion Trends Report for Meta, developed sustainability reports analyzing 900+ digital garments, and led influencer campaigns. At DevolaTech, she was a Growth Analyst generating 500+ leads and expanding into 3+ new markets. At Dragon Capital in Kyiv, she conducted research on Green Bonds and M&A transactions, including analysis of healthcare sector reforms in Ukraine.";
    }
    // Skills - detailed
    else if (
      userQuestion.toLowerCase().includes("skills") ||
      userQuestion.toLowerCase().includes("languages") ||
      userQuestion.toLowerCase().includes("technical")
    ) {
      answer =
        "Masha is multilingual (Ukrainian, Russian, French) and technically skilled in Python, Figma, SPSS, Node.js, Git/GitHub, Canva, Jira, Adobe Photoshop, Google Analytics, and Market Research. Her interests include fashion tech, DJing, sci-fi books, interior design, UI/UX, EDM, traveling, philosophy of AI, and creative coding.";
    }
    // Projects - detailed
    else if (
      userQuestion.toLowerCase().includes("projects") ||
      userQuestion.toLowerCase().includes("naked confidence") ||
      userQuestion.toLowerCase().includes("perfume")
    ) {
      answer =
        "Masha has founded multiple projects: Threadress (current startup with Clara), Naked Confidence (unisex perfume brand in Ukraine where she collaborated with 5 industry experts and conducted market research with 200+ consumers), and she's currently in the Rise accelerator by Barclays for a consumer retail payments startup. She also has experience with DRESSX's Gen AI styling tool and digital fashion trends.";
    }
    // Background/Personal
    else if (
      userQuestion.toLowerCase().includes("background") ||
      userQuestion.toLowerCase().includes("ukraine") ||
      userQuestion.toLowerCase().includes("family") ||
      userQuestion.toLowerCase().includes("personal")
    ) {
      answer =
        "Masha is originally from Kyiv, Ukraine. She moved to the US for boarding school in New Jersey, then stayed due to the war in Ukraine (since 2022). Her family background includes her mother who worked at Bvlgari (teaching her about fashion and jewelry) and later in M&A, and her father who's in construction. She has a strong entrepreneurial mindset and loves creating things with creativity and imagination.";
    }
    // Accelerator/Programs
    else if (
      userQuestion.toLowerCase().includes("accelerator") ||
      userQuestion.toLowerCase().includes("rise") ||
      userQuestion.toLowerCase().includes("barclays")
    ) {
      answer =
        "Masha is currently in the Rise accelerator created by Barclays, where she's refining MVP and product-market fit for a consumer retail payments startup. She performed competitive analysis with 300+ users and 30+ retailers, and delivered a finalist pitch at NYU Stern's startup showcase with 100+ attendees.";
    }
    // Fashion/Tech
    else if (
      userQuestion.toLowerCase().includes("fashion") ||
      userQuestion.toLowerCase().includes("tech") ||
      userQuestion.toLowerCase().includes("digital")
    ) {
      answer =
      "Masha has extensive experience in fashion tech through DRESSX, where she analyzed digital fashion trends, worked with Roblox, Snapchat, Zepeto, and Bitmoji platforms, and contributed to sustainability reports. She's also building Threadress to revolutionize how people find fashion items online.";
    }
    // Default response
    else {
      answer =
        "That's interesting! I'm still learning about Masha's work. Could you ask me something more specific about her education, projects, work experience, or background?";
    }

    res.status(200).json({ answer });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}