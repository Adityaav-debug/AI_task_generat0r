import { GoogleGenAI, Type } from "@google/genai";
import { Task } from "../types";

// Read API key from environment (Vite format)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Warn instead of crashing
if (!API_KEY) {
  console.error("❌ Gemini API Key is missing. Check environment variables.");
}

// Create AI client only if key exists
const ai = API_KEY
  ? new GoogleGenAI({ apiKey: API_KEY })
  : null;

/**
 * Generate learning tasks from user goal
 */
export const generateTasksFromGoal = async (
  goal: string
): Promise<Task[]> => {
  try {
    // If API key missing → fail safely
    if (!ai) {
      console.warn("⚠️ Gemini AI not initialized (no API key).");
      return [];
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",

      contents: `
You are a learning coach.

Topic: "${goal}"

Create exactly 8 learning tasks.
Start from beginner to advanced.
Each task must be practical.

Return JSON only.
`,

      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: Type.OBJECT,

          properties: {
            tasks: {
              type: Type.ARRAY,

              items: {
                type: Type.OBJECT,

                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  status: { type: Type.STRING },
                  dueDate: { type: Type.STRING }
                },

                required: [
                  "title",
                  "description",
                  "status",
                  "dueDate"
                ]
              }
            }
          },

          required: ["tasks"]
        }
      }
    });

    // Parse AI response safely
    const data = JSON.parse(response.text || '{"tasks": []}');

    return (data.tasks || []).map((t: any, i: number) => ({
      ...t,
      id: `gen-${Date.now()}-${i}`
    }));
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return [];
  }
};
