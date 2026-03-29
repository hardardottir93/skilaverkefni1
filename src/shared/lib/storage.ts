import { storageSchema } from "../schemas/storageSchema";
import type { Project, Task } from "../types";

const STORAGE_KEY = "team-task-hub";

type StorageData = {
  projects: Project[];
  tasks: Task[];
};

export function loadStorageData(): StorageData {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return {
      projects: [],
      tasks: [],
    };
  }

  try {
    const parsed = JSON.parse(raw);
    const result = storageSchema.safeParse(parsed);

    if (!result.success) {
      return {
        projects: [],
        tasks: [],
      };
    }

    return result.data;
  } catch {
    return {
      projects: [],
      tasks: [],
    };
  }
}

export function saveStorageData(data: StorageData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
