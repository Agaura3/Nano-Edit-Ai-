
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const editImageWithGemini = async (
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  const ai = getAIClient();
  const base64Data = base64Image.split(',')[1];

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType } },
        { text: prompt },
      ],
    },
  });

  if (!response.candidates?.[0]?.content?.parts) throw new Error('Failed to edit image.');
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  throw new Error('No image returned.');
};

export const performMarketResearch = async (query: string): Promise<{text: string, sources: any[]}> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Act as a SaaS BI Analyst. Research and provide a detailed report on: ${query}`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  return {
    text: response.text || '',
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};
