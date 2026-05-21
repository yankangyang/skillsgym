"use client";

import Link from "next/link";

const realities = [
  { label: "The work", body: "You build decks and models. Endless slides, 80-hour weeks, airports on Sunday nights. The work itself is often unglamorous." },
  { label: "The upside", body: "You get compressed exposure. Two years of consulting beats five years in a corporate role for sheer variety of problems and industries." },
  { label: "The exit", body: "The brand opens doors. PE, corp dev, strategy roles at tech companies. Most people leave after two to three years — that's the plan, not the failure." },
  { label: "The culture", body: "Up or out is real. Performance is graded on a curve against your cohort. Politics matter more than the brochure suggests." },
  { label: "The lifestyle", body: "Client site Monday through Thursday, home Friday. This is the standard for MBB. Some people love it. Most tolerate it. Few last a decade." },
];

const fits = [
  { signal: "You like ambiguous problems with no clear answer", good: true },
  { signal: "You want to specialize deeply in one domain now", good: false },
  { signal: "You can synthesize and communicate under pressure", good: true },
  { signal: "You need work-life balance in year one", good: false },
  { signal: "You want optionality before committing to an industry", good: true },
  { signal: "You care more about the work than the prestige", good: null },
];

export default function ConsultingPage() {
  return (
    <div className="min-h-screen bg-[#08080e] text-white">
      <nav className="px-8 py-6 flex items-center gap-4">
        <Link href="/" className="text-sm text-slate-600 hover:text-slate-400 transition-colors">←</Link>
        <span className="text-sm font-bold tracking-widest uppercase text-slate-600">00 / Why consulting</span>
      </nav>

      <main className="max-w-2xl mx-auto px-8 pb-24">
        <div className="py-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
            Consulting,<br />honestly.
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Most prep resources skip the part where they tell you what the job is actually like. Read this first.
          </p>
        </div>

        {/* Realities */}
        <div className="space-y-0 mb-20">
          {realities.map((r) => (
            <div key={r.label} className="py-6 border-b border-white/5">
              <div className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">{r.label}</div>
              <p className="text-slate-300 leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>

        {/* Fit signals */}
        <div className="mb-20">
          <h2 className="text-2xl font-black mb-8">Quick read on fit</h2>
          <div className="space-y-3">
            {fits.map((f) => (
              <div key={f.signal} className="flex items-start gap-4 py-3 border-b border-white/5">
                <span className={`text-lg mt-0.5 shrink-0 ${f.good === true ? "text-emerald-400" : f.good === false ? "text-rose-500" : "text-slate-500"}`}>
                  {f.good === true ? "+" : f.good === false ? "−" : "·"}
                </span>
                <span className="text-slate-300 leading-snug">{f.signal}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-600 mt-4">+ means it points toward consulting. − means it cuts against it.</p>
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-white/5 pt-12">
          <p className="text-slate-500 mb-8 leading-relaxed">
            If you&apos;re still in — the next step is your resume. Recruiters screen on formatting and bullet quality before they read a single word of your experience.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/resume-screen"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors text-sm tracking-wide"
            >
              01 → Screen my resume
            </Link>
            <Link
              href="/diagnostic"
              className="bg-white/5 hover:bg-white/10 text-slate-300 font-bold px-8 py-4 rounded-xl transition-colors text-sm tracking-wide"
            >
              02 → Skip to diagnostic
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
