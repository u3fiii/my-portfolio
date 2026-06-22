const FONT_FA = '"Vazirmatn", ui-sans-serif, system-ui, sans-serif';
const FONT_UI = '"DM Sans", ui-sans-serif, system-ui, sans-serif';

const SHIPPED_BADGE = {
  background: "#EEF6FF",
  color: "#0077A3",
  borderColor: "#99DAEF",
};

function CameraIcon() {
  return (
    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" aria-hidden>
      <rect x="1" y="3.5" width="18" height="12.5" rx="2" stroke="#1A78E0" strokeWidth="1.4" />
      <circle cx="10" cy="10" r="3" stroke="#1A78E0" strokeWidth="1.4" />
      <path
        d="M7.5 3.5L8.8 1.5h2.4L12.5 3.5"
        stroke="#1A78E0"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <line
        x1="15.5"
        y1="6"
        x2="17"
        y2="6"
        stroke="#1A78E0"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StatusBar() {
  return (
    <div
      className="flex shrink-0 items-center justify-between px-4 pt-2 pb-0.5"
      style={{
        background: "#F5F5F5",
        fontFamily: FONT_FA,
        fontSize: "8px",
        fontWeight: 700,
        direction: "ltr",
      }}
    >
      <span>21:04</span>
      <span>📶 🔋 20%</span>
    </div>
  );
}

function TopNav() {
  return (
    <div
      className="flex shrink-0 items-center justify-between border-b border-[#EBEBEB] bg-white px-3.5 py-2"
      style={{ fontFamily: FONT_FA, direction: "rtl" }}
    >
      <span className="text-lg leading-none text-[#111]" aria-hidden>
        →
      </span>
      <span className="text-xs font-bold text-[#111]">ثبت آگهی رایگان</span>
      <span className="text-[11px]" style={{ color: "#1A78E0" }}>
        پاکسازی فرم
      </span>
    </div>
  );
}

function PhotoRow() {
  return (
    <div
      className="mb-2.5 flex gap-2.5 border-b border-[#F0F0F0] pb-2.5"
      style={{ direction: "rtl" }}
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-[1.5px] border-dashed border-[#1A78E0]"
        style={{ background: "#F5F9FF" }}
      >
        <CameraIcon />
      </div>
      <div className="min-w-0 flex-1 text-right">
        <p
          className="text-[10px] font-bold leading-snug"
          style={{ fontFamily: FONT_FA, color: "#1A78E0" }}
        >
          انتخاب عکس‌های آگهی
        </p>
        <p
          className="mt-0.5 text-[7.5px] leading-snug"
          style={{ fontFamily: FONT_FA, color: "#888" }}
        >
          آگهی‌های شامل تصویر بیش از ۵ برابر دیده می‌شوند
        </p>
      </div>
    </div>
  );
}

function FormDivider() {
  return <div className="my-2 h-px bg-[#F0F0F0]" />;
}

function FormField({
  label,
  value,
  placeholder,
  suffix,
  labelColor = "#111",
  inputStyle = {},
  className = "mb-2",
}) {
  return (
    <div className={className}>
      <p
        className="mb-0.5 text-right text-[9.5px] font-medium"
        style={{ fontFamily: FONT_FA, color: labelColor }}
      >
        {label}
      </p>
      <div
        className="flex items-center justify-between rounded-md border border-[#E0E0E0] bg-white px-[11px] py-2 text-[11px] text-[#111]"
        style={{ fontFamily: FONT_FA, ...inputStyle }}
      >
        <span className={value ? "" : "text-zinc-400"}>{value ?? placeholder}</span>
        {suffix ? (
          <span className="text-zinc-400" aria-hidden>
            {suffix}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function SliderSection() {
  return (
    <div className="mt-1">
      <div className="relative my-4 mb-[18px] mt-4">
        <span
          className="absolute whitespace-nowrap rounded border px-1 py-px text-[7px] font-bold"
          style={{
            fontFamily: FONT_FA,
            color: "#F39C12",
            borderColor: "#F39C12",
            background: "white",
            left: "50%",
            top: "-16px",
            transform: "translateX(-50%)",
          }}
        >
          قیمت شما
        </span>
        <div
          className="relative h-[5px] rounded-sm"
          style={{
            background:
              "linear-gradient(to right, #E74C3C 0%, #F39C12 50%, #2ECC71 100%)",
          }}
        >
          <span
            className="absolute left-1/2 top-1/2 block rounded-full bg-white"
            style={{
              width: "15px",
              height: "15px",
              border: "2.5px solid #F39C12",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              transform: "translate(-50%, -50%)",
            }}
            aria-hidden
          />
        </div>
        <div
          className="mt-1.5 flex justify-between text-[7.5px] font-bold"
          style={{ fontFamily: FONT_FA }}
        >
          <span style={{ color: "#27AE60" }}>منصفانه</span>
          <span style={{ color: "#E67E22" }}>بالا</span>
          <span style={{ color: "#E74C3C" }}>خیلی بالا</span>
        </div>
      </div>
      <div
        className="mt-1.5 flex gap-1.5 rounded-md border border-[#FCD34D] px-2 py-1.5 text-right text-[8px] leading-snug"
        style={{ fontFamily: FONT_FA, background: "#FFFBEB", color: "#92400E" }}
      >
        <span aria-hidden>⚠️</span>
        <span>کاربران ارتباط اسلایدر با قیمت را متوجه نمی‌شدند</span>
      </div>
    </div>
  );
}

function SuggestionBox() {
  return (
    <div
      className="mt-1.5 rounded-md border border-[#BFDBFE] px-2.5 py-2 text-right"
      style={{ fontFamily: FONT_FA, background: "#EFF6FF", color: "#1E40AF", lineHeight: 1.55 }}
    >
      <p className="text-[9px] font-bold">پیشنهاد شیپور</p>
      <p className="mt-0.5 text-[8.5px]">
        با توجه به وضعیت بازار، شیپور این قیمت را پیشنهاد می‌دهد. می‌توانید تغییرش
        دهید.
      </p>
    </div>
  );
}

function CtaWrap() {
  return (
    <div className="shrink-0 p-[7px]" style={{ background: "#F5F5F5" }}>
      <button
        type="button"
        className="block w-full text-center text-white"
        style={{
          fontFamily: FONT_FA,
          fontSize: "13px",
          fontWeight: 700,
          background: "#1A78E0",
          padding: "11px",
          borderRadius: "12px",
          border: "none",
        }}
      >
        ثبت آگهی
      </button>
    </div>
  );
}

function FormCard({ children }) {
  return (
    <div className="flex-1 overflow-hidden p-[7px]">
      <div className="rounded-xl bg-white p-3">{children}</div>
    </div>
  );
}

function PhoneShell({ children }) {
  return (
    <div
      className="mx-auto shrink-0"
      style={{
        width: "260px",
        background: "#1A1A1A",
        borderRadius: "38px",
        padding: "9px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
      }}
    >
      <div
        className="flex flex-col"
        style={{
          background: "#F5F5F5",
          borderRadius: "30px",
          overflow: "hidden",
          direction: "rtl",
          height: "600px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function PhoneMockupFooter({ badge, badgeStyle, caption }) {
  return (
    <>
      <span
        className="mt-4 inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-medium"
        style={{ fontFamily: FONT_UI, ...badgeStyle }}
      >
        {badge}
      </span>
      <p
        className="mt-2 max-w-[240px] text-center text-[11px] italic leading-snug"
        style={{ fontFamily: FONT_UI, color: "#888898" }}
      >
        {caption}
      </p>
    </>
  );
}

export function PhoneColumn({ label, labelColor, phone, badge, badgeStyle, caption }) {
  return (
    <div className="flex flex-col items-center">
      {label ? (
        <p
          className="mb-4 text-center text-[11px] font-medium uppercase tracking-[0.08em]"
          style={{ fontFamily: FONT_UI, color: labelColor }}
        >
          {label}
        </p>
      ) : null}
      {phone}
      <PhoneMockupFooter badge={badge} badgeStyle={badgeStyle} caption={caption} />
    </div>
  );
}

export function SliderPhone() {
  return (
    <PhoneShell>
      <StatusBar />
      <TopNav />
      <FormCard>
        <PhotoRow />
        <FormField label="دسته بندی" value="پژو ۲۰۷ پانا" suffix="✕" />
        <FormField
          label="قیمت (تومان)"
          value="۱٬۸۵۰٬۰۰۰٬۰۰۰"
          labelColor="#E74C3C"
          inputStyle={{ borderColor: "#E74C3C", background: "#FFF8F8" }}
        />
        <SliderSection />
        <FormDivider />
        <FormField label="مدل خودرو" placeholder="مدل خودرو" suffix="▾" />
        <FormField label="نقدی/اقساطی" placeholder="نقدی/اقساطی" suffix="▾" />
        <FormField label="سال تولید" placeholder="" className="mb-0" />
      </FormCard>
      <CtaWrap />
    </PhoneShell>
  );
}

export function FinalDesignPhone() {
  return (
    <PhoneShell>
      <StatusBar />
      <TopNav />
      <FormCard>
        <PhotoRow />
        <FormField label="دسته بندی" value="پژو ۲۰۷ پانا" suffix="✕" />
        <FormField label="مدل خودرو" placeholder="مدل خودرو" suffix="▾" />
        <FormField label="نقدی/اقساطی" placeholder="نقدی/اقساطی" suffix="▾" />
        <FormField label="سال تولید" placeholder="" />
        <FormDivider />
        <FormField
          label="قیمت (تومان)"
          value="۸۹۰٬۰۰۰٬۰۰۰"
          labelColor="#1A78E0"
          inputStyle={{ borderColor: "#1A78E0", background: "#F0F6FF" }}
          className="mb-0"
        />
        <SuggestionBox />
      </FormCard>
      <CtaWrap />
    </PhoneShell>
  );
}

export { SHIPPED_BADGE };
