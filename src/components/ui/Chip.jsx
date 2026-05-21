export default function Chip({ active = false, onClick, children, compact = false }) {
  const size = compact
    ? "px-3.5 py-1.5 text-[13px]"
    : "px-4 py-2 text-sm";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`cursor-pointer rounded-full transition-colors ${size} ${
        active
          ? "bg-zinc-900 font-bold text-white"
          : "bg-zinc-100 font-light text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
      }`}
    >
      {children}
    </button>
  );
}
