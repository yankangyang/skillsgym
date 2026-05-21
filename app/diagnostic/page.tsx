"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  getDiagnosticQuestions,
  saveDiagnosticResult,
  TEST_USER_ID,
  type DiagnosticQuestion,
} from "@/lib/supabase/queries";

const CATEGORY_COLORS: Record<string, string> = {
  Math: "bg-blue-400/10 text-blue-400",
  Structuring: "bg-purple-400/10 text-purple-400",
  "Market Sizing": "bg-amber-400/10 text-amber-400",
  Behavioral: "bg-emerald-400/10 text-emerald-400",
};

export default function DiagnosticPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<DiagnosticQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [answered, setAnswered] = useState(false);

  // Load questions on mount
  useEffect(() => {
    getDiagnosticQuestions().then((data) => {
      setQuestions(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [currentQ]);

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelectedAnswer(idx);
    setAnswered(true);
  };

  const handleNext = useCallback(async () => {
    const newAnswers = [...answers, selectedAnswer ?? -1];
    if (currentQ + 1 >= questions.length) {
      // Compute per-category scores
      const scores: Record<string, { correct: number; total: number }> = {};
      questions.forEach((q, i) => {
        const cat = q.category;
        if (!scores[cat]) scores[cat] = { correct: 0, total: 0 };
        scores[cat].total++;
        if (newAnswers[i] === q.correct) scores[cat].correct++;
      });
      const categoryScores = Object.fromEntries(
        Object.entries(scores).map(([cat, s]) => [cat, s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0])
      );
      const totalCorrect = newAnswers.filter((a, i) => a === questions[i].correct).length;
      const totalScore = questions.length > 0 ? Math.round((totalCorrect / questions.length) * 100) : 0;

      await saveDiagnosticResult({
        user_id: TEST_USER_ID,
        answers: newAnswers,
        scores: categoryScores,
        total_score: totalScore,
      });

      router.push("/diagnostic/results");
      return;
    }
    setAnswers(newAnswers);
    setCurrentQ(currentQ + 1);
    setSelectedAnswer(null);
    setAnswered(false);
    setSeconds(0);
  }, [answers, selectedAnswer, currentQ, questions, router]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090f] flex items-center justify-center">
        <div className="text-slate-400 text-sm">Loading questions...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#09090f] flex items-center justify-center">
        <div className="text-slate-400 text-sm">No diagnostic questions found.</div>
      </div>
    );
  }

  const question = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;

  const getButtonClass = (idx: number) => {
    if (!answered) {
      return "bg-[#141830] border border-[#1d2540] text-slate-200 hover:border-blue-500/50 hover:bg-blue-500/10 transition-colors";
    }
    if (idx === question.correct) {
      return "bg-emerald-500/20 border border-emerald-500 text-emerald-300";
    }
    if (idx === selectedAnswer) {
      return "bg-rose-500/20 border border-rose-500 text-rose-300";
    }
    return "bg-[#141830] border border-[#1d2540] text-slate-500";
  };

  return (
    <div className="min-h-screen bg-[#09090f] flex flex-col">
      {/* Top bar */}
      <div className="border-b border-[#1d2540] bg-[#0f1020]">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="text-sm font-bold text-slate-100">PrepGym Diagnostic</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
              Question {currentQ + 1} of {questions.length}
            </span>
            <span className="text-sm font-mono text-slate-400">{formatTime(seconds)}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-[#141830]">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Category badge */}
          <div className="mb-4">
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${CATEGORY_COLORS[question.category] || "bg-white/5 text-slate-400"}`}>
              {question.category}
            </span>
          </div>

          {/* Question */}
          <div className="bg-[#0f1020] border border-[#1d2540] rounded-2xl p-8 mb-6">
            <h2 className="text-xl font-semibold text-slate-100 leading-relaxed">{question.question}</h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-4 rounded-xl ${getButtonClass(idx)}`}
              >
                <span className="text-sm font-medium">{opt}</span>
              </button>
            ))}
          </div>

          {/* Explanation (shown after answer) */}
          {answered && (
            <div className={`rounded-xl p-4 mb-6 ${selectedAnswer === question.correct ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-rose-500/10 border border-rose-500/30"}`}>
              <div className={`font-bold mb-1 ${selectedAnswer === question.correct ? "text-emerald-400" : "text-rose-400"}`}>
                {selectedAnswer === question.correct ? "Correct!" : "Incorrect"}
              </div>
              <p className="text-sm text-slate-300">{question.explanation}</p>
            </div>
          )}

          {/* Next button */}
          {answered && (
            <button
              onClick={handleNext}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {currentQ + 1 >= questions.length ? "See Results →" : "Next Question →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
