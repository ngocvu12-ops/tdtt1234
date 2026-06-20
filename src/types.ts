/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Category {
  PYTHON_BASICS = "Cơ bản về Python",
  PYTHON_THINKING = "Lý thuyết cơ bản về tư duy tính toán",
  PYTHON_AI = "AI hỗ trợ lập trình",
  PYTHON_OPERATORS = "Toán tử, biểu thức, nhập - xuất",
  PYTHON_CONDITIONS = "Câu lệnh điều kiện",
  PYTHON_LOOPS = "Vòng lặp (Loops)",
  PYTHON_FUNCTIONS = "Hàm",
  PYTHON_COLLECTIONS = "List, tuple, dictionary",
  ALGORITHMS = "Thuật toán & Độ phức tạp",
  RECURSION_OOP = "Đệ quy & Hướng đối tượng (OOP)",
  FILES_LIBRARIES = "Xử lý tệp & Thư viện",
  DEBUGGING_TESTING = "Gỡ lỗi & Kiểm thử",
  PYTHON_QUESTIONS_P1 = "Tổng hợp các câu hỏi Python phần 1"
}

export interface Question {
  id: number;
  category: Category;
  questionText: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number; // 0 for A, 1 for B, 2 for C, 3 for D
  explanation: string;
  sourceDoc?: string;
}

export interface QuizAttempt {
  id: string;
  timestamp: number;
  score: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  timeLimitSeconds?: number;
  isCustomPractice: boolean;
  categoryName?: string;
  viewMode?: "normal" | "uet";
  answers: {
    questionId: number;
    userAnswerIndex: number;
    isCorrect: boolean;
  }[];
}

export interface UserStats {
  totalPractices: number;
  totalExamAttempts: number;
  correctAnswersTotal: number;
  wrongAnswersTotal: number;
  streakDays: number;
  lastActiveDate?: string;
  questionsSolvedIds: number[];
  wrongQuestionIds?: number[];
  lastQuizTimestamp?: number;
}
