type ProjectCardProps = {
  name: string;
  description?: string;
};

export default function ProjectCard({ name, description }: ProjectCardProps) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "12px",
      }}
    >
      <h3 style={{ margin: "0 0 8px" }}>{name}</h3>
      <p style={{ margin: 0, color: "#4b5563" }}>{description}</p>
    </div>
  );
}
