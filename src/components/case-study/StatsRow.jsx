export default function StatsRow({ items }) {
  const colsClass =
    items.length === 2 ? "min-[600px]:grid-cols-2" : "min-[600px]:grid-cols-3";

  return (
    <div className={`case-study__ui my-8 grid grid-cols-1 gap-3 ${colsClass}`}>
      {items.map(({ value, label }) => (
        <div
          key={label}
          className="rounded-xl bg-zinc-100 px-4 py-6 text-center"
        >
          <p className="text-[2rem] font-medium leading-none text-[#0099CC]">
            {value}
          </p>
          <p className="mx-auto mt-3 max-w-[12rem] text-xs leading-normal text-zinc-500">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
