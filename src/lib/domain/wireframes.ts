export interface WireframeModule {
  title: string;
  body: string;
  metric: string;
}

export interface WireframeStep {
  title: string;
  body: string;
}

export interface WireframeDefinition {
  slug: string;
  label: string;
  styleName: string;
  tone: string;
  theme: string;
  visual: "diagnostic" | "portrait" | "scoreboard" | "roadmap" | "cards";
  headline: string;
  subhead: string;
  primaryCta: string;
  secondaryCta: string;
  heroMetricLabel: string;
  heroMetricValue: string;
  promise: string;
  steps: WireframeStep[];
  modules: WireframeModule[];
  quote: string;
  quoteAuthor: string;
}

export const wireframes: WireframeDefinition[] = [
  {
    slug: "style-01",
    label: "01",
    styleName: "Diagnostic-first editorial",
    tone: "Confident, academic, high-trust",
    theme: "theme-midnight",
    visual: "diagnostic",
    headline: "Start with the 10-minute diagnostic. Then train exactly what is weak.",
    subhead:
      "You do not need another random case. You need a plan. Measure your baseline across math, structuring, market sizing, and fit, then spend your next seven days on the gaps that actually matter.",
    primaryCta: "Take the diagnostic",
    secondaryCta: "See a sample report",
    heroMetricLabel: "Average score jump after 1 week",
    heroMetricValue: "+18%",
    promise: "Built for students who want the fastest route from anxious to interview-ready.",
    steps: [
      {
        title: "Measure your baseline",
        body: "Answer timed prompts across four consulting skills and see where the interview would break down today."
      },
      {
        title: "Get a real plan",
        body: "The platform picks your next drills, story work, and weekly goals instead of dumping a content library on you."
      },
      {
        title: "Track proof of progress",
        body: "Watch readiness, streaks, and school benchmarks move as you practice."
      }
    ],
    modules: [
      {
        title: "Case math",
        body: "Percentages, margins, break-even, and growth math with a real clock.",
        metric: "28 sec avg"
      },
      {
        title: "Structuring",
        body: "Case-specific frameworks scored on breadth, prioritization, and logic.",
        metric: "2.4 to 3.6"
      },
      {
        title: "Behavioral",
        body: "McKinsey PEI, Bain fit, and sharp STAR answers with no rambling.",
        metric: "Weakest area"
      }
    ],
    quote: "I finally stopped guessing what to practice. The diagnostic made the next week obvious.",
    quoteAuthor: "Second-year MBA, Booth"
  },
  {
    slug: "style-02",
    label: "02",
    styleName: "Magazine with big image blocks",
    tone: "Premium, visual, student-friendly",
    theme: "theme-slate",
    visual: "portrait",
    headline: "The prep gym for students who want structure before they want more cases.",
    subhead:
      "Upload your resume. Run the diagnostic. Build your stories. Then drill the skill that keeps costing you interviews. Every module has a job, and every session earns a clear result.",
    primaryCta: "Build my prep plan",
    secondaryCta: "Preview the drill library",
    heroMetricLabel: "Students on 7-day streaks",
    heroMetricValue: "41%",
    promise: "The page should feel welcoming at first glance and serious by the time the user starts reading.",
    steps: [
      {
        title: "Resume rebuilder",
        body: "Rewrite vague bullets into quantified, recruiter-readable wins."
      },
      {
        title: "Diagnostic report",
        body: "See your weakest category first, not the noisiest content first."
      },
      {
        title: "Daily drill loop",
        body: "Short sessions that fit between class, coffee chats, and interview practice."
      }
    ],
    modules: [
      {
        title: "Resume rebuilder",
        body: "Turn 'helped with strategy' into bullets that survive an MBB skim.",
        metric: "42% survival"
      },
      {
        title: "Story bank",
        body: "Build six stories once and reuse them across fit prompts.",
        metric: "6 anchor stories"
      },
      {
        title: "Weekly challenge",
        body: "Compete on one fresh prompt with your school and your friends.",
        metric: "Monday reset"
      }
    ],
    quote: "It feels less like content and more like a coach that knows where I keep slipping.",
    quoteAuthor: "Undergrad applicant, Kellogg mentor group"
  },
  {
    slug: "style-03",
    label: "03",
    styleName: "Scoreboard home",
    tone: "Competitive, fast, status-driven",
    theme: "theme-ink",
    visual: "scoreboard",
    headline: "See your rank. See your weakness. Fix it today.",
    subhead:
      "The fastest way to bring students back is to show them exactly how they compare, then make the next drill impossible to ignore.",
    primaryCta: "Open my dashboard",
    secondaryCta: "View school leaderboard",
    heroMetricLabel: "This week’s challenge leader",
    heroMetricValue: "3:12",
    promise: "Competition is visible, but the work still stays center stage.",
    steps: [
      {
        title: "Diagnose",
        body: "Score the fundamentals before you chase more mocks."
      },
      {
        title: "Compete",
        body: "Compare streaks, percentiles, and school averages."
      },
      {
        title: "Improve",
        body: "Turn weak-skill alerts into the next three drills automatically."
      }
    ],
    modules: [
      {
        title: "Your readiness",
        body: "A single number with the breakdown beneath it, updated after every session.",
        metric: "48 / 100"
      },
      {
        title: "School board",
        body: "Show Booth vs. Kellogg vs. Wharton without making the page feel juvenile.",
        metric: "#12 Booth"
      },
      {
        title: "Streaks",
        body: "The habit mechanic: one short drill keeps your week alive.",
        metric: "14 days"
      }
    ],
    quote: "The scoreboard made me come back. The diagnostic told me what to do when I did.",
    quoteAuthor: "Experienced hire candidate"
  },
  {
    slug: "style-04",
    label: "04",
    styleName: "Warm coach layout",
    tone: "Encouraging, polished, less intimidating",
    theme: "theme-nightfall",
    visual: "cards",
    headline: "You do not need more prep chaos. You need one clear next step.",
    subhead:
      "Students come in overwhelmed. This version feels more guided: a diagnostic up front, a few high-value modules, and language that makes the product feel supportive without going soft.",
    primaryCta: "Show me my next step",
    secondaryCta: "Explore the modules",
    heroMetricLabel: "Students who finish week one",
    heroMetricValue: "67%",
    promise: "Supportive language, but still honest enough to feel useful.",
    steps: [
      {
        title: "Tell us where you are",
        body: "MBA, undergrad, or experienced hire, with target firms and timeline."
      },
      {
        title: "Run the readiness check",
        body: "Ten minutes to find the skill that needs attention first."
      },
      {
        title: "Follow a calmer plan",
        body: "The product narrows the work so the user does not over-prepare everywhere at once."
      }
    ],
    modules: [
      {
        title: "Readiness report",
        body: "A simple breakdown the student can understand in under one minute.",
        metric: "4 skill areas"
      },
      {
        title: "Practice queue",
        body: "What to do today, what to skip, and what can wait until later.",
        metric: "27 min total"
      },
      {
        title: "Story builder",
        body: "Capture leadership, conflict, ambiguity, and failure once in one place.",
        metric: "6 prompts"
      }
    ],
    quote: "This was the first prep tool that made me feel less scattered after ten minutes.",
    quoteAuthor: "Advanced degree applicant"
  },
  {
    slug: "style-05",
    label: "05",
    styleName: "App-store cards",
    tone: "Modular, clear, mobile-friendly",
    theme: "theme-steel",
    visual: "cards",
    headline: "Pick a module. Make progress in twenty minutes.",
    subhead:
      "This direction treats every area like a clean product module: diagnostic, resume rebuilder, fit stories, and skill drills. Great if we want a page that reads fast on mobile.",
    primaryCta: "Browse modules",
    secondaryCta: "Try a sample drill",
    heroMetricLabel: "Average session length",
    heroMetricValue: "19 min",
    promise: "Clear modules, big type, and faster scanning for students on phones.",
    steps: [
      {
        title: "Choose a module",
        body: "Open diagnostic, stories, math, structuring, or resume work."
      },
      {
        title: "Finish a short session",
        body: "Every module is designed to feel complete in one sitting."
      },
      {
        title: "Stack sessions over time",
        body: "Progress accumulates visibly without overwhelming the user on day one."
      }
    ],
    modules: [
      {
        title: "Diagnostic",
        body: "A short test to route the student into the right module next.",
        metric: "10 min"
      },
      {
        title: "Resume rebuilder",
        body: "Fix weak bullets before interviews ever start.",
        metric: "8 bullets reviewed"
      },
      {
        title: "Drill loop",
        body: "Timed practice with instant feedback and visible mastery.",
        metric: "3 categories"
      }
    ],
    quote: "I would use this between classes because I can tell what each module does in seconds.",
    quoteAuthor: "Junior at Northwestern"
  },
  {
    slug: "style-06",
    label: "06",
    styleName: "Roadmap and milestones",
    tone: "Programmatic, milestone-based",
    theme: "theme-cobalt",
    visual: "roadmap",
    headline: "A four-week prep roadmap students can actually follow.",
    subhead:
      "This version sells the journey: week one baseline, week two story bank, week three drills, week four mock readiness. It is less about features and more about an obvious path.",
    primaryCta: "See the 4-week plan",
    secondaryCta: "Start with week one",
    heroMetricLabel: "Most common week-one priority",
    heroMetricValue: "Behavioral",
    promise: "Best if we want the product to feel like a prep program, not just a tool.",
    steps: [
      {
        title: "Week 1: Baseline",
        body: "Run the diagnostic and rebuild the resume."
      },
      {
        title: "Week 2: Story work",
        body: "Create a clean bank of fit stories with strong outcomes."
      },
      {
        title: "Week 3: Skills",
        body: "Daily drills on the lowest-scoring categories."
      }
    ],
    modules: [
      {
        title: "Milestones",
        body: "Users can see where they are in the prep arc, not just the task list.",
        metric: "4 week plan"
      },
      {
        title: "Deadlines",
        body: "Tie the roadmap to application and interview windows.",
        metric: "Aug 11 BA apps"
      },
      {
        title: "Readiness gates",
        body: "Do not unlock mocks until fundamentals are in shape.",
        metric: "75+ readiness"
      }
    ],
    quote: "This is the first concept that feels like a full prep plan instead of a pile of drills.",
    quoteAuthor: "MBA recruiting lead"
  },
  {
    slug: "style-07",
    label: "07",
    styleName: "Visual dashboard landing",
    tone: "Data-first, ambitious, bolder imagery",
    theme: "theme-carbon",
    visual: "diagnostic",
    headline: "Your dashboard should tell you what would break in the interview today.",
    subhead:
      "A more dashboard-like landing page with visuals, a mock radar, and a big path into the next drill. Strong if we want to look more like a high-end analytics product.",
    primaryCta: "View sample dashboard",
    secondaryCta: "Open the skill map",
    heroMetricLabel: "Diagnostic completion time",
    heroMetricValue: "9:42",
    promise: "The visual weight sits on the scorecard and the skill map, not decorative cards.",
    steps: [
      {
        title: "Open the skill map",
        body: "A single glance shows which category is dragging the score."
      },
      {
        title: "See the next action",
        body: "The product recommends the next drill automatically."
      },
      {
        title: "Watch trendlines move",
        body: "Improvement becomes visible after each practice block."
      }
    ],
    modules: [
      {
        title: "Readiness score",
        body: "A high-level number backed by category-level proof.",
        metric: "48 overall"
      },
      {
        title: "Skill map",
        body: "Math, structuring, sizing, and fit shown in one picture.",
        metric: "4 dimensions"
      },
      {
        title: "Action queue",
        body: "Today’s practice queue is small on purpose.",
        metric: "3 tasks"
      }
    ],
    quote: "This one makes the product look expensive in a good way.",
    quoteAuthor: "Candidate testing mockups"
  },
  {
    slug: "style-08",
    label: "08",
    styleName: "Big-hero student stories",
    tone: "Human, story-led, emotionally persuasive",
    theme: "theme-deepblue",
    visual: "portrait",
    headline: "Students do better when the product feels like it understands the moment they are in.",
    subhead:
      "This direction adds more human imagery and story language around the hard parts of prep: not knowing where to start, practicing the wrong thing, and losing momentum.",
    primaryCta: "Start where most students start",
    secondaryCta: "Read a sample student plan",
    heroMetricLabel: "Students who say the plan felt clearer",
    heroMetricValue: "82%",
    promise: "Less technical at first glance, then more structured as the user scrolls.",
    steps: [
      {
        title: "I need to know if I am ready",
        body: "Start with the diagnostic and get a straightforward answer."
      },
      {
        title: "I need to fix what is weak",
        body: "Move into the module the platform prioritizes first."
      },
      {
        title: "I need to keep momentum",
        body: "Streaks and weekly challenges keep the plan alive."
      }
    ],
    modules: [
      {
        title: "Student plan",
        body: "Show an example week so the product feels concrete from minute one.",
        metric: "Mon to Sun"
      },
      {
        title: "Story coaching",
        body: "The product helps students speak more clearly about what they have done.",
        metric: "90 sec answers"
      },
      {
        title: "Confidence tracking",
        body: "Show readiness without becoming cheesy.",
        metric: "Weekly gains"
      }
    ],
    quote: "I could imagine sending this to my consulting club group chat right away.",
    quoteAuthor: "Senior recruiting for full-time"
  },
  {
    slug: "style-09",
    label: "09",
    styleName: "Minimal black luxury",
    tone: "Very sparse, high-end, typography-led",
    theme: "theme-obsidian",
    visual: "roadmap",
    headline: "One page. One idea. Diagnose first.",
    subhead:
      "The cleanest option. Big type, black background, few modules, almost no extra language. Strong if we want the brand to feel selective and premium.",
    primaryCta: "Begin diagnostic",
    secondaryCta: "Explore core modules",
    heroMetricLabel: "Recommended first session",
    heroMetricValue: "Diagnostic",
    promise: "Best for a premium brand feel, but it carries less warmth.",
    steps: [
      {
        title: "Diagnose",
        body: "See the gap before you practice."
      },
      {
        title: "Train",
        body: "Use short drills to close it."
      },
      {
        title: "Repeat",
        body: "Retake and watch the score rise."
      }
    ],
    modules: [
      {
        title: "Resume rebuilder",
        body: "Stronger bullets, clearer impact, better first-round odds.",
        metric: "1 page"
      },
      {
        title: "Fit stories",
        body: "Sharpen leadership, conflict, and personal impact.",
        metric: "6 stories"
      },
      {
        title: "Skills",
        body: "Math, structure, sizing, charts, and synthesis.",
        metric: "5 tracks"
      }
    ],
    quote: "This feels expensive. That may be exactly the point.",
    quoteAuthor: "Founder style note"
  },
  {
    slug: "style-10",
    label: "10",
    styleName: "Campus challenge board",
    tone: "Energetic, social, recruiting-club ready",
    theme: "theme-electric",
    visual: "scoreboard",
    headline: "Bring your school into the prep loop.",
    subhead:
      "This direction leans hardest into competition: weekly challenge, school-vs-school ranking, and cohort boards. Good if we want virality to be obvious on the page itself.",
    primaryCta: "Join this week’s challenge",
    secondaryCta: "Compare school scores",
    heroMetricLabel: "Schools active this week",
    heroMetricValue: "27",
    promise: "Most energetic and social of the ten, but still anchored in real prep work.",
    steps: [
      {
        title: "Join your school board",
        body: "See where your class ranks in math, structure, and consistency."
      },
      {
        title: "Beat the challenge clock",
        body: "Solve one fresh prompt each week and compare times."
      },
      {
        title: "Train to move the rank",
        body: "Your next drills connect directly to the board."
      }
    ],
    modules: [
      {
        title: "Weekly challenge",
        body: "One prompt everyone sees. One leaderboard everyone watches.",
        metric: "Resets Monday"
      },
      {
        title: "Cohort boards",
        body: "Small friend groups make the pressure feel personal.",
        metric: "4 to 8 people"
      },
      {
        title: "Skill ladders",
        body: "Climb individual percentiles without losing the core prep flow.",
        metric: "Top 9%"
      }
    ],
    quote: "If I were a consulting club lead, this is the version I would share.",
    quoteAuthor: "Campus recruiting use case"
  }
];

export function getWireframe(slug: string) {
  return wireframes.find((wireframe) => wireframe.slug === slug);
}
