"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProtoNav from "@/src/components/proto-nav";
import {
  getStories,
  upsertStory,
  TEST_USER_ID,
  type Story,
} from "@/lib/supabase/queries";
import { FIRMS } from "@/src/lib/mock-data";

const ALL_FIRMS = [...FIRMS.mbb, ...FIRMS.tier2, ...FIRMS.tier3];

export default function StoryBankPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Story>>({});

  // Load stories on mount
  useEffect(() => {
    getStories(TEST_USER_ID).then((data) => {
      setStories(data);
      setLoading(false);
    });
  }, []);

  const completeCount = stories.filter((s) => s.status === "complete").length;

  const handleEdit = (story: Story) => {
    setEditingId(story.id);
    setFormData({ ...story });
    setExpandedId(null);
  };

  const handleSave = async () => {
    if (!editingId) return;
    const updated: Story = {
      ...(stories.find((s) => s.id === editingId) as Story),
      ...formData,
      status: "complete",
    };
    await upsertStory(updated);
    setStories((prev) =>
      prev.map((s) => (s.id === editingId ? updated : s))
    );
    setEditingId(null);
    setFormData({});
  };

  const toggleFirmTag = (firm: string) => {
    const current = (formData.firms || []) as string[];
    if (current.includes(firm)) {
      setFormData({ ...formData, firms: current.filter((f) => f !== firm) });
    } else {
      setFormData({ ...formData, firms: [...current, firm] });
    }
  };

  const wordCount = (text?: string) => (text || "").trim().split(/\s+/).filter(Boolean).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090f] flex items-center justify-center">
        <div className="text-slate-400 text-sm">Loading story bank...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090f]">
      <ProtoNav activePath="" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold mb-1">Story Bank</h1>
            <p className="text-slate-400">{completeCount} of {stories.length} stories complete</p>
          </div>
          {stories.length > 0 && (
            <div className="h-2 w-48 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(completeCount / stories.length) * 100}%` }} />
            </div>
          )}
        </div>

        {stories.length === 0 && (
          <p className="text-slate-500 text-sm">No stories yet. Add stories to your bank to get started.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {stories.map((story) => (
            <div key={story.id}>
              {/* Story card */}
              {editingId !== story.id && (
                <div
                  className={`bg-[#0f1020] border rounded-xl p-5 ${
                    story.status === "complete" ? "border-emerald-500/30" : "border-[#1d2540]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${story.status === "complete" ? "bg-emerald-500" : "bg-slate-700"}`} />
                      <h2 className="font-bold text-slate-100">{story.theme}</h2>
                    </div>
                    {story.status === "complete" ? (
                      <span className="bg-emerald-400/10 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded">Complete</span>
                    ) : (
                      <span className="bg-white/5 text-slate-500 text-xs font-bold px-2 py-0.5 rounded">Empty</span>
                    )}
                  </div>

                  {story.status === "complete" ? (
                    <div>
                      <button
                        onClick={() => setExpandedId(expandedId === story.id ? null : story.id)}
                        className="text-sm text-blue-400 hover:text-blue-300 mb-2"
                      >
                        {expandedId === story.id ? "Collapse ↑" : "View story →"}
                      </button>

                      {expandedId === story.id && (
                        <div className="mt-3 space-y-3 border-t border-[#1d2540] pt-3">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Situation</div>
                            <p className="text-sm text-slate-300 leading-relaxed">{story.situation}</p>
                          </div>
                          <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Task</div>
                            <p className="text-sm text-slate-300 leading-relaxed">{story.task}</p>
                          </div>
                          <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Action</div>
                            <p className="text-sm text-slate-300 leading-relaxed">{story.action}</p>
                          </div>
                          <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Result</div>
                            <p className="text-sm text-slate-300 leading-relaxed">{story.result}</p>
                          </div>
                          {story.firms.length > 0 && (
                            <div>
                              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Firm tags</div>
                              <div className="flex flex-wrap gap-1.5">
                                {story.firms.map((firm) => (
                                  <span key={firm} className="bg-blue-400/10 text-blue-400 text-xs font-bold px-2 py-0.5 rounded">{firm}</span>
                                ))}
                              </div>
                            </div>
                          )}
                          <button onClick={() => handleEdit(story)} className="text-xs text-slate-400 hover:text-slate-200 mt-1">Edit story</button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(story)}
                      className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                    >
                      Start building →
                    </button>
                  )}
                </div>
              )}

              {/* STAR builder form */}
              {editingId === story.id && (
                <div className="bg-[#0f1020] border border-blue-500/30 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-slate-100">{story.theme}</h2>
                    <button onClick={() => setEditingId(null)} className="text-xs text-slate-500 hover:text-slate-300">Cancel</button>
                  </div>

                  <div className="space-y-4">
                    {(["situation", "task", "action", "result"] as const).map((field) => (
                      <div key={field}>
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                          <span className="ml-2 normal-case font-normal text-slate-600">{wordCount((formData as Record<string, string>)[field])} words</span>
                        </label>
                        <textarea
                          value={(formData as Record<string, string>)[field] || ""}
                          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                          rows={3}
                          placeholder={`Describe the ${field}...`}
                          className="w-full bg-[#09090f] border border-[#1d2540] rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 resize-none"
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Firm tags</label>
                      <div className="flex flex-wrap gap-1.5">
                        {ALL_FIRMS.map((firm) => (
                          <button
                            key={firm}
                            onClick={() => toggleFirmTag(firm)}
                            className={`text-xs font-bold px-2 py-1 rounded border transition-colors ${
                              (formData.firms || []).includes(firm)
                                ? "border-blue-500 bg-blue-500/20 text-blue-300"
                                : "border-[#1d2540] bg-[#09090f] text-slate-500 hover:border-slate-500"
                            }`}
                          >
                            {firm}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleSave}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                    >
                      Save story
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
