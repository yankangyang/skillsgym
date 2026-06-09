"use client";

import { useState, useRef, useCallback, DragEvent, ReactNode } from "react";
import ProtoNav from "@/src/components/proto-nav";
import { ResumeData } from "./components/types";
import TemplateClassic from "./components/TemplateClassic";
import TemplateModern from "./components/TemplateModern";
import TemplateExecutive from "./components/TemplateExecutive";
import TemplateSidebar from "./components/TemplateSidebar";
import TemplateImpact from "./components/TemplateImpact";

const TEMPLATES = [
  {
    id: "classic",
    label: "Classic",
    desc: "Serif · Traditional",
  },
  {
    id: "modern",
    label: "Modern",
    desc: "Sans · Accent color",
  },
  {
    id: "executive",
    label: "Executive",
    desc: "Dark header · Gravitas",
  },
  {
    id: "sidebar",
    label: "Sidebar",
    desc: "Two-column · Scannable",
  },
  {
    id: "impact",
    label: "Impact",
    desc: "Bold verbs · Metrics",
  },
];

type Step = "upload" | "parsing" | "ready";

function renderTemplate(id: string, data: ResumeData): ReactNode {
  switch (id) {
    case "classic":
      return <TemplateClassic data={data} />;
    case "modern":
      return <TemplateModern data={data} />;
    case "executive":
      return <TemplateExecutive data={data} />;
    case "sidebar":
      return <TemplateSidebar data={data} />;
    case "impact":
      return <TemplateImpact data={data} />;
    default:
      return <TemplateClassic data={data} />;
  }
}

const THUMB_WIDTH = 148;
const THUMB_SCALE = THUMB_WIDTH / 816;
const THUMB_HEIGHT = Math.round(1056 * THUMB_SCALE);

function TemplateThumbnail({
  data,
  templateId,
  label,
  desc,
  isActive,
  onClick,
}: {
  data: ResumeData;
  templateId: string;
  label: string;
  desc: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: `${THUMB_WIDTH}px`,
        padding: 0,
        border: `2px solid ${isActive ? "#2563eb" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "10px",
        overflow: "hidden",
        cursor: "pointer",
        background: "transparent",
        flexShrink: 0,
        transition: "border-color 0.15s",
      }}
    >
      <div
        style={{
          width: `${THUMB_WIDTH}px`,
          height: `${THUMB_HEIGHT}px`,
          overflow: "hidden",
          background: "#fff",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "816px",
            transform: `scale(${THUMB_SCALE})`,
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
        >
          {renderTemplate(templateId, data)}
        </div>
      </div>
      <div
        style={{
          padding: "7px 8px 8px",
          background: isActive
            ? "#2563eb"
            : "rgba(255,255,255,0.04)",
          textAlign: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: isActive ? "#fff" : "#e2e8f0",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "9px",
            color: isActive ? "rgba(255,255,255,0.75)" : "#64748b",
            marginTop: "1px",
          }}
        >
          {desc}
        </div>
      </div>
    </button>
  );
}

export default function ResumeScreenPage() {
  const [step, setStep] = useState<Step>("upload");
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [activeTemplate, setActiveTemplate] = useState("classic");
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const templateRef = useRef<HTMLDivElement>(null);

  const processFile = useCallback(async (file: File) => {
    setError(null);
    setStep("parsing");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to process resume");
      }

      setResumeData(data);
      setStep("ready");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
      setStep("upload");
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handlePrint = useCallback(() => {
    const content = templateRef.current?.innerHTML;
    if (!content) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(
      `<!DOCTYPE html><html><head><title>${resumeData?.name ?? "Resume"}</title><style>body{margin:0;padding:0;}*{box-sizing:border-box;}</style></head><body>${content}</body></html>`
    );
    win.document.close();
    win.focus();
    win.print();
  }, [resumeData]);

  return (
    <div className="min-h-screen bg-[#07111f]">
      <ProtoNav activePath="" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
            Resume Templates
          </div>
          <h1 className="text-4xl font-extrabold mb-2">
            5 Professional Formats
          </h1>
          <p className="text-slate-400">
            Upload your resume. We&apos;ll rewrite every bullet to
            consulting-grade and render it in 5 formats.
          </p>
        </div>

        {/* ── Upload ── */}
        {step === "upload" && (
          <div className="max-w-lg">
            {error && (
              <div className="mb-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-300 text-sm">
                {error}
              </div>
            )}

            <div
              className={`border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-blue-400 bg-blue-500/10"
                  : "border-[#1d2540] hover:border-blue-500/40 bg-[#0b1729]"
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div className="font-semibold text-slate-200 mb-1">
                Drop your resume here
              </div>
              <div className="text-sm text-slate-500">
                PDF or DOCX · Click to browse
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}

        {/* ── Parsing ── */}
        {step === "parsing" && (
          <div className="flex flex-col items-center justify-center py-28 gap-5">
            <div className="w-12 h-12 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <div className="text-slate-200 font-semibold text-lg">
              Parsing and rewriting...
            </div>
            <div className="text-sm text-slate-500 text-center max-w-xs">
              Claude is restructuring your resume to consulting standards.
              Takes about 15–20 seconds.
            </div>
          </div>
        )}

        {/* ── Templates ── */}
        {step === "ready" && resumeData && (
          <div>
            {/* Thumbnail strip */}
            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
                Choose a template
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {TEMPLATES.map((t) => (
                  <TemplateThumbnail
                    key={t.id}
                    data={resumeData}
                    templateId={t.id}
                    label={t.label}
                    desc={t.desc}
                    isActive={activeTemplate === t.id}
                    onClick={() => setActiveTemplate(t.id)}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mb-5">
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors"
              >
                Print / Save as PDF
              </button>
              <button
                onClick={() => {
                  setStep("upload");
                  setResumeData(null);
                }}
                className="px-4 py-2.5 bg-[#0b1729] border border-[#1d2540] text-slate-400 hover:text-slate-200 font-medium text-sm rounded-xl transition-colors"
              >
                ← Upload new resume
              </button>
              <span className="text-xs text-slate-600 ml-2">
                Tip: use Cmd+P / Ctrl+P in the print window to save as PDF
              </span>
            </div>

            {/* Full preview */}
            <div className="overflow-x-auto rounded-2xl border border-[#1d2540] bg-[#0b1729] p-3">
              <div ref={templateRef}>
                {renderTemplate(activeTemplate, resumeData)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
