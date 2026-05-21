"use client";

import Link from "next/link";
import ProtoNav from "@/src/components/proto-nav";

const PROMPTS = [
  { text: "Tell me about a time you led without formal authority.", difficulty: "Hard", firm: "McKinsey" },
  { text: "Describe your greatest professional accomplishment.", difficulty: "Medium", firm: "BCG" },
  { text: "Tell me about a time you failed to meet a commitment.", difficulty: "Hard", firm: "Bain" },
  { text: "Describe a time you had to influence a skeptical stakeholder.", difficulty: "Hard", firm: "McKinsey" },
  { text: "Tell me about a time you worked in high-pressure conditions.", difficulty: "Medium", firm: "General" },
];

export default function BehavioralPage() {
  return (
    <div className="min-h-screen bg-[#09090f]">
      <ProtoNav activePath="/behavioral" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2">Behavioral Prep</h1>
          <p className="text-slate-400">PEI, fit questions, and story bank — all in one place.</p>
        </div>

        {/* Readiness bar */}
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl px-5 py-4 mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-bold text-rose-400">Behavioral readiness: 28%</span>
              <span className="bg-rose-400/10 text-rose-400 text-xs font-bold px-2 py-0.5 rounded">Fix this first</span>
            </div>
            <p className="text-sm text-slate-400">This is your weakest skill — prioritize behavioral prep before case practice.</p>
          </div>
          <Link href="/drills/behavioral-drill" className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors shrink-0">
            Start drill
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Rapid-fire practice */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Rapid-fire Practice</div>
            
            {/* Firm tabs */}
            <div className="flex gap-2 mb-5">
              {["McKinsey PEI", "Bain", "BCG", "All Firms"].map((firm) => (
                <button
                  key={firm}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg border border-[#1d2540] bg-[#0f1020] text-slate-400 hover:border-blue-500/50 hover:text-slate-200 transition-colors first:border-blue-500 first:bg-blue-500/10 first:text-blue-300"
                >
                  {firm}
                </button>
              ))}
            </div>

            <div className="space-y-2 mb-5">
              {PROMPTS.map((prompt, i) => (
                <div key={i} className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-4 flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm text-slate-200 mb-1.5">{prompt.text}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${prompt.difficulty === "Hard" ? "bg-rose-400/10 text-rose-400" : "bg-amber-400/10 text-amber-400"}`}>
                        {prompt.difficulty}
                      </span>
                      <span className="text-xs text-slate-500">{prompt.firm}</span>
                    </div>
                  </div>
                  <Link href="/drills/behavioral-drill" className="text-xs text-blue-400 hover:text-blue-300 font-medium shrink-0">
                    Practice →
                  </Link>
                </div>
              ))}
            </div>

            <Link
              href="/drills/behavioral-drill"
              className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Start 10-prompt session →
            </Link>
          </div>

          {/* Story Bank preview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Story Bank Preview</div>
              <Link href="/behavioral/story-bank" className="text-xs text-blue-400 hover:text-blue-300">Go to Story Bank →</Link>
            </div>

            <div className="space-y-3">
              {[
                { theme: "Leadership", status: "complete" },
                { theme: "Conflict Resolution", status: "complete" },
                { theme: "Failure / Setback", status: "empty" },
              ].map((story) => (
                <div key={story.theme} className={`bg-[#0f1020] border rounded-xl p-4 flex items-center justify-between ${story.status === "complete" ? "border-emerald-500/30" : "border-[#1d2540]"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${story.status === "complete" ? "bg-emerald-500" : "bg-slate-700"}`} />
                    <span className="text-sm font-medium text-slate-200">{story.theme}</span>
                  </div>
                  {story.status === "complete" ? (
                    <span className="bg-emerald-400/10 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded">Complete</span>
                  ) : (
                    <Link href="/behavioral/story-bank" className="text-xs text-blue-400 hover:text-blue-300 font-medium">Build →</Link>
                  )}
                </div>
              ))}
            </div>

            <Link
              href="/behavioral/story-bank"
              className="mt-5 block text-center bg-[#141830] border border-[#1d2540] hover:border-slate-500 text-slate-200 font-semibold py-3 rounded-xl transition-colors"
            >
              Open Story Bank
            </Link>

            {/* Progress */}
            <div className="mt-5 p-4 bg-[#0f1020] border border-[#1d2540] rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">Stories complete</span>
                <span className="text-sm font-bold text-slate-200">2 / 6</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: "33%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
