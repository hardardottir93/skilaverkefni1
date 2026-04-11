import { useState } from "react";
import { createTaskSchema } from "../../shared/schemas/taskSchema";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

type TaskFormProps = {
  onAddTask: (task: {
    title: string;
    description?: string;
    priority: "low" | "medium" | "high";
  }) => void;
};

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = createTaskSchema.safeParse({
      title,
      description,
      status: "todo",
      priority,
    });

    if (!result.success) {
      setError(result.error.issues[0]?.message || "Invalid form");
      return;
    }

    setError("");
    onAddTask({
      title: result.data.title,
      description: result.data.description,
      priority: result.data.priority,
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <Input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <Textarea
        placeholder="Task description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className="min-h-[90px]"
      />

      <div className="grid gap-2">
        <p className="m-0 text-sm font-medium text-slate-700">Priority</p>

        <div className="flex gap-2">
          <Button
            type="button"
            variant={priority === "low" ? "default" : "outline"}
            onClick={() => setPriority("low")}
            className={
              priority === "low"
                ? "bg-slate-700 text-white hover:bg-slate-800"
                : ""
            }
          >
            Low
          </Button>

          <Button
            type="button"
            variant={priority === "medium" ? "default" : "outline"}
            onClick={() => setPriority("medium")}
            className={
              priority === "medium"
                ? "bg-amber-500 text-white hover:bg-amber-600"
                : ""
            }
          >
            Medium
          </Button>

          <Button
            type="button"
            variant={priority === "high" ? "default" : "outline"}
            onClick={() => setPriority("high")}
            className={
              priority === "high"
                ? "bg-red-500 text-white hover:bg-red-600"
                : ""
            }
          >
            High
          </Button>
        </div>
      </div>

      {error && <p className="m-0 text-sm text-red-600">{error}</p>}

      <Button type="submit" className="w-fit">
        Add Task
      </Button>
    </form>
  );
}
