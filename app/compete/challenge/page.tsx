"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProtoNav from "@/src/components/proto-nav";
import {
  getTodaysChallenge,
  getTodaysChallengeSubmissions,
  type ChallengePrompt,
  type ChallengeSubmission,
} from "@/lib/supabase/queries";

const LAST_WEEK_DISTRIBUTION = [
  { range: "90–100", count: 3, pct: 15 },
  { range: "80–89", count: 8, pct: 40 },
  { range: "70–79", count: 5, pct: 25 },
  { range: "60–69", count: 3, pct: 15 },
  { range: "< 60", count: 1, pct: 5 },
];

export default function ChallengePage() {
  const [challenge, setChallenge] = useState<ChallengePrompt | null>(null);
  const [submissions, setSubmissions] = useState<ChallengeSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChallenge() {
      const prompt = await getTodaysChallenge();
      setChallenge(prompt);
      if (prompt) {
        const subs = await getTodaysChallengeSubmissions(prompt.id);
        setSubmissions(subs);
      }
      setLoading(false);
    }
    loadChallenge();
  }, []);

  return (
    <div className="min-h-screen bg-[#09090f]">
      <ProtoNav activePath="" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Resets midnight</div>
            <h1 className="text-4xl font-extrabold">Daily Challenge</h1>
          </div>
          {challenge?.closes_in && (
            <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-2">
              <span className="text-sm text-rose-400 font-semibold">Closes in {challenge.closes_in}</span>
            </div>
          )}
        </div>

        {/* Challenge card */}
        {loading ? (
          <div className="bg-[#0f1020] border border-[#1d2540] rounded-2xl p-8 mb-8 text-slate-500 text-sm">
            Loading today&apos;s challenge...
          </div>
        ) : !challenge ? (
          <div className="bg-[#0f1020] border border-[#1d2540] rounded-2xl p-8 mb-8 text-slate-500 text-sm">
            No challenge scheduled for today. Check back tomorrow.
          </div>
        ) : (
          <div className="bg-[#0f1020] border border-[#1d2540] rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-amber-400/10 text-amber-400 text-xs font-bold px-2 py-0.5 rounded">{challenge.category}</span>
              <span className="bg-white/5 text-slate-400 text-xs font-bold px-2 py-0.5 rounded">{challenge.difficulty}</span>
            </div>
            <h2 className="text-2xl font-extrabold mb-3">{challenge.prompt}</h2>
            <p className="text-slate-400 mb-6">Build your estimate from scratch. Show your assumptions. You have 15 minutes — structure matters as much as the final number.</p>
            <Link
              href="/drills/sizing"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Enter today&apos;s challenge →
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top submissions today */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Top submissions today</div>
            <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl overflow-hidden">
              <div className="grid grid-cols-4 px-5 py-3 border-b border-[#1d2540] text-xs font-bold uppercase tracking-widest text-slate-500">
                <span>Rank</span>
                <span className="col-span-2">Name</span>
                <span className="text-right">Score</span>
              </div>
              {loading ? (
                <div className="px-5 py-4 text-sm text-slate-500">Loading...</div>
              ) : submissions.length === 0 ? (
                <div className="px-5 py-4 text-sm text-slate-500">No submissions yet.</div>
              ) : (
                submissions.map((sub, idx) => (
                  <div key={sub.id ?? idx} className="grid grid-cols-4 px-5 py-3 border-b border-[#1d2540] last:border-0 items-center">
                    <span className={`text-sm font-bold ${idx < 3 ? "text-amber-400" : "text-slate-500"}`}>
                      {idx < 3 ? ["🥇", "🥈", "🥉"][idx] : `#${idx + 1}`}
                    </span>
                    <span className="col-span-2 text-sm text-slate-200">{sub.user_id}</span>
                    <span className="text-right text-sm font-bold text-slate-200">{sub.score ?? "–"}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Last week results */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Yesterday&apos;s results</div>

            {/* Winner callout */}
            <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-4 mb-4">
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">Yesterday&apos;s winner</div>
              <div className="font-bold text-slate-100">A. Chen — Score: 96</div>
              <div className="text-sm text-slate-400">Market size for electric scooter sharing in US cities</div>
            </div>

            {/* Score distribution */}
            <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Score distribution</div>
              <div className="space-y-2.5">
                {LAST_WEEK_DISTRIBUTION.map((row) => (
                  <div key={row.range} className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-14 shrink-0">{row.range}</span>
                    <div className="flex-1 h-5 bg-white/5 rounded-md overflow-hidden">
                      <div
                        className="h-full rounded-md bg-blue-500"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 w-12 text-right">{row.count} users</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
