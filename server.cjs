var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "50mb" }));
  app.use(import_express.default.urlencoded({ limit: "50mb", extended: true }));
  let aiClient = null;
  function getGeminiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is not configured. Please add it via Settings > Secrets.");
      }
      aiClient = new import_genai.GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
    }
    return aiClient;
  }
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app.post("/api/headshot/generate", async (req, res) => {
    try {
      const { image, mimeType, styleText, attireText, expressionText, customText } = req.body;
      const ai = getGeminiClient();
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
        let base64Data = image;
        let finalMimeType = mimeType || "image/png";
        if (image.startsWith("data:")) {
          const match = image.match(/^data:([^;]+);base64,(.+)$/);
          if (match) {
            finalMimeType = match[1];
            base64Data = match[2];
          }
        }
        apiResponse = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: {
            parts: [
              {
                inlineData: {
                  data: base64Data,
                  mimeType: finalMimeType
                }
              },
              {
                text: `Transform this casual selfie into a professional, photorealistic business headshot. Match the person's exact face, facial structure, features, eye color, and gender. Change the background context and clothing completely to fit this instruction:
${promptString}`
              }
            ]
          }
        });
      } else {
        apiResponse = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: {
            parts: [
              {
                text: `A professional photorealistic business headshot portrait of a real person. ${promptString}`
              }
            ]
          }
        });
      }
      console.log(`Gemini responded in ${Date.now() - start}ms`);
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
    } catch (error) {
      console.error("Error generating headshot:", error);
      res.status(500).json({
        error: error.message || "An unexpected error occurred during headshot generation.",
        details: error.toString()
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
