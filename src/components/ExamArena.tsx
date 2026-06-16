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
}

export default function ExamArena({ questions, onSaveAttempt }: ExamArenaProps) {
  const [examStatus, setExamStatus] = useState<"setup" | "running" | "ended">("setup");
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  
  // Running state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // questionId -> selectedIndex
  const [timeLeft, setTimeLeft] = useState<number>(0); // seconds
  const [initialTimeLimit, setInitialTimeLimit] = useState<number>(60 * 60); // default 60 mins
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  // History tracking timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Setup options
  const [questionsCountLimit, setQuestionsCountLimit] = useState<number>(50);

  // Start customizable raw mock exam
  const handleStartExam = (count?: number, minutes?: number) => {
    const finalCount = count || questionsCountLimit;
    const finalMinutes = minutes || (initialTimeLimit / 60);

    // Select random questions across all categories
    const selected = [...questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, finalCount);

    setSelectedPresetId(null);
    setExamQuestions(selected);
    setCurrentIndex(0);
    setAnswers({});
    setFlaggedQuestions({});
    setInitialTimeLimit(finalMinutes * 60);
    setTimeLeft(finalMinutes * 60);
    setExamStatus("running");
  };

  // Start specific preset examination from database
  const handleStartPresetExam = (preset: PresetExam) => {
    setSelectedPresetId(preset.id);
    setExamQuestions([...preset.questions]);
    setCurrentIndex(0);
    setAnswers({});
    setFlaggedQuestions({});
    setInitialTimeLimit(preset.timeLimitMinutes * 60);
    setTimeLeft(preset.timeLimitMinutes * 60);
    setExamStatus("running");
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
      isCustomPractice: false,
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
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Formatter for time display
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

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
    const activeQuestion = examQuestions[currentIndex];
    const optionSelected = answers[activeQuestion.id];
    const isFlagged = flaggedQuestions[activeQuestion.id];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-6xl mx-auto relative animate-fade-in" id="exam-running-room">

        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between space-y-6 max-h-[520px]" id="exam-navigation">
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
            <div className="grid grid-cols-5 gap-2" id="nav-btn-matrix">
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
                    className={`h-10 rounded-xl border-2 text-xs flex items-center justify-center transition cursor-pointer active:scale-95 ${btnStyles}`}
                    id={`nav-btn-${idx}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Direct submit button */}
          <button
            onClick={() => {
              if (window.confirm("Bạn có chắc chắn muốn nộp bài sớm không? Hãy kiểm tra lại các câu cắm cờ trước.")) {
                handleEndExam();
              }
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
                    <div className="flex-1 font-semibold leading-relaxed">{option}</div>
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
    );
  }

  // --- RENDERING ENDED RESULT SCREEN ---
  const correctCount = examQuestions.filter(q => answers[q.id] === q.correctAnswerIndex).length;
  const gradeScale = ((correctCount / examQuestions.length) * 10).toFixed(1);
  const correctPercent = Math.round((correctCount / examQuestions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in" id="exam-results-screen">
      
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
            onClick={() => setExamStatus("setup")}
            className="bg-white border-2 border-[#E2E8F0] text-[#1E293B] hover:border-[#3B82F6] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            Về thiết lập thi
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
                        <span className="font-semibold">{option}</span>
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
