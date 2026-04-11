import { z } from "zod";

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.string(),
});

export const taskSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(["todo", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  completed: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const storageSchema = z.object({
  projects: z.array(projectSchema),
  tasks: z.array(taskSchema),
});
