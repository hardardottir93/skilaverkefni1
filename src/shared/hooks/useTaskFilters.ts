import { useMemo, useState } from "react";
import type { Task, TaskPriority, TaskStatus } from "../types";

type FilterStatus = "all" | TaskStatus;
type FilterPriority = "all" | TaskPriority;

export function useTaskFilters(tasks: Task[]) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<FilterStatus>("all");
  const [priority, setPriority] = useState<FilterPriority>("all");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        (task.description ?? "").toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "all" ? true : task.status === status;
      const matchesPriority =
        priority === "all" ? true : task.priority === priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, status, priority]);

  return {
    search,
    setSearch,
    status,
    setStatus,
    priority,
    setPriority,
    filteredTasks,
  };
}
