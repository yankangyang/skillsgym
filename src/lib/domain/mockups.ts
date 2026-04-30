export const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/resume-screen", label: "Resume Rebuilder" },
  { href: "/drills", label: "Drill Loop" },
  { href: "/leaderboard", label: "Leaderboard" }
] as const;

export const dashboardStats = [
  { label: "Readiness", value: "48", detail: "Up 7 points this week" },
  { label: "Streak", value: "14", detail: "Days in a row" },
  { label: "School rank", value: "#12", detail: "Booth cohort" },
  { label: "Drills done", value: "142", detail: "31 in the last 7 days" }
] as const;

export const weaknessCards = [
  {
    title: "Behavioral",
    score: "1.8 / 5",
    note: "Your STAR answers are wandering past 2 minutes and burying the result."
  },
  {
    title: "Structuring",
    score: "2.4 / 5",
    note: "Frameworks are still generic. You need sharper case-specific buckets."
  },
  {
    title: "Math",
    score: "3.2 / 5",
    note: "Accuracy is fine. Speed drops on percentages and margin bridges."
  }
] as const;

export const todaysPlan = [
  {
    title: "McKinsey PEI rapid-fire",
    duration: "9 min",
    badge: "Priority fix",
    description: "Three personal impact prompts with tighter STAR pacing."
  },
  {
    title: "Percentages under pressure",
    duration: "6 min",
    badge: "Streak booster",
    description: "Eight mental math reps with a 30-second shot clock."
  },
  {
    title: "Profit decline structuring set",
    duration: "12 min",
    badge: "Weekly challenge prep",
    description: "Two prompts scored on specificity and prioritization."
  }
] as const;

export const resumeFeedback = [
  {
    bullet: "Responsible for client deliverables across pricing workstreams.",
    verdict: "Hard stop for MBB",
    fix: "Open with ownership and outcome: Led pricing workstream for a $120M business, identifying a 6-point margin opportunity."
  },
  {
    bullet: "Worked with leadership to support market expansion initiatives.",
    verdict: "Too vague",
    fix: "Name the decision, market, and measurable result so the bullet carries recruiter signal in six seconds."
  },
  {
    bullet: "Launched weekly operating review that cut issue-resolution time by 35%.",
    verdict: "Keep this energy",
    fix: "This is the benchmark: direct action, clear impact, easy story anchor."
  }
] as const;

export const drillCategories = [
  {
    title: "Mental math",
    subtext: "Percentages, breakeven, CAGR, margins",
    progress: 72,
    streak: "Top 9% this week"
  },
  {
    title: "Structuring",
    subtext: "Profit decline, pricing, market entry",
    progress: 58,
    streak: "3 prompts from next badge"
  },
  {
    title: "Market sizing",
    subtext: "Estimation logic with timer and scratchpad",
    progress: 66,
    streak: "Best time: 3:41"
  },
  {
    title: "Behavioral",
    subtext: "PEI, Bain fit, BCG stories",
    progress: 41,
    streak: "Weakest area"
  }
] as const;

export const schoolBoard = [
  { rank: 1, school: "Wharton", score: "91.4", delta: "+2.1" },
  { rank: 2, school: "Booth", score: "89.8", delta: "+1.4" },
  { rank: 3, school: "Kellogg", score: "88.9", delta: "+3.7" },
  { rank: 4, school: "Columbia", score: "87.2", delta: "-0.3" },
  { rank: 5, school: "MIT Sloan", score: "86.6", delta: "+0.9" }
] as const;

export const friendBoard = [
  { name: "Ava", metric: "31 drills", accent: "Heat streak" },
  { name: "You", metric: "28 drills", accent: "Closing gap" },
  { name: "Jordan", metric: "24 drills", accent: "Math monster" },
  { name: "Neha", metric: "17 drills", accent: "Fast riser" }
] as const;

export const weeklyChallenge = {
  title: "Size the US EV charging market",
  time: "4 minutes",
  leader: "3:12 by Maya S. from Kellogg",
  note: "This is the Wordle-like share loop: same prompt, same clock, fresh reset every Monday."
} as const;
