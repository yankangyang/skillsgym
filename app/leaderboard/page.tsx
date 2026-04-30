import { SiteShell } from "@/src/components/site-shell";
import {
  friendBoard,
  schoolBoard,
  weeklyChallenge
} from "@/src/lib/domain/mockups";

export default function LeaderboardPage() {
  return (
    <SiteShell active="/leaderboard">
      <main className="shell">
        <section className="dashboard-grid">
          <article className="panel spotlight-panel">
            <p className="eyebrow">Leaderboard system</p>
            <h1 className="dashboard-title">Competition should create status, not noise.</h1>
            <p className="lede">
              The interface needs layers: national prestige for clubs, private
              heat for cohorts, and narrow skill flexes for individuals.
            </p>
            <div className="challenge-banner">
              <strong>This week&apos;s challenge</strong>
              <span>{weeklyChallenge.title}</span>
              <span>{weeklyChallenge.leader}</span>
            </div>
          </article>

          <article className="panel dark-panel">
            <div className="section-header">
              <p className="eyebrow">Your cohort</p>
              <h2>Close enough to feel personal</h2>
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

        <section className="panel board-panel">
          <div className="section-header">
            <p className="eyebrow">School vs school</p>
            <h2>The viral board consulting clubs will care about</h2>
          </div>
          <div className="leader-table">
            {schoolBoard.map((row) => (
              <div className="leader-row" key={row.school}>
                <span className="rank-pill">#{row.rank}</span>
                <strong>{row.school}</strong>
                <span>{row.score}</span>
                <span className={row.delta.startsWith("-") ? "delta negative" : "delta"}>
                  {row.delta}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

