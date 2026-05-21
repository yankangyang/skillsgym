"use client";

import Link from "next/link";
import ProtoNav from "@/src/components/proto-nav";

const MOCK_CHAT = [
  { role: "interviewer", text: "Thank you for joining today. Your client is a European pharmaceutical company with a strong generics business. They've asked us to evaluate whether they should enter the US market. How would you begin?" },
  { role: "candidate", text: "I'd like to structure this as a market entry question. Before diving in, let me clarify a few things: Are we evaluating whether to enter, or assuming we enter and figuring out how? And is the client looking at organic entry or acquisition?" },
  { role: "interviewer", text: "Good clarifying questions. Let's say we're evaluating whether to enter, and they're open to any route. Please share your structure." },
];

export default function CaseSimPage() {
  return (
    <div className="min-h-screen bg-[#09090f]">
      <ProtoNav activePath="" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Paywall banner */}
        <div className="bg-[#141830] border border-blue-500/30 rounded-xl px-6 py-4 flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-blue-400">🔒</span>
              <span className="font-bold text-slate-100">Unlock in Full Prep ($149)</span>
            </div>
            <p className="text-sm text-slate-400">AI-powered case simulations with real-time feedback are available in the Full Prep plan.</p>
          </div>
          <Link href="/upgrade" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors shrink-0">
            Upgrade to Full Prep →
          </Link>
        </div>

        {/* Preview (locked overlay) */}
        <div className="relative">
          {/* Lock overlay */}
          <div className="absolute inset-0 bg-[#09090f]/80 backdrop-blur-sm rounded-2xl z-10 flex flex-col items-center justify-center">
            <div className="text-4xl mb-3">🔒</div>
            <div className="text-xl font-bold mb-2">Unlock Full Prep</div>
            <p className="text-slate-400 text-sm mb-4 text-center max-w-sm">AI case simulation with live feedback on framework, math, communication, and recommendation quality.</p>
            <Link href="/upgrade" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Upgrade — $149
            </Link>
          </div>

          {/* Preview content (blurred) */}
          <div className="opacity-30 pointer-events-none">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left panel: config */}
              <div className="lg:col-span-1">
                <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5 mb-4">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Firm</div>
                  <div className="flex flex-wrap gap-2">
                    {["McKinsey", "BCG", "Bain", "Other"].map((f) => (
                      <span key={f} className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${f === "McKinsey" ? "border-blue-500 bg-blue-500/20 text-blue-300" : "border-[#1d2540] text-slate-400"}`}>{f}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Case type</div>
                  <div className="flex flex-wrap gap-2">
                    {["Market Entry", "Profitability", "Growth", "M&A"].map((t) => (
                      <span key={t} className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${t === "Market Entry" ? "border-blue-500 bg-blue-500/20 text-blue-300" : "border-[#1d2540] text-slate-400"}`}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center: chat */}
              <div className="lg:col-span-3">
                <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5 mb-4 min-h-80">
                  <div className="space-y-4">
                    {MOCK_CHAT.map((msg, i) => (
                      <div key={i} className={`flex gap-3 ${msg.role === "candidate" ? "justify-end" : ""}`}>
                        <div className={`max-w-lg rounded-xl p-3 text-sm ${msg.role === "interviewer" ? "bg-[#141830] text-slate-300" : "bg-blue-600/30 text-slate-200 border border-blue-500/30"}`}>
                          <div className="text-xs font-bold uppercase tracking-widest mb-1.5 text-slate-500">{msg.role === "interviewer" ? "Interviewer (AI)" : "You"}</div>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scorecard */}
                <div className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Feedback Scorecard</div>
                  <div className="grid grid-cols-4 gap-3">
                    {["Framework", "Math", "Communication", "Recommendation"].map((dim) => (
                      <div key={dim} className="text-center">
                        <div className="text-2xl font-extrabold text-slate-600 mb-1">?</div>
                        <div className="text-xs text-slate-500">{dim}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
