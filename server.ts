/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json());

// Initialize Gemini SDK with telemetry header per guidelines
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in environments");
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Endpoint to explain question
app.post("/api/explain", async (req: Request, res: Response): Promise<void> => {
  try {
    const { questionText, options, correctAnswer, userAnswer, codeSnippet, category } = req.body;

    if (!questionText) {
      res.status(400).json({ error: "Missing question text" });
      return;
    }

    let aiClient;
    try {
      aiClient = getGeminiClient();
    } catch (err: any) {
      console.error("Gemini Client init error:", err.message);
      res.status(500).json({
        error: "Không thể kết nối với dịch vụ AI: Chưa cấu hình GEMINI_API_KEY ở Settings.",
      });
      return;
    }

    const optionsText = Array.isArray(options) ? options.join("\n") : "";
    const codeSnippetText = codeSnippet ? `\nĐoạn mã Python liên quan:\n\`\`\`python\n${codeSnippet}\n\`\`\`\n` : "";

    const userChoicesFeedback = userAnswer 
      ? `Học viên tự trả lời phương án: "${userAnswer}"` 
      : "Học viên chưa làm câu này nhưng muốn xem phân tích.";

    const prompt = `Bạn là một giảng viên, trợ giảng môn Tư duy Tính toán (UET Computational Thinking) xuất sắc tại Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội (VNU-UET).
Hãy giải thích thật chi tiết, khoa học, dễ hiểu câu hỏi trắc nghiệm sau đây và phân tích tại sao phương án đúng là chính xác, còn các phương án khác sai.

Chủ đề: ${category || "Khái quát"}

Câu hỏi:
${questionText}
${codeSnippetText}
Các phương án chọn lựa:
${optionsText}

Đáp án chính xác: "${correctAnswer}"
${userChoicesFeedback}

Yêu cầu giải thích:
1. Giải thích ngắn gọn và dễ hiểu về bản chất lý thuyết hoặc dòng code liên quan.
2. Tại sao phương án chính xác mới là đúng? Hãy phân tích các phương án gây bẫy còn lại.
3. ${userAnswer ? (userAnswer === correctAnswer ? "Chúc mừng học viên đã phân tích đúng, hãy mở rộng thêm một chút kiến thức nâng cao, mẹo nhớ nhanh hoặc ứng dụng thuật toán này trong thực tế lớp học VNU-UET." : "Giải thích nhẹ nhàng tại sao học viên lại nhầm lẫn chọn phương án sai kia, sau đó chỉ ra cách sửa lỗi tư duy.") : "Hãy đưa ra một mẹo tư duy nhanh để làm dạng câu này khi đi thi."}
4. Định dạng Markdown có cấu trúc thẻ rõ ràng, trực quan, chuyên nghiệp.`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Bạn là một trợ giảng AI đắc lực cho sinh viên VNU-UET học môn Tư duy Tính toán. Hãy đưa ra câu trả lời bằng tiếng Việt, súc tích, chuyên nghiệp, khoa học và khích lệ người học.",
        temperature: 0.7,
      },
    });

    const explanationText = response.text || "Xin lỗi, AI hiện không thể tổng hợp được câu trả lời giải thích.";
    res.json({ explanation: explanationText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: `Lỗi khi kết nối với AI: ${error.message || error}`,
    });
  }
});

// Start routing config
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
