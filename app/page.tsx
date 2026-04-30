import Link from "next/link";
import { wireframes } from "@/src/lib/domain/wireframes";

export default function HomePage() {
  return (
    <main className="gallery-shell">
      <section className="gallery-hero">
        <p className="gallery-kicker">Consulting Prep Gym</p>
        <h1>Choose a front-end style for the student product.</h1>
        <p>
          These are 10 live wireframes you can click through on localhost.
          They are written for students, not for us, and they all start with a
          cleaner story: diagnostic first, then skills.
        </p>
        <div className="gallery-actions">
          <Link className="primary-link" href="/wireframes">
            Open the full gallery
          </Link>
          <Link className="secondary-link" href="/wireframes/style-01">
            Start with style 01
          </Link>
        </div>
      </section>

      <section className="gallery-grid">
        {wireframes.map((wireframe) => (
          <article className="gallery-card" key={wireframe.slug}>
            <div className={`gallery-thumb ${wireframe.theme}`}>
              <div className="gallery-thumb-bar" />
              <div className="gallery-thumb-block large" />
              <div className="gallery-thumb-row">
                <span />
                <span />
              </div>
              <div className="gallery-thumb-row">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="gallery-copy">
              <p>{wireframe.label}</p>
              <h2>{wireframe.styleName}</h2>
              <span>{wireframe.tone}</span>
              <Link href={`/wireframes/${wireframe.slug}`}>Open this style</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
