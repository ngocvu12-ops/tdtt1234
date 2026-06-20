/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, Filter, ChevronDown, ChevronUp, BookOpen, 
  HelpCircle, Eye, EyeOff, CheckCircle, AlertCircle
} from "lucide-react";
import Horse from "./HorseIcon";
import { Category, Question } from "../types";
import JupyterCell, { SmartQuestionText, getQuestionOptions } from "./JupyterCell";

interface StudyCardsProps {
  questions: Question[];
  solvedIds: number[];
  wrongQuestionIds?: number[];
  bookmarkedIds: number[];
  onToggleBookmark: (id: number) => void;
}

export default function StudyCards({ 
  questions, 
  solvedIds,
  wrongQuestionIds = [],
  bookmarkedIds = [],
  onToggleBookmark
}: StudyCardsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(null);
  const [revealAnswerId, setRevealAnswerId] = useState<Record<number, boolean>>({});
  const [activeLibraryTab, setActiveLibraryTab] = useState<"all" | "bookmarked" | "wrong">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto clear toast notification
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Filter and search logic
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch = 
        q.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (q.codeSnippet && q.codeSnippet.toLowerCase().includes(searchTerm.toLowerCase())) ||
        q.explanation.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat = selectedCategory === "all" || q.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [questions, searchTerm, selectedCategory]);

  const toggleExpand = (id: number) => {
    setExpandedQuestionId(expandedQuestionId === id ? null : id);
  };

  const toggleReveal = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealAnswerId((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get only bookmarked questions, grouped by category
  const bookmarkedCategories = useMemo(() => {
    return Object.values(Category).filter(cat => 
      questions.some(q => q.category === cat && bookmarkedIds.includes(q.id))
    );
  }, [questions, bookmarkedIds]);

  // Get wrong questions, grouped by category
  const wrongQuestions = useMemo(() => {
    return questions.filter(q => wrongQuestionIds.includes(q.id));
  }, [questions, wrongQuestionIds]);

  const wrongCategories = useMemo(() => {
    return Object.values(Category).filter(cat => 
      wrongQuestions.some(q => q.category === cat)
    );
  }, [wrongQuestions]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto" id="study-cards-view">
      {/* Intro Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-5" id="library-header-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-3xl font-black text-[#0F172A] flex items-center gap-2">
              <BookOpen className="text-[#3B82F6]" size={28} /> Thư viện câu hỏi ôn luyện
            </h1>
            <p className="text-[#64748B] text-xs sm:text-sm mt-1">
              Tra cứu nhanh và tự ôn luyện {questions.length} câu hỏi chuẩn cấu trúc VNU-UET theo tốc độ cá nhân.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#1E40AF] bg-[#EFF6FF] px-3.5 py-2 rounded-xl border border-[#DBEAFE] font-semibold self-start md:self-center">
            <CheckCircle className="text-[#3B82F6]" size={16} /> Đã làm: <strong>{solvedIds.length}</strong>/{questions.length} câu
          </div>
        </div>
      </div>

      {/* Tabs list to toggle between All, Bookmarked, and Incorrect */}
      <div className="flex flex-wrap border-b border-[#E2E8F0] gap-4 sm:gap-6" id="library-tabs">
        <button
          onClick={() => setActiveLibraryTab("all")}
          className={`pb-3 font-bold text-xs sm:text-base cursor-pointer transition relative ${
            activeLibraryTab === "all"
              ? "text-[#3B82F6] border-b-2 border-[#3B82F6] font-extrabold"
              : "text-[#64748B] hover:text-[#0F172A]"
          }`}
          id="tab-all-questions"
        >
          Tất cả câu hỏi ({questions.length})
        </button>
        <button
          onClick={() => setActiveLibraryTab("bookmarked")}
          className={`pb-3 font-bold text-xs sm:text-base cursor-pointer transition flex items-center gap-1.5 relative ${
            activeLibraryTab === "bookmarked"
              ? "text-amber-600 border-b-2 border-amber-500 font-extrabold"
              : "text-[#64748B] hover:text-amber-600"
          }`}
          id="tab-bookmarked-questions"
        >
          <Horse size={16} className={bookmarkedIds.length > 0 ? "text-amber-500 fill-amber-500/20" : ""} />
          Câu hỏi đã đánh dấu ({bookmarkedIds.length})
        </button>
        <button
          onClick={() => setActiveLibraryTab("wrong")}
          className={`pb-3 font-bold text-xs sm:text-base cursor-pointer transition flex items-center gap-1.5 relative ${
            activeLibraryTab === "wrong"
              ? "text-rose-600 border-b-2 border-rose-500 font-extrabold"
              : "text-[#64748B] hover:text-rose-600"
          }`}
          id="tab-wrong-questions"
        >
          <AlertCircle size={15} className={wrongQuestions.length > 0 ? "text-rose-500 fill-rose-500/10" : ""} />
          Câu hỏi làm sai ({wrongQuestions.length})
        </button>
      </div>

      {activeLibraryTab === "bookmarked" ? (
        <div className="space-y-8" id="bookmarked-library-view">
          {bookmarkedIds.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
              <div className="bg-amber-50 text-amber-500 p-5 rounded-full w-20 h-20 flex items-center justify-center mx-auto border border-amber-200">
                <Horse size={36} />
              </div>
              <h3 className="font-extrabold text-[#0F172A] text-lg">Chưa có câu hỏi nào được đánh dấu</h3>
              <p className="text-[#64748B] text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                Khi ôn luyện các câu trắc nghiệm, hãy bấm biểu tượng hình con ngựa 🐴 trên thẻ câu hỏi để lưu và nhóm chúng lại theo từng chủ đề tại đây nhé!
              </p>
            </div>
          ) : (
            bookmarkedCategories.map((cat, catIdx) => {
              const catQuestions = questions.filter(
                (q) => q.category === cat && bookmarkedIds.includes(q.id)
              );
              return (
                <div key={cat} className="space-y-4" id={`bookmarked-cat-group-${catIdx}`}>
                  {/* Category Group Header */}
                  <div className="flex items-center gap-2 border-l-4 border-amber-500 pl-3 border-amber-500">
                    <h2 className="text-base sm:text-lg font-black text-slate-800 uppercase tracking-tight">
                      {cat}
                    </h2>
                    <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {catQuestions.length} câu đã lưu
                    </span>
                  </div>

                  {/* List of cards belonging to this category */}
                  <div className="grid grid-cols-1 gap-4">
                    {catQuestions.map((q) => {
                      const isExpanded = expandedQuestionId === q.id;
                      const isRevealed = revealAnswerId[q.id] || false;
                      const isSolved = solvedIds.includes(q.id);

                      return (
                        <div 
                          key={q.id}
                          className={`bg-white rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                            isExpanded ? "border-[#3B82F6] shadow-md ring-4 ring-[#EFF6FF] ml-0 scale-[1.002]" : "border-[#E2E8F0] hover:border-[#3B82F6] shadow-xs"
                          }`}
                          onClick={() => toggleExpand(q.id)}
                          id={`study-card-${q.id}`}
                        >
                          {/* Header Information */}
                          <div className="p-5 flex items-start gap-4 justify-between" id={`study-card-header-${q.id}`}>
                            <div className="space-y-2">
                              <div className="flex flex-wrap gap-2 items-center border-b border-[#E2E8F0]/30 pb-2 mb-2 w-full">
                                <span className="bg-[#DBEAFE] text-[#1E40AF] text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-md border border-[#DBEAFE]/40">
                                  {q.category}
                                </span>
                                {isSolved && (
                                  <span className="bg-emerald-50 text-emerald-800 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1 border border-emerald-100">
                                    <CheckCircle size={10} /> Đã luyện
                                  </span>
                                )}
                                <span className="text-xs text-[#94A3B8] font-mono font-semibold">ID: #{q.id}</span>
                              </div>
                              <div className="font-extrabold text-[#0F172A] text-sm sm:text-base leading-relaxed pt-1">
                                {isExpanded ? (
                                  <SmartQuestionText 
                                    text={q.questionText}
                                    questionId={q.id}
                                    isInteractive={true}
                                    output={q.options[q.correctAnswerIndex]?.replace(/^[A-D]\.\s*/, "")}
                                    showOutputByDefault={isRevealed}
                                  />
                                ) : (
                                  <span>{q.questionText.split("\n")[0]}</span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0 pt-1">
                              {/* Horse Bookmark Toggler */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleBookmark?.(q.id);
                                }}
                                className={`p-2 rounded-xl transition border cursor-pointer ${
                                  bookmarkedIds.includes(q.id)
                                    ? "bg-amber-100 border-amber-300 text-amber-600 hover:bg-amber-200"
                                    : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9]"
                                }`}
                                title="Bỏ đánh dấu"
                              >
                                <Horse className="text-amber-500 fill-amber-500" size={16} />
                              </button>

                              <button
                                onClick={(e) => toggleReveal(q.id, e)}
                                className={`p-2 rounded-xl transition border cursor-pointer ${
                                  isRevealed 
                                    ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100" 
                                    : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9]"
                                }`}
                                title={isRevealed ? "Ẩn đáp án" : "Hiện nhanh đáp án"}
                              >
                                {isRevealed ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                              <div className="text-[#94A3B8]">
                                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                              </div>
                            </div>
                          </div>

                          {/* Body details */}
                          {isExpanded && (
                            <div className="border-t border-[#E2E8F0] bg-[#F8FAFC] p-5 space-y-4">
                              {/* Code Snippet if exists */}
                              {q.codeSnippet && (
                                <JupyterCell 
                                  code={q.codeSnippet} 
                                  cellNumber={q.id} 
                                  isInteractive={true}
                                  output={q.options[q.correctAnswerIndex]?.replace(/^[A-D]\.\s*/, "")}
                                  showOutputByDefault={isRevealed}
                                />
                              )}

                              {/* Multiple choices option list */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                {getQuestionOptions(q.options).map((option, optIdx) => {
                                  const isCorrect = optIdx === q.correctAnswerIndex;
                                  const shouldHighlight = isRevealed && isCorrect;

                                  let bgStyle = "bg-white border-slate-200 text-[#1E293B]";
                                  let badgeStyle = "bg-[#E2E8F0]/50 border-[#E2E8F0] text-slate-800";

                                  if (shouldHighlight) {
                                    bgStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold border-2 shadow-xs scale-[1.01]";
                                    badgeStyle = "bg-emerald-500 border-emerald-600 text-white";
                                  } else if (isRevealed) {
                                    bgStyle = "bg-slate-50/30 border-slate-100 text-slate-400 opacity-60";
                                    badgeStyle = "border-slate-200 text-slate-400 bg-slate-100";
                                  }

                                  return (
                                    <div
                                      key={optIdx}
                                      className={`p-4 rounded-2xl border text-xs sm:text-sm duration-200 flex items-center gap-3 ${bgStyle}`}
                                    >
                                      <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-sans font-bold text-xs shrink-0 ${badgeStyle}`}>
                                        {String.fromCharCode(65 + optIdx)}
                                      </span>
                                      <span className="font-semibold">{option.replace(/^[A-H]\.\s*/i, "")}</span>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Detailed explanation area */}
                              {isRevealed ? (
                                <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 space-y-2 mt-4 shadow-xs">
                                  <h4 className="text-xs font-black text-[#065F46] uppercase tracking-wider flex items-center gap-1.5">
                                    <CheckCircle size={14} /> Đáp án đúng & Lời giải chi tiết:
                                  </h4>
                                  <p className="text-[#1E293B] text-xs sm:text-sm leading-relaxed font-normal">
                                    {q.explanation}
                                  </p>
                                </div>
                              ) : (
                                <div className="text-center py-2.5 border border-dashed border-[#E2E8F0] rounded-xl bg-white/50">
                                  <button
                                    onClick={(e) => toggleReveal(q.id, e)}
                                    className="text-xs text-[#3B82F6] hover:text-[#1E40AF] font-bold flex items-center gap-1 mx-auto cursor-pointer active:scale-95 transition"
                                  >
                                    <Eye size={12} /> Nhấp để kiểm tra phương án đúng & phân tích chi tiết
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : activeLibraryTab === "wrong" ? (
        <div className="space-y-8" id="wrong-library-view">
          {wrongQuestions.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4 animate-fade-in">
              <div className="bg-emerald-50 text-emerald-500 p-5 rounded-full w-20 h-20 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle size={36} />
              </div>
              <h3 className="font-extrabold text-[#0D9488] text-lg">Tuyệt vời! Bạn không có câu hỏi làm sai nào</h3>
              <p className="text-[#64748B] text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                Khi luyện tập đề thi thử hoặc các câu chuyên đề, nếu trả lời sai, câu hỏi sẽ tự động hiển thị ở đây để bạn rà soát lại và sửa lầm!
              </p>
            </div>
          ) : (
            wrongCategories.map((cat, catIdx) => {
              const catQuestions = questions.filter(
                (q) => q.category === cat && wrongQuestionIds.includes(q.id)
              );
              return (
                <div key={cat} className="space-y-4" id={`wrong-cat-group-${catIdx}`}>
                  {/* Category Group Header */}
                  <div className="flex items-center gap-2 border-l-4 border-rose-500 pl-3">
                    <h2 className="text-base sm:text-lg font-black text-rose-800 uppercase tracking-tight">
                      {cat}
                    </h2>
                    <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {catQuestions.length} câu làm sai
                    </span>
                  </div>

                  {/* List of cards belonging to this category */}
                  <div className="grid grid-cols-1 gap-4">
                    {catQuestions.map((q) => {
                      const isExpanded = expandedQuestionId === q.id;
                      const isRevealed = revealAnswerId[q.id] || false;
                      const isSolved = solvedIds.includes(q.id);

                      return (
                        <div 
                          key={q.id}
                          className={`bg-white rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                            isExpanded ? "border-rose-450 shadow-md ring-4 ring-rose-50 ml-0 scale-[1.002]" : "border-[#E2E8F0] hover:border-[#E2E8F0] shadow-xs"
                          }`}
                          onClick={() => toggleExpand(q.id)}
                          id={`wrong-study-card-${q.id}`}
                        >
                          {/* Header Information */}
                          <div className="p-5 flex items-start gap-4 justify-between" id={`wrong-study-card-header-${q.id}`}>
                            <div className="space-y-2">
                              <div className="flex flex-wrap gap-2 items-center">
                                <span className="bg-[#DBEAFE] text-[#1E40AF] text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-md border border-[#DBEAFE]/40">
                                  {q.category}
                                </span>
                                <span className="text-xs text-[#94A3B8] font-mono font-semibold">ID: #{q.id}</span>
                              </div>
                              <div className="font-extrabold text-[#0F172A] text-sm sm:text-base leading-relaxed pt-1">
                                {isExpanded ? (
                                  <SmartQuestionText 
                                    text={q.questionText}
                                    questionId={q.id}
                                    isInteractive={true}
                                    output={q.options[q.correctAnswerIndex]?.replace(/^[A-D]\.\s*/, "")}
                                    showOutputByDefault={isRevealed}
                                  />
                                ) : (
                                  <span>{q.questionText.split("\n")[0]}</span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0 pt-1">
                              {/* Horse Bookmark Toggler */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!bookmarkedIds.includes(q.id) && !isRevealed) {
                                    setToastMessage("Bạn rồ chưa trả lời/xem đáp án câu hỏi này! Hãy nhấn biểu hiện xem đáp án trước chi tiết mới được phép đánh dấu.");
                                    return;
                                  }
                                  onToggleBookmark?.(q.id);
                                }}
                                className={`p-2 rounded-xl transition border cursor-pointer ${
                                  bookmarkedIds.includes(q.id)
                                    ? "bg-amber-100 border-amber-300 text-amber-600 hover:bg-amber-200 animate-pulse"
                                    : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9]"
                                }`}
                                title="Đánh dấu câu hỏi hình con ngựa"
                              >
                                <Horse className={bookmarkedIds.includes(q.id) ? "text-amber-500 fill-amber-500" : "text-slate-400"} size={16} />
                              </button>

                              <button
                                onClick={(e) => toggleReveal(q.id, e)}
                                className={`p-2 rounded-xl transition border cursor-pointer ${
                                  isRevealed 
                                    ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100" 
                                    : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9]"
                                }`}
                                title={isRevealed ? "Ẩn đáp án" : "Hiện nhanh đáp án"}
                              >
                                {isRevealed ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                              <div className="text-[#94A3B8]">
                                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                              </div>
                            </div>
                          </div>

                          {/* Body details */}
                          {isExpanded && (
                            <div className="border-t border-[#E2E8F0] bg-[#F8FAFC] p-5 space-y-4">
                              {/* Code Snippet if exists */}
                              {q.codeSnippet && (
                                <JupyterCell 
                                  code={q.codeSnippet} 
                                  cellNumber={q.id} 
                                  isInteractive={true}
                                  output={q.options[q.correctAnswerIndex]?.replace(/^[A-D]\.\s*/, "")}
                                  showOutputByDefault={isRevealed}
                                />
                              )}

                              {/* Multiple choices option list */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                {getQuestionOptions(q.options).map((option, optIdx) => {
                                  const isCorrect = optIdx === q.correctAnswerIndex;
                                  const shouldHighlight = isRevealed && isCorrect;

                                  let bgStyle = "bg-white border-slate-200 text-[#1E293B]";
                                  let badgeStyle = "bg-[#E2E8F0]/50 border-slate-200 text-slate-800";

                                  if (shouldHighlight) {
                                    bgStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold border-2 shadow-xs scale-[1.01]";
                                    badgeStyle = "bg-emerald-500 border-emerald-600 text-white";
                                  } else if (isRevealed) {
                                    bgStyle = "bg-slate-50/30 border-slate-100 text-slate-400 opacity-60";
                                    badgeStyle = "border-slate-200 text-slate-400 bg-slate-100";
                                  }

                                  return (
                                    <div
                                      key={optIdx}
                                      className={`p-4 rounded-2xl border text-xs sm:text-sm duration-200 flex items-center gap-3 ${bgStyle}`}
                                    >
                                      <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-sans font-bold text-xs shrink-0 ${badgeStyle}`}>
                                        {String.fromCharCode(65 + optIdx)}
                                      </span>
                                      <span className="font-semibold">{option.replace(/^[A-H]\.\s*/i, "")}</span>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Detailed explanation area */}
                              {isRevealed ? (
                                <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 space-y-2 mt-4 shadow-xs">
                                  <h4 className="text-xs font-black text-[#065F46] uppercase tracking-wider flex items-center gap-1.5">
                                    <CheckCircle size={14} /> Đáp án đúng & Lời giải chi tiết:
                                  </h4>
                                  <p className="text-[#1E293B] text-xs sm:text-sm leading-relaxed font-normal">
                                    {q.explanation}
                                  </p>
                                </div>
                              ) : (
                                <div className="text-center py-2.5 border border-dashed border-[#E2E8F0] rounded-xl bg-white/50">
                                  <button
                                    onClick={(e) => toggleReveal(q.id, e)}
                                    className="text-xs text-[#3B82F6] hover:text-[#1E40AF] font-bold flex items-center gap-1 mx-auto cursor-pointer active:scale-95 transition"
                                  >
                                    <Eye size={12} /> Nhấp để kiểm tra phương án đúng & phân tích chi tiết
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="space-y-6" id="all-library-view">
          {/* Active Search Tools (Filter & Search) */}
          <div className="bg-[#F8FAFC] p-4.5 rounded-2xl border border-[#E2E8F0] flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 search-input-container">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" size={18} />
              <input
                type="text"
                placeholder="Tìm kiếm từ khóa câu hỏi, cú pháp code, lời giải..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border-2 border-[#E2E8F0] focus:outline-hidden focus:border-[#3B82F6] focus:ring-4 focus:ring-[#EFF6FF] text-sm transition-all focus:bg-white bg-white"
                id="input-question-search"
              />
            </div>

            <div className="relative filter-select-container">
              <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" size={16} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2.5 rounded-xl border-2 border-[#E2E8F0] focus:outline-hidden focus:border-[#3B82F6] focus:ring-4 focus:ring-[#EFF6FF] text-sm bg-white appearance-none cursor-pointer font-medium transition-all"
                id="select-category-filter"
              >
                <option value="all">Tất cả chủ đề</option>
                {Object.values(Category)
                  .filter((catName) => questions.some((q) => q.category === catName))
                  .map((catName) => (
                    <option key={catName} value={catName}>{catName}</option>
                  ))}
              </select>
            </div>
          </div>

          {/* Result Metrics */}
          <div className="flex justify-between items-center text-xs text-[#64748B] px-1 font-semibold">
            <span>Tìm thấy <strong>{filteredQuestions.length}</strong> câu hỏi phù hợp</span>
          </div>

          {/* Question Cards List */}
          <div className="space-y-4.5" id="questions-list">
            {filteredQuestions.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-[#E2E8F0] shadow-sm space-y-3">
                <HelpCircle size={48} className="mx-auto text-[#94A3B8]" />
                <p className="text-[#64748B] font-bold">Không tìm thấy câu hỏi nào thoả mãn từ khoá tìm kiếm</p>
                <button 
                  onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                  className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs px-5 py-2.5 rounded-xl font-bold transition shadow-sm cursor-pointer"
                >
                  Thiết lập lại bộ lọc
                </button>
              </div>
            ) : (
              filteredQuestions.map((q) => {
                const isExpanded = expandedQuestionId === q.id;
                const isRevealed = revealAnswerId[q.id] || false;
                const isSolved = solvedIds.includes(q.id);

                return (
                  <div 
                    key={q.id}
                    className={`bg-white rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                      isExpanded ? "border-[#3B82F6] shadow-md ring-4 ring-[#EFF6FF] ml-0 scale-[1.002]" : "border-[#E2E8F0] hover:border-[#3B82F6] shadow-xs"
                    }`}
                    onClick={() => toggleExpand(q.id)}
                    id={`study-card-${q.id}`}
                  >
                    {/* Header Information */}
                    <div className="p-5 flex items-start gap-4 justify-between" id={`study-card-header-${q.id}`}>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="bg-[#DBEAFE] text-[#1E40AF] text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-md border border-[#DBEAFE]/40">
                            {q.category}
                          </span>
                          {isSolved && (
                            <span className="bg-emerald-50 text-emerald-800 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1 border border-emerald-100">
                              <CheckCircle size={10} /> Đã luyện
                            </span>
                          )}
                          <span className="text-xs text-[#94A3B8] font-mono font-semibold">ID: #{q.id}</span>
                        </div>
                        <div className="font-extrabold text-[#0F172A] text-sm sm:text-base leading-relaxed pt-1">
                          {isExpanded ? (
                            <SmartQuestionText 
                              text={q.questionText}
                              questionId={q.id}
                              isInteractive={true}
                              output={q.options[q.correctAnswerIndex]?.replace(/^[A-D]\.\s*/, "")}
                              showOutputByDefault={isRevealed}
                            />
                          ) : (
                            <span>{q.questionText.split("\n")[0]}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 pt-1">
                        {/* Horse Bookmark Toggler */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!bookmarkedIds.includes(q.id) && !isRevealed) {
                              setToastMessage("Bạn rồ chưa trả lời/xem đáp án câu hỏi này! Hãy nhấn biểu hiện xem đáp án trước chi tiết mới được phép đánh dấu.");
                              return;
                            }
                            onToggleBookmark?.(q.id);
                          }}
                          className={`p-2 rounded-xl transition border cursor-pointer ${
                            bookmarkedIds.includes(q.id)
                              ? "bg-amber-100 border-amber-300 text-amber-600 hover:bg-amber-200"
                              : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9]"
                          }`}
                          title="Đánh dấu câu hỏi hình con ngựa"
                          id={`btn-bookmark-horse-list-${q.id}`}
                        >
                          <Horse className={bookmarkedIds.includes(q.id) ? "text-amber-500 fill-amber-500" : "text-slate-400"} size={16} />
                        </button>

                        <button
                          onClick={(e) => toggleReveal(q.id, e)}
                          className={`p-2 rounded-xl transition border cursor-pointer ${
                            isRevealed 
                              ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100" 
                              : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9]"
                          }`}
                          title={isRevealed ? "Ẩn đáp án" : "Hiện nhanh đáp án"}
                          id={`btn-reveal-answer-${q.id}`}
                        >
                          {isRevealed ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <div className="text-[#94A3B8]">
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      </div>
                    </div>

                    {/* Body details */}
                    {isExpanded && (
                      <div className="border-t border-[#E2E8F0] bg-[#F8FAFC] p-5 space-y-4" id={`study-card-body-${q.id}`}>
                        {/* Code Snippet if exists */}
                        {q.codeSnippet && (
                          <JupyterCell 
                            code={q.codeSnippet} 
                            cellNumber={q.id} 
                            isInteractive={true}
                            output={q.options[q.correctAnswerIndex]?.replace(/^[A-D]\.\s*/, "")}
                            showOutputByDefault={isRevealed}
                          />
                        )}

                        {/* Multiple choices option list */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          {getQuestionOptions(q.options).map((option, optIdx) => {
                            const isCorrect = optIdx === q.correctAnswerIndex;
                            const shouldHighlight = isRevealed && isCorrect;

                            let bgStyle = "bg-white border-slate-200 text-[#1E293B]";
                            let badgeStyle = "bg-[#E2E8F0]/50 border-slate-200 text-slate-800";

                            if (shouldHighlight) {
                              bgStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold border-2 shadow-xs scale-[1.01]";
                              badgeStyle = "bg-emerald-500 border-emerald-600 text-white";
                            } else if (isRevealed) {
                              bgStyle = "bg-slate-50/30 border-slate-100 text-slate-400 opacity-60";
                              badgeStyle = "border-slate-200 text-slate-400 bg-slate-100";
                            }

                            return (
                              <div
                                key={optIdx}
                                className={`p-4 rounded-2xl border text-xs sm:text-sm transition-all duration-200 flex items-center gap-3 ${bgStyle}`}
                                id={`option-card-${q.id}-${optIdx}`}
                              >
                                <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-sans font-bold text-xs shrink-0 ${badgeStyle}`}>
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span className="font-semibold">{option.replace(/^[A-H]\.\s*/i, "")}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Detailed explanation area */}
                        {isRevealed ? (
                          <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 space-y-2 mt-4 shadow-xs font-semibold">
                            <h4 className="text-xs font-black text-[#065F46] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                              <CheckCircle size={14} /> Đáp án đúng & Lời giải chi tiết:
                            </h4>
                            <p className="text-[#1E293B] text-xs sm:text-sm leading-relaxed font-normal">
                              {q.explanation}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center py-2.5 border border-dashed border-[#E2E8F0] rounded-xl bg-white/50">
                            <button
                              onClick={(e) => toggleReveal(q.id, e)}
                              className="text-xs text-[#3B82F6] hover:text-[#1E40AF] font-bold flex items-center gap-1 mx-auto cursor-pointer active:scale-95 transition"
                            >
                              <Eye size={12} /> Nhấp để kiểm tra phương án đúng & phân tích chi tiết
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
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
