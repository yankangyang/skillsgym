"use client";

import { useState } from "react";
import Link from "next/link";

const RUBRIC = [
  { label: "Breadth", desc: "Covers all key dimensions" },
  { label: "MECE", desc: "No overlaps, no gaps" },
  { label: "Prioritized", desc: "Leads with most important question" },
  { label: "Client-ready", desc: "Clear, actionable structure" },
];

const MODEL_ANSWER = `Structure:
1) Market attractiveness — India QSR market size ($5B+), growth (15% CAGR), consumer appetite for US brands and price sensitivity.
2) Competitive dynamics — existing chains (McDonald's, KFC, Subway), strong local players (Haldiram's, local fast casual).
3) Entry feasibility — regulatory environment, supply chain for US-style ingredients, menu localization (vegetarian-heavy), franchise vs. JV model.
4) Financial viability — unit economics (India vs. US), capex per store, payback period, currency risk.`;

export default function StructuringDrillPage() {
  const [problemDef, setProblemDef] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [prioritization, setPrioritization] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [checkedRubric, setCheckedRubric] = useState<string[]>([]);

  const toggleRubric = (label: string) => {
    setCheckedRubric((prev) => prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]);
  };

  const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#09090f]">
      <div className="bg-[#0f1020] border-b border-[#1d2540] px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/drills" className="text-sm text-slate-400 hover:text-slate-200">← Back to Drills</Link>
            <span className="bg-purple-400/10 text-purple-400 text-xs font-bold px-2 py-0.5 rounded">Structuring</span>
          </div>
          <Link href="/drills" className="text-xs text-slate-500 hover:text-rose-400">Exit</Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Prompt */}
        <div className="bg-[#0f1020] border border-[#1d2540] rounded-2xl p-8 mb-6">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Case Prompt</div>
          <h2 className="text-lg font-semibold text-slate-100 leading-relaxed">
            Your client is a US-based fast food chain considering entering the Indian market. How would you structure this analysis?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Builder */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Problem definition
                <span className="ml-2 text-xs text-slate-500">{wordCount(problemDef)} words</span>
              </label>
              <textarea
                value={problemDef}
                onChange={(e) => setProblemDef(e.target.value)}
                placeholder="Define the core problem the client is trying to solve..."
                rows={3}
                className="w-full bg-[#09090f] border border-[#1d2540] rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Key dimensions (3–4)
                <span className="ml-2 text-xs text-slate-500">{wordCount(dimensions)} words</span>
              </label>
              <textarea
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="1. Market attractiveness&#10;2. Competitive dynamics&#10;3. Entry feasibility&#10;4. Financial viability"
                rows={5}
                className="w-full bg-[#09090f] border border-[#1d2540] rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Prioritization rationale
                <span className="ml-2 text-xs text-slate-500">{wordCount(prioritization)} words</span>
              </label>
              <textarea
                value={prioritization}
                onChange={(e) => setPrioritization(e.target.value)}
                placeholder="Why did you lead with this dimension? What would cause you to pivot?"
                rows={3}
                className="w-full bg-[#09090f] border border-[#1d2540] rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <button
              onClick={() => setShowModel(true)}
              className="w-full bg-[#141830] border border-[#1d2540] hover:border-blue-500/50 text-slate-200 font-semibold py-3 rounded-xl transition-colors"
            >
              Self-score — Show model answer
            </button>

            {showModel && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5">
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">Model Answer</div>
                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">{MODEL_ANSWER}</pre>
              </div>
            )}
          </div>

          {/* Rubric */}
          <div>
            <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5 sticky top-20">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Self-score Rubric</div>
              <div className="space-y-3">
                {RUBRIC.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => toggleRubric(item.label)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      checkedRubric.includes(item.label)
                        ? "border-emerald-500/50 bg-emerald-500/10"
                        : "border-[#1d2540] bg-[#09090f]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded flex items-center justify-center text-xs ${checkedRubric.includes(item.label) ? "bg-emerald-500 text-white" : "bg-[#141830] border border-[#1d2540]"}`}>
                        {checkedRubric.includes(item.label) && "✓"}
                      </div>
                      <span className={`text-sm font-medium ${checkedRubric.includes(item.label) ? "text-emerald-300" : "text-slate-300"}`}>{item.label}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 ml-6">{item.desc}</div>
                  </button>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[#1d2540]">
                <div className="text-sm text-slate-300">
                  Score: <span className="font-bold text-slate-100">{checkedRubric.length}/4</span>
                </div>
                {checkedRubric.length === 4 && (
                  <div className="text-xs text-emerald-400 mt-1 font-medium">Excellent structure!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
