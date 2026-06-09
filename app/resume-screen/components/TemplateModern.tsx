import { ResumeData } from "./types";

const sectionHead: React.CSSProperties = {
  fontSize: "9px",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.22em",
  color: "#2563eb",
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: "4px",
  marginBottom: "12px",
  marginTop: "20px",
};

export default function TemplateModern({ data }: { data: ResumeData }) {
  const contactItems = [
    data.email,
    data.phone,
    data.location,
    data.linkedin,
  ].filter(Boolean) as string[];

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
        padding: "52px 64px",
        boxSizing: "border-box",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: "#111",
            }}
          >
            {data.name}
          </div>
          <div
            style={{
              width: "48px",
              height: "3px",
              backgroundColor: "#2563eb",
              marginTop: "10px",
            }}
          />
        </div>

        {contactItems.length > 0 && (
          <div
            style={{
              textAlign: "right",
              fontSize: "10px",
              color: "#555",
              lineHeight: 1.9,
              marginTop: "4px",
            }}
          >
            {contactItems.map((c, i) => (
              <div key={i}>{c}</div>
            ))}
          </div>
        )}
      </div>

      {data.summary && (
        <>
          <div style={sectionHead}>Profile</div>
          <p style={{ margin: 0, color: "#333", lineHeight: 1.65 }}>
            {data.summary}
          </p>
        </>
      )}

      {data.experience.length > 0 && (
        <>
          <div style={sectionHead}>Experience</div>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "16px" }}>
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
                  color: "#2563eb",
                  fontSize: "10.5px",
                  fontWeight: 600,
                  marginBottom: "5px",
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
                {edu.notes ? ` · ${edu.notes}` : ""}
              </div>
            </div>
          ))}
        </>
      )}

      {data.skills && data.skills.length > 0 && (
        <>
          <div style={sectionHead}>Skills</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {data.skills.map((skill, i) => (
              <span
                key={i}
                style={{
                  padding: "2px 10px",
                  backgroundColor: "#eff6ff",
                  color: "#1d4ed8",
                  borderRadius: "999px",
                  fontSize: "10px",
                  fontWeight: 600,
                  border: "1px solid #bfdbfe",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
