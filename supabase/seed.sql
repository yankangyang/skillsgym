-- SkillsGym seed data
-- Generated from src/lib/mock-data.ts
-- Run: supabase db query --linked -f supabase/seed.sql

-- ─────────────────────────────────────────
-- Clear existing seed data (idempotent)
-- ─────────────────────────────────────────
truncate table challenge_submissions, challenge_prompts, drill_sessions, diagnostic_results, stories, resume_analyses restart identity cascade;
delete from drill_questions;
delete from diagnostic_questions;
delete from users where id = '00000000-0000-0000-0000-000000000001';


-- ─────────────────────────────────────────
-- USERS (1 dev test user)
-- ─────────────────────────────────────────
insert into users (id, email, name, background, plan, is_public, streak, longest_streak)
values (
  '00000000-0000-0000-0000-000000000001',
  'test@skillsgym.dev',
  'Test User',
  'experienced_hire',
  'full_prep',
  true,
  14,
  14
);


-- ─────────────────────────────────────────
-- DIAGNOSTIC QUESTIONS (12 rows)
-- ─────────────────────────────────────────
insert into diagnostic_questions (category, question, options, correct_index, explanation) values

-- Math (3)
(
  'math',
  'A company''s revenue grows from $80M to $92M. What is the percentage increase?',
  '["A) 12%","B) 15%","C) 14%","D) 16%"]',
  1,
  'Percentage increase = (92 - 80) / 80 × 100 = 12/80 × 100 = 15%. Answer B.'
),
(
  'math',
  'A product has a 40% gross margin and sells for $120. What is the cost of goods sold?',
  '["A) $48","B) $72","C) $60","D) $80"]',
  1,
  'Gross margin = (Price - COGS) / Price. 40% = (120 - COGS) / 120, so COGS = 120 × 0.6 = $72. Answer B.'
),
(
  'math',
  'If a company''s EBITDA is $50M and revenue is $200M, what is the EBITDA margin?',
  '["A) 20%","B) 25%","C) 30%","D) 15%"]',
  1,
  'EBITDA Margin = EBITDA / Revenue = 50 / 200 = 25%. Answer B.'
),

-- Structuring (3)
(
  'structuring',
  'How would you structure an analysis of why a US retailer should enter Germany?',
  '["A) Market attractiveness, competitive dynamics, entry feasibility, financial returns","B) SWOT analysis of the company","C) Interview the CEO and store managers","D) Compare Germany vs. France vs. UK pricing"]',
  0,
  'The best structure covers market attractiveness, competitive dynamics, entry feasibility, and financial returns. Answer A.'
),
(
  'structuring',
  'A hospital system''s profitability has declined 15% over 2 years. How do you structure the diagnosis?',
  '["A) Call the CFO","B) Revenue decline vs. cost increase — drill into each driver","C) Benchmark against 3 peer hospitals","D) Analyze all departments simultaneously"]',
  1,
  'Profit = Revenue - Costs. Start by isolating whether it''s a revenue problem, cost problem, or both. Answer B.'
),
(
  'structuring',
  'What is the most MECE way to segment a company''s customer base?',
  '["A) Geography, then demographics, then psychographics","B) Big customers and small customers","C) Choose one primary dimension (e.g., industry vertical) with no overlaps and full coverage","D) Ask a consultant"]',
  2,
  'MECE means Mutually Exclusive, Collectively Exhaustive. Answer C.'
),

