import { useMemo } from "react";
import type { Task } from "../types";

export function useStats(tasks: Task[]) {
  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const openTasks = totalTasks - completedTasks;
    const highPriorityTasks = tasks.filter(
      (task) => task.priority === "high",
    ).length;

    return {
      totalTasks,
      completedTasks,
      openTasks,
      highPriorityTasks,
    };
  }, [tasks]);

  return stats;
}
