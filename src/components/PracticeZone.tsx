/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, Brain, Sparkles, Check, CheckCircle2, 
  XCircle, AlertCircle, RefreshCw, BookOpen, ChevronRight 
} from "lucide-react";
import { Category, Question } from "../types";
import JupyterCell, { SmartQuestionText, getQuestionOptions } from "./JupyterCell";

interface PracticeZoneProps {
  questions: Question[];
  initialCategory: Category | null;
  onRecordAnswer: (questionId: number, isCorrect: boolean) => void;
  onNavigateHome: () => void;
}

export default function PracticeZone({ 
  questions, 
  initialCategory, 
  onRecordAnswer, 
  onNavigateHome 
}: PracticeZoneProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(initialCategory || "all");
  const [isPracticing, setIsPracticing] = useState<boolean>(initialCategory !== null);
  
  // Quiz state
  const [practiceQuestions, setPracticeQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptIndex, setSelectedOptIndex] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  
  // AI Explanation State
  const [aiExplanation, setAiExplanation] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string>("");

  // Initialize practice questions
  useEffect(() => {
    if (isPracticing) {
      let filtered = questions;
      if (selectedCategory !== "all") {
        filtered = questions.filter(q => q.category === selectedCategory);
      }
      // Shuffle questions for a fresh practice experience
      const shuffled = [...filtered].sort(() => Math.random() - 0.5);
      setPracticeQuestions(shuffled);
      setCurrentIndex(0);
      resetQuestionState();
    }
  }, [isPracticing, selectedCategory, questions]);

  const resetQuestionState = () => {
    setSelectedOptIndex(null);
    setHasSubmitted(false);
    setAiExplanation("");
    setAiError("");
    setIsAiLoading(false);
  };

  const handleStartPractice = (category: Category | "all") => {
    setSelectedCategory(category);
    setIsPracticing(true);
  };

  const currentQuestion = practiceQuestions[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (hasSubmitted) return;
    setSelectedOptIndex(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptIndex === null || hasSubmitted) return;
    
    setHasSubmitted(true);
    const isCorrect = selectedOptIndex === currentQuestion.correctAnswerIndex;
    onRecordAnswer(currentQuestion.id, isCorrect);
  };

  const handleNextQuestion = () => {
    if (currentIndex < practiceQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      resetQuestionState();
    } else {
      // Completed current practice pool!
      setIsPracticing(false);
      resetQuestionState();
    }
  };

  // Helper parser to render Markdown beautifully on top of custom markup
  const renderFormattedExplanation = (text: string) => {
    if (!text) return null;
    
    const lines = text.split("\n");
    let inCodeBlock = false;
    let codeContent: string[] = [];

    return lines.map((line, idx) => {
      // Detect code block start/end
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          inCodeBlock = false;
          const content = codeContent.join("\n");
          codeContent = [];
          return (
            <div key={idx}>
              <JupyterCell 
                code={content} 
                cellNumber=" " 
                isInteractive={false}
              />
            </div>
          );
        } else {
          inCodeBlock = true;
          return null;
        }
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return null;
      }

      // Check for headers
      if (line.startsWith("### ")) {
        return <h4 key={idx} className="text-sm sm:text-base font-bold text-slate-900 mt-5 mb-2">{line.replace("### ", "")}</h4>;
      }
      if (line.startsWith("## ")) {
        return <h3 key={idx} className="text-base sm:text-lg font-extrabold text-blue-900 mt-6 mb-3">{line.replace("## ", "")}</h3>;
      }
      if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ")) {
        return <p key={idx} className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold mt-3 mb-1">{line}</p>;
      }

      // Handle raw bold text and bullets
      const formattedLine = line
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/`([^`]+)`/g, "<code class='bg-slate-100 text-pink-600 px-1 py-0.5 rounded font-mono text-xs'>$1</code>");

      if (line.trim().startsWith("-") || line.trim().startsWith("*")) {
        return (
          <li 
            key={idx} 
            className="text-xs sm:text-sm text-slate-700 ml-4 list-disc leading-relaxed my-1.5"
            dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^[-\*]\s*/, "") }}
          />
        );
      }

      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p 
          key={idx} 
          className="text-xs sm:text-sm text-slate-700 leading-relaxed my-1.5"
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      );
    });
  };

  const handleAskAI = async () => {
    if (isAiLoading) return;
    setIsAiLoading(true);
    setAiError("");
    setAiExplanation("");

    try {
      const q = currentQuestion;
      const optionsClean = q.options.map(o => o.trim());
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionText: q.questionText,
          options: optionsClean,
          correctAnswer: q.options[q.correctAnswerIndex],
          userAnswer: selectedOptIndex !== null ? q.options[selectedOptIndex] : undefined,
          codeSnippet: q.codeSnippet,
          category: q.category
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Không thể lấy giải thích từ AI");
      }

      setAiExplanation(data.explanation);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Đã xảy ra lỗi không xác định khi gọi AI");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Rendering Category Selection Screen
  if (!isPracticing) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto" id="category-selection">
        <div className="text-center py-6">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight flex items-center justify-center gap-2">
            <Brain className="text-[#3B82F6]" size={36} /> Hệ thống luyện thi thông minh
          </h1>
          <p className="text-[#64748B] text-xs sm:text-sm mt-3 max-w-xl mx-auto">
            Lựa chọn chủ đề bạn muốn ôn tập để bắt đầu quy trình rèn luyện giải thuật & phản xạ tư duy tính toán nhanh.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Practice All Card */}
          <div 
            onClick={() => handleStartPractice("all")}
            className="bg-linear-to-br from-[#EFF6FF] to-[#DBEAFE]/80 border-2 border-[#3B82F6] p-6.5 rounded-3xl cursor-pointer hover:shadow-md transition duration-200 flex flex-col justify-between group active:scale-98"
            id="practice-all-card"
          >
            <div>
              <div className="bg-[#3B82F6] text-white p-3.5 rounded-xl w-fit shadow-md">
                <Sparkles size={20} />
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A] mt-5 group-hover:text-[#1E40AF] transition">
                Tất cả chủ đề tổng hợp
              </h2>
              <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                Bộ đề xáo trộn ngẫu nhiên từ 125 câu trắc nghiệm đầy đủ để thử thách tối đa phản xạ của bạn.
              </p>
            </div>
            <div className="flex items-center text-xs text-[#3B82F6] font-[#3B82F6] font-bold mt-8 group-hover:translate-x-1.5 transition-transform">
              Bắt đầu làm bài <ChevronRight size={14} className="ml-1" />
            </div>
          </div>

          {/* Subtopic categories cards */}
          {Object.values(Category).map((catName, idx) => {
            const count = questions.filter(q => q.category === catName).length;
            return (
              <div 
                key={idx}
                onClick={() => handleStartPractice(catName)}
                className="bg-white border-2 border-[#E2E8F0] hover:border-[#3B82F6] p-6.5 rounded-3xl cursor-pointer hover:shadow-[0_4px_14px_rgba(59,130,246,0.04)] transition duration-200 flex flex-col justify-between group active:scale-98"
                id={`practice-cat-card-${idx}`}
              >
                <div>
                  <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">Chủ đề {idx + 1}</span>
                  <h2 className="text-base sm:text-lg font-black text-[#0F172A] mt-1.5 group-hover:text-[#1E40AF] transition">
                    {catName}
                  </h2>
                  <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                    Học sâu các câu hỏi chuyên tập, tối ưu điểm lý thuyết của riêng mảng nội dung này.
                  </p>
                </div>
                <div className="flex justify-between items-center mt-8">
                  <span className="text-xs font-bold text-[#1E40AF] bg-[#DBEAFE] border border-[#DBEAFE]/60 px-3 py-1 rounded-lg">{count} câu hỏi</span>
                  <div className="flex items-center text-xs text-[#3B82F6] font-bold group-hover:translate-x-1.5 transition-transform">
                    Bắt đầu làm <ChevronRight size={14} className="ml-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- Active Practice Mode Render ---
  const currentCount = practiceQuestions.length;
  const progressPercent = Math.round(((currentIndex + 1) / currentCount) * 100);

  if (!currentQuestion) {
    return (
      <div className="text-center py-12 space-y-4 max-w-md mx-auto" id="no-practice-questions">
        <AlertCircle size={48} className="mx-auto text-[#94A3B8]" />
        <h3 className="text-lg font-bold text-[#0F172A]">Không có câu hỏi</h3>
        <p className="text-[#64748B] text-sm">Chủ đề này hiện không có câu hỏi khả dụng trong bộ đề cương mẫu.</p>
        <button 
          onClick={() => setIsPracticing(false)}
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs px-5 py-2.5 rounded-xl font-bold cursor-pointer transition shadow-sm"
        >
          Quay lại chọn chủ đề
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6" id="active-practice-area">
      {/* Quiz Progress & Back button bar */}
      <div className="flex items-center justify-between gap-4" id="practice-header">
        <button 
          onClick={() => setIsPracticing(false)}
          className="text-[#64748B] hover:text-[#0F172A] text-xs sm:text-sm flex items-center gap-2 cursor-pointer font-bold transition"
          id="btn-back-to-topics"
        >
          <ArrowLeft size={16} /> Thoát luyện tập
        </button>
        <div className="flex items-center gap-2 text-xs text-[#64748B] font-mono font-semibold">
          <span>Tiến trình: <strong>{currentIndex + 1}</strong>/{currentCount}</span>
        </div>
      </div>

      {/* Progress visual bar */}
      <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden shadow-inner" id="progress-bar-container">
        <div 
          className="bg-[#3B82F6] h-full rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Question Plate */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8 space-y-6" id="question-card-plate">
        {/* Category sticker */}
        <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3.5">
          <span className="bg-[#DBEAFE] text-[#1E40AF] text-xs font-bold px-3 py-1 rounded-md border border-[#DBEAFE]/40">
            {currentQuestion.category}
          </span>
          <span className="text-xs text-[#94A3B8] font-mono font-semibold">#{currentQuestion.id}</span>
        </div>

        {/* Question Text */}
        <div className="question-text-wrapper">
          <SmartQuestionText 
            text={currentQuestion.questionText}
            questionId={currentQuestion.id}
            isInteractive={true}
            output={currentQuestion.options[currentQuestion.correctAnswerIndex]?.replace(/^[A-D]\.\s*/, "")}
            showOutputByDefault={hasSubmitted}
          />
        </div>

        {/* Python Code block if exists */}
        {currentQuestion.codeSnippet && (
          <JupyterCell 
            code={currentQuestion.codeSnippet} 
            cellNumber={currentQuestion.id} 
            isInteractive={true}
            output={currentQuestion.options[currentQuestion.correctAnswerIndex]?.replace(/^[A-D]\.\s*/, "")}
            showOutputByDefault={hasSubmitted}
          />
        )}

        {/* Multiple choice options */}
        <div className="grid grid-cols-1 gap-3.5" id="options-selector">
          {getQuestionOptions(currentQuestion.options).map((option, idx) => {
            const isSelected = selectedOptIndex === idx;
            const isCorrect = idx === currentQuestion.correctAnswerIndex;
            
            // Stylings after submission to match professional templates
            let optionStyles = "border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/20 text-[#1E293B]";
            let circleColor = "border-slate-200 text-slate-800 bg-[#E2E8F0]/50";

            if (isSelected && !hasSubmitted) {
              optionStyles = "border-2 border-blue-500 bg-[#EFF6FF]/60 text-blue-900 font-bold shadow-[0_2px_8px_rgba(59,130,246,0.08)] scale-[1.002]";
              circleColor = "border-blue-500 bg-blue-500 text-white";
            } else if (hasSubmitted) {
              if (isCorrect) {
                // Highlight correct answer in green
                optionStyles = "border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-[0_4px_12px_rgba(16,185,129,0.065)] scale-[1.005]";
                circleColor = "border-emerald-600 bg-emerald-500 text-white";
              } else if (isSelected) {
                // Highlight incorrect user choice in red
                optionStyles = "border-2 border-rose-500 bg-rose-50 text-rose-900 font-bold shadow-sm";
                circleColor = "border-rose-600 bg-rose-500 text-white";
              } else {
                optionStyles = "border border-slate-100 bg-slate-50/50 text-slate-400 opacity-60 cursor-not-allowed";
                circleColor = "border-slate-200 text-slate-400 bg-slate-100";
              }
            }

            return (
              <div
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                className={`flex items-center gap-4.5 p-4 sm:p-5 rounded-2xl border text-sm sm:text-base cursor-pointer transition-all duration-200 ${optionStyles}`}
                id={`btn-option-${idx}`}
              >
                <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-sm font-bold font-sans transition-colors duration-200 shrink-0 ${circleColor}`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <div className="flex-1 leading-relaxed font-semibold">{option}</div>
                {hasSubmitted && isCorrect && <CheckCircle2 className="text-[#10B981] flex-shrink-0" size={22} />}
                {hasSubmitted && isSelected && !isCorrect && <XCircle className="text-[#EF4444] flex-shrink-0" size={22} />}
              </div>
            );
          })}
        </div>

        {/* Submission buttons */}
        <div className="flex flex-wrap gap-4 items-center justify-between pt-5 border-t border-[#E2E8F0]" id="submission-controls">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {!hasSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOptIndex === null}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  selectedOptIndex === null 
                    ? "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed border border-[#E2E8F0]" 
                    : "bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-[0_4px_12px_rgba(59,130,246,0.25)]"
                }`}
                id="btn-submit-answer"
              >
                <Check size={16} /> Kiểm tra đáp án
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-3 rounded-xl text-sm font-bold transition shadow-[0_4px_12px_rgba(59,130,246,0.25)] cursor-pointer flex items-center gap-1.5 active:scale-95"
                id="btn-next-question"
              >
                Tiếp tục <ChevronRight size={16} />
              </button>
            )}
            
            {hasSubmitted && (
              <button
                onClick={handleAskAI}
                disabled={isAiLoading}
                className={`px-5 py-3 rounded-xl text-sm font-bold transition cursor-pointer border-2 flex items-center justify-center gap-2 active:scale-95 ${
                  isAiLoading
                    ? "bg-[#F3E8FF] text-purple-700 border-purple-300 cursor-not-allowed animate-pulse"
                    : "bg-white text-purple-700 border-[#E9D5FF] hover:bg-[#F3E8FF] hover:border-[#D8B4FE]"
                }`}
                id="btn-ask-ai"
              >
                <Sparkles size={16} className={isAiLoading ? "animate-spin animate-infinite" : ""} />
                {isAiLoading ? "Đang nhờ AI phân tích..." : "Giải thích bằng AI"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Solutions / Analytics sections */}
      {hasSubmitted && (
        <div className="space-y-5" id="post-answer-analytics">
          {/* Static local explanation card */}
          <div className="bg-white p-6 rounded-3xl border-2 border-dashed border-[#CBD5E1] space-y-3 shadow-xs">
            <h3 className="text-xs sm:text-sm font-black text-[#0F172A] flex items-center gap-2 uppercase tracking-widest">
              <CheckCircle2 size={18} className="text-[#10B981]" /> Đáp án đúng & Lời giải:
            </h3>
            <p className="text-sm text-[#334155] leading-relaxed font-normal">
              {currentQuestion.explanation}
            </p>
          </div>

          {/* AI Explanation details display */}
          {(aiExplanation || isAiLoading || aiError) && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-[0_6px_20px_rgba(147,51,234,0.04)] space-y-5">
              <div className="flex items-center justify-between border-b border-purple-100 pb-3.5">
                <span className="text-purple-950 font-extrabold text-sm sm:text-base flex items-center gap-2">
                  <Sparkles className="text-purple-600 animate-pulse" size={18} />
                  Phân tích thông thái từ Trợ lý AI UET
                </span>
                <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Gemini Flash 3.5
                </span>
              </div>

              {isAiLoading && (
                <div className="py-8 flex flex-col items-center justify-center gap-3.5 text-center">
                  <RefreshCw className="animate-spin text-purple-600" size={36} />
                  <p className="text-sm font-extrabold text-[#0F172A]">Đang thực hiện giải thuật phân tích đề bài...</p>
                  <p className="text-xs text-[#64748B]">Giáo trình Tư duy tính toán đang được ánh xạ vào suy luận của AI</p>
                </div>
              )}

              {aiError && (
                <div className="bg-red-50 border border-red-100 p-5 rounded-2xl flex items-start gap-3.5 text-red-800 text-xs sm:text-sm shadow-xs">
                  <AlertCircle size={24} className="text-red-500 shrink-0" />
                  <div>
                    <p className="font-extrabold">Không kết nối được dịch vụ AI</p>
                    <p className="mt-1 opacity-90 leading-relaxed">{aiError}</p>
                    <p className="mt-2.5 text-[10px] text-red-700 bg-red-100 px-2 py-0.5 rounded font-bold uppercase tracking-wider inline-block">
                      Mẹo: Cung cấp GEMINI_API_KEY ở bảng Secrets phía góc phải.
                    </p>
                  </div>
                </div>
              )}

              {aiExplanation && (
                <div className="prose max-w-none text-[#1E293B] space-y-1">
                  {renderFormattedExplanation(aiExplanation)}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
