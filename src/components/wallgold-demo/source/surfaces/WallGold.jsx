import { useState, useRef } from 'react'
import { A, T, G, fa, openPlans } from '../engine.js'
import { Scroll, WgMark, GoldpayLogo } from '../ui.jsx'
import Timer from './Timer.jsx'
import profile from '../assets/profile.png'
import goldStack from '../assets/gold-stack.png'
import goldSuccess from '../assets/gold-success.png'
import goldpayHero from '../assets/goldpay-bnpl-hero.png'
import svc0 from '../assets/services/goldpay.png'
import svc1 from '../assets/services/installments.png'
import svc2 from '../assets/services/custom-order.png'
import svc3 from '../assets/services/shopping-credit.png'
import svc4 from '../assets/services/gold-guarantee.png'
import svc5 from '../assets/services/gift-card.png'
import svc6 from '../assets/services/instant-credit.png'
import svc7 from '../assets/services/physical-delivery.png'

const Svg = ({ d, size = 22, sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
)
const ICON = {
  bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0',
  clock: 'M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  down: 'M12 4v14M6 13l6 6 6-6',
  up: 'M12 20V6M6 11l6-6 6 6',
  chev: 'M6 9l6 6 6-6',
  home: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  swap: 'M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4',
  card: 'M3 6h18v12H3zM3 10h18',
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
}

function TopBar({ title }) {
  return (
    <div className="appbar">
      <img src={profile} alt="" style={{ width: 32, height: 32, borderRadius: '50%' }} />
      {title ? <b style={{ fontSize: 15 }}>{title}</b> : <WgMark h={34} />}
      <div className="round" style={{ border: 0, background: 'transparent' }}><Svg d={ICON.bell} /></div>
    </div>
  )
}

function ServicesMark({ filled = false, size = 26 }) {
  return <svg width={size} height={size} viewBox="0 0 28 28" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <rect x="3" y="3" width="8" height="8" rx="3.6" /><rect x="17" y="3" width="8" height="8" rx="3.6" />
    <rect x="3" y="17" width="8" height="8" rx="3.6" /><rect x="17" y="17" width="8" height="8" rx="3.6" />
  </svg>
}

function Tabs({ on = 0 }) {
  return (
    <nav className="wg-tabs" aria-label="نویگیشن وال‌گلد">
      <button className={on === 0 ? 'on' : ''} aria-label="خانه وال‌گلد" aria-current={on === 0 ? 'page' : undefined} onClick={() => A.wgHome()}>
        <Svg d="M3 12l7-6a3 3 0 0 1 4 0l7 6v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zM9 18h6" size={28} sw={2} />
      </button>
      <button className={on === 1 ? 'on' : ''} aria-label="معاملات" aria-current={on === 1 ? 'page' : undefined} onClick={() => A.wgTrade()}><Svg d="M8 20V5M4.5 9L8 5l3.5 4M16 4v15M12.5 15l3.5 4 3.5-4" size={28} sw={2.5} /></button>
      <button aria-label="کارت وال‌گلد"><span className="new">جدید</span><Svg d="M6 5h12a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3zM3 11h18M7 17h4" size={28} sw={2} /></button>
      <button className={on === 3 ? 'on' : ''} aria-label="خدمات وال‌گلد" aria-current={on === 3 ? 'page' : undefined} onClick={() => A.services()}><ServicesMark filled={on === 3} /></button>
    </nav>
  )
}

const SERVICES = [
  { id: 'credit', label: 'اعتبار گلدپی', art: goldpayHero },
  { id: 'goldpay', label: 'خرید قسطی', art: svc1 },
  { label: 'سفارش دلخواه', art: svc2 },
  { label: 'اعتبار خرید کالا', art: svc3 },
  { label: 'تضمین طلا', art: svc4 },
  { label: 'کارت هدیه', art: svc5 },
  { label: 'اعتبار فوری', art: svc6 },
  { label: 'دریافت فیزیکی', art: svc7 },
  { label: 'طلاساز', art: svc0, filter: 'hue-rotate(22deg) saturate(.8)' },
  { label: 'انتقال و دریافت', art: svc3, filter: 'hue-rotate(155deg) saturate(.7)' },
  { label: 'پس‌انداز', art: svc6, filter: 'hue-rotate(285deg) saturate(.8)' },
  { label: 'وام گردشگری', art: svc2, filter: 'hue-rotate(175deg) saturate(.65)' },
]

function Services() {
  return (
    <>
    <section className="svc-page" aria-label="محصولات وال‌گلد">
      <header className="svc-heading">
        <h1>خدمات وال‌گلد</h1>
      </header>
      <Scroll>
        <div className="svc-grid">
          {SERVICES.map((x) => (
            <button key={x.label} className={'svc' + (x.id ? ' live' : '')} onClick={x.id === 'goldpay' ? () => A.goldpay() : x.id === 'credit' ? () => A.goldpayCredit() : undefined}>
              <img className="svc-art" src={x.art} style={x.filter ? { filter: x.filter } : undefined} alt="" width="78" height="78" draggable="false" />
              <b>{x.label}</b>
            </button>
          ))}
        </div>
      </Scroll>
    </section>
    <Tabs on={3} />
    </>
  )
}

function Action({ icon, label, dark }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className={'act ' + (dark ? 'dark' : '')}><Svg d={ICON[icon]} size={20} /></div>
      <div className="sm" style={{ marginTop: 4 }}>{label}</div>
    </div>
  )
}

