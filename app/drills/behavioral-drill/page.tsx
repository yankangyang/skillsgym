"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getDrillQuestions, type DrillQuestion } from "@/lib/supabase/queries";

const FIRMS = ["McKinsey PEI", "Bain WHY", "BCG Fit", "General"];
const TOTAL_PROMPTS = 10;
const TIMER_SECONDS = 90;

export default function BehavioralDrillPage() {
  const [prompts, setPrompts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFirm, setSelectedFirm] = useState("McKinsey PEI");
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [timerRunning, setTimerRunning] = useState(false);
  const [selfScore, setSelfScore] = useState<number | null>(null);
  const [sessionDone, setSessionDone] = useState(false);
  const [scores, setScores] = useState<number[]>([]);

  // Load behavioral prompts on mount
  useEffect(() => {
    getDrillQuestions("behavioral").then((data: DrillQuestion[]) => {
      // Each behavioral row may store the prompt text in `content` or `question` or `prompt`
      const texts = data.map((q) => q.content ?? q.prompt ?? q.question ?? "").filter(Boolean);
      setPrompts(texts);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!timerRunning) return;
    if (timeLeft <= 0) {
      setTimerRunning(false);
      return;
    }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const handleStart = () => {
    setTimeLeft(TIMER_SECONDS);
    setTimerRunning(true);
    setSelfScore(null);
  };

  const handleNext = () => {
    if (selfScore !== null) {
      setScores((prev) => [...prev, selfScore]);
    }
    if (currentPrompt + 1 >= TOTAL_PROMPTS) {
      setSessionDone(true);
      return;
    }
    setCurrentPrompt((p) => p + 1);
    setTimeLeft(TIMER_SECONDS);
    setTimerRunning(false);
    setSelfScore(null);
  };

  const timerPercent = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor = timeLeft > 30 ? "bg-blue-500" : timeLeft > 10 ? "bg-amber-500" : "bg-rose-500";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090f] flex items-center justify-center">
        <div className="text-slate-400 text-sm">Loading prompts...</div>
      </div>
    );
  }

  if (sessionDone) {
    const avg = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "N/A";
    return (
      <div className="min-h-screen bg-[#09090f] flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-xl text-center">
          <div className="text-4xl font-extrabold mb-2">Session complete</div>
          <div className="text-slate-400 mb-8">You finished {TOTAL_PROMPTS} behavioral prompts</div>
          <div className="bg-[#0f1020] border border-[#1d2540] rounded-2xl p-8 mb-6">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Average self-score</div>
            <div className="text-6xl font-extrabold text-blue-400 mb-1">{avg}</div>
            <div className="text-slate-400 text-sm">out of 5</div>
          </div>
          <div className="flex gap-3">
            <Link href="/behavioral" className="flex-1 bg-[#141830] border border-[#1d2540] text-slate-200 font-semibold py-3 rounded-xl text-center hover:border-slate-500 transition-colors">
              Back to Behavioral
            </Link>
            <button onClick={() => { setCurrentPrompt(0); setScores([]); setSelfScore(null); setSessionDone(false); setTimeLeft(TIMER_SECONDS); setTimerRunning(false); }} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
              Try another session
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Gracefully fall back to index if prompts is shorter than TOTAL_PROMPTS
  const currentText = prompts.length > 0 ? prompts[currentPrompt % prompts.length] : "No prompt available.";

  return (
    <div className="min-h-screen bg-[#09090f]">
      {/* Header */}
      <div className="bg-[#0f1020] border-b border-[#1d2540] px-6 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/behavioral" className="text-sm text-slate-400 hover:text-slate-200">← Back</Link>
            <span className="bg-emerald-400/10 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded">Behavioral</span>
          </div>
          <div className="text-sm text-slate-400">{currentPrompt + 1}/{TOTAL_PROMPTS} prompts done</div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Firm selector */}
        <div className="flex gap-2 mb-8">
          {FIRMS.map((firm) => (
            <button
              key={firm}
              onClick={() => setSelectedFirm(firm)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
                selectedFirm === firm
                  ? "border-blue-500 bg-blue-500/20 text-blue-300"
                  : "border-[#1d2540] bg-[#0f1020] text-slate-400 hover:border-slate-500"
              }`}
            >
              {firm}
            </button>
          ))}
        </div>

        {/* Timer */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Time remaining</span>
            <span className={`text-lg font-mono font-bold ${timeLeft <= 10 ? "text-rose-400" : timeLeft <= 30 ? "text-amber-400" : "text-slate-200"}`}>
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${timerColor}`} style={{ width: `${timerPercent}%` }} />
          </div>
        </div>

        {/* Prompt card */}
        <div className="bg-[#0f1020] border border-[#1d2540] rounded-2xl p-8 mb-6">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">{selectedFirm} — Prompt {currentPrompt + 1}</div>
          <p className="text-xl font-semibold text-slate-100 leading-relaxed">
            {currentText}
          </p>
        </div>

        {/* Start / controls */}
        {!timerRunning && !selfScore && (
          <button onClick={handleStart} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors mb-4">
            Start timer (90s)
          </button>
        )}

        {/* Self-score */}
        <div>
          <div className="text-sm font-medium text-slate-300 mb-3">Self-score your response (1–5)</div>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                onClick={() => setSelfScore(score)}
                className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-colors ${
                  selfScore === score
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-[#0f1020] border-[#1d2540] text-slate-400 hover:border-blue-500/50"
                }`}
              >
                {score}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600 mb-4">
            <span>Weak — no structure</span>
            <span>Strong — MBB-ready</span>
          </div>

          {selfScore !== null && (
            <button onClick={handleNext} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
              {currentPrompt + 1 >= TOTAL_PROMPTS ? "Finish session" : "Next prompt →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
