import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

type ProjectCardProps = {
  id: string;
  name: string;
  description?: string;
  isSelected?: boolean;
  onClick?: () => void;
  onDelete: (projectId: string) => void;
  onUpdate: (
    projectId: string,
    updates: {
      name: string;
      description?: string;
    },
  ) => void;
};

export default function ProjectCard({
  id,
  name,
  description,
  isSelected = false,
  onClick,
  onDelete,
  onUpdate,
}: ProjectCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editDescription, setEditDescription] = useState(description ?? "");

  function handleSave() {
    if (!editName.trim()) return;

    onUpdate(id, {
      name: editName,
      description: editDescription,
    });

    setIsEditing(false);
  }

  function handleCancel() {
    setEditName(name);
    setEditDescription(description ?? "");
    setIsEditing(false);
  }

  return (
    <div
      className={`grid gap-3 rounded-2xl border p-4 shadow-sm transition ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white"
      }`}
    >
      {isEditing ? (
        <div className="grid gap-3">
          <Input
            type="text"
            value={editName}
            onChange={(event) => setEditName(event.target.value)}
            placeholder="Project name"
          />

          <Input
            type="text"
            value={editDescription}
            onChange={(event) => setEditDescription(event.target.value)}
            placeholder="Project description"
          />

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
        <div className="grid gap-3">
          <div className="flex items-start justify-between gap-3">
            <button
              type="button"
              onClick={onClick}
              className="flex-1 text-left"
            >
              <h3 className="m-0 text-base font-semibold text-slate-900">
                {name}
              </h3>
              <p className="mt-1 mb-0 text-sm text-slate-600">
                {description || "No description"}
              </p>
            </button>

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
        </div>
      )}
    </div>
  );
}
