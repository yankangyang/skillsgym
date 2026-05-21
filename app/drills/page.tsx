"use client";

import Link from "next/link";
import ProtoNav from "@/src/components/proto-nav";

const DRILL_CATEGORIES = [
  {
    id: "math",
    label: "Math",
    desc: "Percentages, margins, break-even, growth rates",
    mastery: 62,
    streak: 14,
    color: "blue",
    href: "/drills/math",
  },
  {
    id: "structuring",
    label: "Structuring",
    desc: "Frameworks, MECE, issue trees, prioritization",
    mastery: 48,
    streak: 0,
    color: "purple",
    href: "/drills/structuring",
  },
  {
    id: "sizing",
    label: "Market Sizing",
    desc: "Top-down, bottom-up, estimation techniques",
    mastery: 71,
    streak: 7,
    color: "amber",
    href: "/drills/sizing",
  },
  {
    id: "behavioral",
    label: "Behavioral",
    desc: "STAR answers, PEI, fit questions, rapid-fire",
    mastery: 28,
    streak: 2,
    color: "rose",
    weak: true,
    href: "/drills/behavioral-drill",
  },
];

const DRILL_MODES = [
  { label: "Flashcard mode", desc: "Quick, high-volume repetition. Best for building speed." },
  { label: "Timed exam mode", desc: "Realistic pressure. Questions under interview-paced time limits." },
  { label: "Weak-only mode", desc: "SAT-style adaptive — only serves questions you've missed or gotten wrong." },
];

export default function DrillsPage() {
  return (
    <div className="min-h-screen bg-[#09090f]">
      <ProtoNav activePath="/drills" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2">Skill Drills</h1>
          <p className="text-slate-400">Target what&apos;s weak. Skip what isn&apos;t.</p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {DRILL_CATEGORIES.map((cat) => {
            const barColor = cat.color === "rose" ? "bg-rose-500" : cat.color === "purple" ? "bg-purple-500" : cat.color === "amber" ? "bg-amber-500" : "bg-blue-500";
            const badgeColor = cat.color === "rose" ? "bg-rose-400/10 text-rose-400" : cat.color === "purple" ? "bg-purple-400/10 text-purple-400" : cat.color === "amber" ? "bg-amber-400/10 text-amber-400" : "bg-blue-400/10 text-blue-400";
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-6 hover:border-blue-500/40 transition-colors block group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-extrabold">{cat.label}</h2>
                      {cat.weak && (
                        <span className="bg-rose-400/10 text-rose-400 text-xs font-bold px-2 py-0.5 rounded">WEAKEST</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400">{cat.desc}</p>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${badgeColor}`}>
                    {cat.mastery}%
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5 text-xs text-slate-500">
                    <span>Mastery</span>
                    <span>{cat.mastery}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${barColor}`} style={{ width: `${cat.mastery}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {cat.streak > 0 ? (
                    <span className="text-xs text-amber-400 font-medium">🔥 {cat.streak}-day streak</span>
                  ) : (
                    <span className="text-xs text-slate-600">No active streak</span>
                  )}
                  <span className="text-sm text-blue-400 font-medium group-hover:text-blue-300">Start drill →</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Drill modes */}
        <div className="mb-4">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Drill modes</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DRILL_MODES.map((mode) => (
              <div key={mode.label} className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
                <h3 className="font-semibold text-slate-100 mb-2">{mode.label}</h3>
                <p className="text-sm text-slate-400">{mode.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
