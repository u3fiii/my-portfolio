/** Focus mirrors the pill buttons: the thin border gives way to a thick 3px ring. */
const inputStyles = {
  light:
    "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 font-['DM_Sans',ui-sans-serif,sans-serif] text-base text-zinc-900 placeholder:text-zinc-400 transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus:border-transparent focus:shadow-[0_0_0_3px_var(--color-zinc-900)] focus:outline-none",
  dark:
    "w-full rounded-xl border border-zinc-600 bg-zinc-900 px-4 py-3 font-['DM_Sans',ui-sans-serif,sans-serif] text-base text-white placeholder:text-zinc-500 transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus:border-transparent focus:shadow-[0_0_0_3px_var(--color-zinc-100)] focus:outline-none",
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
