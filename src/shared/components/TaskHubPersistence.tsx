import { useEffect, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { storageSchema } from "../schemas/storageSchema";
import { useTaskHubStore } from "../store/taskHubStore";

type TaskHubPersistenceProps = {
  children: ReactNode;
};

export default function TaskHubPersistence({
  children,
}: TaskHubPersistenceProps) {
  const projects = useTaskHubStore((state) => state.projects);
  const tasks = useTaskHubStore((state) => state.tasks);
  const setProjectsAndTasks = useTaskHubStore(
    (state) => state.setProjectsAndTasks,
  );

  const [storedData, setStoredData] = useLocalStorage(
    "team-task-hub",
    { projects: [], tasks: [] },
    storageSchema,
  );

  useEffect(() => {
    setProjectsAndTasks(storedData);
  }, [storedData, setProjectsAndTasks]);

  useEffect(() => {
    setStoredData({ projects, tasks });
  }, [projects, tasks, setStoredData]);

  return <>{children}</>;
}
