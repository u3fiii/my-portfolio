const FONT_SERIF = '"Source Serif 4", Georgia, serif';
const FONT_UI = '"DM Sans", ui-sans-serif, system-ui, sans-serif';

const BOTTOM_STATS = [
  {
    value: "6%",
    label: "of complaining sellers lowered their price",
  },
  {
    value: "+10%",
    label: "more contact clicks on fair-price listings",
  },
  {
    value: "~2 months",
    label: "from lunch conversation to shipped feature",
  },
];

function ResultBlock({ value, valueColor, title, subtitle }) {
  return (
    <div className="text-center">
      <p
        className="leading-none"
        style={{
          fontFamily: FONT_SERIF,
          fontSize: "88px",
          fontWeight: 600,
          letterSpacing: "-0.04em",
          color: valueColor,
        }}
      >
        {value}
      </p>
      <p
        className="mt-3 text-[13px] font-bold"
        style={{ fontFamily: FONT_UI, color: "#444450" }}
      >
        {title}
      </p>
      <p
        className="mt-0.5 text-xs"
        style={{ fontFamily: FONT_UI, color: "#888898" }}
      >
        {subtitle}
      </p>
    </div>
  );
}

function MiddleArrow() {
  return (
    <div className="flex flex-col items-center px-8">
      <div className="flex items-center">
        <div
          className="h-0.5 w-12"
          style={{
            background: "linear-gradient(to right, #E2E1DC, #0099CC)",
          }}
          aria-hidden
        />
        <div
          className="h-0 w-0 shrink-0"
          style={{
            borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent",
            borderLeft: "10px solid #0099CC",
          }}
          aria-hidden
        />
      </div>
      <p
        className="mt-2 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.06em]"
        style={{ fontFamily: FONT_UI, color: "#0099CC" }}
      >
        2 months
      </p>
    </div>
  );
}

export default function PriceSignalResultsGraphic() {
  return (
    <figure
      className="case-study__ui mx-auto my-9 w-full max-w-[720px] rounded-2xl border border-[#E2E1DC] bg-white px-14 py-12"
      style={{ borderWidth: "0.5px" }}
    >
      <div className="flex flex-wrap items-center justify-center">
        <ResultBlock
          value="23%"
          valueColor="#C8C7C2"
          title="First test"
          subtitle="2-day rollout · 20% of users"
        />
        <MiddleArrow />
        <ResultBlock
          value="41%"
          valueColor="#0099CC"
          title="After redesign"
          subtitle="2 weeks after launch"
        />
      </div>

      <div
        className="mt-9 flex flex-col border-t border-[#E2E1DC] pt-6 min-[520px]:flex-row"
        style={{ borderTopWidth: "0.5px" }}
      >
        {BOTTOM_STATS.map(({ value, label }, index) => (
          <div
            key={label}
            className={`flex-1 px-4 py-3 text-center min-[520px]:py-0 ${
              index < BOTTOM_STATS.length - 1
                ? "min-[520px]:border-r min-[520px]:border-[#E2E1DC]"
                : ""
            }`}
            style={
              index < BOTTOM_STATS.length - 1
                ? { borderRightWidth: "0.5px" }
                : undefined
            }
          >
            <p
              className="text-[22px] font-semibold leading-none"
              style={{ fontFamily: FONT_UI, color: "#0099CC" }}
            >
              {value}
            </p>
            <p
              className="mx-auto mt-2 max-w-[12rem] text-[11px] leading-snug"
              style={{ fontFamily: FONT_UI, color: "#888898", lineHeight: 1.45 }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </figure>
  );
}
