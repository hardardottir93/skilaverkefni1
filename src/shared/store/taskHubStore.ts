import { create } from "zustand";
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

type TaskHubStore = {
  projects: Project[];
  tasks: Task[];
  selectedProjectId: string | null;
  setSelectedProjectId: (projectId: string | null) => void;
  addProject: (input: AddProjectInput) => void;
  addTask: (input: AddTaskInput) => void;
  updateTask: (taskId: string, updates: UpdateTaskInput) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskComplete: (taskId: string) => void;
};

export const useTaskHubStore = create<TaskHubStore>((set) => ({
  projects: [],
  tasks: [],
  selectedProjectId: null,

  setSelectedProjectId: (projectId) => {
    set({ selectedProjectId: projectId });
  },

  addProject: (input) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: input.name,
      description: input.description,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      projects: [...state.projects, newProject],
      selectedProjectId: newProject.id,
    }));
  },

  addTask: (input) => {
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

    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));
  },

  updateTask: (taskId, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const nextStatus = updates.status ?? task.status;

        return {
          ...task,
          ...updates,
          status: nextStatus,
          completed: nextStatus === "done",
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },

  deleteTask: (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },

  toggleTaskComplete: (taskId) => {
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const nextCompleted = !task.completed;

        return {
          ...task,
          completed: nextCompleted,
          status: nextCompleted ? "done" : "todo",
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },
}));
