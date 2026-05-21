"use client";

import { useState } from "react";
import Link from "next/link";
import ProtoNav from "@/src/components/proto-nav";
import { FIRMS } from "@/src/lib/mock-data";

const BACKGROUNDS = [
  { id: "mba", label: "Current MBA student" },
  { id: "undergrad", label: "Undergraduate (junior/senior)" },
  { id: "exp-hire", label: "Experienced hire (2–8 years industry)" },
  { id: "career-switcher", label: "Career switcher" },
  { id: "consultant", label: "Current consultant (lateral move)" },
];

const TIMELINES = ["< 3 months", "3–6 months", "6–12 months", "Just exploring"];

interface Notifications {
  dailyDrill: boolean;
  weeklyChallenge: boolean;
  leaderboard: boolean;
}

export default function SettingsPage() {
  const [name, setName] = useState("Alex Kim");
  const [background, setBackground] = useState("exp-hire");
  const [school, setSchool] = useState("");
  const [timeline, setTimeline] = useState("3–6 months");
  const [selectedFirms, setSelectedFirms] = useState<string[]>(["McKinsey", "BCG", "Bain"]);
  const [notifications, setNotifications] = useState<Notifications>({
    dailyDrill: true,
    weeklyChallenge: true,
    leaderboard: false,
  });
  const [publicLeaderboard, setPublicLeaderboard] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleFirm = (firm: string) => {
    setSelectedFirms((prev) => prev.includes(firm) ? prev.filter((f) => f !== firm) : [...prev, firm]);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const allFirms = [
    { group: "MBB", firms: FIRMS.mbb },
    { group: "Tier 2", firms: FIRMS.tier2 },
    { group: "Tier 3", firms: FIRMS.tier3 },
  ];

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${checked ? "bg-blue-600" : "bg-[#1d2540]"}`}
    >
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${checked ? "left-6" : "left-1"}`} />
    </button>
  );

  return (
    <div className="min-h-screen bg-[#09090f]">
      <ProtoNav activePath="" />

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2">Settings</h1>
        </div>

        <div className="space-y-8">
          {/* Profile section */}
          <section className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">Profile</div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#09090f] border border-[#1d2540] rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
                <input
                  type="email"
                  value="alex.kim@example.com"
                  readOnly
                  className="w-full bg-[#09090f] border border-[#1d2540] rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Background</label>
                <select
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-full bg-[#09090f] border border-[#1d2540] rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  {BACKGROUNDS.map((b) => (
                    <option key={b.id} value={b.id}>{b.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">School (optional)</label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="e.g. Wharton, HBS..."
                  className="w-full bg-[#09090f] border border-[#1d2540] rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Application timeline</label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full bg-[#09090f] border border-[#1d2540] rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  {TIMELINES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Target firms */}
          <section className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">Target Firms</div>
            <div className="space-y-4">
              {allFirms.map((group) => (
                <div key={group.group}>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-2">{group.group}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.firms.map((firm) => (
                      <button
                        key={firm}
                        onClick={() => toggleFirm(firm)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
                          selectedFirms.includes(firm)
                            ? "border-blue-500 bg-blue-500/20 text-blue-300"
                            : "border-[#1d2540] bg-[#09090f] text-slate-400 hover:border-slate-500"
                        }`}
                      >
                        {firm}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">Notifications</div>
            <div className="space-y-4">
              {[
                { key: "dailyDrill" as keyof Notifications, label: "Daily drill reminder", desc: "Remind me to complete my daily drill" },
                { key: "weeklyChallenge" as keyof Notifications, label: "Daily challenge", desc: "Notify when a new challenge is available" },
                { key: "leaderboard" as keyof Notifications, label: "Leaderboard updates", desc: "Notify when my rank changes" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-slate-200">{item.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                  </div>
                  <ToggleSwitch
                    checked={notifications[item.key]}
                    onChange={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Privacy */}
          <section className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">Privacy</div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-slate-200">Show me in public leaderboard</div>
                <div className="text-xs text-slate-500 mt-0.5">Off by default — your rank is visible only to you</div>
              </div>
              <ToggleSwitch checked={publicLeaderboard} onChange={() => setPublicLeaderboard(!publicLeaderboard)} />
            </div>
          </section>

          {/* Subscription */}
          <section className="bg-[#0f1020] border border-[#1d2540] rounded-xl p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Subscription</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-200">Current tier: <span className="text-emerald-400 font-bold">Free</span></div>
              </div>
              <Link href="/upgrade" className="text-sm text-blue-400 hover:text-blue-300 font-medium">
                Upgrade →
              </Link>
            </div>
          </section>

          {/* Save */}
          <button
            onClick={handleSave}
            className={`w-full font-semibold py-3 rounded-xl transition-colors text-sm ${
              saved ? "bg-emerald-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {saved ? "Saved!" : "Save changes"}
          </button>

          {/* Danger zone */}
          <section className="bg-[#0f1020] border border-rose-500/20 rounded-xl p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-rose-500/70 mb-3">Danger Zone</div>
            <button className="text-sm text-rose-400 hover:text-rose-300 border border-rose-500/30 hover:border-rose-500/50 px-4 py-2 rounded-xl transition-colors">
              Delete account
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
