import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

type TaskCardProps = {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in_progress" | "done";
  onDelete: (taskId: string) => void;
  onUpdate: (
    taskId: string,
    updates: {
      title: string;
      description?: string;
      priority: "low" | "medium" | "high";
    },
  ) => void;
  onToggleComplete: (taskId: string) => void;
};

export default function TaskCard({
  id,
  title,
  description,
  priority,
  status,
  onDelete,
  onUpdate,
  onToggleComplete,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description ?? "");
  const [editPriority, setEditPriority] = useState<"low" | "medium" | "high">(
    priority,
  );

  function handleSave() {
    if (!editTitle.trim()) return;

    onUpdate(id, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
    });

    setIsEditing(false);
  }

  function handleCancel() {
    setEditTitle(title);
    setEditDescription(description ?? "");
    setEditPriority(priority);
    setIsEditing(false);
  }

  const isDone = status === "done";

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      {isEditing ? (
        <div className="grid gap-3">
          <Input
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            placeholder="Task title"
          />

          <Input
            type="text"
            value={editDescription}
            onChange={(event) => setEditDescription(event.target.value)}
            placeholder="Task description"
          />

          <select
            value={editPriority}
            onChange={(event) =>
              setEditPriority(event.target.value as "low" | "medium" | "high")
            }
            className="h-10 rounded-md border px-3 text-sm"
          >
            <option value="low">Low priority</option>
            <option value="medium">Medium priority</option>
            <option value="high">High priority</option>
          </select>

          <div className="flex gap-2">
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Checkbox
                checked={isDone}
                onCheckedChange={() => onToggleComplete(id)}
                className="mt-1"
              />

              <div className="grid gap-1 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p
                    className={`m-0 text-lg font-semibold text-slate-900 ${
                      isDone ? "line-through opacity-60" : ""
                    }`}
                  >
                    {title}
                  </p>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsEditing(true)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => onDelete(id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p
                  className={`m-0 text-sm text-slate-600 ${
                    isDone ? "line-through opacity-60" : ""
                  }`}
                >
                  {description || "No description"}
                </p>
              </div>
            </div>

            <PriorityBadge priority={priority} />
          </div>
        </div>
      )}
    </div>
  );
}

function PriorityBadge({ priority }: { priority: "low" | "medium" | "high" }) {
  const styles = {
    low: "bg-slate-100 text-slate-700",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${styles[priority]}`}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}
