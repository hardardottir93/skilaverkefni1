type TaskCardProps = {
  title: string;
  description?: string;
};

export default function TaskCard({ title, description }: TaskCardProps) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "12px",
      }}
    >
      <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
      <p style={{ margin: 0, color: "#4b5563" }}>{description}</p>
    </div>
  );
}
