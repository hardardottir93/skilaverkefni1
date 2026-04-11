import ProjectCard from "../features/projects/ProjectCard";
import ProjectForm from "../features/projects/ProjectForm";
import TaskCard from "../features/tasks/TaskCard";
import TaskForm from "../features/tasks/TaskForm";

import { useTaskFilters } from "../shared/hooks/useTaskFilters";
import { useStats } from "../shared/hooks/useStats";
import { useTaskHubStore } from "../shared/store/taskHubStore";

export default function ProjectsPage() {
  const projects = useTaskHubStore((state) => state.projects);
  const tasks = useTaskHubStore((state) => state.tasks);
  const selectedProjectId = useTaskHubStore((state) => state.selectedProjectId);
  const setSelectedProjectId = useTaskHubStore(
    (state) => state.setSelectedProjectId,
  );
  const addProject = useTaskHubStore((state) => state.addProject);
  const updateProject = useTaskHubStore((state) => state.updateProject);
  const deleteProject = useTaskHubStore((state) => state.deleteProject);
  const addTask = useTaskHubStore((state) => state.addTask);
  const updateTask = useTaskHubStore((state) => state.updateTask);
  const deleteTask = useTaskHubStore((state) => state.deleteTask);
  const toggleTaskComplete = useTaskHubStore(
    (state) => state.toggleTaskComplete,
  );
  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? null;

  const selectedProjectTasks = tasks.filter(
    (task) => task.projectId === selectedProjectId,
  );
  const {
    search,
    setSearch,
    status,
    setStatus,
    priority,
    setPriority,
    filteredTasks,
  } = useTaskFilters(selectedProjectTasks);

  const { totalTasks, completedTasks, openTasks } = useStats(tasks);
  const totalProjects = projects.length;

  function handleAddProject(project: { name: string; description?: string }) {
    addProject(project);
  }

  function handleAddTask(task: {
    title: string;
    description?: string;
    priority: "low" | "medium" | "high";
  }) {
    if (!selectedProjectId) return;

    addTask({
      projectId: selectedProjectId,
      title: task.title,
      description: task.description,
      status: "todo",
      priority: task.priority,
    });
  }

  function handleDeleteTask(taskId: string) {
    deleteTask(taskId);
  }

  function handleUpdateTask(
    taskId: string,
    updates: {
      title: string;
      description?: string;
      priority: "low" | "medium" | "high";
    },
  ) {
    updateTask(taskId, updates);
  }

  function handleUpdateProject(
    projectId: string,
    updates: {
      name: string;
      description?: string;
    },
  ) {
    updateProject(projectId, updates);
  }

  function handleDeleteProject(projectId: string) {
    deleteProject(projectId);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mb-8">
        <h1 className="mt-0 text-3xl font-bold tracking-tight text-slate-900">
          Team Task Hub
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Create projects and manage tasks for each project.
        </p>
      </div>

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Projects" value={totalProjects} />
        <StatCard title="Tasks" value={totalTasks} />
        <StatCard title="Completed" value={completedTasks} />
        <StatCard title="Open" value={openTasks} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mt-0 text-xl font-semibold text-slate-900">
            Projects
          </h2>

          <div className="mb-5">
            <ProjectForm onAddProject={handleAddProject} />
          </div>

          <div className="grid gap-3">
            {projects.length === 0 ? (
              <p className="text-sm text-slate-500">No projects yet.</p>
            ) : (
              projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  description={project.description}
                  isSelected={project.id === selectedProjectId}
                  onClick={() => setSelectedProjectId(project.id)}
                  onDelete={handleDeleteProject}
                  onUpdate={handleUpdateProject}
                />
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          {!selectedProject ? (
            <>
              <h2 className="mt-0 text-xl font-semibold text-slate-900">
                Project details
              </h2>
              <p className="text-sm text-slate-500">
                Select a project to view its tasks.
              </p>
            </>
          ) : (
            <>
              <h2 className="mt-0 text-xl font-semibold text-slate-900">
                {selectedProject.name}
              </h2>
              <p className="text-sm text-slate-500">
                {selectedProject.description || "No description"}
              </p>

              <div className="my-5">
                <TaskForm onAddTask={handleAddTask} />
              </div>

              <div className="mb-5 flex flex-wrap gap-3">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm"
                />

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as "all" | "todo" | "done")
                  }
                  className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm"
                >
                  <option value="all">All statuses</option>
                  <option value="todo">Todo</option>
                  <option value="done">Done</option>
                </select>

                <select
                  value={priority}
                  onChange={(event) =>
                    setPriority(
                      event.target.value as "all" | "low" | "medium" | "high",
                    )
                  }
                  className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm"
                >
                  <option value="all">All priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="grid gap-3">
                {filteredTasks.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    No tasks match the current filters.
                  </p>
                ) : (
                  filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      description={task.description}
                      priority={task.priority}
                      status={task.status}
                      onDelete={handleDeleteTask}
                      onUpdate={handleUpdateTask}
                      onToggleComplete={toggleTaskComplete}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="m-0 text-sm font-medium text-slate-500">{title}</h3>
      <p className="mt-2 mb-0 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
