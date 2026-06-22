const BADGE_STYLES = {
  red: "bg-[#FCEBEB] text-[#A32D2D]",
  yellow: "bg-[#FAEEDA] text-[#633806]",
  blue: "bg-[#E6F1FB] text-[#0C447C]",
  green: "bg-[#EAF3DE] text-[#27500A]",
};

export default function PriceBadgeList({ items }) {
  return (
    <ul className="my-6 flex flex-col gap-2.5">
      {items.map(({ label, description, variant }) => (
        <li key={label} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span
            className={`case-study__ui shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium leading-none ${BADGE_STYLES[variant]}`}
          >
            {label}
          </span>
          <span className="case-study__body case-study__body--muted text-base">
            {description}
          </span>
        </li>
      ))}
    </ul>
  );
}
