export default function ProjectsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "24px",
      }}
    >
      <h1 style={{ marginTop: 0 }}>Team Task Hub</h1>
      <p style={{ color: "#6b7280" }}>
        Projects, tasks and dashboard will live here.
      </p>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginTop: "24px",
          marginBottom: "24px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Tasks</h3>
          <p style={numberStyle}>12</p>
        </div>
        <div style={cardStyle}>
          <h3>Completed</h3>
          <p style={numberStyle}>5</p>
        </div>
        <div style={cardStyle}>
          <h3>Open</h3>
          <p style={numberStyle}>7</p>
        </div>
        <div style={cardStyle}>
          <h3>High Priority</h3>
          <p style={numberStyle}>3</p>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "24px",
        }}
      >
        <div style={panelStyle}>
          <h2>Projects</h2>
          <p>Project list will be here.</p>
        </div>

        <div style={panelStyle}>
          <h2>Tasks</h2>
          <p>Tasks for the selected project will be here.</p>
        </div>
      </section>
    </main>
  );
}

const cardStyle = {
  background: "white",
  borderRadius: "12px",
  padding: "16px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const numberStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  margin: "8px 0 0",
};

const panelStyle = {
  background: "white",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};
