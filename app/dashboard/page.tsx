import { SiteShell } from "@/src/components/site-shell";
import {
  dashboardStats,
  friendBoard,
  todaysPlan,
  weaknessCards
} from "@/src/lib/domain/mockups";

export default function DashboardPage() {
  return (
    <SiteShell active="/dashboard">
      <main className="shell dashboard-shell">
        <section className="dashboard-grid">
          <article className="panel spotlight-panel">
            <p className="eyebrow">Candidate dashboard</p>
            <h1 className="dashboard-title">You are interview-worthy in math. Not yet in fit.</h1>
            <p className="lede">
              The tone here should be direct and useful. Strong candidates want
              honest signal, not wellness-app fluff.
            </p>

            <div className="stats-grid">
              {dashboardStats.map((item) => (
                <div className="stat-card" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <small>{item.detail}</small>
                </div>
              ))}
            </div>
          </article>

          <article className="panel radar-panel">
            <div className="section-header">
              <p className="eyebrow">Weakness map</p>
              <h2>What the system wants you to fix first</h2>
            </div>
            <div className="stack">
              {weaknessCards.map((item) => (
                <div className="weakness-card" key={item.title}>
                  <div className="row-topline">
                    <h3>{item.title}</h3>
                    <strong>{item.score}</strong>
                  </div>
                  <p>{item.note}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="two-column">
          <article className="panel">
            <div className="section-header">
              <p className="eyebrow">Today&apos;s loop</p>
              <h2>Your plan should feel generated, not generic</h2>
            </div>
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

          <article className="panel">
            <div className="section-header">
              <p className="eyebrow">Cohort heat</p>
              <h2>Small-group competition is the sticky layer</h2>
            </div>
            <div className="stack">
              {friendBoard.map((friend, index) => (
                <div className="friend-row" key={friend.name}>
                  <span className="rank-pill">#{index + 1}</span>
                  <strong>{friend.name}</strong>
                  <span>{friend.metric}</span>
                  <span className="friend-accent">{friend.accent}</span>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>
    </SiteShell>
  );
}

