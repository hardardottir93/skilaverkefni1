import { useState } from "react";
import { createTaskSchema } from "../../shared/schemas/taskSchema";

type TaskFormProps = {
  onAddTask: (task: {
    title: string;
    description?: string;
    status: "todo" | "in_progress" | "done";
    priority: "low" | "medium" | "high";
  }) => void;
};

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"todo" | "in_progress" | "done">("todo");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = createTaskSchema.safeParse({
      title,
      description,
      status,
      priority,
    });

    if (!result.success) {
      setError(result.error.issues[0]?.message || "Invalid form");
      return;
    }

    setError("");

    onAddTask(result.data);

    setTitle("");
    setDescription("");
    setStatus("todo");
    setPriority("medium");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="Task description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        style={inputStyle}
      />

      <select
        value={status}
        onChange={(event) =>
          setStatus(event.target.value as "todo" | "in_progress" | "done")
        }
        style={inputStyle}
      >
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select
        value={priority}
        onChange={(event) =>
          setPriority(event.target.value as "low" | "medium" | "high")
        }
        style={inputStyle}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}

      <button type="submit">Add Task</button>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
};
