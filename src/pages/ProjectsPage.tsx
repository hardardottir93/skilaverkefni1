import { useState } from "react";
import { useLocalStorage } from "../shared/hooks/useLocalStorage";
import { storageSchema } from "../shared/schemas/storageSchema";
import ProjectCard from "../features/projects/ProjectCard";
import TaskForm from "../features/tasks/TaskForm";

export default function ProjectsPage() {
  const [storedData, setStoredData] = useLocalStorage(
    "team-task-hub",
    { projects: [], tasks: [] },
    storageSchema,
  );

  const [search, setSearch] = useState("");

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

  const filteredProjects = storedData.projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase()),
  );

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

      <div style={{ marginBottom: "20px" }}>
        <TaskForm
          onAddTask={(task) => {
            console.log("New task:", task);
          }}
        />
      </div>

      <input
        type="text"
        placeholder="Search projects..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        style={{
          padding: "10px 12px",
          border: "1px solid #d1d5db",
          borderRadius: "10px",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "300px",
        }}
      />

      <div>
        <h2>Projects count: {filteredProjects.length}</h2>
        <div style={{ display: "grid", gap: "12px" }}>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              name={project.name}
              description={project.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
