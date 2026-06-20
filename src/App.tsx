/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  BrainCircuit, BookOpen, Trophy, Compass, History, Zap, 
  Menu, X, Sparkles, Award, CheckCircle, Clock,
  AlertCircle, CheckCircle2, XCircle, ChevronDown, ChevronUp
} from "lucide-react";
import Horse from "./components/HorseIcon";

import { Category, QuizAttempt, UserStats } from "./types";
import { quizQuestions } from "./data/questions";
import { presetExamsList } from "./data/reviewExams";
import JupyterCell, { SmartQuestionText, getQuestionOptions } from "./components/JupyterCell";
import Dashboard from "./components/Dashboard";
import StudyCards from "./components/StudyCards";
import PracticeZone from "./components/PracticeZone";
import ExamArena from "./components/ExamArena";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<Category | null>(null);
  const [expandedAttemptId, setExpandedAttemptId] = useState<string | null>(null);
  const [isExamRunning, setIsExamRunning] = useState<boolean>(false);
  const [showExitWarningModal, setShowExitWarningModal] = useState<boolean>(false);
  const [pendingTab, setPendingTab] = useState<string | null>(null);
  const [isUetModeActive, setIsUetModeActive] = useState<boolean>(false);
  const [selectedAttemptForReview, setSelectedAttemptForReview] = useState<QuizAttempt | null>(null);

  const handleTabSwitch = (targetTab: string) => {
    if (isExamRunning && targetTab !== "exam") {
      setPendingTab(targetTab);
      setShowExitWarningModal(true);
      return;
    }
    setActiveTab(targetTab);
    setSelectedAttemptForReview(null);
    setIsUetModeActive(false);
    if (targetTab === "practice") {
      setSelectedTopic(null);
    }
  };

  const handleAutoSubmitAndLeave = () => {
    const savedActiveExam = localStorage.getItem("uet_ct_active_exam");
    if (savedActiveExam) {
      try {
        const parsed = JSON.parse(savedActiveExam);
        if (parsed && parsed.examQuestions && parsed.examQuestions.length > 0) {
          const examQuestions = parsed.examQuestions;
          const answers = parsed.answers || {};
          const initialTimeLimit = parsed.initialTimeLimit || 3600;
          const timeLeft = parsed.timeLeft || 0;
          const selectedPresetId = parsed.selectedPresetId || null;

          let correctCount = 0;
          const records = examQuestions.map((q: any) => {
            const userAnswerIndex = answers[q.id];
            const isCorrect = userAnswerIndex === q.correctAnswerIndex;
            if (isCorrect) correctCount++;
            
            return {
              questionId: q.id,
              userAnswerIndex: userAnswerIndex === undefined ? -1 : userAnswerIndex,
              isCorrect
            };
          });

          const attempt: QuizAttempt = {
            id: "attempt_" + Date.now(),
            timestamp: Date.now(),
            score: correctCount,
            totalQuestions: examQuestions.length,
            timeSpentSeconds: initialTimeLimit - timeLeft,
            isCustomPractice: false,
            categoryName: selectedPresetId 
              ? presetExamsList.find(p => p.id === selectedPresetId)?.title || "Đề thi thử hệ thống"
              : `Thi Thử (${examQuestions.length} câu / ${Math.round(initialTimeLimit / 60)} phút)`,
            answers: records
          };

          handleSaveExamAttempt(attempt);
        }
      } catch (e) {
        console.error("Error auto-submitting current exam before leaving", e);
      }
    }
    localStorage.removeItem("uet_ct_active_exam");
    setIsExamRunning(false);
    if (pendingTab) {
      setActiveTab(pendingTab);
      if (pendingTab === "practice") {
        setSelectedTopic(null);
      }
    }
    setShowExitWarningModal(false);
  };

  // Stats and history persistent states
  const [stats, setStats] = useState<UserStats>({
    totalPractices: 0,
    totalExamAttempts: 0,
    correctAnswersTotal: 0,
    wrongAnswersTotal: 0,
    streakDays: 3, // Initial value
    questionsSolvedIds: [],
    wrongQuestionIds: []
  });
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  // Load from local storage and verify streak
  useEffect(() => {
    const savedStats = localStorage.getItem("uet_ct_stats");
    const savedAttempts = localStorage.getItem("uet_ct_attempts");
    const savedBookmarks = localStorage.getItem("uet_ct_bookmarked_ids");

    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats) as UserStats;
        const now = Date.now();
        if (parsed.lastQuizTimestamp) {
          const elapsed = now - parsed.lastQuizTimestamp;
          if (elapsed > 24 * 60 * 60 * 1000) {
            // Over 24 hours without completed quiz: reset streak to 0
            parsed.streakDays = 0;
            localStorage.setItem("uet_ct_stats", JSON.stringify(parsed));
          }
        } else {
          // Fallback if streak exists but timestamp is missing
          if (parsed.streakDays > 0) {
            parsed.lastQuizTimestamp = Date.now();
            localStorage.setItem("uet_ct_stats", JSON.stringify(parsed));
          }
        }
        setStats(parsed);
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
    if (savedBookmarks) {
      try {
        setBookmarkedIds(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error("Error parsing bookmarks", e);
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

  // Toggle bookmarked state
  const handleToggleBookmark = (questionId: number) => {
    const updated = bookmarkedIds.includes(questionId)
      ? bookmarkedIds.filter((id) => id !== questionId)
      : [...bookmarkedIds, questionId];
    setBookmarkedIds(updated);
    localStorage.setItem("uet_ct_bookmarked_ids", JSON.stringify(updated));
  };

  // Calculate updated streak days and timestamp
  const calculateStreakUpdate = (currentStats: UserStats, now: number): { streakDays: number; lastQuizTimestamp: number } => {
    const lastQuizTime = currentStats.lastQuizTimestamp;
    if (!lastQuizTime) {
      return { streakDays: 1, lastQuizTimestamp: now };
    }
    const elapsed = now - lastQuizTime;
    if (elapsed > 24 * 60 * 60 * 1000) {
      // More than 24 hours: reset to 1 (new streak start)
      return { streakDays: 1, lastQuizTimestamp: now };
    } else if (elapsed >= 12 * 60 * 60 * 1000) {
      // Between 12 and 24 hours: increment
      return { streakDays: currentStats.streakDays + 1, lastQuizTimestamp: now };
    } else {
      // safe within 12 hours: keep streak same, but update timestamp to slide window forward
      return { streakDays: currentStats.streakDays || 1, lastQuizTimestamp: now };
    }
  };

  // Record stats after submitting answers in practice zone
  const handleRecordPracticeAnswer = (questionId: number, isCorrect: boolean) => {
    const newSolvedIds = stats.questionsSolvedIds.includes(questionId)
      ? stats.questionsSolvedIds
      : [...stats.questionsSolvedIds, questionId];

    let currentWrongIds = [...(stats.wrongQuestionIds || [])];
    if (isCorrect) {
      currentWrongIds = currentWrongIds.filter(id => id !== questionId);
    } else {
      if (!currentWrongIds.includes(questionId)) {
        currentWrongIds.push(questionId);
      }
    }

    const now = Date.now();
    const streakInfo = calculateStreakUpdate(stats, now);

    const updatedStats: UserStats = {
      ...stats,
      totalPractices: stats.totalPractices + 1,
      correctAnswersTotal: stats.correctAnswersTotal + (isCorrect ? 1 : 0),
      wrongAnswersTotal: stats.wrongAnswersTotal + (isCorrect ? 0 : 1),
      questionsSolvedIds: newSolvedIds,
      wrongQuestionIds: currentWrongIds,
      streakDays: streakInfo.streakDays,
      lastQuizTimestamp: streakInfo.lastQuizTimestamp,
      lastActiveDate: new Date(now).toISOString()
    };

    saveStatsToStorage(updatedStats);
  };

  // Save exam results
  const handleSaveExamAttempt = (attempt: QuizAttempt) => {
    const updatedAttempts = [attempt, ...(attempts || [])];
    saveAttemptsToStorage(updatedAttempts);

    // Compute metrics
    const correctCount = attempt.answers.filter(a => a.isCorrect).length;
    const wrongCount = attempt.totalQuestions - correctCount;

    // Union solved questions ids from the exam
    const newlySolvedIds = [...(stats?.questionsSolvedIds || [])];
    attempt.answers.forEach((ans) => {
      if (ans.isCorrect && !newlySolvedIds.includes(ans.questionId)) {
        newlySolvedIds.push(ans.questionId);
      }
    });

    const currentWrongIds = [...(stats?.wrongQuestionIds || [])];
    attempt.answers.forEach((ans) => {
      if (ans.isCorrect) {
        // If correct now, remove from wrong list
        const index = currentWrongIds.indexOf(ans.questionId);
        if (index > -1) {
          currentWrongIds.splice(index, 1);
        }
      } else {
        // If wrong, add to wrong list if not already there
        if (!currentWrongIds.includes(ans.questionId)) {
          currentWrongIds.push(ans.questionId);
        }
      }
    });

    const now = Date.now();
    const streakInfo = calculateStreakUpdate(stats, now);

    const updatedStats: UserStats = {
      totalPractices: stats?.totalPractices || 0,
      totalExamAttempts: (stats?.totalExamAttempts || 0) + 1,
      correctAnswersTotal: (stats?.correctAnswersTotal || 0) + correctCount,
      wrongAnswersTotal: (stats?.wrongAnswersTotal || 0) + wrongCount,
      questionsSolvedIds: newlySolvedIds,
      wrongQuestionIds: currentWrongIds,
      streakDays: streakInfo.streakDays,
      lastQuizTimestamp: streakInfo.lastQuizTimestamp,
      lastActiveDate: new Date(now).toISOString()
    };

    saveStatsToStorage(updatedStats);
  };

  // Nav to targeted Category Luyện Tập
  const handleSelectTopicFromDashboard = (topic: Category) => {
    setSelectedTopic(topic);
    handleTabSwitch("practice");
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
        questionsSolvedIds: [],
        wrongQuestionIds: []
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
      {!isExamRunning && (
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
      )}

      {/* Upper Navigation Bar */}
      {!isExamRunning && (
        <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] shadow-sm h-[72px] flex items-center shrink-0" id="app-header">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-[72px] items-center">
            
            {/* Logo area */}
            <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => handleTabSwitch("dashboard")}>
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
                onClick={() => handleTabSwitch("dashboard")}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeTab === "dashboard"
                    ? "bg-[#EFF6FF] border-[#3B82F6] text-[#1E40AF] font-bold shadow-[0_2px_8px_rgba(59,130,246,0.08)]"
                    : "bg-white border-transparent text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                } ${isExamRunning && activeTab !== "exam" ? "opacity-45 cursor-not-allowed" : ""}`}
                id="tab-dashboard"
              >
                <Compass size={16} /> Trang chủ
              </button>
              
              <button
                onClick={() => handleTabSwitch("study")}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeTab === "study"
                    ? "bg-[#EFF6FF] border-[#3B82F6] text-[#1E40AF] font-bold shadow-[0_2px_8px_rgba(59,130,246,0.08)]"
                    : "bg-white border-transparent text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                } ${isExamRunning && activeTab !== "exam" ? "opacity-45 cursor-not-allowed" : ""}`}
                id="tab-study"
              >
                <BookOpen size={16} /> Thư viện câu hỏi
              </button>

              <button
                onClick={() => handleTabSwitch("practice")}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeTab === "practice"
                    ? "bg-[#EFF6FF] border-[#3B82F6] text-[#1E40AF] font-bold shadow-[0_2px_8px_rgba(59,130,246,0.08)]"
                    : "bg-white border-transparent text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                } ${isExamRunning && activeTab !== "exam" ? "opacity-45 cursor-not-allowed" : ""}`}
                id="tab-practice"
              >
                <Zap size={16} /> Luyện chuyên đề
              </button>

              <button
                onClick={() => handleTabSwitch("exam")}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeTab === "exam"
                    ? "bg-[#EFF6FF] border-[#3B82F6] text-[#1E40AF] font-bold shadow-[0_2px_8px_rgba(59,130,246,0.08)]"
                    : "bg-white border-transparent text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                }`}
                id="tab-exam"
              >
                <Trophy size={16} /> Phòng thi thử {isExamRunning && <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse inline-block ml-0.5" />}
              </button>

              <button
                onClick={() => handleTabSwitch("history")}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeTab === "history"
                    ? "bg-[#EFF6FF] border-[#3B82F6] text-[#1E40AF] font-bold shadow-[0_2px_8px_rgba(59,130,246,0.08)]"
                    : "bg-white border-transparent text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                } ${isExamRunning && activeTab !== "exam" ? "opacity-45 cursor-not-allowed" : ""}`}
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
                  handleTabSwitch(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer border ${
                  activeTab === item.id 
                    ? "bg-[#EFF6FF] border-[#3B82F6] text-[#1E40AF] font-bold" 
                    : "bg-white border-transparent text-[#64748B] hover:text-[#0F172A]"
                } ${isExamRunning && item.id !== "exam" ? "opacity-45 cursor-not-allowed" : ""}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>
      )}

      {/* Main Container Stage Body */}
      <main className={`flex-1 w-full ${isUetModeActive ? "p-0 max-w-none bg-[#F8FAFC]" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"}`} id="scrolling-stage">
        
        {selectedAttemptForReview ? (
          <ExamArena
            questions={quizQuestions}
            onSaveAttempt={() => {}}
            initialReviewAttempt={selectedAttemptForReview}
            onCloseReview={() => {
              setSelectedAttemptForReview(null);
            }}
            setIsUetModeActive={setIsUetModeActive}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedIds={bookmarkedIds}
          />
        ) : (
          <>
            {/* Render Dashboard tab */}
            {activeTab === "dashboard" && (
          <Dashboard
            questions={quizQuestions}
            stats={stats}
            onNavigate={(tab) => handleTabSwitch(tab)}
            onSelectCategory={handleSelectTopicFromDashboard}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {/* Render Study Cards tab */}
        {activeTab === "study" && (
          <StudyCards
            questions={quizQuestions}
            solvedIds={stats.questionsSolvedIds}
            wrongQuestionIds={stats.wrongQuestionIds || []}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {/* Render Practice Zone tab */}
        {activeTab === "practice" && (
          <PracticeZone
            questions={quizQuestions}
            initialCategory={selectedTopic}
            onRecordAnswer={handleRecordPracticeAnswer}
            onNavigateHome={() => handleTabSwitch("dashboard")}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            wrongQuestionIds={stats.wrongQuestionIds || []}
            setIsUetModeActive={setIsUetModeActive}
          />
        )}

        {/* Render Exam Arena tab */}
        {activeTab === "exam" && (
          <ExamArena
            questions={quizQuestions}
            onSaveAttempt={handleSaveExamAttempt}
            onExamStatusChange={setIsExamRunning}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedIds={bookmarkedIds}
            setIsUetModeActive={setIsUetModeActive}
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
                  const isExpanded = expandedAttemptId === attempt.id;

                  // Find original questions to render review details
                  const allPossibleQuestions = [...quizQuestions];
                  presetExamsList.forEach(p => {
                    p.questions.forEach(q => {
                      if (!allPossibleQuestions.some(item => item.id === q.id)) {
                        allPossibleQuestions.push(q);
                      }
                    });
                  });

                  return (
                    <div 
                      key={attempt.id}
                      onClick={() => setSelectedAttemptForReview(attempt)}
                      className="bg-white rounded-3xl border-2 border-[#E2E8F0] overflow-hidden transition-all duration-200 hover:border-[#3B82F6] hover:shadow-md cursor-pointer group"
                      id={`attempt-record-${attempt.id}`}
                    >
                      {/* Summary Row */}
                      <div className="p-6.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3.5 rounded-2xl flex-shrink-0 flex items-center justify-center border transition-colors group-hover:bg-[#EFF6FF] ${
                            isExcellent ? "bg-amber-50 text-amber-600 border-amber-200/50" : "bg-blue-50/50 text-[#1E40AF] border-[#DBEAFE]/50"
                          }`}>
                            <Award size={26} />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-extrabold text-[#0F172A] text-base leading-tight group-hover:text-blue-600 transition-colors">
                              {attempt.categoryName || "Bài làm kiểm tra ngẫu nhiên"}
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
                              {attempt.viewMode === "uet" && (
                                <span className="flex items-center gap-1 text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-bold uppercase tracking-wide border border-slate-200">
                                  Thi thật 100%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Display grades, count, and action controls */}
                        <div className="flex items-center gap-4 border-t md:border-t-0 pt-3.5 md:pt-0 border-[#E2E8F0] justify-between shrink-0" onClick={(e) => e.stopPropagation()}>
                          <div className="text-right md:text-left">
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

                          <button
                            onClick={() => setSelectedAttemptForReview(attempt)}
                            className="text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-xl transition cursor-pointer active:scale-95 shadow-sm inline-flex items-center gap-1"
                          >
                            Xem kết quả
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        </>
        )}
      </main>

      {/* Exit Warning Modal while exam is running */}
      {showExitWarningModal && (
        <div className="fixed inset-0 bg-[#0F172A]/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in animate-duration-200" id="exit-warning-modal">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl relative" id="exit-warning-content">
            
            <div className="text-center space-y-3">
              <div className="mx-auto w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 shadow-inner">
                <AlertCircle size={30} />
              </div>
              <h3 className="text-xl font-black text-slate-900">Bạn Đang Trong Phòng Thi Thử!</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Để bảo đảm kết quả trung thực học thuật, bạn không nên chuyển phân mục chính khi chưa nộp bài.
              </p>
              <div className="bg-amber-50 rounded-2xl p-4 text-left border border-amber-100 text-[11px] sm:text-xs text-amber-800 leading-relaxed space-y-1">
                <p className="font-extrabold uppercase tracking-wider text-[10px] text-amber-900">★ Tiến trình tự động lưu:</p>
                <p>Mọi câu trả lời của bạn đã được hệ thống <strong>tự động sao lưu an toàn</strong> trong bộ nhớ. Bạn có thể tạm dừng để chuyển trang và quay trở lại tiếp tục làm sau.</p>
              </div>
            </div>

            {/* Modal actions */}
            <div className="flex flex-col gap-2.5 pt-2" id="exit-warning-actions">
              <button
                type="button"
                onClick={() => {
                  setShowExitWarningModal(false);
                }}
                className="w-full bg-[#1E293B] hover:bg-[#0F172A] text-white font-extrabold py-3 rounded-xl text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shadow-md shadow-slate-900/10"
              >
                Tiếp tục tập trung làm bài
              </button>
              
              <button
                type="button"
                onClick={handleAutoSubmitAndLeave}
                className="w-full bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 text-emerald-800 hover:text-emerald-900 font-extrabold py-3 rounded-xl text-xs sm:text-sm transition cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
              >
                Nộp bài & Rời phòng thi
              </button>
            </div>

          </div>
        </div>
      )}

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
