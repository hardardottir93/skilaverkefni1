import { create } from "zustand";
import { loadStorageData, saveStorageData } from "../lib/storage";
import type { Project, Task, TaskPriority, TaskStatus } from "../types";

type AddProjectInput = {
  name: string;
  description?: string;
};

type AddTaskInput = {
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
};

type UpdateTaskInput = Partial<
  Pick<Task, "title" | "description" | "status" | "priority">
>;

type UpdateProjectInput = {
  name: string;
  description?: string;
};

type TaskHubStore = {
  projects: Project[];
  tasks: Task[];
  selectedProjectId: string | null;
  setSelectedProjectId: (projectId: string | null) => void;
  setProjectsAndTasks: (data: { projects: Project[]; tasks: Task[] }) => void;
  addProject: (input: AddProjectInput) => void;
  updateProject: (projectId: string, updates: UpdateProjectInput) => void;
  deleteProject: (projectId: string) => void;
  addTask: (input: AddTaskInput) => void;
  updateTask: (taskId: string, updates: UpdateTaskInput) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskComplete: (taskId: string) => void;
};

const initialData = loadStorageData();

export const useTaskHubStore = create<TaskHubStore>((set) => ({
  projects: initialData.projects,
  tasks: initialData.tasks,
  selectedProjectId: initialData.projects[0]?.id ?? null,

  setSelectedProjectId: (projectId) => {
    set({ selectedProjectId: projectId });
  },

  setProjectsAndTasks: ({ projects, tasks }) => {
    set((state) => ({
      projects,
      tasks,
      selectedProjectId:
        projects.find((project) => project.id === state.selectedProjectId)
          ?.id ??
        projects[0]?.id ??
        null,
    }));
  },

  addProject: (input) => {
    set((state) => {
      const newProject: Project = {
        id: crypto.randomUUID(),
        name: input.name,
        description: input.description,
        createdAt: new Date().toISOString(),
      };

      const nextProjects = [...state.projects, newProject];

      saveStorageData({
        projects: nextProjects,
        tasks: state.tasks,
      });

      return {
        projects: nextProjects,
        selectedProjectId: newProject.id,
      };
    });
  },

  updateProject: (projectId, updates) => {
    set((state) => {
      const nextProjects = state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              name: updates.name,
              description: updates.description,
            }
          : project,
      );

      saveStorageData({
        projects: nextProjects,
        tasks: state.tasks,
      });

      return {
        projects: nextProjects,
      };
    });
  },

  deleteProject: (projectId) => {
    set((state) => {
      const nextProjects = state.projects.filter(
        (project) => project.id !== projectId,
      );

      const nextTasks = state.tasks.filter(
        (task) => task.projectId !== projectId,
      );

      saveStorageData({
        projects: nextProjects,
        tasks: nextTasks,
      });

      return {
        projects: nextProjects,
        tasks: nextTasks,
        selectedProjectId:
          state.selectedProjectId === projectId
            ? (nextProjects[0]?.id ?? null)
            : state.selectedProjectId,
      };
    });
  },

  addTask: (input) => {
    set((state) => {
      const now = new Date().toISOString();

      const newTask: Task = {
        id: crypto.randomUUID(),
        projectId: input.projectId,
        title: input.title,
        description: input.description,
        status: input.status,
        priority: input.priority,
        completed: input.status === "done",
        createdAt: now,
        updatedAt: now,
      };

      const nextTasks = [...state.tasks, newTask];

      saveStorageData({
        projects: state.projects,
        tasks: nextTasks,
      });

      return {
        tasks: nextTasks,
      };
    });
  },

  updateTask: (taskId, updates) => {
    set((state) => {
      const nextTasks = state.tasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const nextStatus: TaskStatus = updates.status ?? task.status;

        return {
          ...task,
          ...updates,
          status: nextStatus,
          completed: nextStatus === "done",
          updatedAt: new Date().toISOString(),
        };
      });

      saveStorageData({
        projects: state.projects,
        tasks: nextTasks,
      });

      return {
        tasks: nextTasks,
      };
    });
  },

  deleteTask: (taskId) => {
    set((state) => {
      const nextTasks = state.tasks.filter((task) => task.id !== taskId);

      saveStorageData({
        projects: state.projects,
        tasks: nextTasks,
      });

      return {
        tasks: nextTasks,
      };
    });
  },

  toggleTaskComplete: (taskId) => {
    set((state) => {
      const nextTasks = state.tasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const nextCompleted = !task.completed;
        const nextStatus: TaskStatus = nextCompleted ? "done" : "todo";

        return {
          ...task,
          completed: nextCompleted,
          status: nextStatus,
          updatedAt: new Date().toISOString(),
        };
      });

      saveStorageData({
        projects: state.projects,
        tasks: nextTasks,
      });

      return {
        tasks: nextTasks,
      };
    });
  },
}));
