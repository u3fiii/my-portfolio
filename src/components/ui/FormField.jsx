const inputClassName =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base font-light text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200";

export function formInputClassName() {
  return inputClassName;
}

export default function FormField({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-2 text-left">
      <label htmlFor={id} className="text-sm font-light text-zinc-700">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-sm font-light text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
