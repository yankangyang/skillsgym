import { ResumeData } from "./types";

const sectionHead: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  color: "#1a1a1a",
  borderBottom: "1.5px solid #1a3353",
  paddingBottom: "5px",
  marginBottom: "12px",
  marginTop: "22px",
};

export default function TemplateExecutive({ data }: { data: ResumeData }) {
  const contact = [data.email, data.phone, data.location, data.linkedin]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <div
      style={{
        width: "816px",
        minHeight: "1056px",
        backgroundColor: "#ffffff",
        color: "#1a1a1a",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
        fontSize: "11px",
        lineHeight: "1.6",
        boxSizing: "border-box",
      }}
    >
      {/* Dark navy header */}
      <div
        style={{
          backgroundColor: "#1a3353",
          padding: "40px 56px",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: "26px",
            fontWeight: 800,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          {data.name}
        </div>
        {contact && (
          <div
            style={{
              fontSize: "10.5px",
              color: "#93c5fd",
              letterSpacing: "0.02em",
            }}
          >
            {contact}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "36px 56px" }}>
        {data.summary && (
          <>
            <div style={sectionHead}>Executive Summary</div>
            <p style={{ margin: "0 0 4px", color: "#333", lineHeight: 1.65 }}>
              {data.summary}
            </p>
          </>
        )}

        {data.experience.length > 0 && (
          <>
            <div style={sectionHead}>Professional Experience</div>
            {data.experience.map((exp, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "18px",
                  paddingLeft: "14px",
                  borderLeft: "3px solid #1a3353",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: "12px" }}>
                    {exp.company}
                  </span>
                  <span style={{ fontSize: "10px", color: "#777" }}>
                    {exp.period}
                  </span>
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    color: "#1a3353",
                    marginBottom: "6px",
                  }}
                >
                  {exp.title}
                </div>
                <ul style={{ margin: 0, paddingLeft: "16px" }}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={{ marginBottom: "3px", color: "#333" }}>
                      {b}
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
              <div key={i} style={{ marginBottom: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span style={{ fontWeight: 700 }}>{edu.school}</span>
                  <span style={{ fontSize: "10px", color: "#777" }}>
                    {edu.period}
                  </span>
                </div>
                <div style={{ color: "#555" }}>
                  {edu.degree}
                  {edu.notes ? ` — ${edu.notes}` : ""}
                </div>
              </div>
            ))}
          </>
        )}

        {data.skills && data.skills.length > 0 && (
          <>
            <div style={sectionHead}>Core Competencies</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "5px 24px",
              }}
            >
              {data.skills.map((skill, i) => (
                <div key={i} style={{ fontSize: "10.5px", color: "#333" }}>
                  ▪ {skill}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
