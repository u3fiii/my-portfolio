const FONT_UI = '"DM Sans", ui-sans-serif, system-ui, sans-serif';

const STEP_VARIANTS = {
  red: {
    box: {
      background: "#FDECEA",
      border: "1px solid #F5B3B3",
      color: "#C0392B",
    },
    badge: { background: "#C0392B", color: "#ffffff" },
  },
  neutral: {
    box: {
      background: "#ffffff",
      border: "1px solid #E2E1DC",
      color: "#444450",
    },
    badge: { background: "#E8E7E2", color: "#444450" },
  },
  neutralBlueBadge: {
    box: {
      background: "#ffffff",
      border: "1px solid #E2E1DC",
      color: "#444450",
    },
    badge: { background: "#0099CC", color: "#ffffff" },
  },
  blue: {
    box: {
      background: "#E6F1FB",
      border: "1px solid #99DAEF",
      color: "#0077A3",
      fontWeight: 600,
    },
    badge: { background: "#0099CC", color: "#ffffff" },
  },
  green: {
    box: {
      background: "#EAF3DE",
      border: "1px solid #97C459",
      color: "#27500A",
    },
    badge: { background: "#97C459", color: "#ffffff" },
  },
};

function StepArrow({ color = "#A1A1AA" }) {
  return (
    <div
      className="flex justify-center py-0.5 text-[14px] leading-none"
      style={{ color, fontFamily: FONT_UI }}
      aria-hidden
    >
      ↓
    </div>
  );
}

function StepBox({ number, variant = "neutral", title, subtitle, bold = false }) {
  const styles = STEP_VARIANTS[variant];

  return (
    <div className="flex items-stretch gap-2">
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold leading-none"
        style={{ fontFamily: FONT_UI, ...styles.badge }}
      >
        {number}
      </span>
      <div
        className="min-w-0 flex-1 rounded-lg px-3.5 py-2.5 text-center text-xs leading-snug"
        style={{
          fontFamily: FONT_UI,
          fontWeight: bold ? 600 : 400,
          ...styles.box,
        }}
      >
        <div>{title}</div>
        {subtitle ? (
          <div className="mt-0.5 text-[10px] font-normal opacity-90">{subtitle}</div>
        ) : null}
      </div>
    </div>
  );
}

function ColumnHeader({ dotColor, labelColor, label }) {
  return (
    <div
      className="mb-4 flex items-center justify-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.08em]"
      style={{ fontFamily: FONT_UI, color: labelColor }}
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: dotColor }}
        aria-hidden
      />
      {label}
    </div>
  );
}

function InsightBox({ variant, title, body }) {
  const isBefore = variant === "before";

  return (
    <div
      className="mt-4 rounded-r-md px-3 py-2.5"
      style={{
        fontFamily: FONT_UI,
        fontSize: "11px",
        lineHeight: 1.45,
        background: isBefore ? "#FFF5F5" : "#EEF6FF",
        borderLeft: `3px solid ${isBefore ? "#EE8888" : "#0099CC"}`,
        color: isBefore ? "#C0392B" : "#0077A3",
      }}
    >
      <p className="font-semibold">{title}</p>
      <p className="mt-1 font-normal">{body}</p>
    </div>
  );
}

function StepColumn({ children }) {
  return <div className="min-w-0">{children}</div>;
}

export default function FormReorderDiagram() {
  return (
    <figure
      className="my-9 rounded-xl px-6 py-7"
      style={{ background: "#F2F1EE", fontFamily: FONT_UI }}
    >
      <p
        className="mb-6 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500"
        style={{ fontFamily: FONT_UI }}
      >
        Form reorder — before vs. after
      </p>

      <div
        className="grid items-start gap-x-2"
        style={{ gridTemplateColumns: "1fr 40px 1fr" }}
      >
        <StepColumn>
          <ColumnHeader
            dotColor="#C0392B"
            labelColor="#C0392B"
            label="Before — original form order"
          />
          <div className="flex flex-col gap-0">
            <StepBox
              number={1}
              variant="red"
              title="Set price"
              subtitle="First input — car details unknown"
            />
            <StepArrow />
            <StepBox number={2} title="Brand & model" />
            <StepArrow />
            <StepBox number={3} title="Year of manufacture" />
            <StepArrow />
            <StepBox number={4} title="Mileage" />
            <StepArrow />
            <StepBox number={5} title="Body condition" />
            <StepArrow />
            <StepBox number={6} title="Submit listing" />
          </div>
          <InsightBox
            variant="before"
            title="Problem"
            body="Price is set before we know anything about the car. We can't estimate a fair value yet — so feedback is impossible at the right moment."
          />
        </StepColumn>

        <div className="flex items-center justify-center self-center pt-10">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full text-sm text-zinc-500"
            style={{ background: "#E8E7E2", fontFamily: FONT_UI }}
            aria-hidden
          >
            →
          </span>
        </div>

        <StepColumn>
          <ColumnHeader
            dotColor="#0099CC"
            labelColor="#0099CC"
            label="After — reordered form"
          />
          <div className="flex flex-col gap-0">
            <StepBox number={1} variant="neutralBlueBadge" title="Brand & model" />
            <StepArrow color="#0099CC" />
            <StepBox number={2} variant="neutralBlueBadge" title="Year of manufacture" />
            <StepArrow color="#0099CC" />
            <StepBox number={3} variant="neutralBlueBadge" title="Mileage" />
            <StepArrow color="#0099CC" />
            <StepBox number={4} variant="neutralBlueBadge" title="Body condition" />
            <StepArrow color="#0099CC" />
            <StepBox
              number={5}
              variant="blue"
              title="Set price — last step"
              subtitle="Pre-filled with fair price estimate"
              bold
            />
            <StepArrow color="#0099CC" />
            <StepBox
              number={6}
              variant="green"
              title="✓ Seller adjusts or accepts"
              subtitle="Feedback before submitting"
            />
          </div>
          <InsightBox
            variant="after"
            title="The insight"
            body="By the time the seller reaches the price field, we already have all the specs we need. Now we can pre-fill a fair price and give feedback at exactly the right moment."
          />
          <p
            className="mt-3 inline-flex rounded-full border px-2.5 py-0.5 text-[10px]"
            style={{
              background: "#EEF6FF",
              borderColor: "#99DAEF",
              color: "#0077A3",
              fontFamily: FONT_UI,
            }}
          >
            💡 Ali&apos;s idea
          </p>
        </StepColumn>
      </div>

      <figcaption
        className="mt-6 border-t border-[#E2E1DC] pt-5 text-center text-xs italic text-zinc-500"
        style={{ fontFamily: FONT_UI }}
      >
        A small reorder in the form — but it changed everything about when the signal
        arrived.
      </figcaption>
    </figure>
  );
}
