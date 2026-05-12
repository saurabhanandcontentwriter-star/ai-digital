import { GoogleGenAI, Type } from "@google/genai";
import { 
  type ContentIdeas, 
  type AudienceSegment, 
  type CampaignAnalytics, 
  type ABTestResult, 
  type CompetitorAnalysis,
  type ContentSummary 
} from "../types";

// Initialize Gemini on the frontend
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateContentIdeas(businessDescription: string): Promise<ContentIdeas> {
  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate AI-powered content ideas for this business: ${businessDescription}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          blogPosts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                focus: { type: Type.STRING }
              },
              required: ["title", "focus"]
            }
          },
          socialMedia: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                platform: { type: Type.STRING },
                content: { type: Type.STRING },
                focus: { type: Type.STRING }
              },
              required: ["platform", "content", "focus"]
            }
          },
          adCopy: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                platform: { type: Type.STRING },
                copy: { type: Type.STRING },
                focus: { type: Type.STRING }
              },
              required: ["platform", "copy", "focus"]
            }
          }
        },
        required: ["blogPosts", "socialMedia", "adCopy"]
      },
      systemInstruction: "You are a senior digital marketing strategist. Generate creative content ideas and explain how AI can be leveraged for each."
    }
  });
  return JSON.parse(result.text);
}

export async function generateAudienceSegments(userData: string): Promise<AudienceSegment[]> {
  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this user data and generate distinct audience segments: ${userData}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            characteristics: { type: Type.STRING },
            marketingStrategy: { type: Type.STRING }
          },
          required: ["name", "characteristics", "marketingStrategy"]
        }
      },
      systemInstruction: "You are an AI data scientist specializing in marketing. Analyze user data and create distinct audience segments."
    }
  });
  return JSON.parse(result.text);
}

export async function generateCampaignAnalytics(campaignData: string): Promise<CampaignAnalytics> {
  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this campaign data and provide analytics: ${campaignData}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          trends: { type: Type.ARRAY, items: { type: Type.STRING } },
          prediction: { type: Type.STRING },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["trends", "prediction", "recommendations"]
      },
      systemInstruction: "You are an AI campaign analyst. Identify key trends, predict campaign success, and offer actionable optimization recommendations."
    }
  });
  return JSON.parse(result.text);
}

export async function compareCreatives(versionA: string, versionB: string, targetAudience: string): Promise<ABTestResult> {
  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Compare version A and version B for: ${targetAudience}. A: ${versionA}. B: ${versionB}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          winner: { type: Type.STRING, enum: ["A", "B"] },
          versionA: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["score", "strengths", "weaknesses"]
          },
          versionB: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["score", "strengths", "weaknesses"]
          },
          rationale: { type: Type.STRING }
        },
        required: ["winner", "versionA", "versionB", "rationale"]
      },
      systemInstruction: "You are a senior CRO expert. Analyze two marketing creatives/copies and determine which is likely to perform better."
    }
  });
  return JSON.parse(result.text);
}

export async function generateCompetitorAnalysis(businessDescription: string, competitorUrls: string): Promise<CompetitorAnalysis> {
  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze marketing strategies for this business: ${businessDescription}. Competitors to investigate: ${competitorUrls}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          differentiators: { type: Type.ARRAY, items: { type: Type.STRING } },
          benchmarks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                metric: { type: Type.STRING },
                competitorAvg: { type: Type.STRING },
                targetGoal: { type: Type.STRING }
              },
              required: ["metric", "competitorAvg", "targetGoal"]
            }
          },
          entryPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
          swot: {
            type: Type.OBJECT,
            properties: {
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
              opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
              threats: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        },
        required: ["differentiators", "benchmarks", "entryPoints", "swot"]
      },
      systemInstruction: "You are a competitive intelligence analyst. Provide realistic marketing benchmarks and strategic market entry suggestions based on the provided business and competitor context."
    }
  });
  return JSON.parse(result.text);
}

export async function summarizeContent(content: string): Promise<ContentSummary> {
  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Summarize the following content: ${content}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          keyTakeaways: { type: Type.ARRAY, items: { type: Type.STRING } },
          sentiment: { type: Type.STRING }
        },
        required: ["summary", "keyTakeaways", "sentiment"]
      },
      systemInstruction: "You are an AI content summarizer. Provide a concise, high-impact summary of the provided text, along with 3-5 key takeaways and a sentiment analysis."
    }
  });
  return JSON.parse(result.text);
}

export type { ContentIdeas, AudienceSegment, CampaignAnalytics, ABTestResult, CompetitorAnalysis, ContentSummary };
