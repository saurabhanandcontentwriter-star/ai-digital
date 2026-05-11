import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

async function startServer() {
  const app = express();
  const PORT = 3000;
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // API routes
  app.use(express.json());

  app.post('/api/ai/content-ideas', async (req, res) => {
    try {
      const { businessDescription } = req.body;
      const result = await genAI.models.generateContent({
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
      res.json(JSON.parse(result.text));
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  app.post('/api/ai/audience-segments', async (req, res) => {
    try {
      const { userData } = req.body;
      const result = await genAI.models.generateContent({
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
      res.json(JSON.parse(result.text));
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  app.post('/api/ai/analytics', async (req, res) => {
    try {
      const { campaignData } = req.body;
      const result = await genAI.models.generateContent({
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
      res.json(JSON.parse(result.text));
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  app.post('/api/ai/ab-test', async (req, res) => {
    try {
      const { versionA, versionB, targetAudience } = req.body;
      const result = await genAI.models.generateContent({
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
      res.json(JSON.parse(result.text));
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  app.post('/api/ai/blog-article', async (req, res) => {
    try {
      const { topic, keywords } = req.body;
      const result = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Write a 700-word SEO optimized blog article about: ${topic}. Targeted keywords: ${keywords}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              content: { type: Type.STRING },
              keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              metaDescription: { type: Type.STRING }
            },
            required: ["title", "content", "keywords", "metaDescription"]
          },
          systemInstruction: "You are an expert SEO copywriter. Generate a high-quality, engaging blog article of approximately 700 words. Use proper headings (though provide them as plain text/markdown), include the keywords naturally, and write a compelling meta description."
        }
      });
      res.json(JSON.parse(result.text));
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  app.post('/api/ai/competitor-analysis', async (req, res) => {
    try {
      const { businessDescription, competitorUrls } = req.body;
      const result = await genAI.models.generateContent({
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
      res.json(JSON.parse(result.text));
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  app.post('/api/ai/slogan', async (req, res) => {
    try {
      const { description } = req.body;
      const result = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate 5 catchy marketing slogans for: ${description}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                style: { type: Type.STRING }
              },
              required: ["text", "style"]
            }
          },
          systemInstruction: "You are a world-class copywriter. Generate catchy, memorable slogans."
        }
      });
      res.json(JSON.parse(result.text));
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  app.post('/api/leads', async (req, res) => {
    const { email, company, interest } = req.body;
    const hubspotKey = process.env.HUBSPOT_ACCESS_TOKEN;

    if (!hubspotKey) {
      console.warn('HUBSPOT_ACCESS_TOKEN not set. Lead logged to console:', req.body);
      return res.status(200).json({ status: 'mocked' });
    }

    try {
      // In a real scenario, you'd use @hubspot/api-client
      // Here we use a standard fetch for simplicity
      const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hubspotKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          properties: {
            email,
            company,
            job_function: interest, // Mapping interest to a custom field or standard field
            lastname: 'AI Lead' // HubSpot requires at least one of these or email
          }
        })
      });

      if (!response.ok) throw new Error('HubSpot integration failed');
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to sync lead' });
    }
  });

  // Socket.io logic
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('message', async (msg) => {
      // Emit the user's message back to everyone (for display)
      io.emit('message', {
        id: Date.now().toString(),
        text: msg.text,
        sender: msg.sender,
        timestamp: new Date().toISOString()
      });

      // Simple cache for common queries to reduce latency (Pre-fetching simulation)
      const commonResponses: Record<string, string> = {
        "What is Neural ROAS?": "Neural ROAS is our proprietary metric that uses machine learning to predict and optimize Return on Ad Spend in real-time, typically yielding 3-5x better performance than traditional models.",
        "How does the AI optimize ad spend?": "The AI monitors 100k+ signals per hour across multiple networks, reallocating budget every 12ms to the highest-performing creative-audience pairs.",
        "Show me a strategy demo": "You can try our AI Strategy Suite above! Simply paste your business description in the Toolkit section to see the engine generate content, audience segments, and analytics.",
        "Compare with competitors": "Our Competitor Intel tool (available in the Toolkit) analyzes competitor URLs to identify gaps in their strategy and suggest optimal market entry points for your brand."
      };

      // If it's from the user, generate an AI response
      if (msg.sender === 'user') {
        const cachedResponse = commonResponses[msg.text];
        
        if (cachedResponse) {
          // Artificial small delay for realism, but much faster than AI generation
          setTimeout(() => {
            io.emit('message', {
              id: (Date.now() + 1).toString(),
              text: cachedResponse,
              sender: 'agent',
              timestamp: new Date().toISOString()
            });
          }, 400);
          return;
        }

        try {
          const aiResponse = await genAI.models.generateContent({
             model: "gemini-3-flash-preview",
             contents: msg.text,
             config: {
               systemInstruction: "You are Flux AI's neural marketing strategist. You are professional, visionary, and helpful. Keep responses concise (under 3 sentences). You help users understand how AI can transform their digital marketing."
             }
          });
          
          const text = aiResponse.text;
          
          io.emit('message', {
            id: (Date.now() + 1).toString(),
            text,
            sender: 'agent',
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          console.error('AI Error:', error);
          io.emit('message', {
            id: (Date.now() + 1).toString(),
            text: "My neural pathways are experiencing a brief fluctuation. Please try again in a moment.",
            sender: 'agent',
            timestamp: new Date().toISOString()
          });
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
