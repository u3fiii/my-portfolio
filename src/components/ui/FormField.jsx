const inputStyles = {
  light:
    "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base font-light text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200",
  dark:
    "w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-3 text-base font-light text-white placeholder:text-zinc-500 transition-colors focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-700",
};

export function formInputClassName(theme = "light") {
  return inputStyles[theme] ?? inputStyles.light;
}

export default function FormField({
  id,
  label,
  error,
  children,
  theme = "light",
}) {
  const labelClass =
    theme === "dark"
      ? "text-sm font-light text-zinc-300"
      : "text-sm font-light text-zinc-700";
  const errorClass =
    theme === "dark"
      ? "text-sm font-light text-red-400"
      : "text-sm font-light text-red-600";

  return (
    <div className="flex flex-col gap-2 text-left">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error && (
        <p className={errorClass} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