-- Sizing (3)
(
  'sizing',
  'Estimate the number of coffee cups consumed in NYC per day.',
  '["A) 1 million — rough guess","B) Top-down: NYC pop 8M × 60% adult coffee drinkers × 1.5 cups/day ≈ 7.2M cups","C) Count Starbucks locations × average daily sales","D) Use national per-capita consumption and scale"]',
  1,
  'Best approach: Top-down from population. NYC 8M × ~60% drink coffee × avg 1.5 cups = ~7.2M cups/day. Answer B.'
),
(
  'sizing',
  'A client wants to know the US market size for electric vehicle charging stations. What''s your first step?',
  '["A) Google it","B) Clarify: are we sizing number of stations, revenue, or investment needed?","C) Start with the number of EVs on the road","D) Analyze Tesla''s market share"]',
  1,
  'Always clarify what metric you''re sizing before diving in. Answer B.'
),
(
  'sizing',
  'Which approach is best for estimating the size of the US wedding industry?',
  '["A) Bottom-up: number of weddings per year × average spend per wedding","B) Top-down: US GDP × consumer spending %","C) Comparable: use UK market and adjust for population","D) Any approach — the answer doesn''t matter"]',
  0,
  'Bottom-up works well here: ~2M US weddings/year × $30K average spend = $60B market. Answer A.'
),

-- Behavioral (3)
(
  'behavioral',
  'Tell me about a time you led a team through ambiguity. Which response demonstrates MBB-level quality?',
  '["A) I just told my team what to do and they followed along.","B) It was tough but we got through it together as a team.","C) I established a clear decision-making framework, aligned stakeholders on key assumptions, and created weekly checkpoints to adapt as new information emerged.","D) I prefer not to be in ambiguous situations."]',
  2,
  'MBB behavioral answers demonstrate structured thinking, stakeholder awareness, and proactive problem-solving. Answer C.'
),
(
  'behavioral',
  'What makes a strong failure story for a consulting interview?',
  '["A) Blame external factors — market conditions, team members","B) Choose a small, low-stakes failure so it doesn''t look bad","C) Show real ownership of the failure, specific learnings, and concrete behavior change","D) Avoid the topic — say you haven''t had major failures"]',
  2,
  'Consultants value intellectual honesty. A strong failure story shows genuine ownership, specific insights, and evidence of growth. Answer C.'
),
(
  'behavioral',
  'In a McKinsey PEI interview, which Personal Impact story is strongest?',
  '["A) Convincing your manager to change a report format","B) Persuading a resistant VP to adopt a new strategy by building a fact-based case and addressing her specific concerns one-by-one","C) Getting your team to work on a weekend","D) Writing a memo that was well-received"]',
  1,
  'McKinsey PEI wants senior stakeholder influence, fact-based persuasion, and measurable impact. Answer B.'
);


-- ─────────────────────────────────────────
-- DRILL QUESTIONS
-- ─────────────────────────────────────────

-- Math drills (5 MCQ rows)
insert into drill_questions (category, difficulty, prompt, options, correct_index, explanation) values

(
  'math',
  'medium',
  'A product costs $45 to make. It sells for $72. What is the gross margin?',
  '["A) 37.5%","B) 62.5%","C) 60%","D) 40%"]',
  0,
  'Gross margin = (Price - COGS) / Price = (72 - 45) / 72 = 27 / 72 = 37.5%. Answer A.'
),
(
  'math',
  'easy',
  'Revenue last year was $150M. It grew 20% year-over-year. What is revenue this year?',
  '["A) $165M","B) $170M","C) $180M","D) $175M"]',
  2,
  '150 × 1.20 = $180M. Answer C.'
),
(
  'math',
  'medium',
  'Fixed costs are $2M, variable cost per unit is $8, and price per unit is $20. What is the break-even volume?',
  '["A) 100,000 units","B) 166,667 units","C) 250,000 units","D) 200,000 units"]',
  1,
  'Break-even = Fixed costs / (Price - Variable cost) = 2,000,000 / 12 ≈ 166,667. Answer B.'
),
(
  'math',
  'hard',
  'A company has 40% EBITDA margin on $500M revenue. Interest expense is $30M. What is EBIT?',
  '["A) $170M","B) $200M","C) $230M","D) $160M"]',
  0,
  'EBITDA = 40% × 500M = $200M. EBIT = EBITDA - interest = 200 - 30 = $170M. Answer A.'
),
(
  'math',
  'medium',
  'A market grows at 12% per year. Starting at $50B, what is the market size in 2 years?',
  '["A) $56B","B) $62.7B","C) $61.6B","D) $58B"]',
  1,
  '50 × 1.12 × 1.12 = 50 × 1.2544 = $62.72B ≈ $62.7B. Answer B.'
);

