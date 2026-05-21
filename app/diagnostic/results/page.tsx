"use client";

import Link from "next/link";
import { MOCK_SKILLS } from "@/src/lib/mock-data";

export default function DiagnosticResultsPage() {
  const skillColors: Record<string, string> = {
    blue: "bg-blue-500",
    rose: "bg-rose-500",
  };

  return (
    <div className="min-h-screen bg-[#09090f] flex flex-col">
      {/* Minimal header */}
      <div className="border-b border-[#1d2540] bg-[#0f1020] h-14 flex items-center px-6">
        <span className="font-extrabold text-lg">
          Prep<span className="text-blue-400">Gym</span>
        </span>
        <span className="ml-4 text-sm text-slate-500">Diagnostic Results</span>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 py-16">
        <div className="w-full max-w-2xl">
          {/* Big score */}
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Your score</div>
            <div className="text-8xl font-extrabold mb-2">48</div>
            <div className="text-2xl font-bold text-slate-400 mb-2">/ 100</div>
            <div className="inline-block bg-rose-400/10 text-rose-400 font-bold px-4 py-1.5 rounded-full text-sm">
              Below MBB threshold (75+)
            </div>
          </div>

          {/* Skill bars */}
          <div className="bg-[#0f1020] border border-[#1d2540] rounded-2xl p-6 mb-6">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">Skill breakdown</div>
            <div className="space-y-5">
              {MOCK_SKILLS.map((skill) => (
                <div key={skill.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-200">{skill.label}</span>
                      {skill.status === "weakest" && (
                        <div className="flex items-center gap-1.5">
                          <span className="bg-rose-400/10 text-rose-400 text-xs font-bold px-2 py-0.5 rounded">WEAKEST</span>
                          <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                        </div>
                      )}
                      {skill.status === "strong" && (
                        <span className="bg-emerald-400/10 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded">STRONG</span>
                      )}
                    </div>
                    <span className={`font-bold ${skill.color === "rose" ? "text-rose-400" : "text-slate-300"}`}>
                      {skill.score}/5
                    </span>
                  </div>
                  <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${skillColors[skill.color] || "bg-blue-500"} transition-all duration-700`}
                      style={{ width: `${skill.percent}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-500 mt-1 capitalize">{skill.status}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority box */}
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6 mb-8">
            <div className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-2">Start here</div>
            <h3 className="text-xl font-extrabold mb-2">Behavioral Prep</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Your behavioral score (1.6/5) is significantly below MBB expectations. This is your highest-leverage fix — McKinsey PEI, Bain fit, and BCG leadership questions consistently eliminate candidates at this stage.
            </p>
            <Link
              href="/behavioral"
              className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Start Behavioral Prep →
            </Link>
          </div>

          {/* CTAs */}
          <div className="flex gap-3">
            <Link
              href="/dashboard"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-center transition-colors"
            >
              Go to Dashboard →
            </Link>
            <Link
              href="/drills"
              className="flex-1 bg-[#141830] border border-[#1d2540] text-slate-200 font-semibold py-3 rounded-xl text-center hover:border-slate-500 transition-colors"
            >
              Start Drills
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
