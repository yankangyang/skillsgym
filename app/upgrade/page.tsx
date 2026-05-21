"use client";

import Link from "next/link";

const COMPLETED_FREE = [
  "Resume screen done",
  "Diagnostic done",
  "3/3 free drill sessions used",
];

const LOCKED_FEATURES = [
  "Unlimited drills",
  "Behavioral rapid-fire (unlimited)",
  "Story bank builder",
  "Full leaderboard access",
  "Daily challenge",
  "AI case simulations (Full Prep only)",
];

const PLANS = [
  {
    tier: "Free",
    price: "$0",
    badge: "free",
    current: true,
    features: ["Resume screen (1x)", "Diagnostic test", "3 drill sessions", "Basic progress view"],
    cta: "Current plan",
    href: "#",
  },
  {
    tier: "Sprint",
    price: "$99",
    sub: "8 weeks",
    badge: "sprint",
    current: false,
    features: ["Everything in Free", "Unlimited drills", "Behavioral rapid-fire", "Story bank builder", "Leaderboard access", "Daily challenge"],
    cta: "Unlock Sprint →",
    href: "#payment",
  },
  {
    tier: "Full Prep",
    price: "$149",
    sub: "12 weeks",
    badge: "full",
    current: false,
    features: ["Everything in Sprint", "AI case simulations", "Firm-specific prep packs", "Mock interview recordings", "Priority support", "Offer guarantee resources"],
    cta: "Unlock Full Prep →",
    href: "#payment",
  },
];

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-[#09090f]">
      {/* Minimal header */}
      <div className="bg-[#0f1020] border-b border-[#1d2540] h-14 flex items-center px-6">
        <Link href="/" className="font-extrabold text-lg">
          Prep<span className="text-blue-400">Gym</span>
        </Link>
        <Link href="/dashboard" className="ml-auto text-sm text-slate-400 hover:text-slate-200">
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Upgrade PrepGym</div>
          <h1 className="text-5xl font-extrabold mb-4">You&apos;ve outgrown the free tier</h1>
          <p className="text-slate-400 text-lg">Unlock the tools that close the gap between where you are and where you need to be.</p>
        </div>

        {/* Progress */}
        <div className="bg-[#0f1020] border border-[#1d2540] rounded-2xl p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">What you&apos;ve completed (free)</div>
              <div className="space-y-2">
                {COMPLETED_FREE.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="text-emerald-400 text-sm">✓</span>
                    <span className="text-sm text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">What&apos;s locked</div>
              <div className="space-y-2">
                {LOCKED_FEATURES.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="text-slate-600 text-sm">🔒</span>
                    <span className="text-sm text-slate-500">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((plan) => (
            <div
              key={plan.tier}
              className={`bg-[#0f1020] border rounded-2xl p-6 flex flex-col ${
                plan.tier === "Sprint" ? "border-blue-500/50" : "border-[#1d2540]"
              } ${plan.current ? "opacity-60" : ""}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-extrabold">{plan.tier}</span>
                {plan.current && <span className="bg-white/5 text-slate-500 text-xs font-bold px-2 py-0.5 rounded">CURRENT</span>}
                {!plan.current && plan.tier === "Sprint" && <span className="bg-blue-400/10 text-blue-400 text-xs font-bold px-2 py-0.5 rounded">POPULAR</span>}
                {!plan.current && plan.tier === "Full Prep" && <span className="bg-emerald-400/10 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded">BEST VALUE</span>}
              </div>
              <div className="mb-4">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                {plan.sub && <span className="text-slate-400 text-sm ml-1">/ {plan.sub}</span>}
              </div>
              <div className="border-t border-[#1d2540] my-4" />
              <ul className="space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                className={`mt-6 block text-center font-semibold py-3 rounded-xl transition-colors text-sm ${
                  plan.current
                    ? "bg-[#141830] border border-[#1d2540] text-slate-500 cursor-default"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          Questions? <a href="mailto:hello@prepgym.app" className="text-blue-400 hover:underline">hello@prepgym.app</a>
        </div>
      </div>
    </div>
  );
}
