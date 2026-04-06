import { useLocalStorage } from "../shared/hooks/useLocalStorage";
import { storageSchema } from "../shared/schemas/storageSchema";

export default function ProjectsPage() {
  const [storedData, setStoredData] = useLocalStorage(
    "team-task-hub",
    { projects: [], tasks: [] },
    storageSchema,
  );

  function handleAddTestProject() {
    setStoredData({
      ...storedData,
      projects: [
        ...storedData.projects,
        {
          id: crypto.randomUUID(),
          name: "Test Project",
          description: "Testing localStorage",
          createdAt: new Date().toISOString(),
        },
      ],
    });
  }

  function handleClearStorage() {
    localStorage.removeItem("team-task-hub");
    window.location.reload();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "24px",
      }}
    >
      <h1 style={{ marginTop: 0 }}>Team Task Hub</h1>
      <p style={{ color: "#6b7280" }}>Testing useLocalStorage hook</p>

      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <button onClick={handleAddTestProject}>Add test project</button>
        <button onClick={handleClearStorage}>Clear storage</button>
      </div>

      <div>
        <h2>Projects count: {storedData.projects.length}</h2>

        <div>
          {storedData.projects.map((project) => (
            <div
              key={project.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "12px",
              }}
            >
              <h3 style={{ margin: "0 0 8px" }}>{project.name}</h3>
              <p style={{ margin: 0, color: "#4b5563" }}>
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
