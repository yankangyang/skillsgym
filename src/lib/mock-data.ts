// PrepGym Mock Data

export const FIRMS = {
  mbb: ["McKinsey", "BCG", "Bain"],
  tier2: ["Deloitte S&O", "Oliver Wyman", "Accenture Strategy", "L.E.K.", "Kearney", "Roland Berger", "Strategy&"],
  tier3: ["EY-Parthenon", "KPMG Strategy", "ZS Associates", "FTI Consulting"],
};

export const ALL_FIRMS = [...FIRMS.mbb, ...FIRMS.tier2, ...FIRMS.tier3];

export const MOCK_STATS = {
  streak: 14,
  readiness: 48,
  rank: 12,
  sessionsThisWeek: 3,
  totalSessions: 24,
  totalTimeHours: 6.2,
  longestStreak: 14,
  diagnosticRetakes: 2,
};

export const MOCK_SKILLS = [
  { id: "math", label: "Math", score: 3.9, maxScore: 5, percent: 78, status: "strong", color: "blue" },
  { id: "structuring", label: "Structuring", score: 3.1, maxScore: 5, percent: 62, status: "needs work", color: "blue" },
  { id: "behavioral", label: "Behavioral", score: 1.6, maxScore: 5, percent: 32, status: "weakest", color: "rose" },
  { id: "sizing", label: "Market Sizing", score: 3.5, maxScore: 5, percent: 70, status: "good", color: "blue" },
];

