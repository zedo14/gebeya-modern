import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load local env variables if present
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set limits for base64 uploading
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Helper inside server to get client
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is not configured. Please add it via Settings > Secrets.");
      }
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  }

  // API Route: Healthcheck
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // API Route: Generate Headshot
  app.post("/api/headshot/generate", async (req, res) => {
    try {
      const { image, mimeType, styleText, attireText, expressionText, customText } = req.body;
      const ai = getGeminiClient();

      // Construct detailed prompt
      const promptParts = [
        "Create a professional, modern, and polished editorial-quality business headshot.",
        `- Scene & Style: ${styleText || "Corporate studio with grey paper backdrop and soft gradient spotlight shadow"}`,
        `- Professional Attire: ${attireText || "Polished fitted dark blazer with white shirt"}`,
        `- Professional Expression: ${expressionText || "A friendly, confident, and professional smile with eyes looking forward"}`
      ];

      if (customText) {
        promptParts.push(`- Additional details requested: ${customText}`);
      }

      promptParts.push(
        "Generate a perfectly composed headshot image. It must be highly detailed, photorealistic, cinematic studio lighting, shallow depth of field, sharp facial details, looking directly into camera. Do NOT include any watermark, illustrations, distortions, multiple faces, or text."
      );

      const promptString = promptParts.join("\n");
      const start = Date.now();
      console.log(`Starting headshot generation... selfie: ${!!image}`);

      let apiResponse;
      if (image) {
        // Strip out base64 URL prefix if present
        let base64Data = image;
        let finalMimeType = mimeType || "image/png";

        if (image.startsWith("data:")) {
          const match = image.match(/^data:([^;]+);base64,(.+)$/);
          if (match) {
            finalMimeType = match[1];
            base64Data = match[2];
          }
        }

        // Image Editing Task: Edit casual selfie into professional studio headshot
        apiResponse = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: {
            parts: [
              {
                inlineData: {
                  data: base64Data,
                  mimeType: finalMimeType,
                },
              },
              {
                text: `Transform this casual selfie into a professional, photorealistic business headshot. Match the person's exact face, facial structure, features, eye color, and gender. Change the background context and clothing completely to fit this instruction:\n${promptString}`,
              },
            ],
          },
        });
      } else {
        // Text to Image Task: Generate generic professional headshot
        apiResponse = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: {
            parts: [
              {
                text: `A professional photorealistic business headshot portrait of a real person. ${promptString}`,
              },
            ],
          },
        });
      }

      console.log(`Gemini responded in ${Date.now() - start}ms`);

      // Parse output for the generated image
      let base64Image = null;
      let modelMessage = "";

      if (apiResponse?.candidates?.[0]?.content?.parts) {
        for (const part of apiResponse.candidates[0].content.parts) {
          if (part.inlineData) {
            base64Image = part.inlineData.data;
          } else if (part.text) {
            modelMessage += part.text;
          }
        }
      }

      if (!base64Image) {
        console.error("Gemini Response did not contain image inlineData parts:", JSON.stringify(apiResponse));
        return res.status(422).json({
          error: "No output image was returned by Gemini. The model might have returned structured feedback instead.",
          textMessage: modelMessage || "Could not generate photo. Please try adjusting your prompt or upload a clearer selfie."
        });
      }

      return res.json({
        success: true,
        image: `data:image/png;base64,${base64Image}`,
        message: modelMessage || "Success"
      });

    } catch (error: any) {
      console.error("Error generating headshot:", error);
      res.status(500).json({
        error: error.message || "An unexpected error occurred during headshot generation.",
        details: error.toString()
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
