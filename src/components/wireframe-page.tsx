import Link from "next/link";
import type { WireframeDefinition } from "@/src/lib/domain/wireframes";

function VisualPanel({ visual }: { visual: WireframeDefinition["visual"] }) {
  if (visual === "diagnostic") {
    return (
      <div className="wf-visual wf-diagnostic">
        <div className="wf-radar">
          <span className="wf-radar-center">48</span>
        </div>
        <div className="wf-mini-list">
          <div className="wf-mini-item">
            <span>Math</span>
            <strong>3.2</strong>
          </div>
          <div className="wf-mini-item">
            <span>Structuring</span>
            <strong>2.4</strong>
          </div>
          <div className="wf-mini-item">
            <span>Sizing</span>
            <strong>3.8</strong>
          </div>
          <div className="wf-mini-item">
            <span>Behavioral</span>
            <strong>1.8</strong>
          </div>
        </div>
      </div>
    );
  }

  if (visual === "portrait") {
    return (
      <div className="wf-visual wf-portrait">
        <div className="wf-photo-card wf-photo-main" />
        <div className="wf-photo-card wf-photo-side" />
        <div className="wf-floating-note">
          <span>Student plan</span>
          <strong>3 drills today</strong>
        </div>
      </div>
    );
  }

  if (visual === "scoreboard") {
    return (
      <div className="wf-visual wf-scoreboard">
        <div className="wf-board-row">
          <span>#1</span>
          <strong>Wharton</strong>
          <em>91.4</em>
        </div>
        <div className="wf-board-row active">
          <span>#2</span>
          <strong>Booth</strong>
          <em>89.8</em>
        </div>
        <div className="wf-board-row">
          <span>#3</span>
          <strong>Kellogg</strong>
          <em>88.9</em>
        </div>
        <div className="wf-chart-bars">
          <span style={{ height: "72%" }} />
          <span style={{ height: "88%" }} />
          <span style={{ height: "64%" }} />
          <span style={{ height: "92%" }} />
          <span style={{ height: "79%" }} />
        </div>
      </div>
    );
  }

  if (visual === "roadmap") {
    return (
      <div className="wf-visual wf-roadmap">
        <div className="wf-road-step">
          <span>Week 1</span>
          <strong>Diagnostic</strong>
        </div>
        <div className="wf-road-line" />
        <div className="wf-road-step">
          <span>Week 2</span>
          <strong>Stories</strong>
        </div>
        <div className="wf-road-line" />
        <div className="wf-road-step">
          <span>Week 3</span>
          <strong>Drills</strong>
        </div>
        <div className="wf-road-line" />
        <div className="wf-road-step">
          <span>Week 4</span>
          <strong>Ready</strong>
        </div>
      </div>
    );
  }

  return (
    <div className="wf-visual wf-cards">
      <div className="wf-module-card">
        <span>Diagnostic</span>
        <strong>10 min</strong>
      </div>
      <div className="wf-module-card">
        <span>Resume rebuilder</span>
        <strong>8 bullets</strong>
      </div>
      <div className="wf-module-card">
        <span>Fit stories</span>
        <strong>6 prompts</strong>
      </div>
      <div className="wf-module-card">
        <span>Skill drills</span>
        <strong>5 tracks</strong>
      </div>
    </div>
  );
}

export function WireframePage({ wireframe }: { wireframe: WireframeDefinition }) {
  return (
    <main className={`wireframe-shell ${wireframe.theme}`}>
      <header className="wireframe-topbar">
        <Link className="wireframe-brand" href="/wireframes">
          <span className="wireframe-brand-mark">{wireframe.label}</span>
          <div>
            <strong>{wireframe.styleName}</strong>
            <small>{wireframe.tone}</small>
          </div>
        </Link>
        <div className="wireframe-nav">
          <Link href="/wireframes">All styles</Link>
          <Link href="/">Home</Link>
        </div>
      </header>

      <section className="wireframe-hero">
        <div className="wireframe-copy">
          <p className="wireframe-kicker">Consulting interview prep</p>
          <h1>{wireframe.headline}</h1>
          <p className="wireframe-subhead">{wireframe.subhead}</p>
          <div className="wireframe-actions">
            <a className="wireframe-primary" href="#">
              {wireframe.primaryCta}
            </a>
            <a className="wireframe-secondary" href="#">
              {wireframe.secondaryCta}
            </a>
          </div>
          <p className="wireframe-promise">{wireframe.promise}</p>
        </div>

        <div className="wireframe-hero-aside">
          <div className="wireframe-stat">
            <span>{wireframe.heroMetricLabel}</span>
            <strong>{wireframe.heroMetricValue}</strong>
          </div>
          <VisualPanel visual={wireframe.visual} />
        </div>
      </section>

      <section className="wireframe-steps">
        {wireframe.steps.map((step, index) => (
          <article className="wireframe-step" key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{step.title}</h2>
            <p>{step.body}</p>
          </article>
        ))}
      </section>

      <section className="wireframe-modules">
        <div className="wireframe-section-head">
          <p>Core modules</p>
          <h2>Clear modules students can understand immediately.</h2>
        </div>
        <div className="wireframe-module-grid">
          {wireframe.modules.map((module) => (
            <article className="wireframe-module" key={module.title}>
              <span>{module.metric}</span>
              <h3>{module.title}</h3>
              <p>{module.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wireframe-quote">
        <p>“{wireframe.quote}”</p>
        <span>{wireframe.quoteAuthor}</span>
      </section>
    </main>
  );
}
