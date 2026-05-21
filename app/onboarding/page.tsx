"use client";

import { useState } from "react";
import Link from "next/link";
import { FIRMS } from "@/src/lib/mock-data";

const BACKGROUNDS = [
  { id: "mba", label: "Current MBA student" },
  { id: "undergrad", label: "Undergraduate (junior/senior)" },
  { id: "exp-hire", label: "Experienced hire (2–8 years industry)" },
  { id: "career-switcher", label: "Career switcher" },
  { id: "consultant", label: "Current consultant (lateral move)" },
];

const TIMELINES = [
  "< 3 months",
  "3–6 months",
  "6–12 months",
  "Just exploring",
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [background, setBackground] = useState("");
  const [school, setSchool] = useState("");
  const [selectedFirms, setSelectedFirms] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");

  const toggleFirm = (firm: string) => {
    setSelectedFirms((prev) =>
      prev.includes(firm) ? prev.filter((f) => f !== firm) : [...prev, firm]
    );
  };

  const allFirms = [
    { group: "MBB", firms: FIRMS.mbb },
    { group: "Tier 2", firms: FIRMS.tier2 },
    { group: "Tier 3", firms: FIRMS.tier3 },
  ];

  return (
    <div className="min-h-screen bg-[#09090f] flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-[#141830]">
        <div
          className="h-full bg-blue-500 transition-all duration-500"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                    s === step
                      ? "bg-blue-600 text-white"
                      : s < step
                      ? "bg-emerald-500 text-white"
                      : "bg-[#141830] text-slate-500"
                  }`}
                >
                  {s < step ? "✓" : s}
                </div>
                {s < 3 && <div className="w-12 h-0.5 bg-[#1d2540]" />}
              </div>
            ))}
            <span className="ml-2 text-sm text-slate-500">Step {step} of 3</span>
          </div>

          {/* Step 1: Name + Email */}
          {step === 1 && (
            <div>
              <h1 className="text-3xl font-extrabold mb-2">Create your account</h1>
              <p className="text-slate-400 mb-8">Start your prep journey. No credit card required.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Full name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Kim"
                    className="w-full bg-[#0f1020] border border-[#1d2540] rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-[#0f1020] border border-[#1d2540] rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Background */}
          {step === 2 && (
            <div>
              <h1 className="text-3xl font-extrabold mb-2">Your background</h1>
              <p className="text-slate-400 mb-6">We tailor your prep plan based on where you&apos;re coming from.</p>
              <div className="space-y-2 mb-6">
                {BACKGROUNDS.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setBackground(bg.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-colors ${
                      background === bg.id
                        ? "border-blue-500 bg-blue-500/10 text-slate-100"
                        : "border-[#1d2540] bg-[#0f1020] text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          background === bg.id ? "border-blue-500 bg-blue-500" : "border-slate-600"
                        }`}
                      >
                        {background === bg.id && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      {bg.label}
                    </div>
                  </button>
                ))}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-1.5">School (optional)</label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="e.g. Wharton, HBS, Stanford GSB"
                  className="w-full bg-[#0f1020] border border-[#1d2540] rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-[#141830] border border-[#1d2540] text-slate-300 font-semibold py-3 rounded-xl hover:border-slate-500 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Target firms */}
          {step === 3 && (
            <div>
              <h1 className="text-3xl font-extrabold mb-2">Target firms</h1>
              <p className="text-slate-400 mb-6">Select the firms you&apos;re targeting. We&apos;ll tailor your cases and stories.</p>

              <div className="space-y-5 mb-6">
                {allFirms.map((group) => (
                  <div key={group.group}>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">{group.group}</div>
                    <div className="flex flex-wrap gap-2">
                      {group.firms.map((firm) => (
                        <button
                          key={firm}
                          onClick={() => toggleFirm(firm)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
                            selectedFirms.includes(firm)
                              ? "border-blue-500 bg-blue-500/20 text-blue-300"
                              : "border-[#1d2540] bg-[#0f1020] text-slate-400 hover:border-slate-500"
                          }`}
                        >
                          {firm}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Application timeline</label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full bg-[#0f1020] border border-[#1d2540] rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">Select timeline...</option>
                  {TIMELINES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-[#141830] border border-[#1d2540] text-slate-300 font-semibold py-3 rounded-xl hover:border-slate-500 transition-colors"
                >
                  Back
                </button>
                <Link
                  href="/resume-screen"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors text-center"
                >
                  Start Free
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
