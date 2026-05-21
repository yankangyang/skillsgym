"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getDrillQuestions, type DrillQuestion } from "@/lib/supabase/queries";

export default function MathDrillPage() {
  const [questions, setQuestions] = useState<DrillQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showNumpad, setShowNumpad] = useState(false);

  // Load questions on mount
  useEffect(() => {
    getDrillQuestions("math").then((data) => {
      setQuestions(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

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
        <div className="text-slate-400 text-sm">No math drill questions found.</div>
      </div>
    );
  }

  const question = questions[currentQ % questions.length];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelectedAnswer(idx);
    setAnswered(true);
    if (idx === question.correct) {
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setCurrentQ((q) => q + 1);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const getButtonClass = (idx: number) => {
    if (!answered) {
      return "bg-[#141830] border border-[#1d2540] text-slate-200 hover:border-blue-500/50 hover:bg-blue-500/10 transition-colors cursor-pointer";
    }
    if (idx === question.correct) {
      return "bg-emerald-500/20 border border-emerald-500 text-emerald-300";
    }
    if (idx === selectedAnswer) {
      return "bg-rose-500/20 border border-rose-500 text-rose-300";
    }
    return "bg-[#141830] border border-[#1d2540] text-slate-500 opacity-50";
  };

  return (
    <div className="min-h-screen bg-[#09090f]">
      {/* Header */}
      <div className="bg-[#0f1020] border-b border-[#1d2540] px-6 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/drills" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">← Back to Drills</Link>
            <div className="h-4 w-px bg-[#1d2540]" />
            <span className="bg-blue-400/10 text-blue-400 text-xs font-bold px-2 py-0.5 rounded">Math</span>
            <span className="bg-white/5 text-slate-400 text-xs font-bold px-2 py-0.5 rounded">{question.difficulty ?? ""}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Q {(currentQ % questions.length) + 1}/{questions.length}</span>
            <span className="text-sm font-mono text-slate-400">{formatTime(seconds)}</span>
            <button
              onClick={() => setShowNumpad(!showNumpad)}
              className="text-xs text-slate-500 hover:text-slate-300 border border-[#1d2540] px-2 py-1 rounded"
            >
              {showNumpad ? "Multiple choice" : "Numpad"}
            </button>
            <Link href="/drills" className="text-xs text-slate-500 hover:text-rose-400">Exit</Link>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Question card */}
        <div className="bg-[#0f1020] border border-[#1d2540] rounded-2xl p-8 mb-6">
          <h2 className="text-xl font-semibold text-slate-100 leading-relaxed">{question.question}</h2>
        </div>

        {!showNumpad ? (
          /* Multiple choice */
          <div className="space-y-3 mb-6">
            {(question.options ?? []).map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-4 rounded-xl ${getButtonClass(idx)}`}
              >
                <span className="text-sm font-medium">{opt}</span>
              </button>
            ))}
          </div>
        ) : (
          /* Numpad input */
          <div className="mb-6">
            <input
              type="text"
              placeholder="Enter your answer..."
              className="w-full bg-[#0f1020] border border-[#1d2540] rounded-xl px-4 py-4 text-lg text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 mb-3"
            />
            <button
              onClick={() => handleAnswer(question.correct ?? -1)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Submit
            </button>
          </div>
        )}

        {/* Explanation */}
        {answered && (
          <div className={`rounded-xl p-4 mb-6 ${selectedAnswer === question.correct ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-rose-500/10 border border-rose-500/30"}`}>
            <div className={`font-bold mb-1 ${selectedAnswer === question.correct ? "text-emerald-400" : "text-rose-400"}`}>
              {selectedAnswer === question.correct ? "Correct!" : "Incorrect"}
            </div>
            <p className="text-sm text-slate-300">{question.explanation}</p>
          </div>
        )}

        {/* Bottom bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {streak >= 2 && (
              <span className="text-amber-400 font-semibold text-sm">🔥 {streak} in a row</span>
            )}
          </div>
          {answered && (
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
