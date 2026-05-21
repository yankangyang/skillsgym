"use client";

import { useState, useEffect } from "react";
import ProtoNav from "@/src/components/proto-nav";
import { getLeaderboard, type LeaderboardEntry } from "@/lib/supabase/queries";

const SKILL_TABS = ["Overall", "Math", "Structuring", "Behavioral", "Sizing"];
const TIME_TABS = ["Weekly", "All-time"];

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSkill, setActiveSkill] = useState("Overall");
  const [activeTime, setActiveTime] = useState("Weekly");
  const [optIn, setOptIn] = useState(false);

  // Load leaderboard on mount
  useEffect(() => {
    getLeaderboard().then((data) => {
      setLeaderboard(data);
      setLoading(false);
    });
  }, []);

  const youEntry = leaderboard.find((e) => e.is_you);

  return (
    <div className="min-h-screen bg-[#09090f]">
      <ProtoNav activePath="/compete/leaderboard" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2">Leaderboard</h1>
          <p className="text-slate-400 text-sm">Rankings are opt-in. Your profile is visible only to you unless you enable sharing.</p>
        </div>

        {/* Privacy toggle */}
        <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-4 mb-6 flex items-center justify-between">
          <div>
            <div className="font-medium text-slate-200 text-sm">Show me in public leaderboard</div>
            <div className="text-xs text-slate-500 mt-0.5">Off by default — your rank is visible only to you</div>
          </div>
          <button
            onClick={() => setOptIn(!optIn)}
            className={`w-12 h-6 rounded-full transition-colors relative ${optIn ? "bg-blue-600" : "bg-[#1d2540]"}`}
          >
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${optIn ? "left-7" : "left-1"}`} />
          </button>
        </div>

        {/* Your standing */}
        {youEntry && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 mb-6">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Your standing</div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-3xl font-extrabold text-blue-300">#{youEntry.rank}</div>
                <div className="text-xs text-slate-400 mt-0.5">Overall rank</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-blue-300">#8</div>
                <div className="text-xs text-slate-400 mt-0.5">In your cohort (Exp. hires)</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-blue-300">Top 18%</div>
                <div className="text-xs text-slate-400 mt-0.5">All users</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab controls */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
          <div className="flex gap-1.5">
            {SKILL_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSkill(tab)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  activeSkill === tab ? "bg-blue-600 text-white" : "bg-[#0f1020] border border-[#1d2540] text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5">
            {TIME_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTime(tab)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTime === tab ? "bg-[#141830] border border-blue-500/50 text-blue-300" : "bg-[#0f1020] border border-[#1d2540] text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard table */}
        <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl overflow-hidden mb-8">
          {/* Header */}
          <div className="grid grid-cols-6 gap-4 px-5 py-3 border-b border-[#1d2540] text-xs font-bold uppercase tracking-widest text-slate-500">
            <span className="col-span-1">Rank</span>
            <span className="col-span-2">Name</span>
            <span className="col-span-1">Background</span>
            <span className="col-span-1 text-right">Score</span>
            <span className="col-span-1 text-right">Streak</span>
          </div>

          {loading ? (
            <div className="px-5 py-6 text-sm text-slate-500">Loading leaderboard...</div>
          ) : leaderboard.length === 0 ? (
            <div className="px-5 py-6 text-sm text-slate-500">No entries yet.</div>
          ) : (
            leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`grid grid-cols-6 gap-4 px-5 py-3 border-b border-[#1d2540] last:border-0 ${
                  entry.is_you ? "bg-blue-500/10" : ""
                }`}
              >
                <span className={`col-span-1 text-sm font-bold ${entry.rank <= 3 ? "text-amber-400" : entry.is_you ? "text-blue-400" : "text-slate-500"}`}>
                  {entry.rank <= 3 ? ["🥇", "🥈", "🥉"][entry.rank - 1] : `#${entry.rank}`}
                </span>
                <span className={`col-span-2 text-sm font-medium ${entry.is_you ? "text-blue-300" : "text-slate-200"}`}>
                  {entry.name}
                  {entry.is_you && <span className="ml-2 text-xs text-blue-400">(you)</span>}
                </span>
                <span className="col-span-1 text-xs text-slate-500 self-center">{entry.background}</span>
                <span className={`col-span-1 text-right text-sm font-bold ${entry.is_you ? "text-blue-300" : "text-slate-200"}`}>{entry.score}</span>
                <span className={`col-span-1 text-right text-sm ${entry.trend === "up" ? "text-emerald-400" : entry.trend === "down" ? "text-rose-400" : "text-slate-500"}`}>
                  {entry.streak}d {entry.trend === "up" ? "↑" : entry.trend === "down" ? "↓" : "–"}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Friend groups */}
        <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Friend groups</div>
          <p className="text-sm text-slate-400 mb-4">Create a private group of 4–8 people to compete in a closed leaderboard.</p>
          <button className="bg-[#141830] border border-[#1d2540] hover:border-blue-500/50 text-slate-200 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
            Create group
          </button>
        </div>
      </div>
    </div>
  );
}
