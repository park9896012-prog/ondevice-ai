import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Assistant endpoint for On-Device AI Spec Advisor
  app.post('/api/advisor', async (req, res) => {
    try {
      const { prompt, systemSpec, language } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY is missing in environment variables.',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const langInstruction = language === 'en'
        ? 'Please answer in clear, structured English.'
        : '질문에 대해 명확하고 구조화된 한국어로 답변해주세요.';

      const systemInstruction = `
You are an expert On-Device AI & Hardware Architecture Engineer.
You advise developers and tech enthusiasts on selecting, optimizing, and deploying On-Device AI models (LLMs/SLMs like Gemini Nano, Llama 3.2, Gemma 2, Phi-3.5; Vision models like MobileNet, YOLOv11, SAM Mobile; Speech models like Whisper; Diffusion models like MobileDiffusion).

Current User System Specs (if provided): ${JSON.stringify(systemSpec || {})}
${langInstruction}

Provide practical, highly accurate hardware advice considering RAM, VRAM, NPU TOPS, Quantization (INT4/INT8/FP16), Latency (Tokens/sec), and execution frameworks (WebGPU, Transformers.js, MediaPipe, Ollama, CoreML, llama.cpp, ONNX Runtime).
Keep response well-formatted with Markdown headers and bullet points.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt || 'What on-device AI model is best for a laptop with 16GB RAM and WebGPU support?',
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ result: response.text });
    } catch (err: any) {
      console.error('Advisor API Error:', err);
      res.status(500).json({ error: err.message || 'Failed to generate recommendation.' });
    }
  });

  // Vite development middleware or static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
