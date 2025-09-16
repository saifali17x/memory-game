export default function Button({
  children,
  onClick,
  type = "button",
  ariaLabel,
  className,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className ? className : "btn"}
    >
      {children}
    </button>
  );
}
