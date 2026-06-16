/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  Trophy, BookOpen, Award, Zap, Calendar, 
  TrendingUp, CheckCircle2, ChevronRight, BrainCircuit 
} from "lucide-react";
import { Category, Question } from "../types";

interface DashboardProps {
  questions: Question[];
  stats: {
    totalPractices: number;
    totalExamAttempts: number;
    correctAnswersTotal: number;
    wrongAnswersTotal: number;
    streakDays: number;
    questionsSolvedIds: number[];
  };
  onNavigate: (tab: string) => void;
  onSelectCategory: (category: Category) => void;
}

export default function Dashboard({ questions, stats, onNavigate, onSelectCategory }: DashboardProps) {
  const solvedCount = stats.questionsSolvedIds.length;
  const totalCount = questions.length;
  const completionPercentage = Math.round((solvedCount / totalCount) * 100) || 0;
  const totalAnswers = stats.correctAnswersTotal + stats.wrongAnswersTotal;
  const accuracyRate = totalAnswers > 0 ? Math.round((stats.correctAnswersTotal / totalAnswers) * 100) : 0;

  // Group questions by category
  const categoriesMetaData = Object.values(Category).map((catName) => {
    const categoryQuestions = questions.filter(q => q.category === catName);
    const categoryTotal = categoryQuestions.length;
    const categorySolved = categoryQuestions.filter(q => stats.questionsSolvedIds.includes(q.id)).length;
    const progress = Math.round((categorySolved / categoryTotal) * 100) || 0;

    return {
      name: catName,
      total: categoryTotal,
      solved: categorySolved,
      progress
    };
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto" id="dashboard-view">
      {/* Welcome Banner */}
      <div className="bg-linear-to-br from-[#0F172A] via-[#1E40AF] to-[#3B82F6] text-white rounded-3xl p-8 sm:p-10 shadow-md relative overflow-hidden border border-[#E2E8F0]/30" id="welcome-banner">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-12 -translate-y-12">
          <BrainCircuit size={280} />
        </div>
        <div className="relative z-10 space-y-5 max-w-2xl">
          <span className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-blue-100 border border-white/10">
            Học Kỳ I 2025–2026 • VNU-UET
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-white">
            Ôn tập Tư duy Tính toán
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-normal">
            Hệ thống trắc nghiệm tương tác giúp nắm vững 4 định lý cốt lõi: Phân rã, Nhận dạng mẫu, Trừu tượng hóa, và Thiết kế thuật toán, cùng các kiến thức lập trình Python thực hành.
          </p>
          <div className="flex flex-wrap gap-4.5 pt-2">
            <button
              onClick={() => onNavigate("practice")}
              className="bg-white text-[#1E40AF] hover:bg-[#F8FAFC] transition duration-205 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
              id="btn-quick-practice"
            >
              <Zap size={16} /> Luyện tập ngay
            </button>
            <button
              onClick={() => onNavigate("exam")}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white border border-[#3B82F6] transition duration-205 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-3 cursor-pointer shadow-[0_4px_14px_rgba(59,130,246,0.4)] active:scale-95"
              id="btn-quick-exam"
            >
              <Trophy size={16} aria-hidden="true" /> Vào Phòng Thi Thử
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5" id="stats-grid">
        <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm flex items-center gap-4.5" id="stat-progress">
          <div className="bg-[#EFF6FF] p-3.5 rounded-2xl text-[#3B82F6]">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-[11px] text-[#64748B] font-bold uppercase tracking-wider">Tiến độ ôn tập</p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mt-1">
              {solvedCount}/{totalCount} <span className="text-xs text-[#64748B] font-medium">câu</span>
            </h3>
            <div className="w-24 bg-[#E2E8F0] h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div 
                className="bg-[#3B82F6] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm flex items-center gap-4.5" id="stat-streak">
          <div className="bg-amber-50 p-3.5 rounded-2xl text-amber-600">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-[11px] text-[#64748B] font-bold uppercase tracking-wider">Chuỗi ngày học</p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mt-1">
              {stats.streakDays} <span className="text-xs text-[#64748B] font-medium">ngày liên tục</span>
            </h3>
            <p className="text-[10px] text-amber-600 font-bold mt-1.5 flex items-center gap-1">
              <Calendar size={10} /> Đang giữ phong độ tốt!
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm flex items-center gap-4.5" id="stat-accuracy">
          <div className="bg-emerald-50 p-3.5 rounded-2xl text-[#10B981]">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-[11px] text-[#64748B] font-bold uppercase tracking-wider">Tỷ lệ chính xác</p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#10B981] mt-1">
              {accuracyRate}%
            </h3>
            <p className="text-[10px] text-[#64748B] mt-1.5">
              Tính trên {totalAnswers} câu đã làm
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm flex items-center gap-4.5" id="stat-exams">
          <div className="bg-indigo-50 p-3.5 rounded-2xl text-[#1E40AF]">
            <Award size={24} />
          </div>
          <div>
            <p className="text-[11px] text-[#64748B] font-bold uppercase tracking-wider">Lượt thi thử</p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mt-1">
              {stats.totalExamAttempts} <span className="text-xs text-[#64748B] font-medium">lần</span>
            </h3>
            <p className="text-[10px] text-[#64748B] mt-1.5">
              Thi thử chuẩn cấu trúc UET
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Categories vs Info banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="dashboard-content">
        {/* Categories Section */}
        <div className="lg:col-span-2 space-y-5" id="dashboard-categories">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">
              Luyện tập theo chủ đề chuyên sâu
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {categoriesMetaData.map((cat, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border-2 border-[#E2E8F0] hover:border-[#3B82F6] hover:bg-[#EFF6FF]/40 transition-all hover:shadow-[0_4px_14px_rgba(59,130,246,0.06)] flex flex-col justify-between group cursor-pointer"
                onClick={() => onSelectCategory(cat.name as Category)}
                id={`cat-card-${idx}`}
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Chủ đề {idx + 1}</span>
                    <span className="text-[11px] font-bold text-[#1E40AF]/90 bg-[#DBEAFE] px-2.5 py-0.5 rounded-md border border-[#DBEAFE]/60 text-center">
                      {cat.solved}/{cat.total} câu
                    </span>
                  </div>
                  <h3 className="font-extrabold text-[#0F172A] mt-2 text-base sm:text-lg leading-snug group-hover:text-[#1E40AF] transition">
                    {cat.name}
                  </h3>
                </div>

                <div className="mt-5 space-y-2">
                  <div className="flex justify-between items-center text-xs text-[#64748B]">
                    <span>Đã ôn luyện</span>
                    <span className="font-bold text-[#0F172A]">{cat.progress}%</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#3B82F6] h-full rounded-full transition-all duration-300"
                      style={{ width: `${cat.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center text-xs text-[#3B82F6] font-semibold pt-2 opacity-0 group-hover:opacity-100 transition duration-300">
                    Bắt đầu ôn <ChevronRight size={14} className="ml-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Info Section */}
        <div className="space-y-6" id="dashboard-sidebar">
          <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] space-y-4 shadow-sm" id="curriculum-guide">
            <h3 className="font-bold text-[#0F172A] flex items-center gap-2 text-sm sm:text-base border-b border-[#E2E8F0] pb-2">
              <CheckCircle2 size={18} className="text-[#3B82F6]" /> Cấu trúc môn học
            </h3>
            <p className="text-[#475569] text-xs leading-relaxed">
              Môn <strong>Tư duy Tính toán (Computational Thinking)</strong> tại VNU-UET tập trung nâng cao khả năng phân tích logic & kỹ sư hóa quy trình giải quyết vấn đề bằng máy tính:
            </p>
            <ul className="space-y-3 pt-2 text-xs text-[#475569]">
              <li className="flex items-start gap-2">
                <span className="min-w-4 max-w-4 h-4 bg-[#DBEAFE] text-[#1E40AF] font-bold rounded-full flex items-center justify-center text-[10px] mt-0.5">1</span>
                <span><strong>Phân rã (Decomposition)</strong>: Bóc tách bài toán phức tạp thành khối lượng việc nhỏ hơn để xử lý độc lập.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="min-w-4 max-w-4 h-4 bg-[#DBEAFE] text-[#1E40AF] font-bold rounded-full flex items-center justify-center text-[10px] mt-0.5">2</span>
                <span><strong>Nhận dạng mẫu (Pattern)</strong>: Nhận diện điểm tương đồng để tối ưu hóa quy tắc tái sử dụng code.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="min-w-4 max-w-4 h-4 bg-[#DBEAFE] text-[#1E40AF] font-bold rounded-full flex items-center justify-center text-[10px] mt-0.5">3</span>
                <span><strong>Trừu tượng hóa (Abstraction)</strong>: Tách biệt giao diện sử dụng với chi tiết lập trình rườm rà.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="min-w-4 max-w-4 h-4 bg-[#DBEAFE] text-[#1E40AF] font-bold rounded-full flex items-center justify-center text-[10px] mt-0.5">4</span>
                <span><strong>Thuật toán (Algorithm)</strong>: Thiết kế chuỗi chỉ dẫn chính trị bằng code Python chuẩn chỉ.</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#EFF6FF] p-6 rounded-3xl border border-[#DBEAFE] text-slate-700 space-y-3 shadow-xs font-normal" id="ai-help-guide">
            <h4 className="font-extrabold text-[#1E40AF] text-xs uppercase tracking-wider">
              Trợ giúp học tập đắc lực từ AI
            </h4>
            <p className="text-xs leading-relaxed text-[#1E40AF]">
              Với bất kỳ câu hỏi nào trong phần luyện tập, nếu lời giải tóm tắt chưa đủ làm bạn thỏa mãn, hãy nhấn nút <strong>"Giải thích bằng AI"</strong>. Trợ giảng Gemini sẽ phân tích từng phương án sai và diễn dịch logic code Python tường tận cho bạn!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
