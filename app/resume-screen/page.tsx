import { SiteShell } from "@/src/components/site-shell";
import { resumeFeedback } from "@/src/lib/domain/mockups";

export default function ResumeScreenPage() {
  return (
    <SiteShell active="/resume-screen">
      <main className="shell">
        <section className="dashboard-grid">
          <article className="panel spotlight-panel">
            <p className="eyebrow">Resume rebuilder</p>
            <h1 className="dashboard-title">Estimated screen survival: 42%</h1>
            <p className="lede">
              The feedback should stay blunt, but the framing should feel like a
              rebuild plan rather than a teardown.
            </p>
            <div className="stats-grid">
              <div className="stat-card">
                <span>Action verbs</span>
                <strong>5 / 8</strong>
                <small>Too many bullets open passively</small>
              </div>
              <div className="stat-card">
                <span>Leadership signal</span>
                <strong>1 / 5</strong>
                <small>Underweight for MBB</small>
              </div>
              <div className="stat-card">
                <span>Quantified impact</span>
                <strong>3 / 8</strong>
                <small>Needs harder proof of results</small>
              </div>
              <div className="stat-card">
                <span>Story readiness</span>
                <strong>2 / 5</strong>
                <small>Thin PEI anchors</small>
              </div>
            </div>
          </article>

          <article className="panel challenge-panel">
            <div className="section-header">
              <p className="eyebrow">Biggest risks</p>
              <h2>Why a recruiter would stop reading</h2>
            </div>
            <ul className="signal-list">
              <li>Your strongest experience is buried below vague execution bullets</li>
              <li>Leadership evidence is too thin for a six-second skim</li>
              <li>Several bullets describe work, not impact</li>
            </ul>
          </article>
        </section>

        <section className="panel board-panel">
          <div className="section-header">
            <p className="eyebrow">Bullet-by-bullet feedback</p>
            <h2>Brutal, specific, and instantly actionable</h2>
          </div>
          <div className="stack">
            {resumeFeedback.map((item) => (
              <div className="feedback-card" key={item.bullet}>
                <p className="quote-line">{item.bullet}</p>
                <div className="row-topline">
                  <strong>{item.verdict}</strong>
                </div>
                <p>{item.fix}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
