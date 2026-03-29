export type TaskStatus = "todo" | "in_progress" | "done";

export type TaskPriority = "low" | "medium" | "high";

export type Project = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
};

export type Task = {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};
