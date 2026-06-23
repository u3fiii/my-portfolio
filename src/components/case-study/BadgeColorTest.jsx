import "./BadgeColorTest.css";

const FONT_UI = '"DM Sans", ui-sans-serif, system-ui, sans-serif';

const BADGE_STYLES = {
  red: { background: "#FEECEC", border: "0.5px solid #F5B3B3" },
  yellow: { background: "#FEF6E8", border: "0.5px solid #F0C97A" },
  blue: { background: "#E6F6FB", border: "0.5px solid #99DAEF" },
  green: { background: "#EAF3DE", border: "0.5px solid #97C459" },
};

const CARD_BADGES = ["red", "yellow", "test", "yellow"];

function SkeletonLine({ width }) {
  return (
    <div
      className="rounded"
      style={{ height: "7px", background: "#EBEBEB", width, borderRadius: "4px" }}
    />
  );
}

function BadgePill({ variant }) {
  return (
    <div
      style={{
        height: "16px",
        borderRadius: "100px",
        width: "70px",
        ...BADGE_STYLES[variant],
      }}
    />
  );
}

function SkeletonCard({ badgeVariant, highlighted }) {
  const highlightStyle =
    highlighted === "blue"
      ? { borderColor: "#99DAEF", boxShadow: "0 0 8px rgba(0,153,204,0.1)" }
      : highlighted === "green"
        ? { borderColor: "#97C459", boxShadow: "0 0 8px rgba(39,174,96,0.1)" }
        : {};

  return (
    <div
      className="mb-[7px] flex gap-2 rounded-lg bg-white py-[9px] pl-2.5 pr-2.5"
      style={{
        border: "0.5px solid #EBEBEB",
        ...highlightStyle,
      }}
    >
      <div className="flex flex-1 flex-col gap-[5px]">
        <SkeletonLine width="80%" />
        <SkeletonLine width="55%" />
        <BadgePill variant={badgeVariant} />
        <SkeletonLine width="35%" />
      </div>
      <div
        className="badge-color-test__thumb shrink-0 self-end rounded-md bg-[#EBEBEB]"
        style={{ width: "58px", height: "58px", borderRadius: "6px" }}
        aria-hidden
      />
    </div>
  );
}

function SkeletonPhoneScreen({ fairBadgeVariant, highlightVariant }) {
  const cards = CARD_BADGES.map((badge, index) => {
    if (badge === "test") {
      return {
        badgeVariant: fairBadgeVariant,
        highlighted: index === 2 ? highlightVariant : undefined,
      };
    }
    return { badgeVariant: badge, highlighted: undefined };
  });

  return (
    <div className="overflow-hidden rounded-[26px] bg-[#F5F5F5]" style={{ direction: "rtl" }}>
      <div
        className="flex justify-between px-3.5 pb-0.5 pt-[7px] text-[7px] font-bold text-[#111]"
        style={{ background: "#F5F5F5", fontFamily: FONT_UI, direction: "ltr" }}
      >
        <span>21:04</span>
        <span>20%</span>
      </div>

      <div className="flex items-center justify-between gap-2 border-b border-[#EBEBEB] bg-white px-3 py-2">
        <div className="h-2 rounded bg-[#EBEBEB]" style={{ width: "16px" }} />
        <div className="h-2 rounded bg-[#EBEBEB]" style={{ width: "90px" }} />
        <div className="h-2 rounded bg-[#EBEBEB]" style={{ width: "28px" }} />
      </div>

      <div className="bg-white px-3 py-2">
        <div className="h-[30px] rounded-lg bg-[#F0F0EE]" />
      </div>

      <div className="flex gap-1.5 border-b border-[#F0F0F0] bg-white px-3 py-[7px]">
        <div className="h-5 rounded-full bg-[#EBEBEB]" style={{ width: "44px" }} />
        <div className="h-5 rounded-full bg-[#EBEBEB]" style={{ width: "36px" }} />
        <div className="h-5 rounded-full bg-[#EBEBEB]" style={{ width: "56px" }} />
      </div>

      <div className="px-2.5 py-2" style={{ direction: "rtl" }}>
        {cards.map(({ badgeVariant, highlighted }, index) => (
          <SkeletonCard
            key={index}
            badgeVariant={badgeVariant}
            highlighted={highlighted}
          />
        ))}
      </div>
    </div>
  );
}

function PhoneColumn({
  versionLabel,
  versionLabelStyle,
  fairBadgeVariant,
  highlightVariant,
  showWinnerTag,
  resultPct,
  resultStyle,
}) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <span
        className="rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em]"
        style={{ fontFamily: FONT_UI, ...versionLabelStyle }}
      >
        {versionLabel}
      </span>
      <div
        className="relative w-[210px] rounded-[32px] bg-[#1A1A1A] p-2"
        style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.25)" }}
      >
        {showWinnerTag ? (
          <span
            className="absolute right-2.5 top-[-8px] z-10 rounded-full px-2.5 py-[3px] text-[9px] font-bold text-white"
            style={{
              fontFamily: FONT_UI,
              background: "#27AE60",
              boxShadow: "0 2px 8px rgba(39,174,96,0.35)",
            }}
          >
            Most chose this
          </span>
        ) : null}
        <SkeletonPhoneScreen
          fairBadgeVariant={fairBadgeVariant}
          highlightVariant={highlightVariant}
        />
      </div>
      <span
        className="inline-flex items-center gap-1 rounded-full px-3.5 py-[5px] text-[11px] font-semibold"
        style={{ fontFamily: FONT_UI, ...resultStyle }}
      >
        <span className="text-sm font-bold">{resultPct}</span>
        chose this
      </span>
    </div>
  );
}

export default function BadgeColorTest() {
  return (
    <figure className="case-study__ui my-8">
      <p
        className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[#888898]"
        style={{ fontFamily: FONT_UI }}
      >
        Usability test — blue vs. green for &ldquo;Fair price&rdquo;
      </p>
      <div className="flex flex-wrap items-start justify-center gap-7">
        <PhoneColumn
          versionLabel="Version A — Blue"
          versionLabelStyle={{
            background: "#EEF6FF",
            color: "#0077A3",
            border: "1px solid #99DAEF",
          }}
          fairBadgeVariant="blue"
          highlightVariant="blue"
          resultPct="~30%"
          resultStyle={{
            background: "#EEF6FF",
            color: "#0077A3",
            border: "1px solid #99DAEF",
          }}
        />
        <PhoneColumn
          versionLabel="Version B — Green"
          versionLabelStyle={{
            background: "#EAF3DE",
            color: "#27500A",
            border: "1px solid #97C459",
          }}
          fairBadgeVariant="green"
          highlightVariant="green"
          showWinnerTag
          resultPct="~70%"
          resultStyle={{
            background: "#EAF3DE",
            color: "#27500A",
            border: "1px solid #97C459",
          }}
        />
      </div>
    </figure>
  );
}
