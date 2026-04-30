import Link from "next/link";
import { wireframes } from "@/src/lib/domain/wireframes";

export default function WireframesIndexPage() {
  return (
    <main className="gallery-shell">
      <section className="gallery-hero">
        <p className="gallery-kicker">10 style directions</p>
        <h1>Pick a front-end style before we build the real product screens.</h1>
        <p>
          Every option below uses student-facing copy, a bigger visual system,
          and a clear module story. Click through and tell me the 2 or 3 you
          want to combine.
        </p>
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
