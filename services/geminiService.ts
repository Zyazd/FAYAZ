import { GoogleGenAI, Type } from "@google/genai";
import { AutomationResponse } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateYouTubeStrategy = async (niche: string): Promise<AutomationResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const prompt = `
    Act as a world-class YouTube Automation Expert. 
    Analyze the niche: "${niche}".
    
    You must generate a comprehensive strategy covering exactly these 8 sections.
    Return the response in strictly valid JSON format.
    
    The content for each field should be formatted with Markdown.
    
    IMPORTANT REQUIREMENTS:
    - **Niche Analysis**: You MUST include a clickable YouTube Search URL for each trending topic. Format: [Topic Name](https://www.youtube.com/results?search_query=Topic+Name).
    - **SEO**: You MUST include separate sections for "**High-Volume Keywords**" and "**Trending Hashtags**".
    
    1. **Niche Analysis**: Identify trending topics (last 30 days). For the top 5 trends, provide a direct [YouTube Search Link](https://www.youtube.com/results?search_query=QUERY) for that topic so the user can verify the trend. Select the #1 trend to focus on.
    2. **Video Blueprint**: Explain why it goes viral, audience analysis, emotional hooks, and video structure.
    3. **Scriptwriting**: Full conversational script (Intro, Hook, Body, CTA) with retention hacks.
    4. **SEO**: 
       - 10 Viral Titles.
       - Optimized Description.
       - **Keywords**: List 20 High-Volume Keywords (comma-separated).
       - **Hashtags**: List 15 Trending Hashtags.
    5. **Thumbnails**: 10 text ideas (max 3 words) and visual descriptions with emotional triggers.
    6. **Shorts Version**: 3 distinct scripts (<30s) for YouTube Shorts.
    7. **Upload Automation**: Best time to post, frequency, and teamless workflow.
    8. **Monetization**: Affiliate offers, digital products, and brand strategy.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          nicheAnalysis: { type: Type.STRING, description: "Markdown formatted niche analysis with clickable YouTube Search URLs" },
          videoBlueprint: { type: Type.STRING, description: "Markdown formatted video blueprint" },
          script: { type: Type.STRING, description: "Markdown formatted full script" },
          seo: { type: Type.STRING, description: "Markdown formatted SEO details including Keywords and Hashtags" },
          thumbnails: { type: Type.STRING, description: "Markdown formatted thumbnail ideas" },
          shorts: { type: Type.STRING, description: "Markdown formatted shorts scripts" },
          uploadStrategy: { type: Type.STRING, description: "Markdown formatted upload strategy" },
          monetization: { type: Type.STRING, description: "Markdown formatted monetization strategy" }
        },
        required: [
          "nicheAnalysis",
          "videoBlueprint",
          "script",
          "seo",
          "thumbnails",
          "shorts",
          "uploadStrategy",
          "monetization"
        ]
      }
    }
  });

  const jsonText = response.text;
  if (!jsonText) {
    throw new Error("No data returned from Gemini.");
  }

  try {
    return JSON.parse(jsonText) as AutomationResponse;
  } catch (error) {
    console.error("Failed to parse JSON", error);
    throw new Error("Failed to parse the strategy response.");
  }
};