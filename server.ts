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
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.post('/api/leads', async (req, res) => {
    const { email, company, interest } = req.body;
    const hubspotKey = process.env.HUBSPOT_ACCESS_TOKEN;

    if (!hubspotKey) {
      console.warn('HUBSPOT_ACCESS_TOKEN not set. Lead logged to console:', req.body);
      return res.status(200).json({ status: 'mocked' });
    }

    try {
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
            job_function: interest,
            lastname: 'AI Lead'
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
      // Emit the user's message back to everyone
      io.emit('message', {
        id: Date.now().toString(),
        text: msg.text,
        sender: msg.sender,
        timestamp: new Date().toISOString()
      });

      if (msg.sender === 'user') {
        const commonResponses: Record<string, string> = {
          "What is Neural ROAS?": "Neural ROAS is our proprietary metric that uses machine learning to predict and optimize Return on Ad Spend in real-time.",
          "How does the AI optimize ad spend?": "The AI monitors 100k+ signals per hour across multiple networks, reallocating budget to the highest-performing creative-audience pairs.",
          "Show me a strategy demo": "You can try our AI Strategy Suite above! Simply paste your business description in the Toolkit section.",
          "Compare with competitors": "Our Competitor Intel tool (available in the Toolkit) analyzes competitor URLs to identify gaps."
        };

        const cachedResponse = commonResponses[msg.text];
        if (cachedResponse) {
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
               systemInstruction: "You are Flux AI's neural marketing strategist. Keep responses concise (under 3 sentences)."
             }
          });
          
          io.emit('message', {
            id: (Date.now() + 1).toString(),
            text: aiResponse.text,
            sender: 'agent',
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          console.error('AI Error:', error);
          io.emit('message', {
            id: (Date.now() + 1).toString(),
            text: "Engine signal fluctuation. Please retry.",
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
