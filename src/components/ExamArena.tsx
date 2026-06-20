/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  Trophy, Timer, ShieldCheck, CheckCircle2, XCircle, 
  ChevronLeft, ChevronRight, BarChart4, AlertCircle, RotateCcw,
  BookOpen, FileText, Sparkles, GraduationCap, Clock
} from "lucide-react";
import { Question, QuizAttempt } from "../types";
import { presetExamsList, PresetExam } from "../data/reviewExams";
import JupyterCell, { SmartQuestionText, getQuestionOptions } from "./JupyterCell";

interface ExamArenaProps {
  questions: Question[];
  onSaveAttempt: (attempt: QuizAttempt) => void;
  onExamStatusChange?: (running: boolean) => void;
  onToggleBookmark?: (questionId: number) => void;
  bookmarkedIds?: number[];
  initialReviewAttempt?: QuizAttempt | null;
  onCloseReview?: () => void;
  setIsUetModeActive?: (active: boolean) => void;
}

export default function ExamArena({ 
  questions, 
  onSaveAttempt, 
  onExamStatusChange,
  onToggleBookmark,
  bookmarkedIds = [],
  initialReviewAttempt = null,
  onCloseReview,
  setIsUetModeActive
}: ExamArenaProps) {
  const [examStatus, setExamStatus] = useState<"setup" | "running" | "ended">("setup");
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  
  // Running state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // questionId -> selectedIndex
  const [timeLeft, setTimeLeft] = useState<number>(0); // seconds
  const [initialTimeLimit, setInitialTimeLimit] = useState<number>(60 * 60); // default 60 mins
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);
  const [showExitWarning, setShowExitWarning] = useState<boolean>(false);
  const [examViewMode, setExamViewMode] = useState<"normal" | "uet">("normal");
  const [showTimer, setShowTimer] = useState<boolean>(true);
  const [pendingExamConfig, setPendingExamConfig] = useState<{
    type: "random" | "preset";
    count?: number;
    minutes?: number;
    preset?: PresetExam;
  } | null>(null);

  const [examStartTime, setExamStartTime] = useState<string>("");

  const formatExamTime = (date: Date) => {
    const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
    // Let's index correctly: date.getMonth() goes 0 to 11
    const realMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = realMonths[date.getMonth()];
    const day = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${month} ${day} at ${hours}:${minutes}${ampm}`;
  };

  // Monitor UET mode to notify parent
  useEffect(() => {
    if ((examStatus === "running" || examStatus === "ended") && examViewMode === "uet") {
      setIsUetModeActive?.(true);
    } else {
      setIsUetModeActive?.(false);
    }
    return () => {
      setIsUetModeActive?.(false);
    };
  }, [examStatus, examViewMode, setIsUetModeActive]);

  // Initialize with initialReviewAttempt for history review feature
  useEffect(() => {
    if (initialReviewAttempt) {
      // Resolve questions
      const resolvedQuestions = initialReviewAttempt.answers.map(ans => {
        const found = questions.find(q => q.id === ans.questionId);
        if (found) return found;
        
        // search inside presets
        const allPossible = [...questions];
        presetExamsList.forEach(p => {
          p.questions.forEach(q => {
            if (!allPossible.some(item => item.id === q.id)) {
              allPossible.push(q);
            }
          });
        });
        return allPossible.find(item => item.id === ans.questionId) || {
          id: ans.questionId,
          category: "Tổng hợp các câu hỏi Python phần 1" as any,
          questionText: "Câu hỏi không tìm thấy trong hệ thống",
          options: ["A", "B", "C", "D"],
          correctAnswerIndex: 0,
          explanation: "Không tìm thấy lời giải cho câu hỏi bị ẩn này."
        };
      });

      const answersRecord: Record<number, number> = {};
      initialReviewAttempt.answers.forEach(ans => {
        answersRecord[ans.questionId] = ans.userAnswerIndex;
      });

      setExamQuestions(resolvedQuestions);
      setAnswers(answersRecord);
      setExamViewMode(initialReviewAttempt.viewMode || "normal");
      setSelectedPresetId(null);
      setExamStatus("ended");
    }
  }, [initialReviewAttempt, questions]);

  // Notify parent on status change
  useEffect(() => {
    if (onExamStatusChange) {
      onExamStatusChange(examStatus === "running");
    }
  }, [examStatus, onExamStatusChange]);

  // Load saved exam state on mount
  useEffect(() => {
    const savedActiveExam = localStorage.getItem("uet_ct_active_exam");
    if (savedActiveExam) {
      try {
        const parsed = JSON.parse(savedActiveExam);
        if (parsed && parsed.examQuestions && parsed.examQuestions.length > 0) {
          setExamQuestions(parsed.examQuestions);
          setCurrentIndex(parsed.currentIndex || 0);
          setAnswers(parsed.answers || {});
          setTimeLeft(parsed.timeLeft || 0);
          setInitialTimeLimit(parsed.initialTimeLimit || 3600);
          setFlaggedQuestions(parsed.flaggedQuestions || {});
          setSelectedPresetId(parsed.selectedPresetId || null);
          setExamViewMode(parsed.examViewMode || "normal");
          setExamStartTime(parsed.examStartTime || "");
          setExamStatus("running");
        }
      } catch (e) {
        console.error("Error restoring active exam", e);
      }
    }
  }, []);

  // Save active exam state to localStorage
  useEffect(() => {
    if (examStatus === "running" && examQuestions.length > 0) {
      const activeExamState = {
        examQuestions,
        currentIndex,
        answers,
        timeLeft,
        initialTimeLimit,
        flaggedQuestions,
        selectedPresetId,
        examViewMode,
        examStartTime
      };
      localStorage.setItem("uet_ct_active_exam", JSON.stringify(activeExamState));
    } else if (examStatus === "ended" || examStatus === "setup") {
      localStorage.removeItem("uet_ct_active_exam");
    }
  }, [examStatus, examQuestions, currentIndex, answers, timeLeft, initialTimeLimit, flaggedQuestions, selectedPresetId, examViewMode, examStartTime]);

  // History tracking timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Setup options
  const [questionsCountLimit, setQuestionsCountLimit] = useState<number>(50);

  const executeStartExam = (count: number, minutes: number, viewMode: "normal" | "uet") => {
    // Select random questions across all categories
    const selected = [...questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);

    setSelectedPresetId(null);
    setExamQuestions(selected);
    setCurrentIndex(0);
    setAnswers({});
    setFlaggedQuestions({});
    setInitialTimeLimit(minutes * 60);
    setTimeLeft(minutes * 60);
    setExamViewMode(viewMode);
    
    // Set started timestamp
    const date = new Date();
    setExamStartTime(formatExamTime(date));

    setExamStatus("running");
    setPendingExamConfig(null);
  };

  const executeStartPresetExam = (preset: PresetExam, viewMode: "normal" | "uet") => {
    setSelectedPresetId(preset.id);
    setExamQuestions([...preset.questions]);
    setCurrentIndex(0);
    setAnswers({});
    setFlaggedQuestions({});
    setInitialTimeLimit(preset.timeLimitMinutes * 60);
    setTimeLeft(preset.timeLimitMinutes * 60);
    setExamViewMode(viewMode);
    
    // Set started timestamp
    const date = new Date();
    setExamStartTime(formatExamTime(date));

    setExamStatus("running");
    setPendingExamConfig(null);
  };

  // Start customizable raw mock exam
  const handleStartExam = (count?: number, minutes?: number) => {
    const finalCount = count || questionsCountLimit;
    const finalMinutes = minutes || (initialTimeLimit / 60);
    setPendingExamConfig({
      type: "random",
      count: finalCount,
      minutes: finalMinutes
    });
  };

  // Start specific preset examination from database
  const handleStartPresetExam = (preset: PresetExam) => {
    setPendingExamConfig({
      type: "preset",
      preset
    });
  };

  // Retake current exam configuration
  const handleRestart = () => {
    if (selectedPresetId) {
      const preset = presetExamsList.find(p => p.id === selectedPresetId);
      if (preset) {
        handleStartPresetExam(preset);
        return;
      }
    }
    handleStartExam(examQuestions.length, initialTimeLimit / 60);
  };

  // Timer runner
  useEffect(() => {
    if (examStatus === "running") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleEndExam(true); // force auto-submit
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examStatus]);

  // Submit/End Exam
  const handleEndExam = (autoSubmit = false) => {
    // Note: React state is captured in the callback, but to handle direct triggers we can use the state values cleanly
    if (timerRef.current) clearInterval(timerRef.current);

    // Compute stats
    let correctCount = 0;
    const records = examQuestions.map((q) => {
      const userAnswerIndex = answers[q.id];
      const isCorrect = userAnswerIndex === q.correctAnswerIndex;
      if (isCorrect) correctCount++;
      
      return {
        questionId: q.id,
        userAnswerIndex: userAnswerIndex === undefined ? -1 : userAnswerIndex,
        isCorrect
      };
    });

    // Create attempt payload
    const attempt: QuizAttempt = {
      id: "attempt_" + Date.now(),
      timestamp: Date.now(),
      score: correctCount,
      totalQuestions: examQuestions.length,
      timeSpentSeconds: initialTimeLimit - timeLeft,
      timeLimitSeconds: initialTimeLimit,
      isCustomPractice: false,
      viewMode: examViewMode,
      categoryName: selectedPresetId 
        ? presetExamsList.find(p => p.id === selectedPresetId)?.title 
        : `Thi Thử (${examQuestions.length} câu / ${Math.round(initialTimeLimit / 60)} phút)`,
      answers: records
    };

    onSaveAttempt(attempt);
    setExamStatus("ended");
  };

  const handleOptionSelect = (questionId: number, optionIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const toggleFlag = (questionId: number) => {
    const isNowFlagged = !flaggedQuestions[questionId];
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: isNowFlagged
    }));

    if (isNowFlagged && onToggleBookmark && bookmarkedIds) {
      if (!bookmarkedIds.includes(questionId)) {
        onToggleBookmark(questionId);
      }
    }
  };

  // Formatter for time display
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // --- SELECT INTERFACE MODAL ---
  if (pendingExamConfig) {
    return (
      <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in" id="exam-interface-selector">
        <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative">
          <button 
            onClick={() => setPendingExamConfig(null)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition duration-150 cursor-pointer text-xs font-bold"
          >
            ❌ Đóng
          </button>

          <div className="text-center space-y-2">
            <span className="bg-blue-100 text-blue-800 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
              <Sparkles size={12} /> TRẢI NGHIỆM CHÂN THỰC
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Lựa Chọn Giao Diện Vào Thi
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto">
              Hãy chọn giao diện làm bài thi thử phù hợp nhất với mong muốn và cảm quan của bạn:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* OPTION 1: Normal Interface */}
            <div 
              onClick={() => {
                const config = pendingExamConfig;
                if (config.type === "random") {
                  executeStartExam(config.count!, config.minutes!, "normal");
                } else {
                  executeStartPresetExam(config.preset!, "normal");
                }
              }}
              className="bg-slate-50 border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50/10 p-5 rounded-2xl cursor-pointer transition duration-155 group flex flex-col justify-between text-left"
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
                    Thiết kế bento trực quan, hiện đại, màu sắc dễ thương và chữ to rõ ràng. Thích hợp cho học tập dài hạn.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center justify-end text-xs font-bold text-blue-600">
                Làm bài ngay →
              </div>
            </div>

            {/* OPTION 2: UET Portal Interface */}
            <div 
              onClick={() => {
                const config = pendingExamConfig;
                if (config.type === "random") {
                  executeStartExam(config.count!, config.minutes!, "uet");
                } else {
                  executeStartPresetExam(config.preset!, "uet");
                }
              }}
              className="bg-white border-2 border-slate-200 hover:border-[#13264c] hover:bg-[#13264c]/5 p-5 rounded-2xl cursor-pointer transition duration-155 group flex flex-col justify-between text-left"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#13264c]/10 text-[#13264c] flex items-center justify-center text-lg font-bold">
                  🏫
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-950 text-sm sm:text-base group-hover:text-[#13264c] transition">
                    Giao diện Cổng thi UET (100% thật)
                  </h3>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Mô phỏng 100% giao diện thi trắc nghiệm trên Canvas của Trường Đại học Công nghệ. Đầy đủ menu, sidebar và sơ đồ câu hỏi.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center justify-end text-xs font-bold text-[#13264c]">
                Vào phòng thi thử →
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDERING SETUP VIEW ---
  if (examStatus === "setup") {
    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in" id="exam-lobby-screen">
        
        {/* Main Banner Heading */}
        <div className="bg-gradient-to-r from-[#1E293B] to-[#0F172A] rounded-3xl p-8 sm:p-12 text-white shadow-lg relative overflow-hidden" id="exam-lobby-banner">
          <div className="absolute right-0 bottom-0 top-0 opacity-10 pointer-events-none select-none flex items-center pr-12">
            <Trophy size={200} className="text-white" />
          </div>
          <div className="space-y-4 max-w-2xl relative z-10">
            <span className="bg-[#3B82F6]/20 border border-[#3B82F6]/30 text-[#60A5FA] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
              <GraduationCap size={14} /> Cổng Phòng Thi Thử UET
            </span>
            <h1 className="text-3xl sm:text-4xl text-white font-extrabold tracking-tight">
              Phòng Luyện Thi & Kiểm Tra Lập Trình Python
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Môi trường giả lập phòng thi chính thức của Trường Đại học Công nghệ (VNU-UET). Hỗ trợ làm bài thi thử ngẫu nhiên từ kho dữ liệu hoặc làm các đề kiểm tra lưu trữ chính thức của bộ môn.
            </p>
          </div>
        </div>

        {/* Highlighted core action: 50 Questions in 60 Minutes */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6" id="final-exam-express-card">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="bg-amber-200 text-amber-800 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Vượt Ải Cuối Kỳ
              </span>
              <span className="text-amber-600 font-bold text-xs flex items-center gap-1">
                <Sparkles size={13} /> Chế độ kiểm tra tiêu chuẩn
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Bài kiểm tra cuối kỳ: 50 câu / 60 phút
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Hệ thống sẽ lấy ngẫu nhiên <strong>50 câu hỏi</strong> thuộc đầy đủ 5 phân nhánh học phổ quét toàn khóa và hẹn giờ chính xác <strong>60 phút</strong> để bạn tự đánh giá năng lực tích lũy thực tế.
            </p>
          </div>
          <button
            onClick={() => handleStartExam(50, 60)}
            className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-white font-black px-6 py-4 rounded-2xl transition shadow-[0_4px_12px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            id="btn-trigger-final-60"
          >
            <Clock size={20} /> Bắt đầu kiểm tra (60 phút)
          </button>
        </div>

        {/* Grid divisions */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Column: Repository of Preset Exams */}
          <div className="lg:col-span-3 space-y-5" id="preset-exams-repository">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="text-[#3B82F6]" size={20} /> Kho Đề Ôn Tập Bộ Môn
              </h3>
              <span className="text-xs text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-md">
                {presetExamsList.length} đề thi
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {presetExamsList.map((preset) => (
                <div 
                  key={preset.id}
                  className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:border-[#3B82F6] hover:shadow-md transition-all flex flex-col justify-between gap-4"
                  id={`preset-exam-card-${preset.id}`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="bg-[#EFF6FF] text-[#1E40AF] text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider border border-[#DBEAFE]/60">
                        Đề kiểm tra lưu trữ
                      </span>
                      <span className="text-slate-500 text-xs font-bold flex items-center gap-1">
                        <Timer size={14} /> {preset.timeLimitMinutes} phút
                      </span>
                    </div>
                    <h4 className="text-base font-extrabold text-slate-950 leading-tight">
                      {preset.title}
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {preset.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-bold">
                      Quy mô: <strong className="text-slate-800">{preset.questions.length} câu hỏi</strong>
                    </span>
                    <button
                      onClick={() => handleStartPresetExam(preset)}
                      className="bg-[#EFF6FF] hover:bg-[#3B82F6] hover:text-white text-[#2563EB] font-black text-xs px-4 py-2 rounded-xl transition cursor-pointer"
                    >
                      Bắt đầu đề này
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Custom mock exam simulator configuration */}
          <div className="lg:col-span-2 space-y-5" id="custom-exam-simulator">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <FileText className="text-[#3B82F6]" size={20} /> Giả Lập Thi Thử Tự Do
            </h3>

            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 space-y-6 shadow-sm">
              {/* Duration configurator */}
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Clock size={14} className="text-slate-400" /> Thời lượng thi tự thiết lập
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[15, 30, 60, 90].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setInitialTimeLimit(mins * 60)}
                      className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer active:scale-95 border-2 ${
                        initialTimeLimit === mins * 60
                          ? "bg-[#3B82F6] text-white border-[#3B82F6]"
                          : "bg-white text-slate-800 border-slate-100 hover:border-slate-300"
                      }`}
                    >
                      {mins}'
                    </button>
                  ))}
                </div>
              </div>

              {/* Questions count configurator */}
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <FileText size={14} className="text-slate-400" /> Quy mô số lượng câu hỏi
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[10, 20, 30, 50].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setQuestionsCountLimit(count)}
                      className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer active:scale-95 border-2 ${
                        questionsCountLimit === count
                          ? "bg-[#3B82F6] text-white border-[#3B82F6]"
                          : "bg-white text-slate-800 border-slate-100 hover:border-slate-300"
                      }`}
                    >
                      {count} câu
                    </button>
                  ))}
                </div>
              </div>

              {/* Advisory Regulations */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-[11px] leading-relaxed text-slate-600">
                <p className="font-extrabold text-slate-800 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                  <ShieldCheck size={14} className="text-emerald-500" /> Thông tin hữu ích
                </p>
                <p>Hệ thống tự nộp bài khi hết giờ và tính toán điểm số thang 10. Hãy sẵn sàng giấy bút nháp đoạn mã Python.</p>
              </div>

              {/* Quick start custom exam button */}
              <button
                onClick={() => handleStartExam()}
                className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-black py-3.5 rounded-2xl transition shadow-[0_4px_12px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                id="btn-confirm-start-custom"
              >
                Vào Thi Ngẫu Nhiên
              </button>
            </div>
          </div>

        </div>

      </div>
    );
  }

  // --- RENDERING RUNNING EXAM VIEW ---
  if (examStatus === "running") {
    if (examViewMode === "uet") {
      return (
        <div className="w-full min-h-screen bg-white text-[#333333] font-sans antialiased text-[13px] leading-[1.5] p-0 flex flex-row items-stretch animate-fade-in" id="uet-quiz-simulator-mode">
          
          {/* 1. Left Primary Dark Navy Sidebar (Canvas LMS Menu) */}
          <div className="hidden md:flex flex-col items-center w-[84px] bg-[#13264c] text-white py-4 shrink-0 justify-between select-none" id="uet-primary-sidebar">
            <div className="w-full flex flex-col items-center space-y-5">
              {/* UET Brand Logo Facsimile */}
              <div className="flex flex-col items-center">
                <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center p-1 border-2 border-blue-400 cursor-pointer shadow-md">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#13264c" strokeWidth="8" />
                    <circle cx="50" cy="50" r="30" fill="#13264c" />
                    <polygon points="50,25 35,55 65,55" fill="white" />
                    <circle cx="50" cy="46" r="5" fill="#13264c" />
                  </svg>
                </div>
                <span className="text-[7px] text-center font-extrabold tracking-wide uppercase mt-1.5 text-blue-100/95 leading-tight">UET Portal</span>
              </div>

              {/* Sidebar Menu Options */}
              <div className="w-full flex flex-col items-center space-y-4">
                <div className="flex flex-col items-center cursor-pointer text-blue-200/70 hover:text-white group py-1.5 w-full">
                  <div className="w-7 h-7 rounded-full border border-blue-200/50 flex items-center justify-center group-hover:border-white mb-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-center font-medium">Account</span>
                </div>

                <div className="flex flex-col items-center cursor-pointer text-blue-200/70 hover:text-white py-1.5 w-full">
                  <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                  </svg>
                  <span className="text-[10px] text-center font-medium">Dashboard</span>
                </div>

                {/* Courses Option is Active */}
                <div className="flex flex-col items-center cursor-pointer bg-white text-[#13264c] py-2.5 w-full border-l-4 border-amber-500">
                  <svg className="w-6 h-6 mb-1 text-[#13264c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.246.477 5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.246.477-5 1.253" />
                  </svg>
                  <span className="text-[10px] text-center font-bold">Courses</span>
                </div>

                <div className="flex flex-col items-center cursor-pointer text-blue-200/70 hover:text-white py-1.5 w-full">
                  <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[10px] text-center font-medium">Calendar</span>
                </div>

                <div className="flex flex-col items-center cursor-pointer text-blue-200/70 hover:text-white py-1.5 w-full">
                  <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-9 11h3a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[10px] text-center font-medium">Inbox</span>
                </div>

                <div className="flex flex-col items-center cursor-pointer text-blue-200/70 hover:text-white py-1.5 w-full">
                  <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[10px] text-center font-medium">Help</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowExitWarning(true)}
              className="text-blue-300 hover:text-white cursor-pointer py-2 w-full flex justify-center focus:outline-none active:scale-95 transition-transform"
              title="Thoát bài thi"
              id="uet-btn-exit-exam"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* 2. Left Secondary Course Menu Sidebar (White Canvas Menu) */}
          <div className="hidden lg:flex flex-col w-[210px] bg-white border-r border-[#E2E8F0] py-6 px-4 shrink-0 select-none text-[13px] text-left" id="uet-secondary-sidebar">
            <span className="text-[11px] font-bold text-slate-500 mb-4 tracking-tight truncate filter brightness-75">Học kỳ II năm học 2025 - 2026</span>
            <div className="flex flex-col space-y-3.5 font-normal text-slate-600">
              <span className="hover:text-blue-600 cursor-pointer">Home</span>
              <span className="hover:text-blue-600 cursor-pointer">Announcements</span>
              <span className="hover:text-blue-600 cursor-pointer">Assignments</span>
              <span className="hover:text-blue-600 cursor-pointer">Discussions</span>
              <span className="hover:text-blue-600 cursor-pointer flex items-center justify-between">
                Grades <span className="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">21</span>
              </span>
              <span className="hover:text-blue-600 cursor-pointer">People</span>
              <span className="hover:text-blue-600 cursor-pointer">Pages</span>
              <span className="hover:text-blue-600 cursor-pointer">Files</span>
              <span className="hover:text-blue-600 cursor-pointer">Syllabus</span>
              <span className="hover:text-blue-600 cursor-pointer">Outcomes</span>
              <span className="text-[#0e2240] font-bold border-l-2 border-[#0e2240] pl-2 hover:text-blue-600 cursor-pointer">Quizzes</span>
              <span className="hover:text-blue-600 cursor-pointer">Modules</span>
              <span className="hover:text-blue-600 cursor-pointer">Collaborations</span>
              <span className="hover:text-blue-600 cursor-pointer">Class Notebook</span>
              <span className="hover:text-blue-600 cursor-pointer">Website UET</span>
              <span className="hover:text-blue-600 cursor-pointer">Dev Courses</span>
              <span className="hover:text-blue-600 cursor-pointer">Convert GIFT Moodle</span>
            </div>
          </div>

          {/* 3. Main Central and Right Section */}
          <div className="flex-1 flex flex-col md:flex-row bg-[#ffffff] p-4 sm:p-6 overflow-y-auto" id="uet-central-layout">
            
            {/* Left Portal Core Content Area */}
            <div className="flex-1 space-y-6 md:pr-6 text-left" id="uet-quiz-active-zone">
              
              {/* Breadcrumb row & Burger */}
              <div className="flex items-center space-x-2 text-[13px] text-slate-600 font-medium pb-2 border-b border-slate-200" id="uet-breadcrumb-row">
                <span className="text-[#13264c] font-bold shrink-0 text-base">☰</span>
                <span className="hover:underline cursor-pointer text-[#13264c] font-semibold truncate hidden sm:inline">2526II_UET.COM1050_29</span>
                <span className="text-slate-400 font-normal">&gt;</span>
                <span className="hover:underline cursor-pointer text-[#13264c] truncate">Quizzes</span>
                <span className="text-slate-400 font-normal">&gt;</span>
                <span className="text-slate-800 font-medium truncate">
                  {selectedPresetId ? presetExamsList.find(p => p.id === selectedPresetId)?.title : "Thi Thử Python Cuối Kỳ"}
                </span>
              </div>

              {/* Title & Info block */}
              <div className="space-y-2 pt-2">
                <h1 className="text-3xl sm:text-[32px] font-semibold text-[#2D3B45] tracking-tight font-sans leading-tight">
                  {selectedPresetId ? presetExamsList.find(p => p.id === selectedPresetId)?.title : "Thi Thử Python Cuối Kỳ"}
                </h1>
                <p className="text-[14px] text-slate-705 font-normal font-sans antialiased">
                  Started: {examStartTime || formatExamTime(new Date())}
                </p>
                <div className="pt-4 pb-0.5">
                  <h2 className="text-[25px] sm:text-[27px] font-semibold text-[#2D3B45] font-sans tracking-tight">Quiz Instructions</h2>
                </div>
                <hr className="border-t border-slate-300" />
              </div>

              {/* Stack of all Question Boxes */}
              <div className="space-y-8" id="uet-questions-stack">
                {examQuestions.map((q, qIndex) => {
                  const currentSelectedIdx = answers[q.id];
                  const qFlagged = flaggedQuestions[q.id];

                  return (
                    <div className="relative flex items-start gap-2 select-none w-full animate-fade-in" key={q.id} id={`uet-question-container-${q.id}`}>
                      {/* Floating Left Bookmark/Flag button to match Canvas LMS exactly (always visible) */}
                      <div className="flex flex-col items-center shrink-0 pt-3 pr-1">
                        <button 
                          onClick={() => toggleFlag(q.id)}
                          className="focus:outline-hidden transition active:scale-95 duration-150"
                          title="Đánh dấu câu hỏi"
                        >
                          <svg 
                            className={`w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] transition-colors duration-150 ${
                              qFlagged 
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
                      <div 
                        id={`uet-question-box-${q.id}`}
                        className="flex-1 border border-[#CBD5E1] rounded-xs shadow-xs overflow-hidden bg-white text-left focus-within:ring-2 focus-within:ring-blue-100/50"
                      >
                        {/* Header bar of Question Card */}
                        <div className="bg-[#f5f5f5] text-[#2D3B45] px-4.5 py-3.5 flex justify-between items-center border-b border-[#CBD5E1]" id={`uet-question-header-${q.id}`}>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[15.5px] sm:text-[16px] text-[#2D3B45] font-sans">Question {qIndex + 1}</span>
                          </div>
                          <span className="text-slate-700 font-normal text-[14.5px] font-sans">1 pt</span>
                        </div>

                        {/* Body of Question Card */}
                        <div className="p-4 sm:p-5 space-y-4">
                          <div className="text-[14px] font-sans antialiased text-[#2d3748] font-normal leading-relaxed">
                            <SmartQuestionText 
                              text={q.questionText}
                              questionId={q.id}
                              isInteractive={false}
                            />
                          </div>

                          {q.codeSnippet && (
                            <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-lg font-mono text-xs overflow-x-auto text-[#0f172a] shadow-inner leading-relaxed">
                              <pre>{q.codeSnippet}</pre>
                            </div>
                          )}

                          {/* Options block under UET Mode - 100% custom circular indicators on separate lines divided by rules */}
                          <div className="divide-y divide-slate-200 border-t border-b border-slate-200 mt-4" id={`options-stack-${q.id}`}>
                            {getQuestionOptions(q.options).map((opt, optIndex) => {
                              const isSelected = currentSelectedIdx === optIndex;
                              // Clean prefix like "A. ", "B. ", "C. ", "D. " if present
                              const cleanOptText = opt.replace(/^[A-H]\.\s*/i, "");
                              return (
                                <label 
                                  key={optIndex} 
                                  className="flex items-center gap-2.5 py-2 px-1 hover:bg-slate-50/50 cursor-pointer transition select-none text-[12.5px] font-normal text-slate-700"
                                >
                                  <input 
                                    type="radio" 
                                    name={`uet-q-${q.id}`}
                                    checked={isSelected}
                                    onChange={() => handleOptionSelect(q.id, optIndex)}
                                    className="sr-only"
                                  />
                                  
                                  {/* Circular indicator style matching image (scaled down to look extra realistic) */}
                                  {isSelected ? (
                                    <div className="w-3 h-3 rounded-full border border-[#1E40AF] lg:border-[#13264c] bg-white flex items-center justify-center shrink-0 transition duration-150">
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#1E40AF] lg:bg-[#13264c]" />
                                    </div>
                                  ) : (
                                    <div className="w-3 h-3 rounded-full border border-slate-400 bg-white flex items-center justify-center shrink-0 hover:border-slate-600 transition duration-150">
                                      {/* hollow circle */}
                                    </div>
                                  )}

                                  <span className="leading-relaxed text-slate-700 font-normal">{cleanOptText}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Submit Action Strip - Real exam view mode immediately submits without warning alert */}
              <div className="border border-[#CBD5E1] bg-slate-50 p-4 rounded-xl flex items-center justify-between text-slate-600 text-xs mt-6" id="uet-quiz-end-panel">
                <span className="font-normal text-slate-500">Quiz saved at {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                <button 
                  onClick={() => handleEndExam()}
                  className="bg-[#2463eb] hover:bg-[#1d4ed8] text-white font-bold px-5 py-2 rounded-md transition hover:shadow-xs cursor-pointer text-xs sm:text-sm active:scale-95"
                  id="btn-uet-submit-quiz"
                >
                  Submit Quiz
                </button>
              </div>

            </div>

            {/* Right Portal Sidebar Navigation */}
            <div className="w-full md:w-[240px] shrink-0 mt-6 md:mt-11" id="uet-quiz-right-panel">
              <div className="sticky top-6 p-1 space-y-4 bg-white text-left font-sans text-[13px]" id="uet-timer-sidebar">
                <h3 className="text-2xl font-semibold text-[#2d3a4b] tracking-normal mb-1.5 opacity-90 select-none">Questions</h3>
                
                {/* Question index navigation list with check/question indicators matching Image 3 exactly */}
                <div className="grid grid-cols-1 gap-1.5 max-h-[300px] overflow-y-auto pr-1">
                  {examQuestions.map((q, idx) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isQFlagged = flaggedQuestions[q.id];
                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          document.getElementById(`uet-question-box-${q.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                        className="flex items-center gap-1.5 hover:bg-slate-50/80 p-0.5 rounded transition w-full text-left cursor-pointer"
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

                {/* Live Countdown Clock styled inline according to Image 3 */}
                <div className="border-t border-slate-100 pt-4 flex flex-col space-y-2">
                  <div className="flex items-center gap-2 text-[15px] select-none">
                    <span className="text-[#333333] font-normal">Time Running:</span>
                    <button 
                      onClick={() => setShowTimer(!showTimer)}
                      className="border border-[#cccccc] px-3.5 py-1.5 bg-[#f5f5f5] hover:bg-[#e8e8e8] text-[#333333] font-medium text-[13px] rounded-xs shadow-xs cursor-pointer select-none transition duration-150"
                    >
                      {showTimer ? "Hide Time" : "Show Time"}
                    </button>
                  </div>
                  {showTimer && (
                    <span className="text-sm font-semibold text-slate-800 tracking-wider pl-1 animate-fade-in block">
                      {Math.floor(timeLeft / 60)} Minutes, {timeLeft % 60} Seconds
                    </span>
                  )}
                </div>
              </div>
            </div>

          </div>
          
          {/* Custom Confirmation Modal for UET Mode */}
          {showSubmitConfirm && (
            <div className="fixed inset-0 bg-[#0F172A]/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="submit-confirm-modal">
              <div className="bg-white rounded-3xl max-w-md w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative text-left" id="submit-confirm-content">
                
                <div className="text-center space-y-3">
                  <div className="mx-auto w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 shadow-inner">
                    <AlertCircle size={30} />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">Xác Nhận Nộp Bài Thi</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Bạn có chắc chắn muốn nộp câu trả lời bài thi này? Kết quả sẽ được ghi nhận.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitConfirm(false)}
                    className="flex-1 bg-slate-100 hover:bg-slate-250 text-slate-800 font-bold py-3 rounded-xl text-xs sm:text-sm transition cursor-pointer text-center"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleEndExam();
                      setShowSubmitConfirm(false);
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl text-xs sm:text-sm transition cursor-pointer text-center"
                  >
                    Nộp bài ngay
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    const activeQuestion = examQuestions[currentIndex];
    const optionSelected = answers[activeQuestion.id];
    const isFlagged = flaggedQuestions[activeQuestion.id];

    // Compute metrics for custom submit confirmation modal
    const totalCount = examQuestions.length;
    const answeredCount = Object.keys(answers).length;
    const unansweredCount = totalCount - answeredCount;
    const flaggedCount = Object.keys(flaggedQuestions).filter(id => flaggedQuestions[Number(id)]).length;

    return (
      <div className="relative w-full" id="exam-arena-wrapper">
        {/* Custom Exit Warning Modal */}
        {showExitWarning && (
          <div className="fixed inset-0 bg-[#0F172A]/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="exit-confirm-modal">
            <div className="bg-white rounded-3xl max-w-md w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative text-left" id="exit-confirm-content">
              
              <div className="text-center space-y-3">
                <div className="mx-auto w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 shadow-inner">
                  <AlertCircle size={30} />
                </div>
                <h3 className="text-xl font-black text-slate-900 font-sans">Cảnh Báo Thoát Bài Thi</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
                  Sinh viên chưa hoàn thành bài thi thử! Bạn có muốn nộp bài thi hiện tại để ghi nhận và chấm điểm, hay tiếp tục làm tiếp?
                </p>
              </div>

              {/* Stats of active exam attempt */}
              <div className="bg-slate-50/80 rounded-2xl p-4.5 border border-slate-100 space-y-3" id="exit-confirm-stats">
                <div className="flex justify-between items-center text-xs sm:text-sm font-sans">
                  <span className="text-slate-500 font-semibold">Quy mô đề thi:</span>
                  <span className="text-slate-800 font-extrabold">{totalCount} câu</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm font-sans">
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={14} /> Đã làm:
                  </span>
                  <span className="text-emerald-800 font-extrabold bg-emerald-50/50 px-2.5 py-0.5 rounded-md border border-emerald-100">{answeredCount} câu</span>
                </div>
                {unansweredCount > 0 && (
                  <div className="flex justify-between items-center text-xs sm:text-sm font-sans">
                    <span className="text-rose-600 font-semibold flex items-center gap-1">
                      <AlertCircle size={14} /> Chưa làm:
                    </span>
                    <span className="text-rose-800 font-extrabold bg-rose-50/60 px-2.5 py-0.5 rounded-md border border-rose-100">{unansweredCount} câu</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2" id="exit-confirm-actions">
                <button
                  type="button"
                  onClick={() => {
                    handleEndExam();
                    setShowExitWarning(false);
                  }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shadow-md shadow-emerald-600/15 font-sans"
                  id="btn-confirm-exit-submit"
                >
                  <ShieldCheck size={16} /> Nộp bài
                </button>
                <button
                  type="button"
                  onClick={() => setShowExitWarning(false)}
                  className="flex-1 bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300 font-bold py-3 rounded-xl text-xs sm:text-sm transition cursor-pointer active:scale-95 text-center font-sans"
                  id="btn-confirm-exit-continue"
                >
                  Làm tiếp
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Custom Confirmation Modal */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 bg-[#0F172A]/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="submit-confirm-modal">
            <div className="bg-white rounded-3xl max-w-md w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative" id="submit-confirm-content">
              
              <div className="text-center space-y-3">
                <div className="mx-auto w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 shadow-inner">
                  <AlertCircle size={30} />
                </div>
                <h3 className="text-xl font-black text-slate-900">Xác Nhận Nộp Bài Thi</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Bạn có chắc chắn muốn nộp bài sớm không? Hệ thống sẽ tính điểm và lưu trữ nội dung chi tiết bài thi của bạn.
                </p>
              </div>

              {/* Stats of active exam attempt */}
              <div className="bg-slate-50/80 rounded-2xl p-4.5 border border-slate-100 space-y-3" id="submit-confirm-stats">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-slate-500 font-semibold">Quy mô đề thi:</span>
                  <span className="text-slate-800 font-extrabold">{totalCount} câu</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={14} /> Đã làm:
                  </span>
                  <span className="text-emerald-800 font-extrabold bg-emerald-50/50 px-2.5 py-0.5 rounded-md border border-emerald-100">{answeredCount} câu</span>
                </div>
                {unansweredCount > 0 && (
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-rose-600 font-semibold flex items-center gap-1">
                      <AlertCircle size={14} /> Chưa làm:
                    </span>
                    <span className="text-rose-800 font-extrabold bg-rose-50/60 px-2.5 py-0.5 rounded-md border border-rose-100">{unansweredCount} câu</span>
                  </div>
                )}
                {flaggedCount > 0 && (
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-amber-600 font-semibold flex items-center gap-1">
                      ★ Đang cắm cờ:
                    </span>
                    <span className="text-amber-800 font-extrabold bg-amber-50/60 px-2.5 py-0.5 rounded-md border border-amber-100">{flaggedCount} câu</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2" id="submit-confirm-actions">
                <button
                  type="button"
                  onClick={() => {
                    handleEndExam();
                    setShowSubmitConfirm(false);
                  }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shadow-md shadow-emerald-600/15"
                  id="btn-confirm-submit-yes"
                >
                  <ShieldCheck size={16} /> Nộp bài ngay
                </button>
                <button
                  type="button"
                  onClick={() => setShowSubmitConfirm(false)}
                  className="flex-1 bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300 font-bold py-3 rounded-xl text-xs sm:text-sm transition cursor-pointer active:scale-95"
                  id="btn-confirm-submit-no"
                >
                  Làm tiếp
                </button>
              </div>

            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-6xl mx-auto relative" id="exam-running-room">

          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between space-y-6 h-fit" id="exam-navigation">
            <div className="space-y-5">
              {/* Live countdown timer */}
              <div className="bg-[#FEF2F2] text-[#991B1B] p-4 rounded-2xl flex items-center justify-between border-2 border-[#FCA5A5]/60 shadow-[0_2px_8px_rgba(239,68,68,0.05)] animate-pulse" id="exam-timer">
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#991B1B]">
                  <Timer size={18} /> Thời gian
                </div>
                <span className="font-mono text-xl font-black tracking-widest text-[#991B1B]">{formatTime(timeLeft)}</span>
              </div>

              {/* Questions selectors map */}
              <h3 className="text-xs font-black text-[#64748B] uppercase tracking-wider">Bảng câu hỏi</h3>
              <div className="border border-[#CBD5E1] p-3.5 rounded-2xl bg-slate-50/60 shadow-inner" id="nav-btn-matrix-wrapper">
                <div className="grid grid-cols-5 gap-1.5" id="nav-btn-matrix">
                  {examQuestions.map((q, idx) => {
                    const answered = answers[q.id] !== undefined;
                    const flagged = flaggedQuestions[q.id];
                    const isActive = currentIndex === idx;

                    let btnStyles = "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] font-bold";
                    if (isActive) {
                      btnStyles = "bg-[#3B82F6] text-white border-[#3B82F6] font-black scale-105 shadow-md shadow-blue-500/10";
                    } else if (flagged) {
                      btnStyles = "bg-[#FEF3C7] text-[#92400E] border-[#FCD34D] font-bold";
                    } else if (answered) {
                      btnStyles = "bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0] font-bold";
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-9 w-full rounded-xl border-2 text-xs flex items-center justify-center transition cursor-pointer active:scale-95 ${btnStyles}`}
                        id={`nav-btn-${idx}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Direct submit button */}
            <button
              onClick={() => {
                setShowSubmitConfirm(true);
              }}
              className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              id="btn-force-submit"
            >
              <ShieldCheck size={18} /> Nộp bài thi
            </button>
          </div>

        {/* Content Question Pane */}
        <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-6 flex flex-col justify-between min-h-[500px]" id="exam-active-panel">
          
          <div className="space-y-6">
            
            {/* Header info */}
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4" id="exam-question-header">
              <span className="text-xs text-[#94A3B8] font-mono font-bold uppercase tracking-wider">
                Câu hỏi {currentIndex + 1} / {examQuestions.length}
              </span>
              <button
                onClick={() => toggleFlag(activeQuestion.id)}
                className={`text-xs px-3.5 py-1.5 rounded-xl border-2 transition font-extrabold cursor-pointer active:scale-95 flex items-center gap-1 ${
                  isFlagged 
                    ? "bg-[#FEF3C7] border-[#FCD34D] text-[#92400E] shadow-sm" 
                    : "bg-white border-[#E2E8F0] text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6]"
                }`}
                id="btn-flag-question"
              >
                {isFlagged ? "★ Đã ghim nhãn" : "☆ Ghim để xem lại"}
              </button>
            </div>

            {/* Question Text */}
            <SmartQuestionText 
              text={activeQuestion.questionText}
              questionId={activeQuestion.id}
              isInteractive={false}
            />

            {/* Code Snippet if applicable */}
            {activeQuestion.codeSnippet && (
              <JupyterCell 
                code={activeQuestion.codeSnippet} 
                cellNumber={activeQuestion.id} 
                isInteractive={false}
              />
            )}

            {/* Interactive choices */}
            <div className="grid grid-cols-1 gap-3.5" id="exam-options-selector">
              {getQuestionOptions(activeQuestion.options).map((option, idx) => {
                const isSelected = optionSelected === idx;
                
                return (
                  <div
                    key={idx}
                    onClick={() => handleOptionSelect(activeQuestion.id, idx)}
                    className={`flex items-center gap-4.5 p-4 sm:p-5 rounded-2xl border text-sm sm:text-base cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "border-2 border-blue-500 bg-[#EFF6FF]/60 text-blue-900 font-bold shadow-[0_2px_8px_rgba(59,130,246,0.08)] scale-[1.002]"
                        : "border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/20 text-[#1E293B]"
                    }`}
                    id={`exam-option-card-${idx}`}
                  >
                    <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-sm font-bold font-sans transition-colors duration-200 shrink-0 ${
                      isSelected 
                        ? "border-blue-500 bg-blue-500 text-white" 
                        : "border-slate-200 text-slate-800 bg-[#E2E8F0]/50"
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <div className="flex-1 font-semibold leading-relaxed">{option.replace(/^[A-H]\.\s*/i, "")}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation lower buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-[#E2E8F0]" id="exam-navigation-controls">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold border-2 flex items-center gap-1 transition active:scale-95 ${
                currentIndex === 0 
                  ? "text-[#94A3B8] border-[#F1F5F9] cursor-not-allowed bg-[#F8FAFC]" 
                  : "text-[#64748B] bg-white border-[#E2E8F0] hover:border-[#3B82F6] hover:text-[#3B82F6] cursor-pointer"
              }`}
              id="btn-navigate-prev"
            >
              <ChevronLeft size={16} /> Câu trước
            </button>

            <button
              onClick={() => {
                if (examViewMode === "uet") {
                  handleEndExam();
                } else {
                  setShowSubmitConfirm(true);
                }
              }}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition active:scale-95 shadow-md shadow-emerald-500/10 cursor-pointer"
              id="btn-navigate-submit-center"
            >
              <ShieldCheck size={16} /> Nộp bài thi
            </button>

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(examQuestions.length - 1, prev + 1))}
              disabled={currentIndex === examQuestions.length - 1}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold border-2 flex items-center gap-1 transition active:scale-95 ${
                currentIndex === examQuestions.length - 1 
                  ? "text-[#94A3B8] border-[#F1F5F9] cursor-not-allowed bg-[#F8FAFC]" 
                  : "text-[#64748B] bg-white border-[#E2E8F0] hover:border-[#3B82F6] hover:text-[#3B82F6] cursor-pointer"
              }`}
              id="btn-navigate-next"
            >
              Câu tiếp <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
    );
  }

  // --- RENDERING ENDED RESULT SCREEN ---
  const correctCount = examQuestions.filter(q => answers[q.id] === q.correctAnswerIndex).length;
  const gradeScale = ((correctCount / examQuestions.length) * 10).toFixed(1);
  const correctPercent = Math.round((correctCount / examQuestions.length) * 100);

  if (examViewMode === "uet") {
    return (
      <div className="w-full min-h-screen bg-white text-[#333333] font-sans antialiased text-[13px] leading-[1.5] p-0 flex flex-row items-stretch animate-fade-in" id="uet-quiz-results-mode">
        
        {/* 1. Left Primary Navy Sidebar */}
        <div className="hidden md:flex flex-col items-center w-[84px] bg-[#13264c] text-white py-4 shrink-0 justify-between select-none animate-fade-in" id="uet-primary-sidebar-results">
          <div className="w-full flex flex-col items-center space-y-5">
            <div className="flex flex-col items-center">
              <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center p-1 border-2 border-blue-400 cursor-pointer shadow-md">
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
          <div className="text-blue-300 py-2">
            <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </div>
        </div>

        {/* 2. Left Secondary White Sidebar */}
        <div className="hidden lg:flex flex-col w-[210px] bg-white border-r border-[#E2E8F0] py-6 px-4 shrink-0 select-none text-[13px] text-left">
          <span className="text-[11px] font-bold text-slate-500 mb-4 tracking-tight truncate filter brightness-75">Học kỳ II năm học 2025 - 2026</span>
          <div className="flex flex-col space-y-3.5 font-normal text-slate-600">
            <span className="hover:text-blue-600 cursor-pointer">Home</span>
            <span className="hover:text-blue-600 cursor-pointer">Announcements</span>
            <span className="hover:text-blue-600 cursor-pointer">Assignments</span>
            <span className="hover:text-blue-600 cursor-pointer">Discussions</span>
            <span className="hover:text-blue-600 cursor-pointer flex items-center justify-between">
              Grades <span className="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">21</span>
            </span>
            <span className="hover:text-blue-600 cursor-pointer">People</span>
            <span className="hover:text-blue-600 cursor-pointer">Pages</span>
            <span className="hover:text-blue-600 cursor-pointer">Files</span>
            <span className="hover:text-blue-600 cursor-pointer">Syllabus</span>
            <span className="hover:text-blue-600 cursor-pointer">Outcomes</span>
            <span className="text-[#0e2240] font-bold border-l-2 border-[#0e2240] pl-2 hover:text-blue-600 cursor-pointer">Quizzes</span>
            <span className="hover:text-blue-600 cursor-pointer">Modules</span>
          </div>
        </div>

        {/* 3. Main Central and Right Review Pane */}
        <div className="flex-1 flex flex-col md:flex-row bg-[#ffffff] p-4 sm:p-6 overflow-y-auto">
          
          {/* Left Column Content Review Area */}
          <div className="flex-1 space-y-6 md:pr-6 text-left" id="uet-quiz-review-pane">
            {/* Breadcrumb row */}
            <div className="flex items-center space-x-2 text-[13px] text-slate-600 font-medium pb-2 border-b border-slate-200">
              <span className="text-[#13264c] font-bold text-base">☰</span>
              <span className="hover:underline cursor-pointer text-[#13264c] font-semibold truncate">2526II_UET.COM1050_29</span>
              <span className="text-slate-400">&gt;</span>
              <span className="hover:underline cursor-pointer text-[#13264c]">Quizzes</span>
              <span className="text-slate-400">&gt;</span>
              <span className="text-slate-800 font-medium truncate">
                {selectedPresetId ? presetExamsList.find(p => p.id === selectedPresetId)?.title : "Thi Thử Python Cuối Kỳ"}
              </span>
            </div>

            {/* Quiz Title Header matching canvas images */}
            <div className="space-y-3 pt-2 border-b border-slate-300 pb-4">
              <h1 className="text-3xl font-semibold text-[#2D3B45] tracking-tight font-sans">
                {selectedPresetId ? presetExamsList.find(p => p.id === selectedPresetId)?.title : "Thi Thử Python Cuối Kỳ"}
              </h1>
              <div className="text-[13px] text-slate-700 font-sans space-y-1.5 pt-1">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1 bg-white">
                  <span className="text-slate-800"><strong className="font-bold text-slate-900">Due</strong> June 29 at 1:15pm</span>
                  <span className="text-slate-800"><strong className="font-bold text-slate-900">Points</strong> {examQuestions.length}</span>
                  <span className="text-slate-800"><strong className="font-bold text-slate-900">Questions</strong> {examQuestions.length}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1 bg-white">
                  <span className="text-slate-800">
                    <strong className="font-bold text-slate-900">Available</strong> June 29 at 1pm - June 29 at 2pm <span className="text-[11px] text-slate-500 font-normal">1 hour</span>
                  </span>
                  <span className="text-slate-805">
                    <strong className="font-bold text-slate-900">Time Limit</strong>{" "}
                    {(() => {
                      if (initialReviewAttempt) {
                        if (initialReviewAttempt.timeLimitSeconds) {
                          return Math.round(initialReviewAttempt.timeLimitSeconds / 60);
                        }
                        if (initialReviewAttempt.categoryName) {
                          const match = initialReviewAttempt.categoryName.match(/\/ (\d+) phút/);
                          if (match) return parseInt(match[1], 10);
                        }
                        const foundPreset = presetExamsList.find(p => p.title === initialReviewAttempt.categoryName);
                        if (foundPreset) return foundPreset.timeLimitMinutes;
                        return 60;
                      }
                      return Math.round(initialTimeLimit / 60);
                    })()}{" "}
                    minutes
                  </span>
                </div>
              </div>
            </div>

            {/* Warning Banner - Completed/Locked indicators */}
            <div className="text-[13.5px] text-slate-800 font-normal font-sans pt-3" id="canvas-locked-warning">
              This quiz was locked June 29 at 2:05pm.
            </div>

            {/* Attempt History Section matching image 2 & 8 */}
            <div className="space-y-3 pt-4">
              <h2 className="text-xl font-normal text-[#2D3B45] font-sans tracking-tight">Attempt History</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px] border-collapse bg-white font-sans">
                  <thead>
                    <tr className="border-b border-slate-300 text-slate-800 font-bold">
                      <th className="py-2 pr-4 w-[110px]">&nbsp;</th>
                      <th className="py-2 px-4 text-slate-800">Attempt</th>
                      <th className="py-2 px-4 text-slate-800">Time</th>
                      <th className="py-2 pl-4 text-slate-800 text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200 text-slate-800 font-normal">
                      <td className="py-3.5 pr-4 text-xs font-bold text-slate-600 align-middle">
                        LATEST
                      </td>
                      <td className="py-3.5 px-4 font-normal text-[#005A9C] hover:underline cursor-pointer align-middle">
                        Attempt 1
                      </td>
                      <td className="py-3.5 px-4 text-slate-800 align-middle">
                        {(() => {
                          const elapsed = initialReviewAttempt 
                            ? initialReviewAttempt.timeSpentSeconds 
                            : (initialTimeLimit - timeLeft);
                          const elapsedM = Math.floor(elapsed / 60);
                          return `${elapsedM || 7} minutes`;
                        })()}
                      </td>
                      <td className="py-3.5 pl-4 text-right align-middle text-slate-800 font-normal">
                        {examQuestions.filter(q => answers[q.id] === q.correctAnswerIndex).length} out of {examQuestions.length}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quiz Protected Box: Canvas orange alert block indicating secure protection */}
            <div className="space-y-4 pt-6" id="uet-quiz-protected-history">
              <p className="text-[13px] text-slate-805 font-sans">
                Quiz results are protected for this quiz and are not visible to students.
              </p>
              
              {/* Red/Amber Warning Bar */}
              <div className="bg-[#fdf0ed] rounded-sm border border-[#f5d7ce]/60 p-3.5 flex items-center gap-2.5 text-[#c25341] font-sans">
                <span className="text-base leading-none shrink-0 text-[#c25341]">ⓘ</span>
                <p className="text-[13.5px] font-sans text-[#c25341]">Correct answers are hidden.</p>
              </div>

              {/* Score line text */}
              <p className="text-[14.5px] text-slate-800 font-sans pb-4">
                Score for this quiz: <strong className="font-extrabold">{examQuestions.filter(q => answers[q.id] === q.correctAnswerIndex).length}</strong> out of {examQuestions.length}
              </p>
            </div>

            {/* Canvas-style Detailed Answers & Review list */}
            {initialReviewAttempt ? (
              <div className="space-y-6 pt-8 border-t border-slate-205" id="uet-canvas-detailed-review">
                <div className="flex items-center justify-between border-b-2 border-[#13264c] pb-3 select-none">
                  <h3 className="text-base sm:text-lg font-black text-[#13264c] tracking-tight">
                    📝 ĐÁP ÁN VÀ LỜI GIẢI CHI TIẾT
                  </h3>
                  <span className="bg-[#EFF6FF] text-[#1E40AF] font-bold text-xs px-3 py-1 rounded-sm border border-blue-200">
                    Điểm số: {examQuestions.filter(q => answers[q.id] === q.correctAnswerIndex).length} / {examQuestions.length} pts
                  </span>
                </div>

                <div className="space-y-6">
                  {examQuestions.map((q, idx) => {
                    const userAnswerIndex = answers[q.id];
                    const isCorrect = userAnswerIndex === q.correctAnswerIndex;
                    const isUnanswered = userAnswerIndex === undefined || userAnswerIndex === -1;

                    return (
                      <div 
                        key={q.id} 
                        className="border border-[#CBD5E1] rounded-xs bg-white overflow-hidden shadow-xs text-left"
                        id={`canvas-review-card-${q.id}`}
                      >
                        {/* Header row */}
                        <div className="bg-[#f5f5f5] border-b border-[#CBD5E1] px-4.5 py-3.5 flex items-center justify-between font-normal text-slate-700 select-none">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[15.5px] sm:text-[16px] text-[#2D3B45] font-sans">Question {idx + 1}</span>
                            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 border border-slate-200 rounded-xs text-[10px] font-bold">
                              {q.category}
                            </span>
                          </div>
                          <div className="font-sans text-[14.5px] text-slate-700">
                            {isUnanswered ? (
                              <span>0 / 1 pt</span>
                            ) : isCorrect ? (
                              <span className="text-emerald-700 font-bold">1 / 1 pt</span>
                            ) : (
                              <span className="text-rose-750 font-bold">0 / 1 pt</span>
                            )}
                          </div>
                        </div>

                        {/* Question content */}
                        <div className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                          <SmartQuestionText 
                            text={q.questionText}
                            questionId={q.id}
                            isInteractive={true}
                            output={q.options[q.correctAnswerIndex]?.replace(/^[A-H]\.\s*/, "")}
                            showOutputByDefault={true}
                          />

                          {q.codeSnippet && (
                            <JupyterCell 
                              code={q.codeSnippet}
                              cellNumber={q.id}
                              isInteractive={true}
                              output={q.options[q.correctAnswerIndex]?.replace(/^[A-H]\.\s*/, "")}
                              showOutputByDefault={true}
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
                                  <span className="leading-relaxed">
                                    {option.replace(/^[A-H]\.\s*/i, "")}
                                  </span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Explanation block */}
                          <div className="bg-[#FAF9F6] border-l-4 border-amber-500 p-3.5 text-xs text-slate-700 leading-relaxed space-y-1 mt-3 rounded-r-md">
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
            ) : (
              /* Informational placeholder card block when answers are hidden right after submission */
              <div className="bg-slate-50 border border-slate-200 p-8 rounded-sm text-center space-y-4 my-8 font-sans" id="uet-answers-restricted">
                <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xl font-bold">
                  🔒
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-[#333333]">ĐÁP ÁN ĐÃ ĐƯỢC ẨN AN TOÀN</h3>
                  <p className="text-xs text-slate-600 font-semibold max-w-sm mx-auto leading-relaxed">
                    Theo quy chế thi cử VNU-UET, đáp án chi tiết và giải thích đáp án không được hiển thị trực tiếp sau khi hoàn thành phòng thi thử 100%. 
                  </p>
                  <p className="text-xs text-blue-800 font-extrabold max-w-md mx-auto leading-relaxed pt-2.5">
                    Sinh viên có thể xem lại chi tiết lời giải và đáp án của bài kiểm tra này trong mục <strong className="underline decoration-wavy cursor-pointer text-blue-900">Lịch Sử Làm Bài</strong> của trang chính bất cứ lúc nào!
                  </p>
                </div>
              </div>
            )}

            {/* Action control buttons row */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-200">
              <button
                onClick={handleRestart}
                className="bg-[#13264c] hover:bg-[#0c1a36] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded shadow-xs hover:shadow-sm transition cursor-pointer"
              >
                🔄 Thi lại đề này
              </button>
              <button
                onClick={() => {
                  if (onCloseReview) {
                    onCloseReview();
                  } else {
                    setExamStatus("setup");
                  }
                }}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm px-5 py-2.5 rounded transition cursor-pointer"
              >
                {onCloseReview ? "Quay lại Lịch sử" : "Về trang chủ Phòng thi"}
              </button>
            </div>

          </div>

          {/* Right sidebar navigation: Submission details card aligned with image 8 */}
          <div className="w-full md:w-[240px] shrink-0 mt-6 md:mt-11" id="uet-quiz-results-right">
            <div className="sticky top-6 p-1 space-y-4 text-left font-sans text-[13px]" id="canvas-submission-details-box">
              <h3 className="font-semibold text-slate-800 text-[14px]">Submission Details:</h3>
              <div className="border-b border-slate-300 my-1 pb-0.5"></div>
              
              <div className="space-y-0.5 font-sans text-[13px] text-slate-800">
                <div className="flex justify-between items-center py-2.5 border-b border-slate-205">
                  <span className="font-bold">Time:</span>
                  <span className="text-right">
                    {(() => {
                      const elapsed = initialReviewAttempt 
                        ? initialReviewAttempt.timeSpentSeconds 
                        : (initialTimeLimit - timeLeft);
                      const elapsedM = Math.floor(elapsed / 60);
                      return `${elapsedM || 7} minutes`;
                    })()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2.5 border-b border-slate-205">
                  <span className="font-bold">Current Score:</span>
                  <span className="text-right">
                    {correctCount} out of {examQuestions.length}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2.5 border-b border-slate-205">
                  <span className="font-bold">Kept Score:</span>
                  <span className="text-right">
                    {correctCount} out of {examQuestions.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in" id="exam-results-screen">
      
      {/* Success notification banner showing it's saved in the history */}
      <div className="bg-emerald-50 border-2 border-emerald-200 p-4.5 rounded-2xl flex items-center gap-3.5 text-left text-emerald-800 shadow-sm" id="save-success-notification">
        <div className="bg-emerald-500 text-white p-2.5 rounded-xl flex items-center justify-center shadow-md shrink-0 animate-bounce">
          <CheckCircle2 size={20} />
        </div>
        <div className="space-y-0.5">
          <h4 className="font-extrabold text-sm sm:text-base text-emerald-950 leading-tight">Đã nộp bài & lưu kết quả thành công!</h4>
          <p className="text-xs text-emerald-700 font-semibold leading-relaxed">
            Hệ thống đã tính điểm, tạo báo cáo học thuật sai sót và tự động lưu trữ điểm số cùng nội dung trả lời chi tiết vào <strong className="font-black text-emerald-950 underline decoration-emerald-600/30">Mục Lịch Sử Làm Bài</strong> để sinh viên ôn luyện bất kỳ khi nào.
          </p>
        </div>
      </div>
      
      {/* Grade and Title card banner */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8 sm:p-10 text-center space-y-6" id="exam-grade-banner">
        <div className="space-y-3">
          <span className="bg-[#EFF6FF] text-[#1E40AF] text-xs font-black px-3.5 py-1 rounded-md uppercase tracking-wider border border-[#DBEAFE]/40">
            Kết quả thi thử của bạn
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            Tổng kết kiểm tra tư duy tính toán
          </h1>
        </div>

        {/* Circular progress with stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
          
          <div className="relative w-40 h-40 flex items-center justify-center rounded-full bg-slate-50 border-4 border-[#E2E8F0] shadow-inner">
            <div className="text-center z-10">
              <h2 className="text-4xl font-black text-[#3B82F6]">{gradeScale}</h2>
              <p className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider mt-1">Thang điểm 10</p>
            </div>
            {/* Visual SVG green arch overlay to show grade percent */}
            <svg className="absolute inset-x-0 inset-y-0 w-full h-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="74"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="6"
              />
              <circle
                cx="80"
                cy="80"
                r="74"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 74}`}
                strokeDashoffset={`${2 * Math.PI * 74 * (1 - correctPercent / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
          </div>

          <div className="text-left space-y-4">
            <p className="text-[#334155] text-sm sm:text-base leading-relaxed font-semibold">
              Bạn trả lời chính xác <strong className="text-[#10B981]">{correctCount}</strong> câu trên tổng số <strong className="text-[#0F172A]">{examQuestions.length}</strong> bài tập.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#ECFDF5] border border-[#A7F3D0] p-4 rounded-2xl flex items-center gap-2.5">
                <CheckCircle2 className="text-[#10B981]" size={20} />
                <div>
                  <p className="text-[10px] text-[#065F46] font-extrabold uppercase">Đúng</p>
                  <p className="font-bold text-[#065F46] text-sm">{correctCount} câu</p>
                </div>
              </div>
              <div className="bg-[#FEF2F2] border border-[#FCA5A5] p-4 rounded-2xl flex items-center gap-2.5">
                <XCircle className="text-[#EF4444]" size={20} />
                <div>
                  <p className="text-[10px] text-[#991B1B] font-extrabold uppercase">Sai / Bỏ qua</p>
                  <p className="font-bold text-[#991B1B] text-sm">{examQuestions.length - correctCount} câu</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons to restart or review details */}
        <div className="pt-6 border-t border-[#E2E8F0] flex flex-wrap justify-center gap-4">
          <button
            onClick={handleRestart}
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-[0_4px_12px_rgba(59,130,246,0.25)] active:scale-95"
          >
            <RotateCcw size={16} /> Thi lại đề này
          </button>
          <button
            onClick={() => {
              if (onCloseReview) {
                onCloseReview();
              } else {
                setExamStatus("setup");
              }
            }}
            className="bg-white border-2 border-[#E2E8F0] text-[#1E293B] hover:border-[#3B82F6] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            {onCloseReview ? "Quay lại Lịch sử" : "Về thiết lập thi"}
          </button>
        </div>
      </div>

      {/* Review details List of Questions */}
      <div className="space-y-5" id="exam-review-section">
        <h2 className="text-lg sm:text-xl font-black text-[#0F172A] px-1 flex items-center gap-2">
          <BarChart4 size={22} className="text-[#3B82F6]" /> Chi tiết báo cáo từng đáp án
        </h2>

        <div className="grid grid-cols-1 gap-5">
          {examQuestions.map((q, idx) => {
            const userAnswerIndex = answers[q.id];
            const isCorrect = userAnswerIndex === q.correctAnswerIndex;
            const isUnattempted = userAnswerIndex === undefined;

            return (
              <div 
                key={q.id}
                className={`bg-white rounded-3xl border-2 p-6 space-y-4 shadow-sm ${
                  isUnattempted 
                    ? "border-[#E2E8F0]" 
                    : isCorrect 
                      ? "border-[#D1FAE5] bg-[#F0FDF4]/10 shadow-[0_4px_12px_rgba(16,185,129,0.015)]" 
                      : "border-[#FEE2E2] bg-[#FEF2F2]/10 shadow-[0_4px_12px_rgba(239,68,68,0.015)]"
                }`}
                id={`review-card-${q.id}`}
              >
                {/* Meta details */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#94A3B8] font-bold">CÂU {idx + 1}</span>
                    <span className="bg-[#F1F5F9] text-[#475569] text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md border border-[#E2E8F0]/50">
                      {q.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    {isUnattempted ? (
                      <span className="text-[#475569] bg-[#F1F5F9] px-2.5 py-1 rounded-lg flex items-center gap-1 border border-[#E2E8F0]">
                        <AlertCircle size={14} /> Không trả lời
                      </span>
                    ) : isCorrect ? (
                      <span className="text-[#065F46] bg-[#D1FAE5] px-2.5 py-1 rounded-lg flex items-center gap-1 border border-[#A7F3D0]">
                        <CheckCircle2 size={14} /> Trả lời đúng
                      </span>
                    ) : (
                      <span className="text-[#991B1B] bg-[#FEE2E2] px-2.5 py-1 rounded-lg flex items-center gap-1 border border-[#FCA5A5]">
                        <XCircle size={14} /> Trả lời sai
                      </span>
                    )}
                  </div>
                </div>

                {/* Question and Code snippet */}
                <SmartQuestionText 
                  text={q.questionText}
                  questionId={q.id}
                  isInteractive={true}
                  output={q.options[q.correctAnswerIndex]?.replace(/^[A-D]\.\s*/, "")}
                  showOutputByDefault={true}
                />
                
                {q.codeSnippet && (
                  <JupyterCell 
                    code={q.codeSnippet} 
                    cellNumber={q.id} 
                    isInteractive={true}
                    output={q.options[q.correctAnswerIndex]?.replace(/^[A-D]\.\s*/, "")}
                    showOutputByDefault={true}
                  />
                )}

                {/* Static Options review */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {getQuestionOptions(q.options).map((option, optIdx) => {
                    const isOptCorrect = optIdx === q.correctAnswerIndex;
                    const isOptSelected = optIdx === userAnswerIndex;

                    let bgStyle = "bg-white border-slate-200 text-[#1E293B]";
                    let badgeStyle = "bg-[#E2E8F0]/50 border-slate-200 text-slate-800";

                    if (isOptCorrect) {
                      bgStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold border-2";
                      badgeStyle = "bg-emerald-500 border-emerald-600 text-white";
                    } else if (isOptSelected && !isCorrect) {
                      bgStyle = "bg-rose-50 border-rose-500 text-rose-900 font-bold border-2";
                      badgeStyle = "bg-rose-500 border-rose-600 text-white";
                    }

                    return (
                      <div 
                        key={optIdx} 
                        className={`p-4 rounded-xl border text-xs sm:text-sm flex items-center gap-3 ${bgStyle}`}
                      >
                        <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-sans font-bold text-xs shrink-0 ${badgeStyle}`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="font-semibold">{option.replace(/^[A-H]\.\s*/i, "")}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation text */}
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border-2 border-dashed border-[#E2E8F0] text-xs sm:text-sm text-[#475569] leading-relaxed space-y-1.5">
                  <p className="font-black text-[#0F172A] uppercase tracking-wider text-[10px]">Phân tích đáp án học thuật:</p>
                  <p className="font-medium text-[#334155]">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
