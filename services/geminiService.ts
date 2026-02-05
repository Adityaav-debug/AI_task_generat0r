import { GoogleGenAI, Type } from "@google/genai";
import { Task } from "../types";

// Get API key from Vite environment
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Debug: check if key is coming in production
console.log("ENV KEY:", import.meta.env.VITE_GEMINI_API_KEY);

// Do NOT crash the app if key is missing
if (!API_KEY) {
  console.error("❌ Missing Gemini API Key in production");
}

const ai = API_KEY
  ? new GoogleGenAI({
      apiKey: API_KEY,
    })
  : null;

// Main function
export const generateTasksFromGoal = async (
  goal: string
): Promise<Task[]> => {
  // Safety check
  if (!ai) {
    console.error("❌ Gemini AI not initialized (missing API key)");
    return [];
  }

  try {
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
                  dueDate: { type: Type.STRING },
                },
                required: ["title", "description", "status", "dueDate"],
              },
            },
          },
          required: ["tasks"],
        },
      },
    });

    const data = JSON.parse(response.text || '{"tasks": []}');

    return (data.tasks || []).map((t: any, i: number) => ({
      ...t,
      id: `gen-${Date.now()}-${i}`,
    }));
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return [];
  }
};
