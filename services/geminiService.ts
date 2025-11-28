import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ImageResolution } from '../types';

// Helper to get AI instance with current key from environment
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Chat Service
let chatSession: Chat | null = null;

export const initializeChat = () => {
  const ai = getAI();
  chatSession = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: `你是一个AI红娘。你的目标是帮助用户找到浪漫的伴侣。
      你应该：
      1. 礼貌、富有同理心且专业。
      2. 提问以了解用户的偏好（地点、爱好、性格）。
      3. 假装搜索数据库并根据他们的标准推荐匹配对象。
      4. 强调安全和实名认证的重要性。
      5. 如果被要求提供破冰语或开场白，请根据匹配对象的背景或用户的兴趣提供3条独特、个性化的开场白。
      6. 保持回复简洁，像聊天一样自然。
      请始终使用中文回复。`,
    },
  });
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    initializeChat();
  }
  
  try {
    if (!chatSession) throw new Error("Chat session failed to initialize");
    
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "抱歉，我没听清，请你再说一遍好吗？";
  } catch (error) {
    console.error("Chat error:", error);
    // If we lose the session or have an error, we might want to re-init next time
    chatSession = null; 
    return "我现在连接数据库有点问题，请稍后再试。";
  }
};

// Image Generation Service
export const generateDreamPartnerImage = async (
  prompt: string, 
  resolution: ImageResolution
): Promise<string | null> => {
  try {
    // Create a new instance right before the call to ensure the latest API key is used
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: `A realistic, high-quality portrait of a person matching this description: ${prompt}. Photorealistic, soft lighting, 8k.`,
          },
        ],
      },
      config: {
        imageConfig: {
          imageSize: resolution,
          aspectRatio: "3:4", // Portrait for dating app
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation error:", error);
    throw error;
  }
};