export const MOCK_DIAGNOSTIC_QUESTIONS = [
  // Math (3 questions)
  {
    id: 1,
    category: "Math",
    question: "A company's revenue grows from $80M to $92M. What is the percentage increase?",
    options: ["A) 12%", "B) 15%", "C) 14%", "D) 16%"],
    correct: 1,
    explanation: "Percentage increase = (92 - 80) / 80 × 100 = 12/80 × 100 = 15%. Answer B."
  },
  {
    id: 2,
    category: "Math",
    question: "A product has a 40% gross margin and sells for $120. What is the cost of goods sold?",
    options: ["A) $48", "B) $72", "C) $60", "D) $80"],
    correct: 1,
    explanation: "Gross margin = (Price - COGS) / Price. 40% = (120 - COGS) / 120, so COGS = 120 × 0.6 = $72. Answer B."
  },
  {
    id: 3,
    category: "Math",
    question: "If a company's EBITDA is $50M and revenue is $200M, what is the EBITDA margin?",
    options: ["A) 20%", "B) 25%", "C) 30%", "D) 15%"],
    correct: 1,
    explanation: "EBITDA Margin = EBITDA / Revenue = 50 / 200 = 25%. Answer B."
  },
  // Structuring (3 questions)
  {
    id: 4,
    category: "Structuring",
    question: "How would you structure an analysis of why a US retailer should enter Germany?",
    options: [
      "A) Market attractiveness, competitive dynamics, entry feasibility, financial returns",
      "B) SWOT analysis of the company",
      "C) Interview the CEO and store managers",
      "D) Compare Germany vs. France vs. UK pricing"
    ],
    correct: 0,
    explanation: "The best structure covers market attractiveness (size, growth, customer fit), competitive dynamics, entry feasibility (regulatory, operations), and financial returns. Answer A."
  },
  {
    id: 5,
    category: "Structuring",
    question: "A hospital system's profitability has declined 15% over 2 years. How do you structure the diagnosis?",
    options: [
      "A) Call the CFO",
      "B) Revenue decline vs. cost increase — drill into each driver",
      "C) Benchmark against 3 peer hospitals",
      "D) Analyze all departments simultaneously"
    ],
    correct: 1,
    explanation: "Profit = Revenue - Costs. Start by isolating whether it's a revenue problem, cost problem, or both. Answer B."
  },
  {
    id: 6,
    category: "Structuring",
    question: "What is the most MECE way to segment a company's customer base?",
    options: [
      "A) Geography, then demographics, then psychographics",
      "B) Big customers and small customers",
      "C) Choose one primary dimension (e.g., industry vertical) with no overlaps and full coverage",
      "D) Ask a consultant"
    ],
    correct: 2,
    explanation: "MECE means Mutually Exclusive, Collectively Exhaustive — one clear dimension with no overlaps and full coverage. Answer C."
  },
  // Sizing (3 questions)
  {
    id: 7,
    category: "Market Sizing",
    question: "Estimate the number of coffee cups consumed in NYC per day.",
    options: [
      "A) 1 million — rough guess",
      "B) Top-down: NYC pop 8M × 60% adult coffee drinkers × 1.5 cups/day ≈ 7.2M cups",
      "C) Count Starbucks locations × average daily sales",
      "D) Use national per-capita consumption and scale"
    ],
    correct: 1,
    explanation: "Best approach: Top-down from population. NYC 8M × ~60% drink coffee × avg 1.5 cups = ~7.2M cups/day. Answer B."
  },
  {
    id: 8,
    category: "Market Sizing",
    question: "A client wants to know the US market size for electric vehicle charging stations. What's your first step?",
    options: [
      "A) Google it",
      "B) Clarify: are we sizing number of stations, revenue, or investment needed?",
      "C) Start with the number of EVs on the road",
      "D) Analyze Tesla's market share"
    ],
    correct: 1,
    explanation: "Always clarify what metric you're sizing before diving in. Revenue, number of units, and investment are very different questions. Answer B."
  },
  {
    id: 9,
    category: "Market Sizing",
    question: "Which approach is best for estimating the size of the US wedding industry?",
    options: [
      "A) Bottom-up: number of weddings per year × average spend per wedding",
      "B) Top-down: US GDP × consumer spending %",
      "C) Comparable: use UK market and adjust for population",
      "D) Any approach — the answer doesn't matter"
    ],
    correct: 0,
    explanation: "Bottom-up works well here: ~2M US weddings/year × $30K average spend = $60B market. Answer A."
  },
  // Behavioral (3 questions)
  {
    id: 10,
    category: "Behavioral",
    question: "Tell me about a time you led a team through ambiguity. Which response demonstrates MBB-level quality?",
    options: [
      "A) 'I just told my team what to do and they followed along.'",
      "B) 'It was tough but we got through it together as a team.'",
      "C) 'I established a clear decision-making framework, aligned stakeholders on key assumptions, and created weekly checkpoints to adapt as new information emerged.'",
      "D) 'I prefer not to be in ambiguous situations.'"
    ],
    correct: 2,
    explanation: "MBB behavioral answers demonstrate structured thinking, stakeholder awareness, and proactive problem-solving. Answer C shows all three. Answer C."
  },
  {
    id: 11,
    category: "Behavioral",
    question: "What makes a strong 'failure' story for a consulting interview?",
    options: [
      "A) Blame external factors — market conditions, team members",
      "B) Choose a small, low-stakes failure so it doesn't look bad",
      "C) Show real ownership of the failure, specific learnings, and concrete behavior change",
      "D) Avoid the topic — say you haven't had major failures"
    ],
    correct: 2,
    explanation: "Consultants value intellectual honesty. A strong failure story shows genuine ownership, specific insights, and evidence of growth. Answer C."
  },
  {
    id: 12,
    category: "Behavioral",
    question: "In a McKinsey PEI interview, which 'Personal Impact' story is strongest?",
    options: [
      "A) Convincing your manager to change a report format",
      "B) Persuading a resistant VP to adopt a new strategy by building a fact-based case and addressing her specific concerns one-by-one",
      "C) Getting your team to work on a weekend",
      "D) Writing a memo that was well-received"
    ],
    correct: 1,
    explanation: "McKinsey PEI wants senior stakeholder influence, fact-based persuasion, and measurable impact. Answer B demonstrates all three. Answer B."
  },
];

export const MOCK_STORIES = [
  {
    id: 1,
    theme: "Leadership",
    status: "complete",
    situation: "As PM on a $2M product launch, our engineering lead resigned 6 weeks before go-live, leaving the team without technical direction.",
    task: "I needed to rebuild team confidence, redistribute responsibilities, and maintain our launch timeline.",
    action: "I held 1:1s with each engineer, restructured the sprint plan, brought in a part-time contractor for the hardest module, and created daily stand-ups with clear escalation paths.",
    result: "We launched on time. NPS was 47, 15 points above product average. The contractor became a full-time hire.",
    firms: ["McKinsey", "Bain", "BCG"],
  },
  {
    id: 2,
    theme: "Conflict Resolution",
    status: "complete",
    situation: "Two senior PMs were deadlocked over product roadmap priorities, creating team friction and delaying Q3 planning by 3 weeks.",
    task: "As a junior PM, I needed to help resolve the conflict without authority over either party.",
    action: "I mapped each PM's underlying interests (not just positions), facilitated a structured workshop using a decision matrix, and proposed a phased roadmap that addressed both concerns.",
    result: "Roadmap approved within 1 week. Both PMs credited the process in the post-mortem. Q3 launched with zero delays.",
    firms: ["BCG", "Oliver Wyman"],
  },
  { id: 3, theme: "Failure / Setback", status: "empty", situation: "", task: "", action: "", result: "", firms: [] },
  { id: 4, theme: "Initiative / Ownership", status: "empty", situation: "", task: "", action: "", result: "", firms: [] },
  { id: 5, theme: "Teamwork", status: "empty", situation: "", task: "", action: "", result: "", firms: [] },
  { id: 6, theme: "Ambiguity / Uncertainty", status: "empty", situation: "", task: "", action: "", result: "", firms: [] },
];

