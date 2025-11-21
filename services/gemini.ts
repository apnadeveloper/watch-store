import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

let ai: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  if (!ai) {
    return "I'm sorry, my AI connection is currently offline (API Key missing). Please browse our catalog manually.";
  }

  // Create a context-aware system instruction based on our product catalog
  const productContext = PRODUCTS.map(p => 
    `- ${p.name} ($${p.price}): ${p.description}. Features: ${p.features.join(', ')}. Category: ${p.category}`
  ).join('\n');

  const systemInstruction = `You are "Chronos AI", a helpful, sophisticated sales assistant for a luxury smartwatch website. 
  Your goal is to help customers find the perfect watch. 
  
  Here is our current product catalog:
  ${productContext}
  
  Rules:
  1. Only recommend products from this list.
  2. Be concise and professional.
  3. If asked about shipping, say we offer free worldwide shipping.
  4. If a user asks for a comparison, compare features from the list above.
  5. Use bolding for product names.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text || "I'm having trouble thinking right now. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I encountered a temporary error. Please try again later.";
  }
};
