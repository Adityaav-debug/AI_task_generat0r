import { GoogleGenAI, Type } from "@google/genai";
import { Task } from "../types";

// API key is auto-injected by AI Studio
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

export const generateTasksFromGoal = async (goal: string): Promise<Task[]> => {

  let response;

  try {
    response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",

      contents: `
You are a strict learning roadmap generator.

Topic: "${goal}"

RULES:
- Generate EXACTLY 8 tasks.
- Beginner → Advanced.
- No duplicates.
- No extra text.

Each task must include:
title, description, status="pending", dueDate="MMM DD".

Return ONLY valid JSON.
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

                required: ["title", "description", "status", "dueDate"]
              }
            }
          },

          required: ["tasks"]
        }
      }
    });

  } catch (err) {
    console.error("Gemini API failed:", err);
    return [];
  }

  try {
    // Get text safely
    const text = response?.text || response?.response?.text() || "";

    const data = JSON.parse(text || '{"tasks": []}');

    let tasks = data.tasks || [];

    // Enforce exactly 8
    if (tasks.length > 8) {
      tasks = tasks.slice(0, 8);
    }

    while (tasks.length < 8) {
      const i = tasks.length + 1;

      tasks.push({
        title: `Extra Practice ${i}`,
        description: `Practice more concepts related to ${goal}.`,
        status: "pending",
        dueDate: "TBD"
      });
    }

    return tasks.map((t: any, index: number) => ({
      ...t,
      id: `generated-${Date.now()}-${index}`
    }));

  } catch (err) {
    console.error("Parse failed:", err);
    return [];
  }
};
