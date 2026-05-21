"use client";

import Link from "next/link";
import ProtoNav from "@/src/components/proto-nav";
import { MOCK_STATS, MOCK_SKILLS } from "@/src/lib/mock-data";

// 7-week readiness data (simulated)
const WEEKLY_DATA = [
  { week: "W1", score: 22, label: "Mar 3" },
  { week: "W2", score: 28, label: "Mar 10" },
  { week: "W3", score: 31, label: "Mar 17" },
  { week: "W4", score: 38, label: "Mar 24" },
  { week: "W5", score: 42, label: "Mar 31" },
  { week: "W6", score: 45, label: "Apr 7" },
  { week: "W7", score: 48, label: "Apr 14" },
];

// Heatmap data (4 weeks × 7 days)
const HEATMAP: (0 | 1 | 2 | 3)[][] = [
  [1, 0, 2, 1, 0, 3, 1],
  [0, 2, 1, 0, 2, 1, 0],
  [2, 1, 3, 2, 1, 0, 2],
  [1, 3, 2, 1, 2, 3, 1],
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SKILL_TRENDS = [
  { label: "Math", score: 3.9, delta: 0.4, sparkData: [30, 52, 68, 78], color: "text-emerald-400" },
  { label: "Structuring", score: 3.1, delta: 0.2, sparkData: [40, 48, 55, 62], color: "text-emerald-400" },
  { label: "Behavioral", score: 1.6, delta: -0.1, sparkData: [40, 38, 35, 32], color: "text-rose-400" },
  { label: "Market Sizing", score: 3.5, delta: 0.3, sparkData: [45, 55, 63, 70], color: "text-emerald-400" },
];

const heatmapColor = (intensity: number) => {
  if (intensity === 0) return "bg-white/5";
  if (intensity === 1) return "bg-blue-500/25";
  if (intensity === 2) return "bg-blue-500/50";
  return "bg-blue-500";
};

const maxScore = Math.max(...WEEKLY_DATA.map((d) => d.score));

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-[#09090f]">
      <ProtoNav activePath="" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2">Progress & Analytics</h1>
          <p className="text-slate-400">Track your readiness over time</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Total sessions</div>
            <div className="text-3xl font-extrabold">{MOCK_STATS.totalSessions}</div>
          </div>
          <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Total time</div>
            <div className="text-3xl font-extrabold">{MOCK_STATS.totalTimeHours}h</div>
          </div>
          <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Longest streak</div>
            <div className="text-3xl font-extrabold text-amber-400">{MOCK_STATS.longestStreak}d</div>
          </div>
          <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Diagnostic retakes</div>
            <div className="text-3xl font-extrabold">{MOCK_STATS.diagnosticRetakes}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Readiness chart */}
          <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">Readiness over time</div>
            <div className="flex items-end gap-2 h-32 mb-3">
              {WEEKLY_DATA.map((d) => (
                <div key={d.week} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-xs text-slate-400 font-medium">{d.score}</div>
                  <div
                    className="w-full rounded-t-md bg-blue-500 transition-all"
                    style={{ height: `${(d.score / maxScore) * 90}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              {WEEKLY_DATA.map((d) => (
                <div key={d.week} className="flex-1 text-center text-xs text-slate-600">{d.week}</div>
              ))}
            </div>
          </div>

          {/* Skill trends */}
          <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">Skill trends (vs last week)</div>
            <div className="space-y-4">
              {SKILL_TRENDS.map((skill) => (
                <div key={skill.label} className="flex items-center gap-4">
                  <div className="w-28 text-sm text-slate-200 shrink-0">{skill.label}</div>
                  <div className="flex-1 flex items-end gap-0.5 h-8">
                    {skill.sparkData.map((val, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-blue-500/60 last:bg-blue-500"
                        style={{ height: `${val}%` }}
                      />
                    ))}
                  </div>
                  <div className="text-sm font-bold text-slate-200 w-8 text-right">{skill.score}</div>
                  <div className={`text-sm font-bold ${skill.color} w-12 text-right shrink-0`}>
                    {skill.delta > 0 ? "+" : ""}{skill.delta}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5 mb-8">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Activity heatmap (last 4 weeks)</div>
          <div className="flex items-start gap-2 mb-2">
            <div className="flex flex-col gap-1 mr-2 pt-1">
              {["W1", "W2", "W3", "W4"].map((w) => (
                <div key={w} className="h-7 flex items-center text-xs text-slate-600">{w}</div>
              ))}
            </div>
            <div className="flex-1">
              <div className="flex gap-1 mb-1">
                {DAYS.map((d) => <div key={d} className="flex-1 text-center text-xs text-slate-600">{d}</div>)}
              </div>
              <div className="space-y-1">
                {HEATMAP.map((row, ri) => (
                  <div key={ri} className="flex gap-1">
                    {row.map((cell, ci) => (
                      <div key={ci} className={`flex-1 h-7 rounded ${heatmapColor(cell)}`} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-slate-600">
            <span>Less</span>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`w-4 h-4 rounded ${heatmapColor(i as 0 | 1 | 2 | 3)}`} />
            ))}
            <span>More</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href="/diagnostic"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Retake diagnostic →
          </Link>
          <Link
            href="/dashboard"
            className="bg-[#141830] border border-[#1d2540] text-slate-200 font-semibold px-6 py-3 rounded-xl hover:border-slate-500 transition-colors text-sm"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
