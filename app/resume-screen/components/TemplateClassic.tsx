import { ResumeData } from "./types";

const sectionHead: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  borderBottom: "1px solid #888",
  paddingBottom: "3px",
  marginBottom: "10px",
  marginTop: "18px",
};

export default function TemplateClassic({ data }: { data: ResumeData }) {
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
        fontFamily: "Georgia, 'Times New Roman', Times, serif",
        fontSize: "11px",
        lineHeight: "1.55",
        padding: "64px 80px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: "22px",
          fontWeight: "bold",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "6px",
        }}
      >
        {data.name}
      </div>

      {contact && (
        <div
          style={{
            textAlign: "center",
            fontSize: "10px",
            color: "#555",
            marginBottom: "16px",
            letterSpacing: "0.02em",
          }}
        >
          {contact}
        </div>
      )}

      <div style={{ borderTop: "2px solid #111", marginBottom: "4px" }} />

      {data.summary && (
        <>
          <div style={sectionHead}>Summary</div>
          <p style={{ margin: "0 0 4px", color: "#333" }}>{data.summary}</p>
        </>
      )}

      {data.experience.length > 0 && (
        <>
          <div style={sectionHead}>Professional Experience</div>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span style={{ fontWeight: "bold", fontSize: "11.5px" }}>
                  {exp.company}
                </span>
                <span style={{ fontSize: "10px", color: "#555" }}>
                  {exp.period}
                </span>
              </div>
              <div
                style={{
                  fontStyle: "italic",
                  marginBottom: "5px",
                  color: "#333",
                }}
              >
                {exp.title}
              </div>
              <ul style={{ margin: 0, paddingLeft: "18px" }}>
                {exp.bullets.map((b, j) => (
                  <li key={j} style={{ marginBottom: "2px" }}>
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
                <span style={{ fontWeight: "bold" }}>{edu.school}</span>
                <span style={{ fontSize: "10px", color: "#555" }}>
                  {edu.period}
                </span>
              </div>
              <div style={{ fontStyle: "italic", color: "#333" }}>
                {edu.degree}
                {edu.notes ? ` — ${edu.notes}` : ""}
              </div>
            </div>
          ))}
        </>
      )}

      {data.skills && data.skills.length > 0 && (
        <>
          <div style={sectionHead}>Skills</div>
          <div style={{ color: "#333" }}>{data.skills.join(", ")}</div>
        </>
      )}
    </div>
  );
}
