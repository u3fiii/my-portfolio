import wgMono from './assets/wallgold-monogram.svg'
import { focusProps } from './surf.js'

export function Phone({ id, title, sub, on, skin = '', bg = '#fff', surf, children }) {
  return (
    <section className={'unit ' + (on ? 'on' : '')}>
      <div className="uh"><b>{title}</b>{sub && <span className="sub">{sub}</span>}</div>
      <div className="phone">
        <div className={'screen ' + skin} style={{ background: bg }} data-id={id} {...(surf ? focusProps(surf) : {})}>
          <div className="sbar"><span>۹:۴۱</span><div className="isl" /><span>۵G ▮▮▮</span></div>
          {children}
          <div className="homebar"><i /></div>
        </div>
      </div>
    </section>
  )
}

export const Scroll = ({ children }) => <div className="scr">{children}</div>

export function Timeline({ items }) {
  return (
    <div className="tl">
      {items.map((it) => (
        <div key={it.n} className={'it ' + (it.state || '')}>
          <span className="dot">{it.state === 'paid' ? '✓' : it.n}</span>
          <div className="r">
            <div><b>{it.label}</b><div className="sm mut">{it.sub}</div></div>
            <div style={{ textAlign: 'left' }}><b className="mono">{it.amt}</b>{it.extra && <div className="sm" style={{ color: 'var(--bad)' }}>{it.extra}</div>}{it.tag}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const WgMark = ({ h = 26 }) => <img src={wgMono} alt="WallGold" style={{ height: h, width: 'auto' }} />

export function TlLogo({ h = 26 }) {
  return (
    <span className="tl-logo" aria-label="تکنولایف">
      <i style={{ width: h, height: h }}>
        <svg viewBox="0 0 24 24" width={h * 0.62} height={h * 0.62} fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round"><path d="M4 9c4-2.5 7 2.5 16-1M4 15.5c4-2.5 7 2.5 16-1" /></svg>
      </i>
      <b>تکنولایف</b>
    </span>
  )
}

// عکس واقعی محصول: فایل src/assets/laptop.(png|jpg|jpeg|webp|avif) را بگذارید، همه‌جای فلو خودکار استفاده می‌شود
const laptopFiles = import.meta.glob('./assets/laptop.{png,jpg,jpeg,webp,avif}', { eager: true, import: 'default' })
export const laptopSrc = Object.values(laptopFiles)[0]

export function ProductImg({ w = 84 }) {
  return laptopSrc
    ? <img src={laptopSrc} alt="لپ‌تاپ ایسوس ROG Zephyrus G14" style={{ width: w, height: 'auto', objectFit: 'contain', display: 'block' }} />
    : <Laptop w={w} />
}

export function Laptop({ w = 84 }) {
  return (
    <svg width={w} viewBox="0 0 120 84" aria-hidden>
      <rect x="18" y="8" width="84" height="54" rx="6" fill="#2b2f3a" />
      <rect x="23" y="13" width="74" height="44" rx="3" fill="#8fb9e8" />
      <rect x="23" y="13" width="74" height="44" rx="3" fill="url(#lg)" />
      <path d="M6 66h108l-8 10a4 4 0 0 1-3 1.5H17a4 4 0 0 1-3-1.5z" fill="#c9ced8" />
      <rect x="48" y="66" width="24" height="3" rx="1.5" fill="#aab0bd" />
      <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3d6fd1" /><stop offset="1" stopColor="#9b5de5" /></linearGradient></defs>
    </svg>
  )
}

export function GoldpayLogo({ h = 26, stacked = false, tail = 'PAY' }) {
  const word = (size, ls) => (
    <span style={{ fontFamily: 'Inter, IRANSansX, system-ui, sans-serif', fontWeight: 800, fontSize: size, letterSpacing: ls, lineHeight: 1, color: '#171d26' }}>GOLD<span style={{ color: '#cf8c06' }}>{tail}</span></span>
  )
  if (stacked) return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: h * .14, direction: 'ltr' }}>
      <img src={wgMono} alt="" style={{ height: h * .8, width: 'auto' }} />
      {word(h * .36, '1.4px')}
    </span>
  )
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, direction: 'ltr', height: h }}>
      <img src={wgMono} alt="" style={{ height: h * .8, width: 'auto' }} />
      {word(h * .68, '.6px')}
    </span>
  )
}

export function BrowserBar({ url }) {
  return (
    <div className="chrome-bar">
      <div className="url"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg><span>{url}</span></div>
      <span className="tabs-n">۱</span>
      <span className="dots">⋮</span>
    </div>
  )
}
