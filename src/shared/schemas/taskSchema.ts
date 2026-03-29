import { z } from "zod";

export const taskStatusSchema = z.enum(["todo", "in_progress", "done"]);
export const taskPrioritySchema = z.enum(["low", "medium", "high"]);

export const createTaskSchema = z.object({
  title: z.string().min(2, "Task title must be at least 2 characters"),
  description: z.string().optional(),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;