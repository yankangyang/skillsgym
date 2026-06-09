import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = file.name.toLowerCase();

  let rawText = "";

  if (filename.endsWith(".docx")) {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    rawText = result.value;
  } else if (filename.endsWith(".pdf")) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfParse = (await import("pdf-parse")) as any;
    const parse = pdfParse.default ?? pdfParse;
    const result = await parse(buffer);
    rawText = result.text;
  } else {
    return NextResponse.json(
      { error: "Unsupported file type. Please upload a PDF or DOCX." },
      { status: 400 }
    );
  }

  if (!rawText || rawText.trim().length < 50) {
    return NextResponse.json(
      { error: "Could not extract text from the file. Try copying to a different format." },
      { status: 422 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const client = new Anthropic({ apiKey });

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: `You are an expert resume consultant specializing in McKinsey, BCG, and Bain applications.

Parse the following resume text and return a structured JSON object. While doing so, rewrite every bullet point to be consulting-grade:
- Start each bullet with a strong action verb (Led, Drove, Designed, Built, Reduced, Launched, Structured, Delivered, etc.)
- Quantify impact wherever the original provides any data (%, $, headcount, time, revenue)
- Show clear individual attribution — not "the team did" but what YOU specifically drove
- Remove passive voice, filler phrases ("responsible for", "helped with", "worked on")
- Be specific and results-oriented

If original bullets lack quantifiable data, write the best possible version and prefix it with [EST].
Keep all names, companies, schools, job titles, and dates exactly as they appear — never invent facts.

Return ONLY a valid JSON object — no markdown fences, no explanation, no trailing text.

Schema:
{
  "name": "string",
  "email": "string or null",
  "phone": "string or null",
  "location": "string or null",
  "linkedin": "string or null",
  "summary": "string or null",
  "experience": [
    {
      "company": "string",
      "title": "string",
      "period": "string",
      "bullets": ["string"]
    }
  ],
  "education": [
    {
      "school": "string",
      "degree": "string",
      "period": "string",
      "notes": "string or null"
    }
  ],
  "skills": ["string"] or null
}

Resume text:
${rawText}`,
      },
    ],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";

  try {
    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        const data = JSON.parse(match[0]);
        return NextResponse.json(data);
      } catch {
        // fall through
      }
    }
    return NextResponse.json(
      { error: "Failed to parse resume data from AI response" },
      { status: 500 }
    );
  }
}
