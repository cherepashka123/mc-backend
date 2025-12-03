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
        "Masha (Mariia Cherep) is a Psychology student at NYU with minors in Business, Social Entrepreneurship & Philosophy. She's the co-founder of Threadress, has experience at DRESSX, and is originally from Kyiv, Ukraine. She moved to the US for boarding school in New Jersey during junior year and relocated entirely to the US due to educational pursuits and the war in Ukraine (since 2022).";
    }
    // Threadress - detailed
    else if (
      userQuestion.toLowerCase().includes("threadress") ||
      userQuestion.toLowerCase().includes("startup") ||
      userQuestion.toLowerCase().includes("company")
    ) {
      answer =
        "Threadress is Masha's innovative startup (threadress.it.com) that connects real-time boutique inventory to shoppers with reserve and prepay pickup options - seamlessly bridging online search and in-store retail experiences. Masha and her co-founder Clara launched a functional prototype featuring real-time boutique inventory search, natural-language queries, and advanced vector search capabilities. They conducted customer discovery with 50+ NYC boutiques, uncovering system preferences (Square vs Shopify). Threadress emerged from personal struggle to find specific fashion items - they're committed to changing the paradigm where search engines prioritize sponsored brands over genuinely tailored fashion recommendations. They're also part of the Rise accelerator by Barclays!";
    }
    // Education - detailed
    else if (
      userQuestion.toLowerCase().includes("education") ||
      userQuestion.toLowerCase().includes("school") ||
      userQuestion.toLowerCase().includes("university") ||
      userQuestion.toLowerCase().includes("nyu")
    ) {
      answer =
        "Masha is studying Psychology at NYU (expected graduation May 2026) with a 3.85 GPA. Her minors are in Business, Social Entrepreneurship & Philosophy. Relevant coursework includes Tech Product Management, Digital Business Strategy, Statistics with Python, Generative AI in Business, and Social Entrepreneurship. She's involved in Luxury & Retail Association, Stern Founders Challenge Society, and was a Business-Technology-Entrepreneurship Pitch Finalist. She also attended Blair Academy for high school (August 2020 – May 2022) with a perfect 4.0 GPA, studying Microeconomics, Calculus, Psychology, and French.";
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
        "Masha has extensive experience: At DRESSX (Sustainability & Reporting Analyst, May 2025 – September 2025), she contributed to Digital Fashion Trends Report for Meta, analyzing 30+ brand collaborations and consumer behaviors shaping avatar economies, developed DRESSX Sustainability Report analyzing 900+ digital garments, and conducted analysis of Roblox, Snapchat, Zepeto, and Bitmoji platforms. As Marketing & Strategy Intern (May 2024 – January 2025), she led influencer outreach for Roblox x Charles & Keith campaign with 100+ creators. At DevolaTech (November 2023 – September 2024), she was a Growth Analyst generating 500+ leads and expanding into 3+ new markets. At Dragon Capital in Kyiv (June 2021 – August 2021), she conducted research on Green Bonds, Eurobonds, and M&A transactions, including analysis of healthcare sector reforms in Ukraine.";
    }
    // Skills - detailed
    else if (
      userQuestion.toLowerCase().includes("skills") ||
      userQuestion.toLowerCase().includes("languages") ||
      userQuestion.toLowerCase().includes("technical")
    ) {
      answer =
        "Masha is multilingual: Ukrainian (Native), Russian (Native), and French (Intermediate). She's technically skilled in Microsoft Office Suite, Figma, SPSS, Python, Git/GitHub, Canva, Jira, Adobe Photoshop, Market Research, Google Analytics, and Node.js. Her interests include Matcha Culture and Exploration, DJing and Music Production, Fashion Technology, Science Fiction Literature, Interior Design, UI/UX Design, Electronic Dance Music, Travel and Cultural Exploration, Philosophy of Artificial Intelligence, and Creative Coding.";
    }
    // Projects - detailed
    else if (
      userQuestion.toLowerCase().includes("projects") ||
      userQuestion.toLowerCase().includes("naked confidence") ||
      userQuestion.toLowerCase().includes("perfume")
    ) {
      answer =
        "Masha has founded multiple projects: Threadress (current startup with Clara, March 2025-Present), Naked Confidence (unisex perfume brand in Ukraine, January 2021 – 2022, where she collaborated with 5 industry experts at Ol.factory and conducted market research with 200+ consumers - this marked the beginning of her entrepreneurial journey), and she's currently in the Rise accelerator by Barclays (September 2024 – Present) for a consumer retail payments startup. She also has experience with DRESSX's Generative AI styling tool and digital fashion trends.";
    }
    // Background/Personal
    else if (
      userQuestion.toLowerCase().includes("background") ||
      userQuestion.toLowerCase().includes("ukraine") ||
      userQuestion.toLowerCase().includes("family") ||
      userQuestion.toLowerCase().includes("personal")
    ) {
      answer =
        "Masha is originally from Kyiv, Ukraine. She moved to the US for boarding school in New Jersey during junior year, then relocated entirely to the US due to educational pursuits and the war in Ukraine (since 2022). Her brother and mother moved to the US shortly after, while her father remains in Ukraine. Her mother previously worked at Bvlgari, providing insights into fashion and jewelry, followed by experience in M&A. Her father has been in the construction industry, which likely influenced her passion for building and creating tangible solutions. She has a strong entrepreneurial spirit and passion for creating innovative solutions through creativity and imagination.";
    }
    // Accelerator/Programs
    else if (
      userQuestion.toLowerCase().includes("accelerator") ||
      userQuestion.toLowerCase().includes("rise") ||
      userQuestion.toLowerCase().includes("barclays")
    ) {
      answer =
        "Masha is currently in the Rise accelerator created by Barclays (September 2024 – Present), where she's refining MVP and product-market fit for a consumer retail payments startup through intensive workshops. She performed comprehensive competitive analysis through client-facing surveys with 300+ users and 30+ retailers, uncovering significant value gaps in physical retail payments. She leveraged design thinking methodologies to optimize user journey and delivered a finalist pitch at NYU Stern's startup showcase with 100+ attendees.";
    }
    // Fashion/Tech
    else if (
      userQuestion.toLowerCase().includes("fashion") ||
      userQuestion.toLowerCase().includes("tech") ||
      userQuestion.toLowerCase().includes("digital")
    ) {
      answer =
        "Masha has extensive experience in fashion tech through DRESSX, where she analyzed digital fashion trends, worked with Roblox, Snapchat, Zepeto, and Bitmoji platforms, and contributed to sustainability reports analyzing 900+ digital garments. She's also building Threadress to revolutionize how people find fashion items online, using advanced vector search and AI to provide genuinely tailored fashion recommendations.";
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
