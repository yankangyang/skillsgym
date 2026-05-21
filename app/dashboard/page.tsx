"use client";

import Link from "next/link";
import ProtoNav from "@/src/components/proto-nav";
import { MOCK_STATS, MOCK_SKILLS, MOCK_LEADERBOARD } from "@/src/lib/mock-data";

const TODAY_PLAN = [
  { title: "McKinsey PEI rapid-fire", category: "Behavioral", duration: "15 min", href: "/behavioral", badge: "bg-emerald-400/10 text-emerald-400" },
  { title: "Percentages & margins", category: "Math", duration: "10 min", href: "/drills/math", badge: "bg-blue-400/10 text-blue-400" },
  { title: "Finish leadership story", category: "Story Bank", duration: "8 min", href: "/behavioral/story-bank", badge: "bg-purple-400/10 text-purple-400" },
];

export default function DashboardPage() {
  const topFive = MOCK_LEADERBOARD.slice(0, 5);
  const youEntry = MOCK_LEADERBOARD.find((e) => e.isYou);

  return (
    <div className="min-h-screen bg-[#09090f]">
      <ProtoNav activePath="/dashboard" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-1">Dashboard</h1>
          <p className="text-slate-400">Tuesday, April 29</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Current Streak</div>
            <div className="text-3xl font-extrabold text-amber-400">🔥 {MOCK_STATS.streak}</div>
            <div className="text-sm text-slate-400 mt-1">days in a row</div>
          </div>
          <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Readiness</div>
            <div className="text-3xl font-extrabold">{MOCK_STATS.readiness}<span className="text-lg text-slate-400">/100</span></div>
            <div className="text-sm text-rose-400 mt-1">Below MBB threshold</div>
          </div>
          <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Cohort Rank</div>
            <div className="text-3xl font-extrabold"># {MOCK_STATS.rank}</div>
            <div className="text-sm text-slate-400 mt-1">out of 68</div>
          </div>
          <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">This Week</div>
            <div className="text-3xl font-extrabold">{MOCK_STATS.sessionsThisWeek}</div>
            <div className="text-sm text-slate-400 mt-1">drills completed</div>
          </div>
        </div>

        {/* Row 2: Today's Plan + Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Today&apos;s Plan</div>
            <div className="space-y-1">
              {TODAY_PLAN.map((task) => (
                <div key={task.title} className="flex items-center justify-between py-3 border-b border-[#1d2540] last:border-0">
                  <div>
                    <div className="font-medium text-slate-200 text-sm">{task.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${task.badge}`}>{task.category}</span>
                      <span className="text-xs text-slate-500">{task.duration}</span>
                    </div>
                  </div>
                  <Link href={task.href} className="text-sm text-blue-400 hover:text-blue-300 font-medium shrink-0">Start →</Link>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Your Skills</div>
            <div className="space-y-4">
              {MOCK_SKILLS.map((skill) => (
                <div key={skill.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-200">{skill.label}</span>
                      {skill.status === "weakest" && <span className="text-rose-400 text-xs font-bold">Behavioral ↓ fix now</span>}
                      {skill.status === "strong" && <span className="text-emerald-400 text-xs">↑</span>}
                    </div>
                    <span className={`text-sm font-bold ${skill.color === "rose" ? "text-rose-400" : "text-slate-400"}`}>{skill.score}/5</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${skill.color === "rose" ? "bg-rose-500" : "bg-blue-500"}`} style={{ width: `${skill.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Leaderboard preview + Weekly Challenge */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Cohort Leaderboard (top 5)</div>
              <Link href="/compete/leaderboard" className="text-xs text-blue-400 hover:text-blue-300">See full board →</Link>
            </div>
            <div className="space-y-1">
              {topFive.map((entry) => (
                <div key={entry.rank} className="flex items-center gap-3 py-2.5 border-b border-[#1d2540] last:border-0">
                  <span className="text-sm font-bold text-slate-500 w-5 shrink-0">{entry.rank}</span>
                  <span className="text-sm text-slate-300 flex-1">{entry.name}</span>
                  <span className="text-xs text-slate-500">{entry.background}</span>
                  <span className="text-sm font-bold text-slate-200">{entry.score}</span>
                </div>
              ))}
              {youEntry && (
                <div className="flex items-center gap-3 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-lg px-2 mt-2">
                  <span className="text-sm font-bold text-blue-400 w-5 shrink-0">{youEntry.rank}</span>
                  <span className="text-sm text-blue-300 flex-1 font-medium">You</span>
                  <span className="text-xs text-slate-500">{youEntry.background}</span>
                  <span className="text-sm font-bold text-blue-300">{youEntry.score}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Daily Challenge</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-400/10 text-amber-400 text-xs font-bold px-2 py-0.5 rounded">Market Sizing</span>
              <span className="bg-white/5 text-slate-400 text-xs font-bold px-2 py-0.5 rounded">Medium</span>
            </div>
            <p className="font-semibold text-slate-100 mb-3">Today: Market sizing · NYC coffee shops</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-rose-400 font-medium">Closes in 14h 22m</span>
            </div>
            <Link href="/compete/challenge" className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
              Enter challenge →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