-- Structuring drill (1 open-ended row)
insert into drill_questions (category, difficulty, prompt, model_answer, rubric) values
(
  'structuring',
  'medium',
  'Your client is a US-based fast food chain considering entering the Indian market. How would you structure this?',
  'Structure: 1) Market attractiveness — India QSR market size ($5B+), growth rate (15% CAGR), consumer appetite for US brands; 2) Competitive dynamics — existing chains (McDonald''s, KFC), local competitors (Haldiram''s); 3) Entry feasibility — regulatory, supply chain, menu localization; 4) Financial returns — unit economics, capex, payback period.',
  '["Breadth — covers all key dimensions","MECE — no overlaps, no gaps","Prioritized — leads with the most important question","Client-ready — clear, actionable structure"]'
);

-- Sizing drill (1 open-ended row with meta)
insert into drill_questions (category, difficulty, prompt, model_answer, meta) values
(
  'sizing',
  'medium',
  'Estimate the market size for electric vehicles in the US in 2025.',
  '15M total US auto sales × 9% EV penetration × $50,000 avg EV price = $67.5B market.',
  '{
    "approaches": [
      {"label": "Top-down",    "description": "Start with total US auto market → EV penetration rate → average EV price → total revenue"},
      {"label": "Bottom-up",  "description": "EV models available × avg units sold per model × avg price"},
      {"label": "Hybrid",     "description": "Combine top-down for market size with bottom-up for validation"},
      {"label": "Comparable", "description": "Use Norway (60% EV penetration) as proxy and adjust for US market"}
    ],
    "steps": [
      {"label": "Total US auto sales (new vehicles/yr)",  "placeholder": "~15M units"},
      {"label": "EV penetration rate (2025 estimate)",    "placeholder": "~8-10%"},
      {"label": "Average EV price",                      "placeholder": "~$50,000"},
      {"label": "Total market size",                     "placeholder": "15M × 9% × $50K = $67.5B"}
    ]
  }'
);

-- Behavioral drills — generic (10 rows, no firm)
insert into drill_questions (category, difficulty, prompt) values
('behavioral', 'medium', 'Tell me about a time you had to convince a skeptical senior stakeholder.'),
('behavioral', 'medium', 'Describe a situation where you failed to meet a commitment. What did you do?'),
('behavioral', 'medium', 'Tell me about a time you led without formal authority.'),
('behavioral', 'medium', 'Describe a situation where you identified a problem no one else had noticed.'),
('behavioral', 'medium', 'Tell me about a time you had to change your approach mid-project due to new information.'),
('behavioral', 'medium', 'Describe your greatest professional accomplishment.'),
('behavioral', 'medium', 'Tell me about a time you worked in a high-pressure, fast-moving environment.'),
('behavioral', 'medium', 'Describe a conflict with a peer or colleague and how you resolved it.'),
('behavioral', 'medium', 'Tell me about a time you took an initiative that had significant impact.'),
('behavioral', 'medium', 'Describe a time you had to make a decision with incomplete information.');

-- Behavioral drills — firm-specific (3 rows)
insert into drill_questions (category, difficulty, firm, prompt) values
('behavioral', 'medium', 'McKinsey', 'Describe a time you had personal impact on a senior leader or organization.'),
('behavioral', 'medium', 'Bain',     'Why do you want to work at Bain specifically?'),
('behavioral', 'medium', 'BCG',      'Describe a time you drove change in a large or complex organization.');


-- ─────────────────────────────────────────
-- CHALLENGE PROMPTS (today's challenge)
-- ─────────────────────────────────────────
insert into challenge_prompts (prompt_date, category, difficulty, prompt, closes_at) values
(
  '2026-05-21',
  'Market Sizing',
  'medium',
  'Estimate the total revenue of all coffee shops in the US.',
  '2026-05-22 04:00:00+00'
);
