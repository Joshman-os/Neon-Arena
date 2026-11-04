
export default function Button({ label, onClick, variant = "primary", autoFocus = false }) {
  return (
    <button
      className={`btn ${variant === "secondary" ? "secondary" : ""}`}
      onClick={onClick}
      autoFocus={autoFocus}
    >
      {label}
    </button>
  );
}