const SLIDES = [
  { t: 'وال‌گلد شفاف', d: 'فعالیت‌های لحظه‌ای وال‌گلد', cls: '', art: true },
  { t: 'اعتبار گلدپی', d: 'با طلایت اعتبار بگیر و قسطی بخر', cls: 'gp', go: true },
  { t: 'پس‌انداز طلایی', d: 'هر روز کمی طلا کنار بگذار', cls: 'sv' },
]

function Carousel() {
  const ref = useRef(null)
  const [i, setI] = useState(0)
  const onScroll = () => {
    const el = ref.current
    if (!el) return
    setI(Math.min(SLIDES.length - 1, Math.max(0, Math.round(Math.abs(el.scrollLeft) / el.clientWidth))))
  }
  const go = (n) => ref.current?.children[n]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  return (
    <div className="car">
      <div className="car-track" ref={ref} onScroll={onScroll}>
        {SLIDES.map((x) => (
          <div key={x.t} className={'banner ' + x.cls} onClick={x.go ? () => A.goldpayCredit() : undefined} style={x.go ? { cursor: 'pointer' } : undefined}>
            <div><b style={{ fontSize: 16 }}>{x.t}</b><div className="sm mut">{x.d}</div></div>
            {x.go ? <GoldpayLogo h={20} /> : <WgMark h={44} />}
          </div>
        ))}
      </div>
      <div className="car-dots">{SLIDES.map((x, n) => <button key={x.t} className={n === i ? 'on' : ''} onClick={() => go(n)} aria-label={'اسلاید ' + (n + 1)} />)}</div>
    </div>
  )
}

const HOME_CARDS = [
  { label: 'اعتبار گلدپی', tag: 'جدید', tint: '#fbf4dc' },
  { label: 'خرید قسطی', tint: '#fdf1f1' },
  { label: 'تضمین طلا', tint: '#f7f3e6' },
  { label: 'کارت هدیه', tint: '#f6efe6' },
  { label: 'اعتبار فوری', tint: '#eef8f4' },
  { label: 'دریافت فیزیکی', tint: '#f6efe6' },
]