export const MOCK_LEADERBOARD = [
  { rank: 1, name: "A. Chen", background: "MBA", score: 91, streak: 22, trend: "up" },
  { rank: 2, name: "M. Patel", background: "Exp. Hire", score: 88, streak: 18, trend: "up" },
  { rank: 3, name: "J. Kim", background: "MBA", score: 86, streak: 31, trend: "stable" },
  { rank: 4, name: "S. Rivera", background: "Undergrad", score: 84, streak: 12, trend: "up" },
  { rank: 5, name: "T. Brooks", background: "Exp. Hire", score: 82, streak: 9, trend: "down" },
  { rank: 6, name: "R. Okafor", background: "MBA", score: 80, streak: 14, trend: "up" },
  { rank: 7, name: "L. Zhang", background: "Career Switcher", score: 78, streak: 7, trend: "up" },
  { rank: 8, name: "K. Murphy", background: "Undergrad", score: 76, streak: 5, trend: "stable" },
  { rank: 9, name: "D. Nwosu", background: "MBA", score: 74, streak: 20, trend: "down" },
  { rank: 10, name: "P. Garcia", background: "Exp. Hire", score: 72, streak: 11, trend: "up" },
  { rank: 11, name: "H. Tanaka", background: "MBA", score: 70, streak: 8, trend: "stable" },
  { rank: 12, name: "You", background: "Exp. Hire", score: 65, streak: 14, trend: "up", isYou: true },
  { rank: 13, name: "B. Williams", background: "Undergrad", score: 63, streak: 6, trend: "down" },
  { rank: 14, name: "C. Ibrahim", background: "MBA", score: 61, streak: 3, trend: "up" },
  { rank: 15, name: "F. Lee", background: "Exp. Hire", score: 59, streak: 10, trend: "stable" },
  { rank: 16, name: "G. Santos", background: "Career Switcher", score: 57, streak: 4, trend: "up" },
  { rank: 17, name: "I. Kowalski", background: "Undergrad", score: 55, streak: 7, trend: "down" },
  { rank: 18, name: "J. Adeyemi", background: "MBA", score: 52, streak: 2, trend: "up" },
  { rank: 19, name: "N. Chandra", background: "Exp. Hire", score: 50, streak: 5, trend: "stable" },
  { rank: 20, name: "O. Petrov", background: "Undergrad", score: 48, streak: 1, trend: "down" },
];

