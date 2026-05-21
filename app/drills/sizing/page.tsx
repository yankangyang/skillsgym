"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getDrillQuestions, type DrillQuestion } from "@/lib/supabase/queries";

export default function SizingDrillPage() {
  const [questions, setQuestions] = useState<DrillQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApproach, setSelectedApproach] = useState<number | null>(null);
  const [stepValues, setStepValues] = useState<string[]>([]);

  useEffect(() => {
    getDrillQuestions("sizing").then((data) => {
      setQuestions(data);
      if (data.length > 0) {
        setStepValues(Array(data[0].steps?.length ?? 0).fill(""));
      }
      setLoading(false);
    });
  }, []);

  const updateStep = (idx: number, val: string) => {
    const updated = [...stepValues];
    updated[idx] = val;
    setStepValues(updated);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090f] flex items-center justify-center">
        <div className="text-slate-400 text-sm">Loading question...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#09090f] flex items-center justify-center">
        <div className="text-slate-400 text-sm">No sizing questions found.</div>
      </div>
    );
  }

  const question = questions[0];
  const approaches = question.approaches ?? [];
  const steps = question.steps ?? [];

  return (
    <div className="min-h-screen bg-[#09090f]">
      <div className="bg-[#0f1020] border-b border-[#1d2540] px-6 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/drills" className="text-sm text-slate-400 hover:text-slate-200">← Back to Drills</Link>
            <span className="bg-amber-400/10 text-amber-400 text-xs font-bold px-2 py-0.5 rounded">Market Sizing</span>
          </div>
          <Link href="/drills" className="text-xs text-slate-500 hover:text-rose-400">Exit</Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Question */}
        <div className="bg-[#0f1020] border border-[#1d2540] rounded-2xl p-8 mb-6">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Market Sizing Question</div>
          <h2 className="text-xl font-semibold text-slate-100 leading-relaxed">{question.question}</h2>
        </div>

        {/* Step 1: Select approach */}
        <div className="mb-6">
          <div className="text-sm font-semibold text-slate-300 mb-3">Step 1: Choose your approach</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {approaches.map((approach, idx) => (
              <button
                key={approach.label}
                onClick={() => setSelectedApproach(idx)}
                className={`text-left p-4 rounded-xl border transition-colors ${
                  selectedApproach === idx
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-[#1d2540] bg-[#0f1020] hover:border-slate-500"
                }`}
              >
                <div className={`font-semibold mb-1 ${selectedApproach === idx ? "text-blue-300" : "text-slate-200"}`}>
                  {approach.label}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">{approach.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Calculation scaffold (shown after approach selected) */}
        {selectedApproach !== null && (
          <div>
            <div className="text-sm font-semibold text-slate-300 mb-3">Step 2: Build your calculation</div>
            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div key={step.label} className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-4">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Step {idx + 1}</div>
                  <div className="text-sm text-slate-200 mb-2">{step.label}</div>
                  <input
                    type="text"
                    value={stepValues[idx] ?? ""}
                    onChange={(e) => updateStep(idx, e.target.value)}
                    placeholder={step.placeholder}
                    className="w-full bg-[#09090f] border border-[#1d2540] rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Approach hint</div>
              <p className="text-sm text-slate-300">{approaches[selectedApproach].description}</p>
            </div>

            <div className="flex gap-3 mt-6">
              <Link
                href="/drills"
                className="flex-1 bg-[#141830] border border-[#1d2540] text-slate-300 font-semibold py-3 rounded-xl text-center hover:border-slate-500 transition-colors text-sm"
              >
                Back to Drills
              </Link>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
                Submit estimate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
