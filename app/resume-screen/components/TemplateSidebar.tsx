import { ResumeData } from "./types";

const sidebarLabel: React.CSSProperties = {
  fontSize: "9px",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  color: "#2563eb",
  marginBottom: "8px",
  borderBottom: "1px solid #d1d5db",
  paddingBottom: "3px",
  marginTop: "20px",
};

const mainSection: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.16em",
  color: "#374151",
  borderBottom: "1px solid #d1d5db",
  paddingBottom: "4px",
  marginBottom: "12px",
  marginTop: "20px",
};

export default function TemplateSidebar({ data }: { data: ResumeData }) {
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
        fontFamily:
          "Helvetica Neue, Helvetica, -apple-system, Arial, sans-serif",
        fontSize: "11px",
        lineHeight: "1.6",
        display: "grid",
        gridTemplateColumns: "230px 1fr",
        boxSizing: "border-box",
      }}
    >
      {/* Left sidebar */}
      <div
        style={{
          backgroundColor: "#f3f4f6",
          padding: "40px 22px",
          borderRight: "1px solid #e5e7eb",
        }}
      >
        {/* Name */}
        <div style={{ marginBottom: "4px" }}>
          <div
            style={{
              fontSize: "17px",
              fontWeight: 800,
              color: "#111",
              lineHeight: 1.2,
              marginBottom: "10px",
            }}
          >
            {data.name}
          </div>
          <div
            style={{
              width: "32px",
              height: "3px",
              backgroundColor: "#2563eb",
              marginBottom: "20px",
            }}
          />
        </div>

        {/* Contact */}
        {contactItems.length > 0 && (
          <>
            <div style={{ ...sidebarLabel, marginTop: 0 }}>Contact</div>
            {contactItems.map((c, i) => (
              <div
                key={i}
                style={{
                  fontSize: "10px",
                  color: "#444",
                  marginBottom: "4px",
                  wordBreak: "break-all",
                }}
              >
                {c}
              </div>
            ))}
          </>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <>
            <div style={sidebarLabel}>Education</div>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <div
                  style={{ fontWeight: 700, fontSize: "10.5px", color: "#111" }}
                >
                  {edu.school}
                </div>
                <div style={{ fontSize: "10px", color: "#555" }}>
                  {edu.degree}
                </div>
                <div style={{ fontSize: "9.5px", color: "#777" }}>
                  {edu.period}
                </div>
                {edu.notes && (
                  <div style={{ fontSize: "9.5px", color: "#777" }}>
                    {edu.notes}
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <>
            <div style={sidebarLabel}>Skills</div>
            {data.skills.map((skill, i) => (
              <div
                key={i}
                style={{ fontSize: "10px", color: "#333", marginBottom: "4px" }}
              >
                · {skill}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Right main */}
      <div style={{ padding: "40px 36px", color: "#1a1a1a" }}>
        {data.summary && (
          <>
            <div style={{ ...mainSection, marginTop: 0 }}>Profile</div>
            <p style={{ margin: "0 0 4px", color: "#333", lineHeight: 1.65 }}>
              {data.summary}
            </p>
          </>
        )}

        {data.experience.length > 0 && (
          <>
            <div style={mainSection}>Experience</div>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: "11.5px" }}>
                    {exp.company}
                  </span>
                  <span style={{ fontSize: "10px", color: "#888" }}>
                    {exp.period}
                  </span>
                </div>
                <div
                  style={{
                    color: "#2563eb",
                    fontWeight: 600,
                    fontSize: "10.5px",
                    marginBottom: "5px",
                  }}
                >
                  {exp.title}
                </div>
                <ul style={{ margin: 0, paddingLeft: "14px" }}>
                  {exp.bullets.map((b, j) => (
                    <li
                      key={j}
                      style={{ marginBottom: "3px", color: "#333" }}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
