"use client";

import Link from "next/link";

const steps = [
  { num: "00", label: "Why consulting", href: "/consulting" },
  { num: "01", label: "Resume", href: "/resume-screen" },
  { num: "02", label: "Diagnostic", href: "/diagnostic" },
  { num: "03", label: "Drills", href: "/drills" },
  { num: "04", label: "Behavioral", href: "/behavioral" },
  { num: "05", label: "Full cases", href: "/case-sim" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#08080e] text-white flex flex-col">
      <nav className="px-8 py-6 flex items-center justify-between">
        <span className="text-sm font-bold tracking-widest uppercase text-slate-500">PrepGym</span>
        <Link href="/onboarding" className="text-sm text-slate-500 hover:text-white transition-colors">
          Sign in
        </Link>
      </nav>

      <main className="flex-1 flex flex-col justify-center px-8 max-w-2xl mx-auto w-full py-20">
        <p className="text-sm font-bold tracking-widest uppercase text-blue-500 mb-6">
          Consulting interview prep
        </p>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-16">
          Know where<br />you&apos;ll fail.
        </h1>

        <div className="space-y-1 mb-16">
          {steps.map((step) => (
            <Link
              key={step.num}
              href={step.href}
              className="flex items-center gap-6 py-4 border-b border-white/5 hover:border-white/20 group transition-colors"
            >
              <span className="text-xs font-bold text-slate-600 w-6 shrink-0">{step.num}</span>
              <span className="text-2xl md:text-3xl font-bold text-slate-300 group-hover:text-white transition-colors">
                {step.label}
              </span>
              <span className="ml-auto text-slate-700 group-hover:text-slate-400 transition-colors text-lg">→</span>
            </Link>
          ))}
        </div>

        <Link
          href="/onboarding"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-colors text-sm tracking-wide self-start"
        >
          Start free
        </Link>
      </main>
    </div>
  );
}
