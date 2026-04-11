import { useState } from "react";
import { createProjectSchema } from "../../shared/schemas/projectSchema";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

type ProjectFormProps = {
  onAddProject: (project: { name: string; description?: string }) => void;
};

export default function ProjectForm({ onAddProject }: ProjectFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = createProjectSchema.safeParse({
      name,
      description,
    });

    if (!result.success) {
      setError(result.error.issues[0]?.message || "Invalid form");
      return;
    }

    setError("");
    onAddProject(result.data);

    setName("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="grid gap-1">
        <p className="m-0 text-sm font-medium text-slate-700">Project name</p>
        <Input
          type="text"
          placeholder="Website redesign"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="grid gap-1">
        <p className="m-0 text-sm font-medium text-slate-700">Description</p>
        <Textarea
          placeholder="Short description of the project"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="min-h-[90px]"
        />
      </div>

      {error && <p className="m-0 text-sm text-red-600">{error}</p>}

      <Button type="submit" className="w-fit">
        Add Project
      </Button>
    </form>
  );
}
