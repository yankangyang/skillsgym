import { ResumeData } from "./types";

function BulletText({ text }: { text: string }) {
  const firstSpace = text.indexOf(" ");
  const verb = firstSpace === -1 ? text : text.slice(0, firstSpace);
  const rest = firstSpace === -1 ? "" : text.slice(firstSpace);
  return (
    <>
      <strong style={{ fontWeight: 900, color: "#0f172a" }}>{verb}</strong>
      {rest}
    </>
  );
}

const sectionHead: React.CSSProperties = {
  fontSize: "9.5px",
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: "0.22em",
  color: "#0f172a",
  borderLeft: "3px solid #1d4ed8",
  paddingLeft: "8px",
  marginBottom: "11px",
  marginTop: "20px",
};

export default function TemplateImpact({ data }: { data: ResumeData }) {
  const contact = [data.email, data.phone, data.location, data.linkedin]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <div
      style={{
        width: "816px",
        minHeight: "1056px",
        backgroundColor: "#ffffff",
        color: "#111111",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
        fontSize: "10.5px",
        lineHeight: "1.55",
        padding: "52px 64px",
        boxSizing: "border-box",
      }}
    >
      {/* Name + contact centered */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div
          style={{
            fontSize: "24px",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "6px",
          }}
        >
          {data.name}
        </div>
        <div
          style={{
            width: "56px",
            height: "3px",
            backgroundColor: "#1d4ed8",
            margin: "0 auto 10px",
          }}
        />
        {contact && (
          <div
            style={{ fontSize: "10px", color: "#555", letterSpacing: "0.02em" }}
          >
            {contact}
          </div>
        )}
      </div>

      {data.summary && (
        <>
          <div style={sectionHead}>Summary</div>
          <p style={{ margin: "0 0 4px", color: "#333" }}>{data.summary}</p>
        </>
      )}

      {data.experience.length > 0 && (
        <>
          <div style={sectionHead}>Experience</div>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "1px",
                }}
              >
                <span style={{ fontWeight: 800, fontSize: "11.5px" }}>
                  {exp.company}
                </span>
                <span style={{ fontSize: "10px", color: "#666" }}>
                  {exp.period}
                </span>
              </div>
              <div
                style={{
                  fontWeight: 600,
                  color: "#444",
                  marginBottom: "5px",
                  fontSize: "10.5px",
                }}
              >
                {exp.title}
              </div>
              <ul style={{ margin: 0, paddingLeft: "14px" }}>
                {exp.bullets.map((b, j) => (
                  <li key={j} style={{ marginBottom: "3px" }}>
                    <BulletText text={b} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}

      {data.education.length > 0 && (
        <>
          <div style={sectionHead}>Education</div>
          {data.education.map((edu, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "8px",
              }}
            >
              <div>
                <span style={{ fontWeight: 700 }}>{edu.school}</span>
                <span style={{ color: "#555", marginLeft: "8px" }}>
                  {edu.degree}
                  {edu.notes ? ` · ${edu.notes}` : ""}
                </span>
              </div>
              <span style={{ fontSize: "10px", color: "#777" }}>
                {edu.period}
              </span>
            </div>
          ))}
        </>
      )}

      {data.skills && data.skills.length > 0 && (
        <>
          <div style={sectionHead}>Skills</div>
          <div style={{ color: "#333" }}>{data.skills.join("  ·  ")}</div>
        </>
      )}
    </div>
  );
}