function ServiceCards() {
  const go = (x) => (x.id === 'goldpay' ? A.goldpay() : x.id === 'credit' ? A.goldpayCredit() : undefined)
  return (
    <div className="hc">
      <div className="hc-grid">
        {HOME_CARDS.map((c) => {
          const x = SERVICES.find((v) => v.label === c.label)
          if (!x) return null
          return (
            <button key={c.label} className={'hc-card' + (x.id ? '' : ' inert')} onClick={() => go(x)}>
              <div className="hc-t"><b>{c.label}</b>{c.tag && <span className="hc-tag">{c.tag}</span>}<i><Svg d="M15 6l-6 6 6 6" size={16} /></i></div>
              <div className="hc-art" style={{ background: c.tint }}><img src={x.art} style={x.filter ? { filter: x.filter } : undefined} alt="" draggable="false" /></div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Home({ S }) {
  const u = S.user
  const [open, setOpen] = useState(false)
  const coll = openPlans(S).reduce((a, p) => a + p.goldG, 0)
  const goldAll = u.gold + u.pool + u.reserved + coll
  const goldVal = goldAll * S.rate
  const total = goldVal + u.cash
  const pg = total ? goldVal / total * 100 : 0
  const pc = total ? u.cash / total * 100 : 0
  const pct = (S.rate / S.rate0 - 1) * 100
  const pgR = Math.round(pg), pcR = total ? 100 - pgR : 0
  return (
    <>
      <TopBar />
      <Scroll>
        <div className="hero">
          <div className="lbl">
            <button className="det" onClick={() => setOpen(true)}>جزئیات دارایی <Svg d={ICON.chev} size={16} /></button>
            <span className="mut"><Svg d={ICON.clock} size={20} /></span>
          </div>
          <div className="total mono"><span className="mut"><Svg d={ICON.eye} size={18} /></span><b>{fa(total)}</b><span className="mut cur">تومان</span></div>
          <div className="split">
            <div className="sg" style={{ flex: pg || .0001 }}><span className="gold">{fa(pgR)}٪ طلا</span><i className="gold" /></div>
            <div className="sg" style={{ flex: pc || .0001 }}><span className="cash">{fa(pcR)}٪ نقد</span><i className="cash" /></div>
            <div className="sg silver"><span className="silver">۰٪ نقره</span><i className="silver" /></div>
          </div>
          <div className="acts">
            <Action icon="plus" label="خرید" dark /><Action icon="minus" label="فروش" /><Action icon="down" label="واریز" /><Action icon="up" label="برداشت" />
          </div>
        </div>

        <Carousel />

        <div className="tiles">
          <div className="tile">
            <div className="th"><b>قیمت طلا</b><span className="coin" /></div>
            <div className="sm mut">هر گرم ۱۸ عیار</div>
            <div className="chg" style={{ color: pct >= 0 ? 'var(--ok)' : 'var(--bad)' }}>{pct >= 0 ? '↗' : '↘'} {fa(Math.abs(pct).toFixed(2))}٪ تغییر ۲۴ ساعته</div>
            <div className="pr mono"><span className="sm mut">تومان</span> {fa(S.rate)}</div>
          </div>
          <div className="tile">
            <div className="th"><b>قیمت نقره</b><span className="coin silver" /></div>
            <div className="sm mut">هر گرم ۹۲۵ عیار</div>
            <div className="chg" style={{ color: 'var(--ok)' }}>↗ ۱٫۰۹٪ تغییر ۲۴ ساعته</div>
            <div className="pr mono"><span className="sm mut">تومان</span> ۴۶۳٬۰۰۰</div>
          </div>
        </div>

        <ServiceCards />

        {S.wg.moves.length > 0 && (
          <div className="pad" style={{ paddingTop: 12 }}>
            <div className="h">آخرین تراکنش‌ها</div>
            {S.wg.moves.slice(0, 4).map((m, i) => <div key={i} className="card" style={{ padding: '8px 12px', marginBottom: 8 }}>{m}</div>)}
          </div>
        )}
        <div style={{ height: 12 }} />
      </Scroll>
      <div className={'sheet-wrap' + (open ? ' open' : '')} aria-hidden={!open}>
        <div className="sheet-scrim" onClick={() => setOpen(false)} />
        <div className="sheet" role="dialog" aria-label="جزئیات دارایی">
          <i className="sheet-grab" />
          <div className="sheet-h"><b>جزئیات دارایی</b><button onClick={() => setOpen(false)} aria-label="بستن"><Svg d="M6 6l12 12M18 6L6 18" size={20} /></button></div>
          <div className="sheet-total mono">{fa(total)} <small>تومان</small></div>
          <div className="detail">
            <div className="kv"><span>طلای آزاد</span><b>{G(u.gold)}</b></div>
            {u.pool > 0 && <div className="kv"><span>طلای قفل‌شده برای اعتبار <span className="tag gold">Goldpay</span></span><b>{G(u.pool)}</b></div>}
            <div className="kv"><span>طلای رزروشده</span><b>{G(u.reserved)}</b></div>
            <div className="kv"><span>طلای وثیقه‌شده <span className="tag gold">Goldpay</span></span><b>{G(coll)}</b></div>
            <div className="kv"><span>ارزش کل طلا</span><b>{T(goldVal)}</b></div>
            <div className="kv"><span>موجودی نقد</span><b>{T(u.cash)}</b></div>
          </div>
        </div>
      </div>
      <Tabs />
    </>
  )
}

function Trade({ S }) {
  const [side, setSide] = useState('buy')
  const [asset, setAsset] = useState('gold')
  const [unit, setUnit] = useState('money')
  const [value, setValue] = useState('')
  const [assetMenu, setAssetMenu] = useState(false)
  const [message, setMessage] = useState('')
  const rate = asset === 'gold' ? S.rate : 463000
  const numeric = Number(value) || 0
  const total = unit === 'money' ? numeric : numeric * rate
  const grams = unit === 'money' ? numeric / rate : numeric
  const available = side === 'buy' ? T(S.user.cash) : G(S.user.gold)
  const shownValue = value ? (unit === 'money' ? fa(numeric) : numeric.toLocaleString('fa-IR', { minimumFractionDigits: 3, maximumFractionDigits: 3 })) : '۰'
  const append = (key) => {
    setMessage('')
    if (key === 'back') return setValue((v) => v.slice(0, -1))
    if (key === '.' && value.includes('.')) return
    if (value.replace('.', '').length >= 12) return
    setValue((v) => v + key)
  }
  const toggleUnit = () => {
    if (unit === 'money') {
      setValue(grams ? String(Number(grams.toFixed(3))) : '')
      setUnit('gram')
    } else {
      setValue(total ? String(Math.round(total)) : '')
      setUnit('money')
    }
  }
  const keys = ['۱','۲','۳','۴','۵','۶','۷','۸','۹','.','۰','back']
  const keyValue = (k) => k === 'back' ? 'back' : k === '.' ? '.' : String('۰۱۲۳۴۵۶۷۸۹'.indexOf(k))
  return (
    <>
      <Scroll>
        <div className="trade-page">
          <div className="trade-head">
            <div className="trade-switch" role="tablist" aria-label="نوع معامله">
              <button className={side === 'buy' ? 'active' : ''} onClick={() => { setSide('buy'); setMessage('') }}>خرید</button>
              <button className={side === 'sell' ? 'active' : ''} onClick={() => { setSide('sell'); setMessage('') }}>فروش</button>
            </div>
          </div>
          <div className="trade-mid">
          <div className="trade-rate"><span>هر گرم {asset === 'gold' ? 'طلا ۱۸ عیار' : 'نقره ۹۲۵ عیار'}</span><b>{T(rate)}</b></div>
          <div className="trade-entry">
            <div className="trade-asset-wrap">
              <button className="trade-asset" onClick={() => setAssetMenu((v) => !v)}>
                <span className={'trade-coin ' + (asset === 'silver' ? 'silver' : '')}></span>
                <b>{side === 'buy' ? 'خرید' : 'فروش'} {asset === 'gold' ? 'طلا' : 'نقره'}</b><Svg d={ICON.chev} size={16} />
              </button>
              {assetMenu && <div className="trade-menu"><button onClick={() => { setAsset('gold'); setAssetMenu(false) }}>طلا · ۱۸ عیار</button><button onClick={() => { setAsset('silver'); setAssetMenu(false) }}>نقره · ۹۲۵ عیار</button></div>}
            </div>
            <div className="trade-value"><b className={value ? '' : 'empty'}>{shownValue}<i className="caret" /></b><span>{unit === 'money' ? 'تومان' : 'گرم'}</span></div>
            <button className="trade-convert" onClick={toggleUnit} aria-label="تغییر واحد">
              <i><Svg d="M7 9.5h10l-3-3M17 14.5H7l3 3" size={16} /></i>
              <span>{unit === 'money' ? grams.toLocaleString('fa-IR', { minimumFractionDigits: 3, maximumFractionDigits: 3 }) + ' گرم' : (total ? fa(total) : '۰') + ' تومان'}</span>
            </button>
          </div>
          </div>
          <div className="trade-meta"><span>کارمزد: <b>۰ تومان</b></span><span>موجودی: <b>{available}</b></span></div>
          <div className="trade-keypad" aria-label="صفحه کلید عددی">
            {keys.map((k) => <button key={k} className={k === 'back' ? 'delete' : ''} onClick={() => append(keyValue(k))} aria-label={k === 'back' ? 'پاک کردن' : k === '.' ? 'ممیز' : k}>{k === 'back' ? <Svg d="M9 5H20a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H9l-6-7zM13 9l5 6m0-6-5 6" size={22} /> : k}</button>)}
          </div>
          {message && <div className="trade-message">{message}</div>}
          <button className="trade-submit" onClick={() => setMessage(numeric > 0 ? `${side === 'buy' ? 'خرید' : 'فروش'} ${G(grams)} ${asset === 'gold' ? 'طلا' : 'نقره'} · ${T(total)}` : 'مبلغ یا مقدار را وارد کنید')}>{side === 'buy' ? 'خرید' : 'فروش'}</button>
        </div>
      </Scroll>
      <Tabs on={1} />
    </>
  )
}

export default function WallGold({ S }) {
  const u = S.user
  if (S.wg.view === 'trade') return <Trade S={S} />
  if (S.wg.view === 'buy') return (
    <>
      <TopBar title="خرید طلا" />
      <Scroll>
        <div className="gold-hero"><img src={goldStack} alt="" /></div>
        <div className="pad">
          <div className="card">
            <div className="kv"><span>نرخ خرید هر گرم</span><b>{T(S.rate)}</b></div>
            <div className="kv"><span>مقدار</span><b>{G(S.wg.buyG)}</b></div>
            <div className="kv"><span>مبلغ قابل‌پرداخت</span><b style={{ fontSize: 16 }}>{T(S.wg.buyG * S.rate)}</b></div>
          </div>
          <div className="card kv"><span>موجودی نقد</span><b>{T(u.cash)}</b></div>
          {S.wg.err && <div className="note bad">{S.wg.err}</div>}
          <div className="note beige">برای تکمیل خرید قسطی تکنولایف · <Timer S={S} /></div>
          <button className="btn" onClick={() => A.doBuy()}>خرید از موجودی نقد</button>
        </div>
      </Scroll>
    </>
  )
  if (S.wg.view === 'bought') return (
    <>
      <TopBar title="خرید موفق" />
      <Scroll><div className="center" style={{ paddingTop: 30 }}>
        <img src={goldSuccess} alt="" style={{ width: 150, margin: '0 auto 6px' }} />
        <div className="h">طلا به حساب شما اضافه شد</div>
        <div className="mut">موجودی جدید: <b>{G(u.gold)}</b></div>
        <button className="btn" style={{ marginTop: 20 }} onClick={() => A.backBuy()}>بازگشت به خرید قسطی</button>
      </div></Scroll>
    </>
  )
  if (S.wg.view === 'services') return <Services />
  return <Home S={S} />
}