export const MOCK_DRILL_QUESTIONS = {
  math: [
    {
      id: 1,
      question: "A product costs $45 to make. It sells for $72. What is the gross margin?",
      options: ["A) 37.5%", "B) 62.5%", "C) 60%", "D) 40%"],
      correct: 0,
      explanation: "Gross margin = (Price - COGS) / Price = (72 - 45) / 72 = 27 / 72 = 37.5%. Answer A.",
      difficulty: "Medium",
    },
    {
      id: 2,
      question: "Revenue last year was $150M. It grew 20% year-over-year. What is revenue this year?",
      options: ["A) $165M", "B) $170M", "C) $180M", "D) $175M"],
      correct: 2,
      explanation: "150 × 1.20 = $180M. Answer C.",
      difficulty: "Easy",
    },
    {
      id: 3,
      question: "Fixed costs are $2M, variable cost per unit is $8, and price per unit is $20. What is the break-even volume?",
      options: ["A) 100,000 units", "B) 166,667 units", "C) 250,000 units", "D) 200,000 units"],
      correct: 1,
      explanation: "Break-even = Fixed costs / (Price - Variable cost) = 2,000,000 / (20 - 8) = 2,000,000 / 12 ≈ 166,667. Answer B.",
      difficulty: "Medium",
    },
    {
      id: 4,
      question: "A company has 40% EBITDA margin on $500M revenue. Interest expense is $30M. What is EBIT?",
      options: ["A) $170M", "B) $200M", "C) $230M", "D) $170M"],
      correct: 0,
      explanation: "EBITDA = 40% × 500M = $200M. EBIT ≈ EBITDA - D&A. But here if we assume EBIT = EBITDA - interest: 200 - 30 = $170M. Answer A.",
      difficulty: "Hard",
    },
    {
      id: 5,
      question: "A market grows at 12% per year. Starting at $50B, what is the market size in 2 years?",
      options: ["A) $56B", "B) $62.7B", "C) $61.6B", "D) $58B"],
      correct: 1,
      explanation: "50 × 1.12 × 1.12 = 50 × 1.2544 = $62.72B ≈ $62.7B. Answer B.",
      difficulty: "Medium",
    },
  ],
  structuring: [
    {
      id: 1,
      prompt: "Your client is a US-based fast food chain considering entering the Indian market. How would you structure this?",
      dimensions: ["Market attractiveness (size, growth, consumer fit)", "Competitive landscape", "Entry strategy & feasibility", "Financial viability & returns"],
      rubric: ["Breadth — covers all key dimensions", "MECE — no overlaps, no gaps", "Prioritized — leads with the most important question", "Client-ready — clear, actionable structure"],
      modelAnswer: "Structure: 1) Market attractiveness — India QSR market size ($5B+), growth rate (15% CAGR), consumer appetite for US brands; 2) Competitive dynamics — existing chains (McDonald's, KFC), local competitors (Haldiram's); 3) Entry feasibility — regulatory, supply chain, menu localization; 4) Financial returns — unit economics, capex, payback period.",
    },
  ],
  sizing: [
    {
      id: 1,
      question: "Estimate the market size for electric vehicles in the US in 2025.",
      approaches: [
        { label: "Top-down", description: "Start with total US auto market → EV penetration rate → average EV price → total revenue" },
        { label: "Bottom-up", description: "EV models available × avg units sold per model × avg price" },
        { label: "Hybrid", description: "Combine top-down for market size with bottom-up for validation" },
        { label: "Comparable", description: "Use Norway (60% EV penetration) as proxy and adjust for US market" },
      ],
      steps: [
        { label: "Total US auto sales (new vehicles/yr)", placeholder: "~15M units" },
        { label: "EV penetration rate (2025 estimate)", placeholder: "~8-10%" },
        { label: "Average EV price", placeholder: "~$50,000" },
        { label: "Total market size", placeholder: "15M × 9% × $50K = $67.5B" },
      ],
    },
  ],
  behavioral: [
    "Tell me about a time you had to convince a skeptical senior stakeholder.",
    "Describe a situation where you failed to meet a commitment. What did you do?",
    "Tell me about a time you led without formal authority.",
    "Describe a situation where you identified a problem no one else had noticed.",
    "Tell me about a time you had to change your approach mid-project due to new information.",
    "Describe your greatest professional accomplishment.",
    "Tell me about a time you worked in a high-pressure, fast-moving environment.",
    "Describe a conflict with a peer or colleague and how you resolved it.",
    "Tell me about a time you took an initiative that had significant impact.",
    "Describe a time you had to make a decision with incomplete information.",
  ],
};

export const MOCK_WEEKLY_CHALLENGE = {
  prompt: "Estimate the total revenue of all coffee shops in the US.",
  category: "Market Sizing",
  difficulty: "Medium",
  closesIn: "3d 14h 22m",
  topSubmissions: [
    { rank: 1, name: "A. Chen", score: 94, time: "8m 32s" },
    { rank: 2, name: "J. Kim", score: 91, time: "9m 15s" },
    { rank: 3, name: "M. Patel", score: 89, time: "11m 02s" },
    { rank: 4, name: "S. Rivera", score: 86, time: "7m 55s" },
    { rank: 5, name: "T. Brooks", score: 84, time: "10m 20s" },
    { rank: 6, name: "R. Okafor", score: 82, time: "12m 41s" },
    { rank: 7, name: "L. Zhang", score: 80, time: "9m 08s" },
    { rank: 8, name: "K. Murphy", score: 77, time: "13m 15s" },
    { rank: 9, name: "D. Nwosu", score: 75, time: "8m 50s" },
    { rank: 10, name: "P. Garcia", score: 73, time: "11m 33s" },
  ],
};
