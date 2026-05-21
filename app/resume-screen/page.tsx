"use client";

import { useState } from "react";
import Link from "next/link";
import ProtoNav from "@/src/components/proto-nav";

const MOCK_FEEDBACK = [
  {
    original: "Responsible for managing a team of 5 engineers on a product redesign.",
    issue: "Passive framing — 'responsible for' signals task ownership, not impact.",
    improved: "Led 5-engineer team through a full product redesign, shipping in 8 weeks and increasing user retention by 24%.",
  },
  {
    original: "Worked with cross-functional stakeholders to align on quarterly roadmap.",
    issue: "No specificity — who, how many, what outcome? MBB readers skip these.",
    improved: "Aligned 4 department heads on Q2 roadmap through structured workshops, resolving 3 competing priorities and unlocking $1.2M in blocked engineering capacity.",
  },
  {
    original: "Helped improve customer satisfaction scores by implementing feedback loops.",
    issue: "'Helped' minimizes your role. What did YOU do? What was the delta?",
    improved: "Redesigned NPS feedback pipeline (3-step survey + CRM integration), driving CSAT from 61 to 79 over 2 quarters.",
  },
];

const SCORE_CATEGORIES = [
  { label: "Impact Quantification", score: 58, color: "bg-amber-500" },
  { label: "Action Verbs", score: 71, color: "bg-blue-500" },
  { label: "MBB Relevance", score: 45, color: "bg-rose-500" },
  { label: "Format", score: 80, color: "bg-emerald-500" },
];

export default function ResumeScreenPage() {
  const [submitted, setSubmitted] = useState(false);
  const [resumeText, setResumeText] = useState("");

  return (
    <div className="min-h-screen bg-[#09090f]">
      <ProtoNav activePath="" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Step 1 of 5</div>
          <h1 className="text-4xl font-extrabold mb-2">Resume Screen</h1>
          <p className="text-slate-400">Get a brutally honest MBB survival estimate in 60 seconds.</p>
        </div>

        {!submitted ? (
          /* Upload view */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#0f1020] border border-[#1d2540] rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Upload or paste your resume</h2>

              {/* Drop zone */}
              <div className="border-2 border-dashed border-[#1d2540] hover:border-blue-500/50 rounded-xl p-10 text-center mb-4 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="font-medium text-slate-200 mb-1">Drop PDF here</div>
                <div className="text-sm text-slate-500">or paste text below</div>
              </div>

              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                rows={10}
                className="w-full bg-[#09090f] border border-[#1d2540] rounded-xl px-4 py-3 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none mb-4"
              />

              <button
                onClick={() => setSubmitted(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Screen My Resume →
              </button>
            </div>

            <div className="bg-[#0f1020] border border-[#1d2540] rounded-2xl p-6 flex flex-col justify-center">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">What you&apos;ll get</div>
              <div className="space-y-4">
                {["MBB survival estimate (% likelihood of passing resume screen)", "Score breakdown across 4 key dimensions", "Bullet-by-bullet feedback with rewritten versions", "Concrete action plan to increase your score"].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-amber-400/10 border border-amber-400/20 rounded-xl">
                <div className="text-amber-400 font-semibold text-sm mb-1">Free tier — 1 screen included</div>
                <div className="text-xs text-slate-400">Upgrade to Sprint for unlimited rescreens as you revise.</div>
              </div>
            </div>
          </div>
        ) : (
          /* Results view */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: score */}
            <div>
              <div className="bg-[#0f1020] border border-[#1d2540] rounded-2xl p-6 mb-4">
                <div className="text-center mb-6">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">MBB Survival Estimate</div>
                  <div className="text-6xl font-extrabold text-amber-400 mb-1">62%</div>
                  <div className="text-sm text-slate-400">of resumes like yours pass the screen</div>
                </div>

                <div className="space-y-4">
                  {SCORE_CATEGORIES.map((cat) => (
                    <div key={cat.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-slate-300">{cat.label}</span>
                        <span className="text-sm font-bold text-slate-200">{cat.score}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/diagnostic"
                className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-center transition-colors"
              >
                Run the Diagnostic →
              </Link>
            </div>

            {/* Right: bullet feedback */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Bullet-by-bullet feedback</div>
              <div className="space-y-4">
                {MOCK_FEEDBACK.map((item, i) => (
                  <div key={i} className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
                    <div className="text-sm text-slate-300 italic mb-3">&ldquo;{item.original}&rdquo;</div>
                    <div className="flex items-start gap-2 mb-3">
                      <span className="text-rose-400 text-lg leading-none shrink-0">✗</span>
                      <span className="text-sm text-rose-300">{item.issue}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 text-lg leading-none shrink-0">✓</span>
                      <span className="text-sm text-emerald-300">{item.improved}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-sm text-slate-400 hover:text-slate-200 transition-colors"
              >
                ← Screen a different resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
