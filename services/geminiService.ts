import { GoogleGenAI } from "@google/genai";
import { DesignState, VisualizerMode } from "../types";

// ======================================================
// ⚠️ COLE SUA CHAVE API ABAIXO (MANTENHA AS ASPAS) ⚠️
// ======================================================
const API_KEY = "PASTE_YOUR_API_KEY_HERE"; 

// Helper to get the AI instance safely
const getAiClient = () => {
  // Check if we have a hardcoded key, otherwise try environment variable safely
  // We use typeof process check to prevent "process is not defined" error in browsers
  let key = API_KEY;
  
  if ((!key || key === "PASTE_YOUR_API_KEY_HERE") && typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    key = process.env.API_KEY;
  }

  if (!key || key === "PASTE_YOUR_API_KEY_HERE") {
    console.error("CRITICAL: API_KEY is missing.");
    throw new Error("Google Gemini API Key is missing. Please open services/geminiService.ts and paste your API Key in the API_KEY constant.");
  }
  return new GoogleGenAI({ apiKey: key });
};

export const generateDesignImage = async (design: DesignState): Promise<string | null> => {
  try {
    const ai = getAiClient();

    let prompt = "";

    if (design.mode === VisualizerMode.KITCHEN) {
      prompt = `Photorealistic interior design photograph of a luxurious kitchen featuring ${design.style} style. 
      The kitchen has ${design.cabinetColor} cabinets, high-end ${design.countertopType} countertops, and ${design.flooring} flooring. 
      Professional architectural photography, 4k resolution, cinematic lighting, interior design magazine quality.`;
    } else {
      prompt = `Close up macro photography of a natural stone slab, specifically ${design.countertopType}. 
      High detail texture, polished finish, photorealistic, 8k resolution, suitable for a countertop sample.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "1K" // High quality for visualizer
        },
      },
    });

    if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString: string = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
    }

    return null;

  } catch (error) {
    console.error("Error generating design:", error);
    throw error;
  }
};