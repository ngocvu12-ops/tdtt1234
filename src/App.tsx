/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  BrainCircuit, BookOpen, Trophy, Compass, History, Zap, 
  Menu, X, Sparkles, Award, CheckCircle, Clock 
} from "lucide-react";

import { Category, QuizAttempt, UserStats } from "./types";
import { quizQuestions } from "./data/questions";
import Dashboard from "./components/Dashboard";
import StudyCards from "./components/StudyCards";
import PracticeZone from "./components/PracticeZone";
import ExamArena from "./components/ExamArena";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<Category | null>(null);

  // Stats and history persistent states
  const [stats, setStats] = useState<UserStats>({
    totalPractices: 0,
    totalExamAttempts: 0,
    correctAnswersTotal: 0,
    wrongAnswersTotal: 0,
    streakDays: 3, // Initial value
    questionsSolvedIds: []
  });
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  // Load from local storage
  useEffect(() => {
    const savedStats = localStorage.getItem("uet_ct_stats");
    const savedAttempts = localStorage.getItem("uet_ct_attempts");

    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error("Error parsing stats", e);
      }
    }
    if (savedAttempts) {
      try {
        setAttempts(JSON.parse(savedAttempts));
      } catch (e) {
        console.error("Error parsing attempts", e);
      }
    }
  }, []);

  // Save to local storage
  const saveStatsToStorage = (updatedStats: UserStats) => {
    setStats(updatedStats);
    localStorage.setItem("uet_ct_stats", JSON.stringify(updatedStats));
  };

  const saveAttemptsToStorage = (updatedAttempts: QuizAttempt[]) => {
    setAttempts(updatedAttempts);
    localStorage.setItem("uet_ct_attempts", JSON.stringify(updatedAttempts));
  };

  // Record stats after submitting answers in practice zone
  const handleRecordPracticeAnswer = (questionId: number, isCorrect: boolean) => {
    const newSolvedIds = stats.questionsSolvedIds.includes(questionId)
      ? stats.questionsSolvedIds
      : [...stats.questionsSolvedIds, questionId];

    const updatedStats: UserStats = {
      ...stats,
      totalPractices: stats.totalPractices + 1,
      correctAnswersTotal: stats.correctAnswersTotal + (isCorrect ? 1 : 0),
      wrongAnswersTotal: stats.wrongAnswersTotal + (isCorrect ? 0 : 1),
      questionsSolvedIds: newSolvedIds,
      // Gamification streak logic day update
      streakDays: stats.streakDays === 0 ? 1 : stats.streakDays
    };

    saveStatsToStorage(updatedStats);
  };

  // Save exam results
  const handleSaveExamAttempt = (attempt: QuizAttempt) => {
    const updatedAttempts = [attempt, ...attempts];
    saveAttemptsToStorage(updatedAttempts);

    // Compute metrics
    const correctCount = attempt.answers.filter(a => a.isCorrect).length;
    const wrongCount = attempt.totalQuestions - correctCount;

    // Union solved questions ids from the exam
    const newlySolvedIds = [...stats.questionsSolvedIds];
    attempt.answers.forEach((ans) => {
      if (ans.isCorrect && !newlySolvedIds.includes(ans.questionId)) {
        newlySolvedIds.push(ans.questionId);
      }
    });

    const updatedStats: UserStats = {
      ...stats,
      totalExamAttempts: stats.totalExamAttempts + 1,
      correctAnswersTotal: stats.correctAnswersTotal + correctCount,
      wrongAnswersTotal: stats.wrongAnswersTotal + wrongCount,
      questionsSolvedIds: newlySolvedIds,
      streakDays: stats.streakDays === 0 ? 1 : stats.streakDays
    };

    saveStatsToStorage(updatedStats);
  };

  // Nav to targeted Category Luyện Tập
  const handleSelectTopicFromDashboard = (topic: Category) => {
    setSelectedTopic(topic);
    setActiveTab("practice");
  };

  // Reset progress clear history helper
  const handleResetProgress = () => {
    if (window.confirm("Bạn có chắc chắn muốn đặt lại tất cả tiến trình ôn tập của mình không? Lịch sử thi thử sẽ bị xoá.")) {
      const resetStats: UserStats = {
        totalPractices: 0,
        totalExamAttempts: 0,
        correctAnswersTotal: 0,
        wrongAnswersTotal: 0,
        streakDays: 1,
        questionsSolvedIds: []
      };
      saveStatsToStorage(resetStats);
      saveAttemptsToStorage([]);
      setActiveTab("dashboard");
    }
  };

  // Formatting helper for duration minutes
  const formatDurationMinutes = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m} phút ${s} giây` : `${s} giây`;
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans text-[#1E293B] antialiased selection:bg-[#DBEAFE] selection:text-[#1E40AF]" id="uet-quiz-app">
      
      {/* Top Progress Bar */}
      <div className="w-full h-1 bg-[#E2E8F0] shrink-0">
        <div 
          className="h-full bg-[#3B82F6] shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-500"
          style={{ 
            width: activeTab === "dashboard" ? "20%" 
                 : activeTab === "study" ? "40%" 
                 : activeTab === "practice" ? "60%" 
                 : activeTab === "exam" ? "80%" 
                 : "100%" 
          }}
        />
      </div>

      {/* Upper Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] shadow-sm h-[72px] flex items-center shrink-0" id="app-header">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-[72px] items-center">
            
            {/* Logo area */}
            <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => { setActiveTab("dashboard"); setSelectedTopic(null); }}>
              <div className="bg-[#3B82F6] text-white p-2.5 rounded-xl flex items-center justify-center shadow-md">
                <BrainCircuit size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#0F172A] tracking-tight text-sm sm:text-base leading-none">
                    Tư Duy Tính Toán
                  </span>
                  <span className="bg-[#DBEAFE] text-[#1E40AF] text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-[#DBEAFE]/60">
                    UET
                  </span>
                </div>
                <p className="text-[10px] text-[#64748B] font-semibold mt-0.5 uppercase tracking-wide">Hệ thống ôn luyện trắc nghiệm</p>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex space-x-2" id="desktop-nav">
              <button
                onClick={() => { setActiveTab("dashboard"); setSelectedTopic(null); }}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeTab === "dashboard"
                    ? "bg-[#EFF6FF] border-[#3B82F6] text-[#1E40AF] font-bold shadow-[0_2px_8px_rgba(59,130,246,0.08)]"
                    : "bg-white border-transparent text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                }`}
                id="tab-dashboard"
              >
                <Compass size={16} /> Trang chủ
              </button>
              
              <button
                onClick={() => setActiveTab("study")}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeTab === "study"
                    ? "bg-[#EFF6FF] border-[#3B82F6] text-[#1E40AF] font-bold shadow-[0_2px_8px_rgba(59,130,246,0.08)]"
                    : "bg-white border-transparent text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                }`}
                id="tab-study"
              >
                <BookOpen size={16} /> Thư viện câu hỏi
              </button>

              <button
                onClick={() => { setActiveTab("practice"); setSelectedTopic(null); }}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeTab === "practice"
                    ? "bg-[#EFF6FF] border-[#3B82F6] text-[#1E40AF] font-bold shadow-[0_2px_8px_rgba(59,130,246,0.08)]"
                    : "bg-white border-transparent text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                }`}
                id="tab-practice"
              >
                <Zap size={16} /> Luyện chuyên đề
              </button>

              <button
                onClick={() => setActiveTab("exam")}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeTab === "exam"
                    ? "bg-[#EFF6FF] border-[#3B82F6] text-[#1E40AF] font-bold shadow-[0_2px_8px_rgba(59,130,246,0.08)]"
                    : "bg-white border-transparent text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                }`}
                id="tab-exam"
              >
                <Trophy size={16} /> Phòng thi thử
              </button>

              <button
                onClick={() => setActiveTab("history")}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeTab === "history"
                    ? "bg-[#EFF6FF] border-[#3B82F6] text-[#1E40AF] font-bold shadow-[0_2px_8px_rgba(59,130,246,0.08)]"
                    : "bg-white border-transparent text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                }`}
                id="tab-history"
              >
                <History size={16} /> Lịch sử làm bài
              </button>
            </nav>

            {/* Mobile Menu toggle button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#64748B] hover:text-[#0F172A] focus:outline-hidden"
                id="btn-mobile-toggle"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E2E8F0] bg-white px-2 py-3 space-y-1 shadow-md" id="mobile-nav">
            {[
              { id: "dashboard", label: "Trang chủ", icon: <Compass size={16} /> },
              { id: "study", label: "Thư viện bài học", icon: <BookOpen size={16} /> },
              { id: "practice", label: "Luyện chuyên đề", icon: <Zap size={16} /> },
              { id: "exam", label: "Phòng thi thử", icon: <Trophy size={16} /> },
              { id: "history", label: "Lịch sử thi", icon: <History size={16} /> }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === "practice") setSelectedTopic(null);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer border ${
                  activeTab === item.id 
                    ? "bg-[#EFF6FF] border-[#3B82F6] text-[#1E40AF] font-bold" 
                    : "bg-white border-transparent text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Container Stage Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8" id="scrolling-stage">
        
        {/* Render Dashboard tab */}
        {activeTab === "dashboard" && (
          <Dashboard
            questions={quizQuestions}
            stats={stats}
            onNavigate={(tab) => setActiveTab(tab)}
            onSelectCategory={handleSelectTopicFromDashboard}
          />
        )}

        {/* Render Study Cards tab */}
        {activeTab === "study" && (
          <StudyCards
            questions={quizQuestions}
            solvedIds={stats.questionsSolvedIds}
          />
        )}

        {/* Render Practice Zone tab */}
        {activeTab === "practice" && (
          <PracticeZone
            questions={quizQuestions}
            initialCategory={selectedTopic}
            onRecordAnswer={handleRecordPracticeAnswer}
            onNavigateHome={() => { setActiveTab("dashboard"); setSelectedTopic(null); }}
          />
        )}

        {/* Render Exam Arena tab */}
        {activeTab === "exam" && (
          <ExamArena
            questions={quizQuestions}
            onSaveAttempt={handleSaveExamAttempt}
          />
        )}

        {/* Render History tab */}
        {activeTab === "history" && (
          <div className="max-w-4xl mx-auto space-y-6" id="history-view">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] flex items-center gap-2">
                  <History className="text-[#3B82F6]" size={28} /> Lịch sử làm bài thi thử
                </h1>
                <p className="text-[#64748B] text-xs sm:text-sm mt-1 leading-relaxed">
                  Kiểm tra lại quá trình cải thiện điểm số và nhật ký làm bài trắc nghiệm của bản thân.
                </p>
              </div>

              {attempts.length > 0 && (
                <button
                  onClick={handleResetProgress}
                  className="text-xs text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl font-bold transition cursor-pointer border border-red-200/50 active:scale-95"
                  id="btn-reset-progress"
                >
                  Xoá tiến độ & Reset
                </button>
              )}
            </div>

            {/* List empty state */}
            {attempts.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-[#E2E8F0] shadow-sm space-y-5">
                <div className="bg-[#F8FAFC] text-slate-400 p-5 rounded-full w-20 h-20 flex items-center justify-center mx-auto border border-[#E2E8F0]/60">
                  <History size={36} />
                </div>
                <h3 className="font-extrabold text-[#0F172A] text-lg">Chưa có bài thi thử nào</h3>
                <p className="text-[#64748B] text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                  Hình ảnh bảng điểm trống. Hãy vào Phòng thi thử để thử sức bài làm 20 câu hỏi mô phỏng cấu trúc VNU-UET đầu tiên của bạn!
                </p>
                <button 
                  onClick={() => setActiveTab("exam")}
                  className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold px-6 py-3 rounded-xl transition cursor-pointer shadow-sm active:scale-95 inline-block"
                >
                  Vào phòng thi thử ngay
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4" id="attempts-list">
                {attempts.map((attempt) => {
                  const correctCount = attempt.answers.filter(a => a.isCorrect).length;
                  const ratio = correctCount / attempt.totalQuestions;
                  const grade = (ratio * 10).toFixed(1);
                  const isExcellent = ratio >= 0.8;

                  return (
                    <div 
                      key={attempt.id}
                      className="bg-white rounded-3xl border-2 border-[#E2E8F0] p-6.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#3B82F6] hover:shadow-[0_4px_14px_rgba(59,130,246,0.03)] transition duration-200"
                      id={`attempt-record-${attempt.id}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3.5 rounded-2xl flex-shrink-0 flex items-center justify-center border ${
                          isExcellent ? "bg-amber-50 text-amber-600 border-amber-200/50" : "bg-blue-50/50 text-[#1E40AF] border-[#DBEAFE]/50"
                        }`}>
                          <Award size={26} />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-extrabold text-[#0F172A] text-base">
                            Bài làm kiểm tra ngẫu nhiên
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#64748B] font-semibold">
                            <span className="flex items-center gap-1.5">
                              <Clock size={14} /> {new Date(attempt.timestamp).toLocaleString("vi-VN")}
                            </span>
                            <span className="flex items-center gap-1.5">
                              • {attempt.totalQuestions} câu hỏi
                            </span>
                            <span className="flex items-center gap-1.5">
                              • Làm trong {formatDurationMinutes(attempt.timeSpentSeconds)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Display grades and count */}
                      <div className="flex items-center gap-4 border-t sm:border-t-0 pt-3.5 sm:pt-0 border-[#E2E8F0] justify-between">
                        <div className="text-right sm:text-left">
                          <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Đạt điểm</p>
                          <h4 className="text-2xl font-black text-[#0F172A] mt-0.5">
                            {grade} <span className="text-sm text-[#94A3B8] font-normal">/ 10</span>
                          </h4>
                        </div>
                        <div className="bg-[#EFF6FF] border border-[#DBEAFE]/80 px-4 py-2 rounded-2xl text-center min-w-[76px]">
                          <p className="text-sm font-extrabold text-[#1E40AF]">
                            {correctCount}/{attempt.totalQuestions}
                          </p>
                          <p className="text-[9px] text-[#3B82F6] font-bold uppercase mt-0.5 tracking-wider">Đúng</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Decorative clean footer */}
      <footer className="border-t border-[#E2E8F0] bg-white py-8 mt-12" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#64748B] leading-relaxed">
          <div>
            <p className="font-black text-[#334155]">Trường Đại học Công nghệ - Đại học Quốc gia Hà Nội</p>
            <p className="mt-0.5 font-medium">Khoa Công nghệ thông tin • Tài liệu ôn tập trắc nghiệm Tư duy tính toán 2025–2026</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#6B21A8] font-bold bg-[#F3E8FF] border border-[#E9D5FF]/60 px-4 py-2 rounded-xl shadow-xs">
            <Sparkles size={14} className="text-purple-600 animate-pulse" /> Được tăng cường tự động bằng Gemini AI tóm tắt học thuật
          </div>
        </div>
      </footer>
    </div>
  );
}
