export const corePillars = [
  {
    kicker: "Resume screen",
    title: "Catch the user before the interview exists",
    summary:
      "Use consulting-specific formatting and bullet checks to tell candidates whether their resume would survive an MBB skim."
  },
  {
    kicker: "Diagnostic",
    title: "Turn vague anxiety into ranked weaknesses",
    summary:
      "Run a short timed assessment across math, structuring, sizing, and behavioral to produce a radar chart and a priority fix list."
  },
  {
    kicker: "Behavioral",
    title: "Train the half of MBB interviews everyone underbuilds",
    summary:
      "Story bank creation, STAR cleanup, and PEI rapid-fire drills give the product a wedge competitors routinely ignore."
  },
  {
    kicker: "Drills",
    title: "Build the habit loop before full simulations",
    summary:
      "Mental math, sizing, structuring, and chart interpretation become daily reps with streaks, cohorts, and shareable improvement."
  }
] as const;

export const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    description: "Resume screen, diagnostic, and three trial drill sessions."
  },
  {
    name: "Sprint",
    price: "$99",
    description:
      "Eight weeks of drills, behavioral prep, story bank workflows, readiness tracking, and leaderboard access."
  },
  {
    name: "Full Prep",
    price: "$149",
    description:
      "Twelve weeks plus case simulations once the Phase 2 interview runner is live."
  },
  {
    name: "Monthly",
    price: "$29/mo",
    description:
      "Rolling plan for experienced hires with longer prep cycles and recurring practice needs."
  }
] as const;

export const targetUsers = [
  "MBA candidates",
  "Undergrad applicants",
  "Experienced hires",
  "Advanced degree candidates"
] as const;

export const metrics = [
  {
    name: "Resume screens completed",
    target: "10K in 3 months",
    why: "Measures whether the top-of-funnel wedge is compelling enough to pull organic traffic."
  },
  {
    name: "Screen to diagnostic conversion",
    target: "30%+",
    why: "Tests whether the resume screen creates enough urgency to continue the prep journey."
  },
  {
    name: "Diagnostic to paid conversion",
    target: "5-7%",
    why: "Validates the quality of the personalized gap analysis and paid drill proposition."
  },
  {
    name: "Drills per paid user",
    target: "30+",
    why: "Shows whether the habit loop is strong enough to sustain eight-week engagement."
  }
] as const;

export const buildPhases = [
  {
    window: "Weeks 1-6",
    name: "Launch the wedge",
    summary:
      "Ship the free resume screen, free diagnostic, and paid drills plus behavioral prep."
  },
  {
    window: "Months 2-4",
    name: "Cases and leaderboard",
    summary:
      "Add AI case simulations, school competition, weekly challenges, and firm-specific modes."
  },
  {
    window: "Months 3-5",
    name: "MMI beta",
    summary:
      "Reuse the same platform primitives with medical-specific rubrics, drills, and circuit simulation."
  },
  {
    window: "Months 5-8",
    name: "PE launch",
    summary:
      "Expand into private equity with paper LBO drills, accounting, valuation, and deal walkthroughs."
  }
] as const;

