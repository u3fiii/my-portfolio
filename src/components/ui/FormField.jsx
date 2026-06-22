const inputStyles = {
  light:
    "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 font-['DM_Sans',ui-sans-serif,sans-serif] text-base text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200",
  dark:
    "w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-3 font-['DM_Sans',ui-sans-serif,sans-serif] text-base text-white placeholder:text-zinc-500 transition-colors focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-700",
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
      ? "font-['DM_Sans',ui-sans-serif,sans-serif] text-sm text-zinc-300"
      : "font-['DM_Sans',ui-sans-serif,sans-serif] text-sm text-zinc-700";
  const errorClass =
    theme === "dark"
      ? "font-['DM_Sans',ui-sans-serif,sans-serif] text-sm text-red-400"
      : "font-['DM_Sans',ui-sans-serif,sans-serif] text-sm text-red-600";

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
