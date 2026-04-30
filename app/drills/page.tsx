import { SiteShell } from "@/src/components/site-shell";
import { drillCategories, todaysPlan } from "@/src/lib/domain/mockups";

export default function DrillsPage() {
  return (
    <SiteShell active="/drills">
      <main className="shell">
        <section className="dashboard-grid">
          <article className="panel dark-panel">
            <p className="eyebrow">Drill loop</p>
            <h1 className="dashboard-title">Fast reps, visible progress, no dead time.</h1>
            <p className="lede">
              This is where the product earns habit. Every category needs a
              clean timer, instant feedback, and a reason to come back tomorrow.
            </p>
            <div className="stack">
              {todaysPlan.map((item) => (
                <div className="task-row" key={item.title}>
                  <div>
                    <div className="row-topline">
                      <h3>{item.title}</h3>
                      <span className="badge">{item.badge}</span>
                    </div>
                    <p>{item.description}</p>
                  </div>
                  <strong>{item.duration}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="panel spotlight-panel">
            <div className="section-header">
              <p className="eyebrow">Session preview</p>
              <h2>Percentages under pressure</h2>
            </div>
            <div className="session-card">
              <div className="timer-ring">
                <span>00:28</span>
              </div>
              <div>
                <p className="session-label">Prompt 3 of 8</p>
                <h3>A retailer grows revenue from $80M to $92M. What is the percentage increase?</h3>
                <p>Input answer, self-score or instant-check, then move without friction.</p>
              </div>
            </div>
          </article>
        </section>

        <section className="section-grid drill-grid">
          {drillCategories.map((item) => (
            <article className="card progress-card" key={item.title}>
              <p className="card-kicker">{item.streak}</p>
              <h2>{item.title}</h2>
              <p>{item.subtext}</p>
              <div className="progress-bar">
                <span style={{ width: `${item.progress}%` }} />
              </div>
              <strong>{item.progress}% mastery</strong>
            </article>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}

