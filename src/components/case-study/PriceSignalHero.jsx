import "./PriceSignalHero.css";

function CarThumbIcon() {
  return (
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" aria-hidden>
      <path
        d="M2 14h28M6 14l3-6h14l3 6M9 14v3M23 14v3M4 14l1-2M28 14l-1-2"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="9" cy="17" r="2" stroke="white" strokeWidth="1.2" />
      <circle cx="23" cy="17" r="2" stroke="white" strokeWidth="1.2" />
    </svg>
  );
}

const LISTINGS = [
  {
    title: "پژو ۲۰۶ تیپ ۵، مدل ۱۳۹۶",
    price: "۱٬۴۵۰٬۰۰۰٬۰۰۰ تومان",
    badge: "⬆ قیمت خیلی بالاست",
    badgeVariant: "red",
    meta: "تهران · ۲ ساعت پیش",
    style: { opacity: 0.5 },
  },
  {
    title: "سمند LX، مدل ۱۳۹۷",
    price: "۸۲۰٬۰۰۰٬۰۰۰ تومان",
    badge: "⬆ قیمت بالاست",
    badgeVariant: "yellow",
    meta: "تهران · ۵ ساعت پیش",
    style: { opacity: 0.75 },
  },
  {
    title: "تیبا ۲، مدل ۱۳۹۸",
    price: "۵۴۰٬۰۰۰٬۰۰۰ تومان",
    badge: "✓ قیمت منصفانه",
    badgeVariant: "blue",
    meta: "تهران · دیروز",
    style: {
      borderColor: "rgba(0,153,204,0.3)",
      boxShadow: "0 0 20px rgba(0,153,204,0.1)",
    },
  },
  {
    title: "پراید ۱۳۱، مدل ۱۳۹۵",
    price: "۲۸۰٬۰۰۰٬۰۰۰ تومان",
    badge: "⬆ قیمت بالاست",
    badgeVariant: "yellow",
    meta: "تهران · ۳ ساعت پیش",
    style: { opacity: 0.75 },
  },
];

export default function PriceSignalHero() {
  return (
    <figure className="case-study__ui mt-6" aria-label="Price Signal hero preview">
      <div className="price-signal-hero">
        <div className="price-signal-hero__fade-top" aria-hidden />
        <div className="price-signal-hero__fade-bottom" aria-hidden />

        <div className="price-signal-hero__inner">
          <div className="price-signal-hero__left">
            <p className="price-signal-hero__eyebrow">Case Study · Sheypoor · 2020</p>
            <h2 className="price-signal-hero__title">
              Price
              <br />
              <span>Signal</span>
            </h2>
            <p className="price-signal-hero__sub">
              Bringing price transparency to Iran&apos;s used car market — one badge at
              a time.
            </p>
            <div className="price-signal-hero__meta">
              <div>
                <p className="price-signal-hero__meta-label">Result</p>
                <p className="price-signal-hero__meta-val">23% → 41%</p>
              </div>
              <div>
                <p className="price-signal-hero__meta-label">Timeline</p>
                <p className="price-signal-hero__meta-val">~2 months</p>
              </div>
              <div>
                <p className="price-signal-hero__meta-label">Platform</p>
                <p className="price-signal-hero__meta-val">Sheypoor</p>
              </div>
            </div>
          </div>

          <div className="price-signal-hero__right">
            {LISTINGS.map(
              ({ title, price, badge, badgeVariant, meta, style }) => (
                <div key={title} className="price-signal-hero__card" style={style}>
                  <div className="price-signal-hero__thumb">
                    <CarThumbIcon />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="price-signal-hero__card-title">{title}</p>
                    <p className="price-signal-hero__card-price">{price}</p>
                    <span
                      className={`price-signal-hero__badge price-signal-hero__badge--${badgeVariant}`}
                    >
                      {badge}
                    </span>
                    <p className="price-signal-hero__card-meta">{meta}</p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </figure>
  );
}
