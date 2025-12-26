import { GoogleGenAI } from "@google/genai";
import { DesignState, VisualizerMode } from "../types";

// Helper to get the AI instance safely
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("CRITICAL: API_KEY is missing from environment variables.");
    throw new Error("Google Gemini API Key is missing. Please create a .env file with API_KEY=your_key");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateDesignImage = async (design: DesignState): Promise<string | null> => {
  try {
    // We initialize the client inside the function to ensure we capture the env var 
    // at the moment of execution, and to catch missing keys gracefully.
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

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }

    return null;

  } catch (error) {
    console.error("Error generating design:", error);
    // Rethrow so the UI can catch it and alert the user
    throw error;
  }
};