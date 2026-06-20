/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, Brain, Sparkles, Check, CheckCircle2, 
  XCircle, AlertCircle, RefreshCw, BookOpen, ChevronRight
} from "lucide-react";
import Horse from "./HorseIcon";
import { Category, Question } from "../types";
import JupyterCell, { SmartQuestionText, getQuestionOptions } from "./JupyterCell";

interface PracticeZoneProps {
  questions: Question[];
  initialCategory: Category | null;
  onRecordAnswer: (questionId: number, isCorrect: boolean) => void;
  onNavigateHome: () => void;
  bookmarkedIds: number[];
  onToggleBookmark: (id: number) => void;
  wrongQuestionIds?: number[];
  setIsUetModeActive?: (active: boolean) => void;
}

export default function PracticeZone({ 
  questions, 
  initialCategory, 
  onRecordAnswer, 
  onNavigateHome,
  bookmarkedIds,
  onToggleBookmark,
  wrongQuestionIds = [],
  setIsUetModeActive
}: PracticeZoneProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(initialCategory || "all");
  const [isPracticing, setIsPracticing] = useState<boolean>(initialCategory !== null);
  const [practiceOnlyBookmarked, setPracticeOnlyBookmarked] = useState<boolean>(false);
  const [practiceOnlyWrong, setPracticeOnlyWrong] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [practiceViewMode, setPracticeViewMode] = useState<"normal" | "uet">("normal");
  const [pendingPracticeConfig, setPendingPracticeConfig] = useState<{
    category: Category | "all";
    onlyBookmarked: boolean;
    onlyWrong: boolean;
  } | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);
  
  // Quiz state
  const [practiceQuestions, setPracticeQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptIndex, setSelectedOptIndex] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [sessionAnswerStatus, setSessionAnswerStatus] = useState<Record<number, boolean>>({});
  const [isPracticeFinished, setIsPracticeFinished] = useState<boolean>(false);
  const [sessionAnswers, setSessionAnswers] = useState<Record<number, number>>({});
  
  // Practice History record interface
  interface PracticeHistoryRecord {
    id: string;
    category: string;
    timestamp: string;
    correctCount: number;
    totalCount: number;
    timeSpent: number;
    viewMode: "normal" | "uet";
    practiceQuestions?: Question[];
    sessionAnswers?: Record<number, number>;
    sessionAnswerStatus?: Record<number, boolean>;
  }
  const [practiceHistory, setPracticeHistory] = useState<PracticeHistoryRecord[]>([]);
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(null);
  const [confirmingDeleteCategory, setConfirmingDeleteCategory] = useState<string | null>(null);
  const [isReviewMode, setIsReviewMode] = useState<boolean>(false);

  // Active study duration timer to mirror UET quiz countdown layout
  const [sessionTime, setSessionTime] = useState<number>(0);
  const [showPracticeTimer, setShowPracticeTimer] = useState<boolean>(true);

  useEffect(() => {
    let interval: any = null;
    if (isPracticing) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
    } else {
      setSessionTime(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPracticing]);
  
  // AI Explanation State
  const [aiExplanation, setAiExplanation] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string>("");

  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState<boolean>(false);

  // Monitor UET mode to notify parent
  useEffect(() => {
    if (isPracticing && practiceViewMode === "uet") {
      setIsUetModeActive?.(true);
    } else {
      setIsUetModeActive?.(false);
    }
    return () => {
      setIsUetModeActive?.(false);
    };
  }, [isPracticing, practiceViewMode, setIsUetModeActive]);

  // Load saved practice state and history archive on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("uet_ct_practice_history");
    if (savedHistory) {
      try {
        setPracticeHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Error loading practice history", e);
      }
    }

    const savedPractice = localStorage.getItem("uet_ct_active_practice");
    if (savedPractice) {
      try {
        const parsed = JSON.parse(savedPractice);
        if (parsed && parsed.isPracticing && parsed.practiceQuestions && parsed.practiceQuestions.length > 0) {
          setSelectedCategory(parsed.selectedCategory);
          setPracticeOnlyBookmarked(parsed.practiceOnlyBookmarked || false);
          setPracticeOnlyWrong(parsed.practiceOnlyWrong || false);
          setPracticeViewMode(parsed.practiceViewMode || "normal");
          setPracticeQuestions(parsed.practiceQuestions);
          setCurrentIndex(parsed.currentIndex || 0);
          setSelectedOptIndex(parsed.selectedOptIndex);
          setHasSubmitted(parsed.hasSubmitted || false);
          setSessionAnswerStatus(parsed.sessionAnswerStatus || {});
          setSessionAnswers(parsed.sessionAnswers || {});
          setSessionTime(parsed.sessionTime || 0);
          
          if (parsed.explicitlyExited) {
            setIsPracticing(false);
          } else {
            setIsPracticing(parsed.isPracticing);
          }
        }
      } catch (e) {
        console.error("Error restoring active practice", e);
      }
    }
    setHasLoadedFromStorage(true);
  }, []);

  // Initialize practice questions
  useEffect(() => {
    if (!hasLoadedFromStorage) return;

    const savedPractice = localStorage.getItem("uet_ct_active_practice");
    if (isPracticing && !savedPractice) {
      let filtered = questions;
      if (selectedCategory !== "all") {
        filtered = questions.filter(q => q.category === selectedCategory);
      }
      if (practiceOnlyBookmarked) {
        filtered = filtered.filter(q => bookmarkedIds.includes(q.id));
      }
      if (practiceOnlyWrong) {
        filtered = filtered.filter(q => wrongQuestionIds.includes(q.id));
      }
      // Shuffle questions for a fresh practice experience
      const shuffled = [...filtered].sort(() => Math.random() - 0.5);
      setPracticeQuestions(shuffled);
      setCurrentIndex(0);
      resetQuestionState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPracticing, selectedCategory, practiceOnlyBookmarked, practiceOnlyWrong, questions, hasLoadedFromStorage]);

  // Auto-save active practice state
  useEffect(() => {
    if (!hasLoadedFromStorage) return;

    if (isPracticing && practiceQuestions.length > 0 && !isReviewMode) {
      const activeState = {
        selectedCategory,
        isPracticing,
        practiceOnlyBookmarked,
        practiceOnlyWrong,
        practiceViewMode,
        practiceQuestions,
        currentIndex,
        selectedOptIndex,
        hasSubmitted,
        sessionAnswerStatus,
        sessionAnswers,
        sessionTime,
        explicitlyExited: false
      };
      localStorage.setItem("uet_ct_active_practice", JSON.stringify(activeState));
      localStorage.setItem("uet_ct_active_practice_" + selectedCategory, JSON.stringify(activeState));
    }
  }, [
    isPracticing, selectedCategory, practiceOnlyBookmarked, practiceOnlyWrong,
    practiceViewMode, practiceQuestions, currentIndex, selectedOptIndex,
    hasSubmitted, sessionAnswerStatus, sessionAnswers, sessionTime, hasLoadedFromStorage, isReviewMode
  ]);

  const resetQuestionState = () => {
    setSelectedOptIndex(null);
    setHasSubmitted(false);
    setAiExplanation("");
    setAiError("");
    setIsAiLoading(false);
  };

  const executeStartPractice = (category: Category | "all", onlyBookmarked: boolean, onlyWrong: boolean, viewMode: "normal" | "uet") => {
    localStorage.removeItem("uet_ct_active_practice");
    localStorage.removeItem("uet_ct_active_practice_" + category);
    setIsReviewMode(false);
    setSelectedCategory(category);
    setPracticeOnlyBookmarked(onlyBookmarked);
    setPracticeOnlyWrong(onlyWrong);
    setPracticeViewMode(viewMode);
    setIsPracticing(true);
    setIsPracticeFinished(false);
    setSessionAnswers({});
    setSessionAnswerStatus({});
    setPendingPracticeConfig(null);
  };

  const handleStartPractice = (category: Category | "all", onlyBookmarked: boolean = false, onlyWrong: boolean = false) => {
    setPendingPracticeConfig({
      category,
      onlyBookmarked,
      onlyWrong
    });
  };

  const handleExitPractice = () => {
    // Save current active state to localStorage so they can resume later
    if (isPracticing && practiceQuestions.length > 0 && !isPracticeFinished && !isReviewMode) {
      const activeState = {
        selectedCategory,
        isPracticing: true,
        practiceOnlyBookmarked,
        practiceOnlyWrong,
        practiceViewMode,
        practiceQuestions,
        currentIndex,
        selectedOptIndex,
        hasSubmitted,
        sessionAnswerStatus,
        sessionAnswers,
        sessionTime,
        explicitlyExited: true
      };
      localStorage.setItem("uet_ct_active_practice", JSON.stringify(activeState));
      localStorage.setItem("uet_ct_active_practice_" + selectedCategory, JSON.stringify(activeState));
    }

    setIsReviewMode(false);
    setIsPracticing(false);
    setIsPracticeFinished(false);
    setPracticeOnlyBookmarked(false);
    setPracticeOnlyWrong(false);
    setSessionAnswerStatus({});
    setSessionAnswers({});
    setPracticeQuestions([]);
    resetQuestionState();
  };

  const handleReviewHistory = (rec: PracticeHistoryRecord) => {
    if (!rec.practiceQuestions || rec.practiceQuestions.length === 0) {
      alert("Rất tiếc, phiên ôn tập này không chứa thông tin chi tiết các câu đã làm.");
      return;
    }
    setIsReviewMode(true);
    setSelectedCategory(rec.category === "Tất cả chủ đề" ? "all" : rec.category as any);
    setPracticeQuestions(rec.practiceQuestions);
    setSessionAnswers(rec.sessionAnswers || {});
    setSessionAnswerStatus(rec.sessionAnswerStatus || {});
    setPracticeViewMode(rec.viewMode);
    setSessionTime(rec.timeSpent || 0);
    setCurrentIndex(0);

    const firstQ = rec.practiceQuestions[0];
    if (rec.sessionAnswers && rec.sessionAnswers[firstQ.id] !== undefined) {
      setSelectedOptIndex(rec.sessionAnswers[firstQ.id]);
      setHasSubmitted(true);
    } else {
      setSelectedOptIndex(null);
      setHasSubmitted(true);
    }

    setIsPracticing(true);
    setIsPracticeFinished(false);
  };

  const currentQuestion = practiceQuestions[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (hasSubmitted || isReviewMode) return;
    setSelectedOptIndex(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptIndex === null || hasSubmitted) return;
    
    setHasSubmitted(true);
    const isCorrect = selectedOptIndex === currentQuestion.correctAnswerIndex;
    setSessionAnswerStatus(prev => ({ ...prev, [currentQuestion.id]: isCorrect }));
    setSessionAnswers(prev => ({ ...prev, [currentQuestion.id]: selectedOptIndex }));
    onRecordAnswer(currentQuestion.id, isCorrect);
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      const prevQ = practiceQuestions[prevIdx];
      const prevQId = prevQ.id;
      if (sessionAnswers[prevQId] !== undefined) {
        setSelectedOptIndex(sessionAnswers[prevQId]);
        setHasSubmitted(true);
      } else {
        setSelectedOptIndex(null);
        setHasSubmitted(isReviewMode);
      }
      setAiExplanation("");
      setAiError("");
      setIsAiLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < practiceQuestions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      const nextQ = practiceQuestions[nextIdx];
      const nextQId = nextQ.id;
      if (sessionAnswers[nextQId] !== undefined) {
        setSelectedOptIndex(sessionAnswers[nextQId]);
        setHasSubmitted(true);
      } else {
        setSelectedOptIndex(null);
        setHasSubmitted(isReviewMode);
      }
      setAiExplanation("");
      setAiError("");
      setIsAiLoading(false);
    } else {
      // Completed current practice pool!
      if (isReviewMode) {
        handleExitPractice();
        return;
      }
      setIsPracticeFinished(true);
      
      // Save history record of the completed session
      const correctSum = Object.values(sessionAnswerStatus).filter(Boolean).length;
      const newRecord: PracticeHistoryRecord = {
        id: "practice-" + Date.now(),
        category: selectedCategory === "all" ? "Tất cả chủ đề" : selectedCategory,
        timestamp: new Date().toLocaleString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        }),
        correctCount: correctSum,
        totalCount: practiceQuestions.length,
        timeSpent: sessionTime,
        viewMode: practiceViewMode,
        practiceQuestions: [...practiceQuestions],
        sessionAnswers: { ...sessionAnswers },
        sessionAnswerStatus: { ...sessionAnswerStatus }
      };
      
      setPracticeHistory(prev => {
        const updated = [newRecord, ...prev];
        localStorage.setItem("uet_ct_practice_history", JSON.stringify(updated));
        return updated;
      });

      // Clear active tracking from local storage
      localStorage.removeItem("uet_ct_active_practice");
      localStorage.removeItem("uet_ct_active_practice_" + selectedCategory);
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

  // --- SELECT PRACTICE INTERFACE MODAL ---
  if (pendingPracticeConfig) {
    const config = pendingPracticeConfig;
    const itemKey = "uet_ct_active_practice_" + config.category;
    const catSavedPracticeRaw = localStorage.getItem(itemKey);
    let catSavedPractice = null;
    if (catSavedPracticeRaw) {
      try {
        catSavedPractice = JSON.parse(catSavedPracticeRaw);
      } catch (e) {}
    }

    return (
      <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in" id="practice-interface-selector">
        <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative text-left">
          <button 
            onClick={() => setPendingPracticeConfig(null)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-105 transition duration-150 cursor-pointer text-xs font-bold"
          >
            ❌ Đóng
          </button>

          {catSavedPractice ? (
            <div className="space-y-5">
              <div className="text-center space-y-2">
                <span className="bg-amber-100 text-[#D97706] text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
                  📝 CÓ TIẾN TRÌNH CHƯA HOÀN THÀNH
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  Khôi Phục Tiến Trình Luyện Tập
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto text-center leading-relaxed">
                  Phát hiện một bài làm dở của chuyên đề: <strong className="text-slate-800">{config.category === "all" ? "Tất cả chủ đề" : config.category}</strong>
                </p>
              </div>

              <div className="bg-amber-50/50 border border-amber-200/50 p-4 rounded-2xl text-xs sm:text-sm text-slate-700 space-y-2">
                <p>• Giao diện sử dụng: <strong className="text-[#1E40AF] font-bold">{catSavedPractice.practiceViewMode === "uet" ? "🏫 UET Canvas" : "✨ Hiện đại"}</strong></p>
                <p>• Số câu đã làm: <strong className="text-slate-900 font-bold">{Object.keys(catSavedPractice.sessionAnswerStatus || {}).length}</strong> câu hỏi</p>
                <p>• Vị trí hiện tại: <strong className="text-slate-900 font-bold">Câu {catSavedPractice.currentIndex + 1}</strong></p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory(catSavedPractice.selectedCategory);
                    setPracticeOnlyBookmarked(catSavedPractice.practiceOnlyBookmarked || false);
                    setPracticeOnlyWrong(catSavedPractice.practiceOnlyWrong || false);
                    setPracticeViewMode(catSavedPractice.practiceViewMode || "normal");
                    setPracticeQuestions(catSavedPractice.practiceQuestions);
                    setCurrentIndex(catSavedPractice.currentIndex || 0);
                    setSelectedOptIndex(catSavedPractice.selectedOptIndex);
                    setHasSubmitted(catSavedPractice.hasSubmitted || false);
                    setSessionAnswerStatus(catSavedPractice.sessionAnswerStatus || {});
                    setSessionAnswers(catSavedPractice.sessionAnswers || {});
                    setSessionTime(catSavedPractice.sessionTime || 0);
                    setIsReviewMode(false);
                    setIsPracticing(true);
                    setPendingPracticeConfig(null);
                  }}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-black py-3 px-5 rounded-2xl text-sm transition cursor-pointer text-center shadow-sm active:scale-95"
                >
                  Tiếp tục bài đang dở 📝
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem(itemKey);
                    // trigger re-render
                    const currentConf = pendingPracticeConfig;
                    setPendingPracticeConfig(null);
                    setTimeout(() => setPendingPracticeConfig(currentConf), 5);
                  }}
                  className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-750 font-bold py-3 px-5 rounded-2xl text-sm transition cursor-pointer text-center active:scale-95"
                >
                  Xoá & Luyện tập mới 🔄
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center space-y-2">
                <span className="bg-blue-100 text-blue-800 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
                  <Sparkles size={12} /> HỌC TẬP CHUYÊN SÂU
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Lựa Chọn Giao Diện Ôn Luyện
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto text-center leading-relaxed">
                  Hãy chọn giao diện luyện tập chuyên đề phù hợp nhất với mong muốn và cảm quan của bạn:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* OPTION 1: Normal Interface */}
                <div 
                  onClick={() => {
                    executeStartPractice(config.category, config.onlyBookmarked, config.onlyWrong, "normal");
                  }}
                  className="bg-slate-50 border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50/10 p-5 rounded-2xl cursor-pointer transition duration-155 group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-bold">
                      ✨
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-950 text-sm sm:text-base group-hover:text-blue-700 transition">
                        Giao diện hiện đại
                      </h3>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                        Thiết kế bento trực quan, hiện đại, hỗ trợ kiểm tra kết quả ngay lập tức và giải thích chi tiết từ AI thông thái.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center justify-end text-xs font-bold text-blue-600">
                    Ôn luyện ngay →
                  </div>
                </div>

                {/* OPTION 2: UET Portal Interface */}
                <div 
                  onClick={() => {
                    executeStartPractice(config.category, config.onlyBookmarked, config.onlyWrong, "uet");
                  }}
                  className="bg-white border-2 border-slate-200 hover:border-[#13264c] hover:bg-[#13264c]/5 p-5 rounded-2xl cursor-pointer transition duration-155 group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#13264c]/10 text-[#13264c] flex items-center justify-center text-lg font-bold">
                      🏫
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-950 text-sm sm:text-base group-hover:text-[#13264c] transition">
                        Giao diện học thi UET (100% thật)
                      </h3>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                        Đưa bạn vào không gian thi chính thức của UET trên Canvas. Giúp làm quen tinh thần phòng thi trắc nghiệm thực sự.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center justify-end text-xs font-bold text-[#13264c]">
                    Vào mô phỏng học thi →
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

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

        {(() => {
          const sessions: { key: string; category: string; data: any }[] = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("uet_ct_active_practice_")) {
              try {
                const raw = localStorage.getItem(key);
                if (raw) {
                  const parsed = JSON.parse(raw);
                  if (parsed && parsed.isPracticing && parsed.practiceQuestions && parsed.practiceQuestions.length > 0) {
                    sessions.push({
                      key,
                      category: parsed.selectedCategory === "all" ? "Tất cả chủ đề" : parsed.selectedCategory,
                      data: parsed
                    });
                  }
                }
              } catch (e) {
                console.error(e);
              }
            }
          }

          if (sessions.length === 0) return null;

          return (
            <div className="bg-amber-50/70 border border-amber-200/80 p-3 sm:p-4 rounded-2xl shadow-xs animate-fade-in text-left space-y-3" id="compact-unfinished-sessions-bar">
              <div className="flex items-center gap-2 text-amber-900 border-b border-amber-200/50 pb-2">
                <span className="text-base sm:text-lg">📝</span>
                <div className="flex-1">
                  <h3 className="font-extrabold text-[12.5px] sm:text-xs text-amber-900">
                    Bạn có {sessions.length} bài luyện tập đang làm dở!
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-amber-700 font-medium">
                    Hãy tiếp tục bài làm của bạn để không bỏ lỡ tiến trình ôn thi.
                  </p>
                </div>
              </div>

              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1.5 scrollbar-thin">
                {sessions.map((session, sidx) => {
                  const info = session.data;
                  const doneCount = Object.keys(info.sessionAnswerStatus || {}).length;
                  return (
                    <div key={session.key} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-white/70 p-2.5 rounded-xl border border-amber-200/30 hover:bg-white/90 transition text-xs">
                      <div className="space-y-0.5">
                        <p className="text-slate-700 font-bold text-[12px]">
                          Chuyên đề: <span className="font-extrabold text-amber-900">{session.category}</span>
                        </p>
                        <p className="text-[10.5px] text-slate-500 font-medium font-sans">
                          Đã làm <strong className="text-slate-800 font-extrabold">{doneCount}</strong> / {info.practiceQuestions.length} câu • Giao diện: <strong className="text-slate-800 font-medium">{info.practiceViewMode === "uet" ? "🏫 UET Canvas" : "✨ Hiện đại"}</strong>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button
                          onClick={() => {
                            setSelectedCategory(info.selectedCategory);
                            setPracticeOnlyBookmarked(info.practiceOnlyBookmarked || false);
                            setPracticeOnlyWrong(info.practiceOnlyWrong || false);
                            setPracticeViewMode(info.practiceViewMode || "normal");
                            setPracticeQuestions(info.practiceQuestions);
                            setCurrentIndex(info.currentIndex || 0);
                            setSelectedOptIndex(info.selectedOptIndex);
                            setHasSubmitted(info.hasSubmitted || false);
                            setSessionAnswerStatus(info.sessionAnswerStatus || {});
                            setSessionAnswers(info.sessionAnswers || {});
                            setSessionTime(info.sessionTime || 0);
                            setIsReviewMode(false);
                            setIsPracticing(true);
                          }}
                          className="bg-amber-600 hover:bg-amber-700 text-white text-[10.5px] font-bold px-3 py-1.5 rounded-lg transition cursor-pointer shadow-xs active:scale-95 whitespace-nowrap"
                        >
                          Tiếp tục ôn luyện
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Bạn có chắc chắn muốn xoá bài dở của chuyên đề "${session.category}"?`)) {
                              localStorage.removeItem(session.key);
                              // Also remove from general uet_ct_active_practice if it matches
                              const generalRaw = localStorage.getItem("uet_ct_active_practice");
                              if (generalRaw) {
                                try {
                                  const parsedGen = JSON.parse(generalRaw);
                                  if (parsedGen && parsedGen.selectedCategory === info.selectedCategory) {
                                    localStorage.removeItem("uet_ct_active_practice");
                                  }
                                } catch (e) {}
                              }
                              setHasLoadedFromStorage(false);
                              setTimeout(() => setHasLoadedFromStorage(true), 15);
                            }
                          }}
                          className="bg-white hover:bg-amber-100/30 border border-amber-300 text-amber-800 text-[10.5px] font-bold px-3 py-1.5 rounded-lg transition cursor-pointer active:scale-95 whitespace-nowrap"
                        >
                          Xoá
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Practice All Card */}
          <div 
            onClick={() => handleStartPractice("all", false)}
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
              {bookmarkedIds.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartPractice("all", true);
                  }}
                  className="mt-4 w-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  <Horse className="text-amber-600 fill-amber-500/20" size={14} />
                  Luyện {bookmarkedIds.length} câu đã đánh dấu của tất cả chủ đề
                </button>
              )}
              {wrongQuestionIds.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartPractice("all", false, true);
                  }}
                  className="mt-2.5 w-full bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  <AlertCircle className="text-rose-650" size={14} />
                  Luyện {wrongQuestionIds.length} câu đã làm sai tổng hợp ❌
                </button>
              )}
            </div>
            <div className="flex items-center text-xs text-[#3B82F6] font-[#3B82F6] font-bold mt-8 group-hover:translate-x-1.5 transition-transform">
              Bắt đầu làm bài <ChevronRight size={14} className="ml-1" />
            </div>
          </div>

          {/* Subtopic categories cards */}
          {Object.values(Category)
            .filter((catName) => questions.filter((q) => q.category === catName).length > 0)
            .map((catName, idx) => {
              const count = questions.filter(q => q.category === catName).length;
              const catBookmarkedCount = questions.filter(q => q.category === catName && bookmarkedIds.includes(q.id)).length;
              const catWrongCount = questions.filter(q => q.category === catName && wrongQuestionIds.includes(q.id)).length;
              return (
                <div 
                  key={idx}
                  onClick={() => handleStartPractice(catName, false)}
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
                    {catBookmarkedCount > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                           handleStartPractice(catName, true);
                        }}
                        className="mt-3.5 w-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold py-1.5 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95"
                      >
                        <Horse className="text-amber-600 fill-amber-500/10" size={13} />
                        Luyện {catBookmarkedCount} câu đã đánh dấu
                      </button>
                    )}
                    {catWrongCount > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartPractice(catName, false, true);
                        }}
                        className="mt-2 w-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-855 text-xs font-bold py-1.5 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95"
                      >
                        <AlertCircle className="text-rose-500" size={13} />
                        Luyện {catWrongCount} câu đã làm sai chuyên đề này
                      </button>
                    )}
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

        {/* Practice History Archive Section */}
        <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-3xl p-6 sm:p-8 space-y-5 text-left mt-8 animate-fade-in" id="uet-practice-history-panel">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3.5 border-slate-100">
            <h3 className="text-base sm:text-lg font-black text-slate-800 flex items-center gap-2">
              <BookOpen size={20} className="text-blue-600 animate-pulse" />
              Kho Lưu Trữ Lịch Sử Luyện Tập Chuyên Đề
            </h3>
            {practiceHistory.length > 0 && (
              <button
                onClick={() => {
                  if (confirm("Bạn có chắc chắn muốn xoá toàn bộ kho lưu trữ lịch sử luyện tập không? Thao tác này không thể hoàn tác.")) {
                    setPracticeHistory([]);
                    localStorage.removeItem("uet_ct_practice_history");
                  }
                }}
                className="text-xs text-red-600 hover:text-red-800 font-extrabold transition flex items-center gap-2.5 cursor-pointer bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-xl border border-red-200"
              >
                🗑 Xóa toàn bộ kho lưu trữ
              </button>
            )}
          </div>

          {practiceHistory.length === 0 ? (
            <div className="py-10 text-center space-y-2" id="uet-no-history">
              <p className="text-slate-400 font-bold text-sm">Chưa có lịch sử làm bài</p>
              <p className="text-slate-500 text-xs">Hãy bắt đầu ôn tập một chuyên đề bất kỳ để lưu trữ lại lịch sử đánh giá kết quả của bạn tại đây.</p>
            </div>
          ) : (() => {
            const groupedHistory = practiceHistory.reduce<Record<string, PracticeHistoryRecord[]>>((acc, rec) => {
              const cat = rec.category || "Tất cả chủ đề";
              if (!acc[cat]) {
                acc[cat] = [];
              }
              acc[cat].push(rec);
              return acc;
            }, {});

            const orderedCategories = Object.keys(groupedHistory).sort((a, b) => {
              if (a === "Tất cả chủ đề") return -1;
              if (b === "Tất cả chủ đề") return 1;
              return a.localeCompare(b, "vi");
            });

            return (
              <div className="max-h-[525px] overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-slate-200" id="scrollable-practice-history">
                {orderedCategories.map((catName) => {
                  const records = groupedHistory[catName];
                  return (
                    <div key={catName} className="space-y-3 border border-slate-100 rounded-2xl p-4 bg-slate-50/25 animate-fade-in" id={`history-group-${catName}`}>
                      <div className="flex items-center justify-between border-b pb-2 border-slate-100 bg-[#E2E8F0]/30 -mx-4 -mt-4 px-4 py-2.5 rounded-t-2xl">
                        <span className="font-extrabold text-xs sm:text-xs text-slate-700 uppercase tracking-wider flex items-center gap-1.5 leading-relaxed">
                          📂 Chuyên đề: <strong className="text-blue-900 font-black">{catName}</strong>
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] sm:text-[11px] text-slate-600 font-black bg-[#E2E8F0] px-2.5 py-0.5 rounded-full select-none">
                            {records.length} phiên làm
                          </span>
                          {confirmingDeleteCategory === catName ? (
                            <div className="flex items-center gap-1.5 animate-fade-in bg-rose-50 border border-rose-200 px-2.0 py-1.0 rounded-lg select-none">
                              <span className="text-[10px] font-black text-rose-800">Xóa hết?</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const filtered = practiceHistory.filter(h => h.category !== catName);
                                  setPracticeHistory(filtered);
                                  localStorage.setItem("uet_ct_practice_history", JSON.stringify(filtered));
                                  setConfirmingDeleteCategory(null);
                                }}
                                className="text-[10px] font-black bg-rose-600 hover:bg-rose-700 text-white px-2 py-0.5 rounded cursor-pointer transition"
                              >
                                Có
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setConfirmingDeleteCategory(null);
                                }}
                                className="text-[10px] font-semibold bg-slate-200 hover:bg-slate-300 text-slate-800 px-1.5 py-0.5 rounded cursor-pointer transition"
                              >
                                Không
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfirmingDeleteCategory(catName);
                              }}
                              className="text-red-650 hover:text-red-800 font-extrabold text-[10px] bg-red-50 hover:bg-red-100/80 px-2 py-0.5 rounded-lg border border-red-200 transition cursor-pointer flex items-center gap-0.5"
                              title={`Xóa tất cả các phiên ôn tập của chuyên đề ${catName}`}
                            >
                              Xóa chuyên đề
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                          <thead>
                            <tr className="border-b border-slate-200/60 text-xs text-slate-400 font-bold select-none">
                              <th className="py-2 px-3 text-[10px] uppercase tracking-wider text-slate-500 font-black">Thời gian</th>
                              <th className="py-2 px-3 text-center text-[10px] uppercase tracking-wider text-slate-500 font-black">Giao diện</th>
                              <th className="py-2 px-3 text-center text-[10px] uppercase tracking-wider text-slate-500 font-black">Kết quả</th>
                              <th className="py-2 px-3 text-center text-[10px] uppercase tracking-wider text-slate-500 font-black">Tỉ lệ chính xác</th>
                              <th className="py-2 px-3 text-center text-[10px] uppercase tracking-wider text-slate-500 font-black">Thời lượng</th>
                              <th className="py-2 px-3 text-center text-[10px] uppercase tracking-wider text-slate-500 font-black">Hành động</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-semibold font-mono">
                            {records.map((rec) => {
                              const pct = Math.round((rec.correctCount / rec.totalCount) * 100);
                              return (
                                <tr key={rec.id || `rec-${rec.timestamp}-${rec.category}`} className="hover:bg-slate-50/80 transition duration-100">
                                  <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">{rec.timestamp}</td>
                                  <td className="py-2.5 px-3 text-center">
                                    <span className={`px-2 py-0.5 rounded text-[9.5px] font-black uppercase tracking-wider ${
                                      rec.viewMode === "uet" 
                                        ? "bg-indigo-50 text-indigo-900 border border-indigo-150" 
                                        : "bg-blue-50 text-blue-700 border border-blue-105"
                                    }`}>
                                      {rec.viewMode === "uet" ? "🏫 UET Canvas" : "✨ Hiện đại"}
                                    </span>
                                  </td>
                                  <td className="py-2.5 px-3 text-center font-bold text-slate-900 text-[11.5px]">
                                    {rec.correctCount} / {rec.totalCount}
                                  </td>
                                  <td className="py-2.5 px-3 text-center">
                                    <span className={`px-2 py-0.5 rounded-full inline-block text-[10px] font-extrabold ${
                                      pct >= 80 
                                        ? "bg-emerald-50 text-emerald-800 border border-emerald-250" 
                                        : pct >= 50 
                                          ? "bg-amber-50 text-amber-800 border border-amber-250" 
                                          : "bg-rose-50 text-rose-800 border border-rose-250"
                                    }`}>
                                      {pct}%
                                    </span>
                                  </td>
                                  <td className="py-2.5 px-3 text-center font-mono text-[11px] text-slate-600">
                                    {Math.floor(rec.timeSpent / 60)}p {rec.timeSpent % 60}s
                                  </td>
                                  <td className="py-2.5 px-3 text-center">
                                    <div className="flex items-center justify-center gap-1.5">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleReviewHistory(rec);
                                        }}
                                        className="text-blue-600 hover:text-blue-850 font-extrabold transition px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 border border-blue-150 cursor-pointer text-[10.5px] inline-flex items-center gap-0.5"
                                      >
                                        👁 Xem lại
                                      </button>
                                      {confirmingDeleteId === (rec.id || `rec-${rec.timestamp}-${rec.category}`) ? (
                                        <div className="flex items-center gap-1 animate-fade-in bg-rose-50 border border-rose-150 p-1 rounded-md text-[10.5px] select-none">
                                          <span className="text-rose-800 font-extrabold pr-0.5">Xóa?</span>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              const recordUniqueKey = rec.id || `rec-${rec.timestamp}-${rec.category}`;
                                              const filtered = practiceHistory.filter(h => {
                                                const hKey = h.id || `rec-${h.timestamp}-${h.category}`;
                                                return hKey !== recordUniqueKey;
                                              });
                                              setPracticeHistory(filtered);
                                              localStorage.setItem("uet_ct_practice_history", JSON.stringify(filtered));
                                              setConfirmingDeleteId(null);
                                            }}
                                            className="bg-rose-600 hover:bg-rose-700 text-white font-black px-1.5 py-0.5 rounded cursor-pointer transition text-[9px]"
                                          >
                                            Có
                                          </button>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setConfirmingDeleteId(null);
                                            }}
                                            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-1.5 py-0.5 rounded cursor-pointer transition text-[9px]"
                                          >
                                            Không
                                          </button>
                                        </div>
                                      ) : (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setConfirmingDeleteId(rec.id || `rec-${rec.timestamp}-${rec.category}`);
                                          }}
                                          className="text-rose-600 hover:text-rose-800 font-extrabold transition px-1.5 py-0.5 rounded hover:bg-rose-55 border border-transparent hover:border-rose-150 cursor-pointer text-[10.5px]"
                                        >
                                          Xóa
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </div>
    );
  }

  // --- Active Practice Mode Render ---
  const currentCount = practiceQuestions.length;
  const progressPercent = Math.round(((currentIndex + 1) / currentCount) * 100);

  if (isPracticeFinished) {
    if (practiceViewMode === "uet") {
      const correctSum = Object.values(sessionAnswerStatus).filter(Boolean).length;
      return (
        <div className="w-full min-h-screen bg-white text-[#333333] font-sans antialiased text-[13px] leading-[1.5] p-0 flex flex-row items-stretch animate-fade-in shadow-xs" id="uet-practice-results">
          {/* 1. Left Primary Navy Sidebar */}
          <div className="hidden md:flex flex-col items-center w-[84px] bg-[#13264c] text-white py-4 shrink-0 justify-between select-none" id="uet-practice-left-sidebar-nav">
            <div className="w-full flex flex-col items-center space-y-5">
              <div className="flex flex-col items-center cursor-pointer" onClick={handleExitPractice}>
                <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center p-1 border-2 border-blue-400 shadow-md">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#13264c" strokeWidth="8" />
                    <circle cx="50" cy="50" r="30" fill="#13264c" />
                    <polygon points="50,25 35,55 65,55" fill="white" />
                    <circle cx="50" cy="46" r="5" fill="#13264c" />
                  </svg>
                </div>
                <span className="text-[7px] text-center font-extrabold tracking-wide uppercase mt-1.5 text-blue-100/90 leading-tight">UET Portal</span>
              </div>
              
              <div className="w-full flex flex-col items-center space-y-4">
                <div className="flex flex-col items-center text-blue-200/70 py-1.5 w-full">
                  <div className="w-7 h-7 rounded-full border border-blue-200/50 flex items-center justify-center mb-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-center font-medium">Account</span>
                </div>
                
                <div className="flex flex-col items-center text-blue-200/70 py-1.5 w-full">
                  <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                  </svg>
                  <span className="text-[10px] text-center font-medium">Dashboard</span>
                </div>

                <div className="flex flex-col items-center bg-white text-[#13264c] py-2.5 w-full border-l-4 border-amber-500">
                  <svg className="w-6 h-6 mb-1 text-[#13264c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.246.477 5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.246.477-5 1.253" />
                  </svg>
                  <span className="text-[10px] text-center font-bold">Courses</span>
                </div>
              </div>
            </div>
            <div className="text-blue-300 py-2 cursor-pointer hover:text-white" onClick={handleExitPractice}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </div>
          </div>

          {/* 2. Left Secondary White Sidebar */}
          <div className="hidden lg:flex flex-col w-[210px] bg-white border-r border-[#E2E8F0] py-6 px-4 shrink-0 select-none text-[13px] text-left">
            <span className="text-[11px] font-bold text-slate-500 mb-4 tracking-tight truncate filter brightness-75">Học kỳ II năm học 2025 - 2026</span>
            <div className="flex flex-col space-y-3.5 font-normal text-slate-600">
              <span className="hover:text-blue-600 cursor-pointer">Announcements</span>
              <span className="hover:text-blue-600 cursor-pointer">Assignments</span>
              <span className="hover:text-blue-600 cursor-pointer">Discussions</span>
              <span className="hover:text-blue-600 cursor-pointer text-[#0e2240] font-bold border-l-2 border-[#0e2240] pl-2">Quizzes - Ôn luyện</span>
              <span className="hover:text-blue-600 cursor-pointer">Modules</span>
            </div>
          </div>

          {/* 3. Central practice results container */}
          <div className="flex-1 flex flex-col md:flex-row bg-[#ffffff] p-4 sm:p-6 overflow-y-auto">
            <div className="flex-1 space-y-6 md:pr-6 text-left" id="uet-quiz-review-pane">
              {/* Breadcrumbs */}
              <div className="flex items-center space-x-2 text-[13.5px] text-slate-600 font-medium whitespace-nowrap overflow-x-auto pb-1" id="practice-results-breadcrumbs">
                <span className="text-[#13264c] font-black cursor-pointer text-base">☰</span>
                <span className="hover:underline cursor-pointer text-[#13264c] font-bold">UET_COM1050</span>
                <span className="text-slate-400">&gt;</span>
                <span className="hover:underline cursor-pointer text-[#13264c] font-bold" onClick={handleExitPractice}>Quizzes</span>
                <span className="text-slate-400">&gt;</span>
                <span className="text-slate-800 font-bold">Kết quả ôn luyện</span>
              </div>

              {/* Title & Info block */}
              <div className="space-y-4" id="uet-quiz-results-header">
                <h1 className="text-[25.5px] sm:text-[27px] font-normal leading-[1.2] text-[#333333] tracking-tight font-sans">
                  Luyện tập chuyên đề: {selectedCategory === "all" ? "Tất cả chủ đề" : selectedCategory}
                </h1>

                {/* Score info box */}
                <div className="bg-[#FAF9F6] border border-[#CBD5E1] p-5.5 rounded-xs space-y-3 text-[13px] font-sans" id="uet-practice-score-box">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-800">Quiz Instructions:</p>
                      <p className="text-slate-600 text-xs leading-relaxed max-w-xl">
                        Bạn đã trả lời xong {practiceQuestions.length} câu hỏi của chuyên đề này. Dưới đây là thống kê chi tiết câu hỏi đã làm và phân tích đáp án chi tiết.
                      </p>
                    </div>
                    {/* Score display block shifted slightly left */}
                    <div className="flex flex-col items-center justify-center p-3.5 bg-white border border-slate-200 rounded-xs min-w-[120px] shadow-xs mr-4">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Score</span>
                      <span className="text-xl sm:text-2xl font-black text-[#13264c] mt-1.5">
                        {correctSum} / {practiceQuestions.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* List of completed Questions (UET detailed answers style block) */}
              <div className="space-y-6 pt-8 border-t border-slate-200" id="uet-practice-detailed-review">
                <div className="flex items-center justify-between border-b-2 border-[#13264c] pb-3 select-none">
                  <h3 className="text-[17px] font-semibold text-[#13264c] font-sans tracking-tight">Chi Tiết Bài Làm</h3>
                  <span className="text-[11px] bg-[#E2E8F0] border border-slate-300 text-slate-800 px-2.5 py-0.5 rounded-sm font-bold font-mono">
                    {correctSum} / {practiceQuestions.length} Đạt Yêu Cầu
                  </span>
                </div>

                <div className="space-y-6">
                  {practiceQuestions.map((q, idx) => {
                    const userAnswerIndex = sessionAnswers[q.id];
                    const isCorrect = userAnswerIndex === q.correctAnswerIndex;
                    const isUnanswered = userAnswerIndex === undefined || userAnswerIndex === -1;

                    return (
                      <div 
                        key={q.id} 
                        className="border border-[#CBD5E1] rounded-xs bg-white overflow-hidden shadow-xs text-left"
                        id={`canvas-practice-review-card-${q.id}`}
                      >
                        {/* Header Row */}
                        <div className="bg-[#f5f5f5] border-b border-[#CBD5E1] px-4.5 py-3.5 flex items-center justify-between font-normal text-slate-500 select-none">
                          <div className="flex items-center gap-2">
                            <span className="font-normal text-slate-500 text-[15.5px] sm:text-[17px]" style={{ fontFamily: "Arial, sans-serif" }}>Question {idx + 1}</span>
                            <span className="bg-slate-100 text-slate-500 px-2 py-0.5 border border-slate-200 rounded-xs text-[10px] font-normal">
                              {q.category}
                            </span>
                          </div>
                          <div className="text-[14px] sm:text-[15px] text-slate-400 font-normal" style={{ fontFamily: "Arial, sans-serif" }}>
                            {isUnanswered ? (
                              <span>0 / 1 pt</span>
                            ) : isCorrect ? (
                              <span className="text-emerald-600">1 / 1 pt</span>
                            ) : (
                              <span className="text-rose-650">0 / 1 pt</span>
                            )}
                          </div>
                        </div>

                        {/* Question Content */}
                        <div className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                          <SmartQuestionText 
                            text={q.questionText}
                            questionId={q.id}
                            isInteractive={false}
                          />

                          {q.codeSnippet && (
                            <JupyterCell 
                              code={q.codeSnippet}
                              cellNumber={String(idx + 1)}
                              isInteractive={false}
                            />
                          )}

                          {/* Options render */}
                          <div className="divide-y divide-slate-100 border-t border-b border-slate-100 mt-4">
                            {getQuestionOptions(q.options).map((option, optIdx) => {
                              const isOptCorrect = optIdx === q.correctAnswerIndex;
                              const isOptSelected = optIdx === userAnswerIndex;

                              return (
                                <div 
                                  key={optIdx} 
                                  className={`flex items-start gap-3 py-2.5 px-2 text-xs sm:text-sm transition-colors duration-150 ${
                                    isOptCorrect 
                                      ? "bg-emerald-50 text-emerald-950 font-semibold" 
                                      : isOptSelected 
                                        ? "bg-rose-50 text-rose-950 font-medium" 
                                        : "text-slate-700"
                                  }`}
                                >
                                  <div className="w-[18px] h-[18px] flex items-center justify-center shrink-0 mt-0.5">
                                    {isOptCorrect ? (
                                      <span className="text-emerald-600 font-black text-sm">✓</span>
                                    ) : isOptSelected ? (
                                      <span className="text-rose-600 font-black text-sm">✗</span>
                                    ) : (
                                      <div className="w-3 h-3 rounded-full border border-slate-300" />
                                    )}
                                  </div>
                                  <span className="leading-relaxed font-sans">
                                    {option.replace(/^[A-H]\.\s*/i, "")}
                                  </span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Explanation block */}
                          <div className="bg-[#FAF9F6] border-l-4 border-amber-500 p-3.5 text-xs text-slate-700 leading-relaxed space-y-1 mt-3 rounded-r-md" id={`explanation-box-${q.id}`}>
                            <p className="font-extrabold uppercase text-[9px] tracking-wider text-amber-850 flex items-center gap-1 select-none">
                              💡 PHÂN TÍCH LỜI GIẢI CHI TIẾT:
                            </p>
                            <p className="font-medium text-slate-800">{q.explanation}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action control buttons row */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-200">
                <button
                  onClick={handleExitPractice}
                  className="bg-[#13264c] hover:bg-[#0c1a36] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded shadow-xs hover:shadow-sm transition cursor-pointer"
                >
                  ◀ Quay lại Luyện Chuyên Đề
                </button>
              </div>
            </div>

            {/* Right sidebar navigation */}
            <div className="w-full md:w-[240px] shrink-0 mt-6 md:mt-11" id="uet-practice-results-right">
              <div className="sticky top-6 p-1 space-y-4 text-left font-sans text-[13px]" id="canvas-practice-details-box">
                <h3 className="font-semibold text-slate-800 text-[14px]">Submissions Info:</h3>
                <div className="border-b border-slate-300 my-1 pb-0.5"></div>
                
                <div className="space-y-0.5 font-sans text-[13px] text-slate-800">
                  <div className="flex justify-between items-center py-2.5 border-b border-slate-200">
                    <span className="font-bold">Total Time:</span>
                    <span className="text-right">
                      {Math.floor(sessionTime / 60)}m {sessionTime % 60}s
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2.5 border-b border-slate-200">
                    <span className="font-bold">Questions:</span>
                    <span className="text-right">
                      {practiceQuestions.length}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2.5 border-b border-slate-200">
                    <span className="font-bold">Correct answers:</span>
                    <span className="text-emerald-700 font-bold">
                      {correctSum}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2.5 border-b border-slate-200">
                    <span className="font-bold">Score:</span>
                    <span className="text-right font-bold text-blue-900">
                      {Math.round((correctSum / practiceQuestions.length) * 100)} %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Normal practice view mode results screen:
      const correctSum = Object.values(sessionAnswerStatus).filter(Boolean).length;
      return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in" id="normal-practice-results">
          {/* Header Dashboard Banner */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row justify-between items-center gap-6 text-left">
            <div className="space-y-3">
              <span className="bg-white/20 text-xs px-3 py-1 rounded-full font-black uppercase tracking-wider backdrop-blur-md">
                KẾT QUẢ LUYỆN CHUYÊN ĐỀ
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">{selectedCategory === "all" ? "Tất cả chủ đề" : selectedCategory}</h2>
              <p className="opacity-90 leading-relaxed text-sm max-w-md font-medium">
                Chúc mừng bạn đã hoàn thành bài luyện tập! Dưới đây là thống kê tiến độ học của bạn.
              </p>
            </div>
            
            {/* Stats Circular Widget */}
            <div className="shrink-0 flex items-center justify-center bg-white/10 border border-white/20 p-5 rounded-2xl backdrop-blur-md text-center min-w-[140px] shadow-lg">
              <div className="space-y-1">
                <span className="text-[10px] text-blue-100 font-bold uppercase tracking-widest block">Correct Rate</span>
                <span className="text-3xl sm:text-4xl font-black block text-amber-300">
                  {Math.round((correctSum / practiceQuestions.length) * 100)}%
                </span>
                <span className="text-xs font-bold block text-blue-100 mt-1">
                  ({correctSum}/{practiceQuestions.length} câu)
                </span>
              </div>
            </div>
          </div>

          {/* List of processed Questions inside cards style */}
          <div className="space-y-6" id="normal-practice-results-details">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <BookOpen size={20} className="text-blue-600 animate-pulse" />
              Chi Tiết Lời Giải Các Câu Hỏi
            </h3>

            <div className="space-y-5">
              {practiceQuestions.map((q, idx) => {
                const userAnswerIndex = sessionAnswers[q.id];
                const isCorrect = userAnswerIndex === q.correctAnswerIndex;
                const isUnanswered = userAnswerIndex === undefined || userAnswerIndex === -1;

                return (
                  <div key={q.id} className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-md text-left space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="bg-slate-100 text-slate-800 font-extrabold text-xs px-3 py-1.5 rounded-xl">
                          Câu {idx + 1}
                        </span>
                        <span className="bg-blue-50 text-blue-800 border border-blue-100 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-lg uppercase">
                          {q.category}
                        </span>
                      </div>
                      <div>
                        {isUnanswered ? (
                          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold font-sans">Chưa trả lời</span>
                        ) : isCorrect ? (
                          <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 font-sans">
                            <Check size={14} strokeWidth={3} className="text-emerald-600" /> Đúng câu này
                          </span>
                        ) : (
                          <span className="bg-rose-50 border border-rose-205 text-rose-800 px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 font-sans">
                            <XCircle size={14} className="text-rose-500" /> Sai câu này
                          </span>
                        )}
                      </div>
                    </div>

                    <SmartQuestionText 
                      text={q.questionText}
                      questionId={q.id}
                      isInteractive={false}
                    />

                    {q.codeSnippet && (
                      <JupyterCell 
                        code={q.codeSnippet}
                        cellNumber=" "
                        isInteractive={false}
                      />
                    )}

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-3">
                      {getQuestionOptions(q.options).map((option, optIdx) => {
                        const isCorrectOption = optIdx === q.correctAnswerIndex;
                        const isSelectedOption = optIdx === userAnswerIndex;

                        let borderStyle = "border-slate-200 hover:bg-slate-50";
                        let bgStyle = "bg-slate-100";
                        if (isCorrectOption) {
                          borderStyle = "border-emerald-400 bg-emerald-50/40";
                          bgStyle = "bg-emerald-500 text-white font-semibold";
                        } else if (isSelectedOption) {
                          borderStyle = "border-rose-400 bg-rose-50/40";
                          bgStyle = "bg-rose-500 text-white font-semibold";
                        }

                        return (
                          <div 
                            key={optIdx}
                            className={`border-2 p-3.5 rounded-2xl flex items-center gap-3 transition ${borderStyle}`}
                          >
                            <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 border ${bgStyle}`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="text-slate-800 text-xs sm:text-sm leading-relaxed">
                              {option.replace(/^[A-H]\.\s*/i, "")}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Solutions Area */}
                    <div className="bg-[#FAF9F6] border-l-4 border-amber-400 rounded-r-2xl p-4 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-1.5 mt-4" id={`practice-normal-ex-${q.id}`}>
                      <p className="font-extrabold text-[#92400E] uppercase text-[10px] tracking-widest flex items-center gap-1">
                        💡 GIẢI THÍCH CHI TIẾT:
                      </p>
                      <p className="text-[#334155] font-medium leading-relaxed font-sans">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Exit / Done control block */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md text-center max-w-md mx-auto space-y-4">
            <h3 className="font-bold text-[#0F172A] text-base">Bạn Muốn Tiến Hành Ôn Luyện Tiếp?</h3>
            <p className="text-slate-500 text-xs sm:text-sm">Hãy quay lại danh sách chuyên đề mẫu hoặc làm thêm các bài tập rèn luyện tư duy tính toán khác.</p>
            <button
              onClick={handleExitPractice}
              className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-3.5 rounded-2xl text-xs sm:text-sm cursor-pointer shadow-sm active:scale-98 transition flex items-center justify-center gap-1.5"
            >
              ◀ Quay lại phòng luyện tập
            </button>
          </div>
        </div>
      );
    }
  }

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

  if (practiceViewMode === "uet") {
    return (
      <div className="w-full min-h-screen bg-white text-[#333333] font-sans antialiased text-[13px] leading-[1.5] p-0 flex flex-row items-stretch animate-fade-in" id="uet-active-practice-view shadow-xs">
        {/* 1. Left Primary Navy Sidebar */}
        <div className="hidden md:flex flex-col items-center w-[84px] bg-[#13264c] text-white py-4 shrink-0 justify-between select-none" id="uet-practice-left-sidebar-nav">
          <div className="w-full flex flex-col items-center space-y-5">
            <div className="flex flex-col items-center cursor-pointer" onClick={handleExitPractice}>
              <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center p-1 border-2 border-blue-400 shadow-md">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#13264c" strokeWidth="8" />
                  <circle cx="50" cy="50" r="30" fill="#13264c" />
                  <polygon points="50,25 35,55 65,55" fill="white" />
                  <circle cx="50" cy="46" r="5" fill="#13264c" />
                </svg>
              </div>
              <span className="text-[7px] text-center font-extrabold tracking-wide uppercase mt-1.5 text-blue-100/90 leading-tight">UET Portal</span>
            </div>
            
            <div className="w-full flex flex-col items-center space-y-4">
              <div className="flex flex-col items-center text-blue-200/70 py-1.5 w-full">
                <div className="w-7 h-7 rounded-full border border-blue-200/50 flex items-center justify-center mb-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-[10px] text-center font-medium">Account</span>
              </div>
              
              <div className="flex flex-col items-center text-blue-200/70 py-1.5 w-full">
                <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                </svg>
                <span className="text-[10px] text-center font-medium">Dashboard</span>
              </div>

              <div className="flex flex-col items-center bg-white text-[#13264c] py-2.5 w-full border-l-4 border-amber-500">
                <svg className="w-6 h-6 mb-1 text-[#13264c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.246.477 5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.246.477-5 1.253" />
                </svg>
                <span className="text-[10px] text-center font-bold">Courses</span>
              </div>
            </div>
          </div>
          <div className="text-blue-300 py-2 cursor-pointer hover:text-white" onClick={handleExitPractice}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </div>
        </div>

        {/* 2. Left Secondary White Sidebar */}
        <div className="hidden lg:flex flex-col w-[210px] bg-white border-r border-[#E2E8F0] py-6 px-4 shrink-0 select-none text-[13px] text-left">
          <span className="text-[11px] font-bold text-slate-500 mb-4 tracking-tight truncate filter brightness-75">Học kỳ II năm học 2025 - 2026</span>
          <div className="flex flex-col space-y-3.5 font-normal text-slate-600">
            <span className="hover:text-blue-600 cursor-pointer">Announcements</span>
            <span className="hover:text-blue-600 cursor-pointer">Assignments</span>
            <span className="hover:text-blue-600 cursor-pointer">Discussions</span>
            <span className="hover:text-blue-600 cursor-pointer text-[#0e2240] font-bold border-l-2 border-[#0e2240] pl-2">Quizzes - Ôn luyện</span>
            <span className="hover:text-blue-600 cursor-pointer">Modules</span>
          </div>
        </div>

        {/* 3. Central practice card and question details */}
        <div className="flex-1 flex flex-col md:flex-row bg-slate-50 p-4 sm:p-5 overflow-y-auto">
          <div className="flex-1 space-y-6 md:pr-5 text-left">
            {/* Breadcrumbs block */}
            <div className="flex items-center space-x-2 text-[13.5px] text-slate-600 font-medium whitespace-nowrap overflow-x-auto pb-1" id="practice-breadcrumbs">
              <span className="text-[#13264c] font-black cursor-pointer text-base">☰</span>
              <span className="hover:underline cursor-pointer text-[#13264c] font-bold">UET_COM1050</span>
              <span className="text-slate-400">&gt;</span>
              <span className="hover:underline cursor-pointer text-[#13264c] font-bold" onClick={handleExitPractice}>Quizzes</span>
              <span className="text-slate-400">&gt;</span>
              <span className="text-slate-800 font-bold">Luyện tập: {selectedCategory === "all" ? "Tất cả chủ đề" : selectedCategory}</span>
            </div>

            {/* Main Question view of currentQuestion */}
            <div className="relative flex items-start gap-2 select-none w-full animate-fade-in" id="uet-practice-question-stack-wrapper">
              {/* Floating Left Bookmark/Flag button to match Canvas LMS exactly (always visible) */}
              <div className="flex flex-col items-center shrink-0 pt-3 pr-1">
                <button 
                  onClick={() => onToggleBookmark?.(currentQuestion.id)}
                  className="focus:outline-hidden transition active:scale-95 duration-150"
                  title="Đánh dấu câu hỏi"
                >
                  <svg 
                    className={`w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] transition-colors duration-150 ${
                      bookmarkedIds.includes(currentQuestion.id) 
                        ? "text-[#b28315] fill-[#b28315]" 
                        : "text-[#7e929f] fill-none hover:text-slate-500"
                    }`} 
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6h10l6 6l-6 6H4Z" />
                  </svg>
                </button>
              </div>

              {/* The actual question card */}
              <div className="flex-1 border border-slate-350 rounded-xs shadow-xs overflow-hidden bg-white text-left focus-within:ring-2 focus-within:ring-blue-100/50">
                {/* Question card header */}
                <div className="bg-[#f5f5f5] border-b border-slate-300 px-4 py-3.5 flex justify-between items-center text-[15.5px] text-slate-500 select-none">
                  <span className="font-normal text-slate-500 text-[15.5px] sm:text-[17px]" style={{ fontFamily: "Arial, sans-serif" }}>Question {currentIndex + 1}</span>
                  <span className="text-slate-400 font-normal text-[14px] sm:text-[15px]" style={{ fontFamily: "Arial, sans-serif" }}>1 pt</span>
                </div>

                {/* Question card body */}
                <div className="p-4 sm:p-5 space-y-4">
                  <div className="text-[14px] font-sans antialiased text-[#2d3748] font-normal leading-relaxed">
                    <SmartQuestionText 
                      text={currentQuestion.questionText}
                      questionId={currentQuestion.id}
                      isInteractive={true}
                      output={currentQuestion.options[currentQuestion.correctAnswerIndex]?.replace(/^[A-D]\.\s*/, "")}
                      showOutputByDefault={hasSubmitted}
                    />
                  </div>

                  {currentQuestion.codeSnippet && (
                    <div className="py-1">
                      <JupyterCell 
                        code={currentQuestion.codeSnippet} 
                        cellNumber={currentQuestion.id} 
                        isInteractive={true}
                        output={currentQuestion.options[currentQuestion.correctAnswerIndex]?.replace(/^[A-D]\.\s*/, "")}
                        showOutputByDefault={hasSubmitted}
                      />
                    </div>
                  )}

                  {/* Options block under UET Mode - divided table layout with custom radio dots */}
                  <div className="divide-y divide-slate-200 border-t border-b border-slate-200 mt-4" id={`options-stack-${currentQuestion.id}`}>
                    {getQuestionOptions(currentQuestion.options).map((opt, idx) => {
                      const isSelected = selectedOptIndex === idx;
                      const isCorrect = idx === currentQuestion.correctAnswerIndex;
                      const cleanOptText = opt.replace(/^[A-H]\.\s*/i, "");

                      let labelBg = "hover:bg-slate-50/50";
                      let radioIndicator = null;

                      if (hasSubmitted) {
                        if (isCorrect) {
                          labelBg = "bg-emerald-50 text-emerald-950 font-medium";
                          radioIndicator = (
                            <div className="w-[18px] h-[18px] flex items-center justify-center shrink-0">
                              <span className="text-emerald-700 font-extrabold text-sm">✓</span>
                            </div>
                          );
                        } else if (isSelected) {
                          labelBg = "bg-rose-50 text-rose-950 font-medium";
                          radioIndicator = (
                            <div className="w-[18px] h-[18px] flex items-center justify-center shrink-0">
                              <span className="text-rose-700 font-extrabold text-sm">✗</span>
                            </div>
                          );
                        } else {
                          labelBg = "opacity-60";
                          radioIndicator = (
                            <div className="w-3 h-3 rounded-full border border-slate-300 bg-white shrink-0" />
                          );
                        }
                      } else {
                        radioIndicator = isSelected ? (
                          <div className="w-3 h-3 rounded-full border border-[#13264c] bg-white flex items-center justify-center shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#13264c]" />
                          </div>
                        ) : (
                          <div className="w-3 h-3 rounded-full border border-slate-400 bg-white shrink-0 hover:border-slate-600" />
                        );
                      }

                      return (
                        <label 
                          key={idx}
                          onClick={() => handleOptionSelect(idx)}
                          className={`flex items-center gap-2.5 py-3 px-2 border-b border-slate-100 last:border-none cursor-pointer transition select-none text-[12.5px] font-normal w-full ${labelBg}`}
                        >
                          <input 
                            type="radio"
                            name={`uet-practice-q-${currentQuestion.id}`}
                            checked={isSelected}
                            readOnly
                            className="sr-only"
                          />
                          {radioIndicator}
                          <span className="leading-relaxed text-slate-700 font-normal">{cleanOptText}</span>
                        </label>
                      );
                    })}
                  </div>

                  {/* Question results / AI explains inside Card */}
                  {hasSubmitted && (
                    <div className="space-y-4 pt-4 border-t border-slate-200">
                      {/* Immediate correct/wrong verification block */}
                      {selectedOptIndex === currentQuestion.correctAnswerIndex ? (
                        <div className="bg-emerald-50 border-l-4 border-emerald-550 p-3 rounded-xs flex items-center gap-2 select-none animate-fade-in font-sans">
                          <CheckCircle2 className="text-emerald-700 shrink-0" size={18} strokeWidth={2.5} />
                          <span className="text-emerald-950 font-bold text-[13px]">BÀI LÀM CHÍNH XÁC! Bạn đã chọn đáp án đúng (+1 pt)</span>
                        </div>
                      ) : (
                        <div className="bg-rose-50 border-l-4 border-rose-550 p-3 rounded-xs flex items-center gap-2 select-none animate-fade-in font-sans">
                          <XCircle className="text-rose-700 shrink-0" size={18} strokeWidth={2.5} />
                          <span className="text-rose-950 font-bold text-[13px]">BÀI LÀM CHƯA ĐÚNG! Bạn chọn đáp án sai (0 pt)</span>
                        </div>
                      )}

                      <div className="bg-[#FAF9F6] border-l-4 border-amber-500 p-4 rounded-r-md text-xs sm:text-sm text-slate-700 leading-relaxed shadow-inner">
                        <p className="font-extrabold text-amber-950 uppercase tracking-wider text-[10px] mb-1 flex items-center gap-1">
                          💡 PHÂN TÍCH LỜI GIẢI CHI TIẾT:
                        </p>
                        <p className="font-medium text-slate-800">{currentQuestion.explanation}</p>
                      </div>

                      {(aiExplanation || isAiLoading || aiError) && (
                        <div className="bg-purple-50/50 border border-purple-200 p-4 sm:p-5 rounded-lg space-y-3 shadow-xs text-xs sm:text-sm text-slate-800 leading-relaxed">
                          <div className="flex items-center justify-between border-b border-purple-200/50 pb-2">
                            <span className="text-purple-950 font-bold flex items-center gap-1">
                              <Sparkles size={14} className="text-purple-600 animate-pulse" /> AI Giải Thích Chi Tiết
                            </span>
                          </div>
                          {isAiLoading && (
                            <div className="py-4 flex flex-col items-center justify-center gap-2">
                              <RefreshCw className="animate-spin text-purple-600" size={24} />
                              <p className="text-xs font-bold text-slate-700">Đang nhờ AI của UET phân tích câu hỏi...</p>
                            </div>
                          )}
                          {aiError && <p className="text-xs text-red-600 font-bold">{aiError}</p>}
                          {aiExplanation && (
                            <div className="text-xs sm:text-sm leading-relaxed text-slate-800 space-y-2 prose prose-sm font-medium">
                              {renderFormattedExplanation(aiExplanation)}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Trigger Button Panel */}
            <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5">
              {currentIndex > 0 && (
                <button
                  onClick={handlePrevQuestion}
                  className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-4 py-2 rounded text-xs sm:text-sm transition cursor-pointer"
                >
                  ◀ Câu trước
                </button>
              )}

              {!hasSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOptIndex === null}
                  className={`font-bold px-5 py-2 rounded text-xs sm:text-sm shadow-xs active:scale-95 transition cursor-pointer ${
                    selectedOptIndex === null 
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed border-none" 
                      : "bg-[#13264c] hover:bg-[#0c1a36] text-white"
                  }`}
                >
                  Kiểm tra đáp án
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="bg-[#13264c] hover:bg-[#0c1a36] text-white font-bold px-5 py-2 rounded text-xs sm:text-sm shadow-xs transition cursor-pointer"
                >
                  {currentIndex < practiceQuestions.length - 1 ? "Câu tiếp theo" : "Hoàn thành Luyện tập"}
                </button>
              )}

              {hasSubmitted && (
                <button
                  onClick={handleAskAI}
                  disabled={isAiLoading}
                  className={`font-bold px-4 py-2 rounded text-xs sm:text-sm transition flex items-center justify-center gap-2 border cursor-pointer active:scale-95 ${
                    isAiLoading 
                      ? "bg-purple-50 text-purple-600 border-purple-200 cursor-not-allowed" 
                      : "bg-white text-purple-700 border-purple-200 hover:bg-purple-50"
                  }`}
                >
                  <Sparkles size={14} className={isAiLoading ? "animate-spin" : ""} />
                  {isAiLoading ? "Sinh viên đang chờ AI giải tích..." : "Nhờ AI giải nghĩa"}
                </button>
              )}

              <button
                onClick={handleExitPractice}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-4 py-2 rounded text-xs sm:text-sm transition cursor-pointer ml-auto"
              >
                Thoát luyện tập
              </button>
            </div>
          </div>

          {/* Right Portal Sidebar Navigation to match phỏng thi thử exactly */}
          <div className="w-full md:w-[240px] shrink-0 mt-6 md:mt-11" id="uet-practice-right-panel">
            <div className="sticky top-6 p-1 space-y-4 bg-white text-left font-sans text-[13px]" id="uet-practice-timer-sidebar">
              <h3 className="text-2xl font-semibold text-[#2d3a4b] tracking-normal mb-1.5 opacity-90 select-none">Questions</h3>
              
              {/* Question list linking structure matching the exam rehearsal style exactly layout */}
              <div className="grid grid-cols-1 gap-1.5 max-h-[300px] overflow-y-auto pr-1">
                {practiceQuestions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = sessionAnswerStatus[q.id] !== undefined;
                  const isQFlagged = bookmarkedIds.includes(q.id);
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        const targetQId = practiceQuestions[idx].id;
                        if (sessionAnswers[targetQId] !== undefined) {
                          setSelectedOptIndex(sessionAnswers[targetQId]);
                          setHasSubmitted(true);
                        } else {
                          setSelectedOptIndex(null);
                          setHasSubmitted(isReviewMode);
                        }
                        setAiExplanation("");
                        setAiError("");
                        setIsAiLoading(false);
                      }}
                      className={`flex items-center gap-1.5 hover:bg-slate-50/80 p-0.5 rounded transition w-full text-left cursor-pointer ${
                        isCurrent ? "bg-slate-100/70" : ""
                      }`}
                    >
                      {/* Left Flag Space */}
                      <div className="w-[14px] flex items-center justify-center shrink-0">
                        {isQFlagged && (
                          <svg 
                            className="w-3.5 h-3.5 text-[#b28315] fill-[#b28315]" 
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M4 6h10l6 6l-6 6H4Z" />
                          </svg>
                        )}
                      </div>

                      {/* Status Indicator (Checkmark or Question Circle) */}
                      <div className="shrink-0 flex items-center justify-center">
                        {isAnswered ? (
                          <svg 
                            viewBox="0 0 24 24" 
                            className="w-[16px] h-[16px] text-[#718096] stroke-[2.5]" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg 
                            viewBox="0 0 24 24" 
                            className="w-[16px] h-[16px] text-[#718096]" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>

                      {/* Link Name */}
                      <span className="text-[#005A9C] font-semibold text-[13.5px] hover:underline">
                        Question {idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Live practice timer styled inline */}
              <div className="border-t border-slate-100 pt-4 flex flex-col space-y-2">
                <div className="flex items-center gap-2 text-[15px] select-none">
                  <span className="text-[#333333] font-normal">Time Running:</span>
                  <button 
                    onClick={() => setShowPracticeTimer(!showPracticeTimer)}
                    className="border border-[#cccccc] px-3.5 py-1.5 bg-[#f5f5f5] hover:bg-[#e8e8e8] text-[#333333] font-medium text-[13px] rounded-xs shadow-xs cursor-pointer select-none transition duration-150"
                  >
                    {showPracticeTimer ? "Hide Time" : "Show Time"}
                  </button>
                </div>
                {showPracticeTimer && (
                  <span className="text-sm font-semibold text-slate-800 tracking-wider pl-1 animate-fade-in block">
                    {Math.floor(sessionTime / 60)} Minutes, {sessionTime % 60} Seconds
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="max-w-4xl mx-auto space-y-6" id="active-practice-area">
        {/* Quiz Progress & Back button bar */}
      <div className="flex items-center justify-between gap-4" id="practice-header">
        <button 
          onClick={handleExitPractice}
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
        {/* Category sticker and Horse bookmark toggle */}
        <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="bg-[#DBEAFE] text-[#1E40AF] text-xs font-bold px-3 py-1 rounded-md border border-[#DBEAFE]/40">
              {currentQuestion.category}
            </span>
            <button
              onClick={() => {
                if (!bookmarkedIds.includes(currentQuestion.id) && !hasSubmitted) {
                  setToastMessage("Bạn rồ chưa trả lời câu hỏi này! Hãy hoàn thành trả lời trước mới được phép đánh dấu.");
                  return;
                }
                onToggleBookmark?.(currentQuestion.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border transition duration-150 cursor-pointer ${
                bookmarkedIds.includes(currentQuestion.id)
                  ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 animate-pulse"
                  : "border-slate-200 bg-[#F8FAFC] text-slate-600 hover:bg-slate-100"
              }`}
              title="Đánh dấu câu hỏi hình con ngựa"
              id={`btn-bookmark-horse-active-${currentQuestion.id}`}
            >
              <Horse className={bookmarkedIds.includes(currentQuestion.id) ? "text-amber-500 fill-amber-500" : "text-slate-400"} size={14} />
              {bookmarkedIds.includes(currentQuestion.id) ? "Đã đánh dấu 🐴" : "Đánh dấu ngựa"}
            </button>
          </div>
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
                <div className="flex-1 leading-relaxed font-semibold">{option.replace(/^[A-H]\.\s*/i, "")}</div>
                {hasSubmitted && isCorrect && <CheckCircle2 className="text-[#10B981] flex-shrink-0" size={22} />}
                {hasSubmitted && isSelected && !isCorrect && <XCircle className="text-[#EF4444] flex-shrink-0" size={22} />}
              </div>
            );
          })}
        </div>

        {/* Submission buttons */}
        <div className="flex flex-wrap gap-4 items-center justify-between pt-5 border-t border-[#E2E8F0]" id="submission-controls">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {currentIndex > 0 && (
              <button
                onClick={handlePrevQuestion}
                className="bg-white hover:bg-slate-50 text-slate-705 border border-slate-300 px-5 py-3 rounded-xl text-sm font-bold transition cursor-pointer flex items-center gap-1.5 active:scale-95"
                id="btn-prev-question"
              >
                <ArrowLeft size={16} /> Câu trước
              </button>
            )}

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
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#F59E0B] text-white py-3.5 px-6 rounded-2xl shadow-xl flex items-center gap-3 border border-[#D97706] animate-bounce font-bold text-xs sm:text-sm">
          <AlertCircle size={20} className="shrink-0 text-white animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
