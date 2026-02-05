import { GoogleGenAI, Type } from "@google/genai";
import { Task } from "../types";

// Load env key (Vite)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Debug
console.log("ENV KEY:", API_KEY);

// Don't crash app
if (!API_KEY) {
  console.error("❌ Missing Gemini API Key");
}

const ai = API_KEY
  ? new GoogleGenAI({ apiKey: API_KEY })
  : null;

export const generateTasksFromGoal = async (
  goal: string
): Promise<Task[]> => {

  if (!ai) {
    console.error("❌ Gemini not initialized");
    return [];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",

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

                required: [
                  "title",
                  "description",
                  "status",
                  "dueDate",
                ],
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

  } catch (err) {
    console.error("❌ Gemini Error:", err);
    return [];
  }
};
