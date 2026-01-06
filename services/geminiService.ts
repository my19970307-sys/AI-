
import { GoogleGenAI, Type } from "@google/genai";
import { IssueCategory, Severity, UIIssue } from "../types";

const API_KEY = process.env.API_KEY || "";

export const analyzeUIDesign = async (base64Image: string): Promise<UIIssue[]> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `请分析这张 UI 设计截图，找出常见的 UX/UI 设计问题。
  检查项包括：
  1. 色彩对比度（是否符合 WCAG 标准）
  2. 字体层级与一致性
  3. 间距与栅格对齐（例如 8px 栅格）
  4. 组件一致性（按钮、输入框样式）
  5. 可用性（标签、点击热区）
  
  请返回结构化的 JSON 列表，使用中文描述。
  每个问题必须包含：
  category (取值之一: 视觉规范, 层级逻辑, 可用性, 细节打磨),
  severity (取值之一: 严重, 警告, 建议),
  title (简短名称),
  description (具体问题),
  suggestion (如何修正),
  location (x, y, width, height 为图片尺寸的百分比)。`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          { inlineData: { mimeType: "image/png", data: base64Image.split(",")[1] || base64Image } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              severity: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              suggestion: { type: Type.STRING },
              location: {
                type: Type.OBJECT,
                properties: {
                  x: { type: Type.NUMBER },
                  y: { type: Type.NUMBER },
                  width: { type: Type.NUMBER },
                  height: { type: Type.NUMBER }
                }
              }
            }
          }
        }
      }
    });

    const result = JSON.parse(response.text || "[]");
    return result.map((item: any, index: number) => ({
      ...item,
      id: `issue-${index}`
    }));
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return [];
  }
};

export const autoCorrectUI = async (base64Image: string, instruction: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          { inlineData: { mimeType: "image/png", data: base64Image.split(",")[1] || base64Image } },
          { text: `根据以下修复指令优化图片中的 UI：${instruction}。请提供优化后的完整 UI 设计图。` }
        ]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Auto-correct Error:", error);
    return null;
  }
};

export const chatWithPro = async (message: string, base64Image?: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const parts: any[] = [{ text: `你是一位资深的 UI/UX 设计专家。请用中文回答用户的问题：${message}` }];
  if (base64Image) {
    parts.push({ inlineData: { mimeType: "image/png", data: base64Image.split(",")[1] || base64Image } });
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: { parts },
    config: {
      thinkingConfig: { thinkingBudget: 32768 }
    }
  });

  return response.text;
};
