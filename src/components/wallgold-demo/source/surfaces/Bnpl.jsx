import { useState, useEffect, useRef, createContext, useContext } from 'react'
import { createPortal } from 'react-dom'
import { A, fa, T, G, dstr, idx, MONTHS, ITEM, calc, late, planDebt, dueItems, openPlans, schedule, creditMax, canCredit, gramsFor } from '../engine.js'
import { Scroll, Timeline, GoldpayLogo, WgMark, laptopSrc } from '../ui.jsx'
import { CATS, STORES, CAT_ICON } from '../stores.js'
import { SICON } from '../storeIcons.js'
import Timer from './Timer.jsx'
import goldpayBnplSuccess from '../assets/goldpay-bnpl-success.png'
import goldCredit from '../assets/gold-credit-orbit.png'
import goldpayGuestHero from '../assets/goldpay-guest-hero.png'
import goldpayBnplHero from '../assets/goldpay-bnpl-hero.png'
import introShopping from '../assets/intro/intro-shopping-pastel.png'
import introCollateral from '../assets/intro/intro-collateral-balanced.png'
import introFast from '../assets/intro/intro-fast-pastel.png'

import profile from '../assets/profile.png'


export const NavCtx = createContext(null)
const useNav = () => useContext(NavCtx) || A

function Bar({ x, back }) {
  const nav = useNav()
  return (
    <div className="bzbar">
      {back ? <button className="round" onClick={() => nav.home()}>›</button> : x ? <button className="round" onClick={() => A.cancel()}>×</button> : <img src={profile} alt="" style={{ width: 42, height: 42, borderRadius: '50%' }} />}
      <GoldpayLogo stacked h={34} />
      <div className="round" style={{ visibility: 'hidden' }} />
    </div>
  )
}

const pd = (n) => String(n).replace(/\d/g, (c) => '۰۱۲۳۴۵۶۷۸۹'[c])
const WH = 46
function Wheel({ items, index, onChange }) {
  const ref = useRef(null)
  const raf = useRef(0)
  const paint = () => {
    const el = ref.current
    if (!el) return
    const top = el.scrollTop
    for (const c of el.children) {
      const o = (c.offsetTop - 92 - top) / WH   // فاصله از مرکز بر حسب آیتم
      const a = Math.min(Math.abs(o), 3)
      c.style.transform = `perspective(320px) rotateX(${-o * 24}deg) scale(${1 - a * 0.07})`
      c.style.opacity = Math.max(0.12, 1 - a * 0.38)
    }
  }
  useEffect(() => {
    const el = ref.current
    if (el && Math.round(el.scrollTop / WH) !== index) el.scrollTop = index * WH
    paint()
    return () => cancelAnimationFrame(raf.current)
  }, [index, items.length]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="wh">
      <div className="wh-scroll" ref={ref} data-item={WH} onScroll={(e) => {
        const el = e.currentTarget
        cancelAnimationFrame(raf.current)
        raf.current = requestAnimationFrame(paint)
        const i = Math.round(el.scrollTop / WH)
        if (i !== index && i >= 0 && i < items.length) onChange(i)
      }}>
        {items.map((t, i) => <div key={i} className="wh-it" onClick={() => ref.current.scrollTo({ top: i * WH, behavior: 'smooth' })}>{t}</div>)}
      </div>
    </div>
  )
}

const Y0 = 1320, Y1 = 1387
function DateSheet({ open, value, onClose, onPick }) {
  const parse = (v) => {
    const d = v.replace(/[۰-۹]/g, (c) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(c)).replace(/\D/g, '')
    return d.length === 8 ? { y: +d.slice(0, 4), m: +d.slice(4, 6), d: +d.slice(6) } : { y: 1370, m: 1, d: 1 }
  }
  const [sel, setSel] = useState(() => parse(value))
  useEffect(() => { if (open) setSel(parse(value)) }, [open]) // eslint-disable-line react-hooks/exhaustive-deps
  const dim = sel.m <= 6 ? 31 : sel.m <= 11 ? 30 : 29
  const day = Math.min(sel.d, dim)
  const days = Array.from({ length: dim }, (_, i) => pd(i + 1))
  const months = MONTHS.slice(1)
  const years = Array.from({ length: Y1 - Y0 + 1 }, (_, i) => pd(Y0 + i))
  const pick = () => onPick(pd(sel.y) + '/' + pd(String(sel.m).padStart(2, '0')) + '/' + pd(String(day).padStart(2, '0')))
  return (
    <div className={'sheet-wrap' + (open ? ' open' : '')}>
      <div className="sheet-scrim" onClick={onClose} />
      <div className="sheet ds">
        <i className="sheet-grab" />
        <div className="ds-h">تاریخ تولد</div>
        <div className="ds-val">{pd(day)} {months[sel.m - 1]} {pd(sel.y)}</div>
        <div className="ds-cols">
          <i className="ds-band" />
          <Wheel items={days} index={day - 1} onChange={(i) => setSel((s) => ({ ...s, d: i + 1 }))} />
          <Wheel items={months} index={sel.m - 1} onChange={(i) => setSel((s) => ({ ...s, m: i + 1 }))} />
          <Wheel items={years} index={sel.y - Y0} onChange={(i) => setSel((s) => ({ ...s, y: Y0 + i }))} />
        </div>
        <button className="btn ds-ok" onClick={pick}>تأیید</button>
      </div>
    </div>
  )
}

const toEn = (v) => String(v || '').replace(/[۰-۹]/g, (c) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(c)).replace(/[٠-٩]/g, (c) => '٠١٢٣٤٥٦٧٨٩'.indexOf(c)).replace(/\D/g, '')
const nidOk = (d) => {
  if (!/^\d{10}$/.test(d) || /^(\d)\1{9}$/.test(d)) return false
  const r = [...d.slice(0, 9)].reduce((a, c, i) => a + +c * (10 - i), 0) % 11
  return +d[9] === (r < 2 ? r : 11 - r)
}
const nidFmt = (d) => pd([d.slice(0, 3), d.slice(3, 9), d.slice(9)].filter(Boolean).join('-'))

function KycForm({ S }) {
  const [f, setF] = useState(() => ({ nid: toEn(S.b.su?.f?.nid), birth: S.b.su?.f?.birth || '' }))
  const [pickDate, setPickDate] = useState(false)
  const [srvErr, setSrvErr] = useState(S.b.su?.err || '')
  const inp = useRef(null)
  const full = f.nid.length === 10
  const valid = nidOk(f.nid)
  const nidErr = srvErr || (full && !valid ? 'کد ملی معتبر نیست؛ دوباره بررسی کنید.' : '')
  const bd = toEn(f.birth)
  const birthTxt = bd.length === 8 ? pd(+bd.slice(6)) + ' ' + MONTHS[+bd.slice(4, 6)] + ' ' + pd(bd.slice(0, 4)) : ''
  const ready = valid && !srvErr && bd.length === 8
  const onNid = (e) => {
    const d = toEn(e.target.value).slice(0, 10)
    setF((x) => ({ ...x, nid: d }))
    setSrvErr('')
    // کد ملی کامل و معتبر شد: کیبورد بسته و انتخاب تاریخ تولد خودکار باز می‌شود
    if (nidOk(d) && !nidOk(f.nid)) {
      e.target.blur()
      if (!bd) setTimeout(() => setPickDate(true), 260)
    }
  }
  const submit = () => ready && A.kycSubmit(f)
  return (
    <>
      <div className="bzbar lg-head">
        <button className="round" aria-label="بستن" onClick={() => A.cancel()}><SvgI d="M6 6l12 12M18 6L6 18" size={22} /></button>
        <GoldpayLogo stacked h={40} />
        <div className="round" style={{ visibility: 'hidden' }} />
      </div>
      <Scroll><div className="lg-pg">
        {S.flow && <Order S={S} />}
        <div className="lg-h" style={{ marginTop: 18 }}>احراز هویت</div>
        <div className="lg-sub">فقط یک بار و در کمتر از یک دقیقه.</div>

        <div className="kf-lbl">کد ملی</div>
        <div className={'kf' + (nidErr ? ' bad' : valid ? ' ok' : '')} onClick={() => inp.current?.focus()}>
          {valid && !srvErr
            ? <i className="kf-ok"><SvgI d="M5.5 12.5l4.2 4.2 8.8-9.4" size={14} /></i>
            : f.nid && <button className="kf-x" aria-label="پاک کردن" onClick={(e) => { e.stopPropagation(); setF((x) => ({ ...x, nid: '' })); setSrvErr(''); inp.current?.focus() }}><SvgI d="M6 6l12 12M18 6L6 18" size={12} /></button>}
          <input ref={inp} inputMode="numeric" autoComplete="off" autoFocus={!full} value={nidFmt(f.nid)} placeholder="۰۰۱-۲۳۴۵۶۷-۹"
            onChange={onNid} onKeyDown={(e) => { if (e.key === 'Enter' && valid) { e.target.blur(); bd ? submit() : setPickDate(true) } }} />
        </div>
        {nidErr && <div className="kf-msg">{nidErr}</div>}

        <div className="kf-lbl" style={{ marginTop: 20 }}>تاریخ تولد</div>
        <button className={'kf kf-btn' + (birthTxt ? ' ok' : '')} onClick={() => setPickDate(true)}>
          <SvgI d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" size={19} />
          <span className={birthTxt ? '' : 'ph'}>{birthTxt || 'انتخاب کنید'}</span>
          <SvgI d="M6 9l6 6 6-6" size={18} />
        </button>
      </div></Scroll>
      <div className="cr-bottom">
        <div className="kyc-trust"><SvgI d="M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5z" size={14} />اطلاعات شما فقط برای استعلام هویت استفاده می‌شود.</div>
        <button className="cr-cta" disabled={!ready} onClick={submit}>تأیید و ادامه</button>
        <div className="cr-foot">&nbsp;</div>
      </div>
      <DateSheet open={pickDate} value={f.birth} onClose={() => setPickDate(false)} onPick={(v) => { setF((x) => ({ ...x, birth: v })); setPickDate(false) }} />
    </>
  )
}

function Order({ S }) {
  const f = S.flow
  return (
    <div className="ord">
      <span className="ord-l">{laptopSrc ? <img src={laptopSrc} alt="" /> : 'TL'}</span>
      <div><b>{ITEM.name}</b><small>تکنولایف · {f.orderId}</small></div>
      <b className="ord-p">{fa(f.price / 1e6)} <small>میلیون</small></b>
    </div>
  )
}


function Login({ S }) {
  const lg = S.b.login
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [, tick] = useState(0)
  useEffect(() => { const id = setInterval(() => tick((n) => n + 1), 500); return () => clearInterval(id) }, [])
  useEffect(() => {
    if (!lg.fill) return
    setCode(lg.fill)
    const id = setTimeout(() => { A.verifyOtp(lg.fill) }, 450)
    return () => clearTimeout(id)
  }, [lg.fill])
  const left = lg.sentAt ? Math.max(0, 60 - Math.floor((Date.now() - lg.sentAt) / 1000)) : 0
  const onCode = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 6)
    setCode(d)
    if (d.length === 6) A.verifyOtp(d)
  }
  const phoneStep = lg.step === 'phone'
  const phoneBad = phone.replace(/[۰-۹]/g, (c) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(c)).replace(/\D/g, '').length < 11
  return (
    <>
      <div className="bzbar lg-head">
        <button className="round" aria-label="بستن" onClick={() => A.cancel()}><SvgI d="M6 6l12 12M18 6L6 18" size={22} /></button>
        <GoldpayLogo stacked h={40} />
        <div className="round" style={{ visibility: 'hidden' }} />
      </div>
      <Scroll><div className="lg-pg">
        {S.flow && <Order S={S} />}
        {phoneStep ? (
          <>
            <div className="lg-h">ورود یا ثبت‌نام</div>
            <div className="lg-sub">شماره موبایل خود را وارد کنید؛ اگر حساب وال‌گلد دارید، همان شماره را بزنید.</div>
            <label className={'lg-field' + (lg.err ? ' bad' : '')}>
              <span>شماره موبایل</span>
              <input inputMode="numeric" autoFocus placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹" value={phone} maxLength={13} onChange={(e) => setPhone(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !phoneBad && A.sendOtp(phone)} />
            </label>
            {lg.err && <div className="lg-err">{lg.err}</div>}
          </>
        ) : (
          <>
            <div className="lg-h">کد تأیید را وارد کنید</div>
            <div className="lg-sub">کد ۶ رقمی به <b className="mono">{S.user.phone}</b> ارسال شد. <button className="lg-link" onClick={() => { setCode(''); A.editPhone() }}>ویرایش</button></div>
            <div className="lg-otp" style={{ position: 'relative' }}>
              <div className="otp">{[0, 1, 2, 3, 4, 5].map((i) => <i key={i} className={(code[i] ? 'f' : '') + (code.length === i ? ' cur' : '') + (lg.err ? ' bad' : '')}>{code[i] ? fa(+code[i]) : ''}</i>)}</div>
              <input autoFocus inputMode="numeric" value={code} onChange={(e) => onCode(e.target.value)} style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%' }} aria-label="کد تأیید" />
            </div>
            {lg.err && <div className="lg-err" style={{ textAlign: 'center' }}>{lg.err}</div>}
            <div className="lg-resend">
              {left > 0 ? <span>ارسال مجدد کد تا <b className="mono">{fa(left)}</b> ثانیه</span>
                : <button className="lg-link" onClick={() => { setCode(''); A.resendOtp() }}>ارسال مجدد کد</button>}
            </div>
          </>
        )}
      </div></Scroll>
      <div className="cr-bottom">
        {phoneStep
          ? <button className="cr-cta" disabled={phoneBad} onClick={() => A.sendOtp(phone)}>دریافت کد تأیید</button>
          : <button className="cr-cta" disabled={code.length < 6} onClick={() => A.verifyOtp(code)}>تأیید و ورود</button>}
        <div className="cr-foot">{phoneStep ? <>ورود به‌معنای پذیرش <b>قوانین و شرایط گلدپی</b> است</> : <>&nbsp;</>}</div>
      </div>
    </>
  )
}

function Summary({ S }) {
  const u = S.user, f = S.flow, c = calc(S)
  return (
    <>
      <Bar x />
      <Scroll><div className="pad" style={{ paddingTop: 4 }}>
        <Order S={S} />
        {f.ch === 'instore' && <div className="note beige"><span>با دیپ‌لینک از پنل صندوق باز شد · رزرو شروع شده</span><Timer S={S} /></div>}
        {S.b.newLine && (
          <div className="hero" style={{ margin: '0 0 12px' }}>
            <img className="bar-img" src={goldCredit} alt="" />
            <div className="sm" style={{ color: 'var(--g1)', fontWeight: 700 }}>خط اعتبار شما فعال شد</div>
            <div className="big mono" style={{ margin: '2px 0' }}>{fa(u.limit / 1e6)} <span style={{ fontSize: 14 }}>میلیون تومان</span></div>
            <div className="sm mut">{S.cfg.mult.toLocaleString('fa-IR')} برابر ارزش طلای شما · تا وقتی خرج نکنید، هیچ طلایی وثیقه نمی‌شود</div>
          </div>
        )}
        <div className="card">
          <div className="kv"><span>طلای لازم برای این خرید</span><b>{G(c.needFull)}</b></div>
          <div className="kv"><span>طلای قابل‌استفاده شما</span><b>{G(u.gold + u.pool)}</b></div>
          <div className="kv"><span>اعتبار قابل‌استفاده</span><b>{T(c.usable)}</b></div>
        </div>
        {c.enough ? (
          <>
            <div className="note ok">طلا و اعتبار شما کافی است. با تأیید، طلا رزرو و نرخ {fa(S.cfg.resMin)} دقیقه قفل می‌شود.</div>
            <button className="btn" onClick={() => A.full()}>تأیید و رزرو طلا</button>
          </>
        ) : u.gold + u.pool <= 0 && c.usable <= 0 ? (
          <>
            <div className="note bad"><div><b>طلا ندارید.</b> برای این خرید باید {G(c.buyG)} طلا بخرید.</div></div>
            <button className="btn gold" onClick={() => A.buy()}>خرید {G(c.buyG)} طلا</button>
          </>
        ) : (
          <>
            <div className="note warn"><div><b>طلای شما برای کل مبلغ کافی نیست.</b> کمبود {G(c.buyG)}. یکی را انتخاب کنید:</div></div>
            <button className="opt" onClick={() => A.split()}><b>مابه‌التفاوت را نقدی می‌دهم</b>
              <div className="mut sm" style={{ marginTop: 2 }}>قسطی روی {T(c.usable)} · امروز {T(c.usable / 4 + f.price - c.usable)} (قسط اول {T(c.usable / 4)} + {T(f.price - c.usable)} نقدی)</div></button>
            <button className="opt" onClick={() => A.buy()}><b>{G(c.buyG)} طلا می‌خرم</b>
              <div className="mut sm" style={{ marginTop: 2 }}>به وال‌گلد می‌روی، طلا می‌خری و برمی‌گردی؛ کل مبلغ قسطی می‌شود.</div></button>
          </>
        )}
      </div></Scroll>
    </>
  )
}

function Terms({ S }) {
  const f = S.flow, first = f.financed / 4, sch = schedule(S.today, f.financed,S), after = S.today.d >= S.cfg.cut
  const items = sch.map((i) => ({ n: i.n, label: 'قسط ' + fa(i.n), sub: i.n === 1 ? 'همین حالا' : dstr(i.due), amt: T(i.amt), state: i.n === 1 ? 'now' : '' }))
  return (
    <>
      <Bar x />
      <Scroll><div className="pad" style={{ paddingTop: 4 }}>
        <div className="kv" style={{ marginBottom: 8 }}><span>رزرو طلا و قفل نرخ</span><Timer S={S} /></div>
        <div className="card"><div className="h">برنامه‌ی اقساط</div><Timeline items={items} />
          {f.cash > 0 && <div className="kv" style={{ marginTop: 10, borderTop: '1px solid var(--line)', paddingTop: 10 }}><span>+ مابه‌التفاوت نقدی (امروز)</span><b>{T(f.cash)}</b></div>}
          <div className="sm mut" style={{ marginTop: 8 }}>{after ? `خرید بعد از ${fa(S.cfg.cut)}ام است؛ قسط دوم ۱ ماهِ پس‌از‌بعد.` : `خرید قبل از ${fa(S.cfg.cut)}ام است؛ قسط دوم ۱ ماهِ بعد.`} سررسیدها همیشه ۱ام ماه است.</div></div>
        <div className="card beige"><div className="kv"><span>طلای وثیقه</span><b>{G(f.goldNeed)}</b></div><div className="kv"><span>نرخ قفل‌شده</span><span>{T(f.rate)} / گرم</span></div></div>
        <div className="note bad"><span>⚠</span><div><b>قانون لیکوئید:</b> اگر قسط دوم تا سررسید قسط سوم پرداخت نشود، <b>کل طرح</b> فسخ می‌شود و کل بدهی (اقساط + جریمه) یک‌جا از طلای وثیقه کسر می‌شود.</div></div>
        <label className="check"><input className="gcb" type="checkbox" checked={S.b.agree} onChange={(e) => A.agree(e.target.checked)} /><span>شرایط و قانون لیکوئید را خواندم و می‌پذیرم</span></label>
        {S.b.payErr && <div className="note bad">{S.b.payErr}</div>}
        <div className="kv" style={{ marginBottom: 6 }}><span>موجودی نقد وال‌گلد</span><b>{T(S.user.cash)}</b></div>
        <button className="btn" disabled={!S.b.agree} onClick={() => A.pay()}>پرداخت {T(first + f.cash)}</button>
      </div></Scroll>
    </>
  )
}

function planItems(S, p) {
  return p.inst.map((i) => {
    const l = late(i,S)
    return {
      n: i.n, label: 'قسط ' + fa(i.n), sub: i.n === 1 ? dstr(p.date) : dstr(i.due), amt: T(i.amt), extra: l.fee > 0 ? '+ جریمه ' + T(l.fee) : null,
      state: i.paid ? 'paid' : i.liq ? 'late' : l.days > S.cfg.grace ? 'late' : l.days > 0 ? 'warn' : '',
      tag: <div>{i.paid ? <span className="tag ok">پرداخت شد</span> : i.liq ? <span className="tag bad">لیکویید</span> : l.days > S.cfg.grace ? <span className="tag bad">دیرکرد {fa(l.days)} روز</span> : l.days > 0 ? <span className="tag warn">در مهلت</span> : <span className="tag">در انتظار</span>}</div>,
    }
  })
}

// آیکن‌ها: Lucide (ISC)؛ آیکن خانه همان آیکن نویگیشن وال‌گلد، خط ۱٫۸ و سرِ گرد؛ هم‌خانوادهٔ آیکن‌های وال‌گلد
const TI = {
  home: 'M3 12l7-6a3 3 0 0 1 4 0l7 6v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zM9 18h6',
  plans: 'M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5M16 2v4M8 2v4M3 10h5M17.5 17.5 16 16.3V14M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0z',
  stores: 'm2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4M2 7h20M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7',
  bell: 'M10.268 21a2 2 0 0 0 3.464 0M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326',
}
const Ic = ({ d }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>

function FloatTabs({ S }) {
  const nav = useNav()
  const t = S.b.tab
  const items = [['home', 'خانه'], ['plans', 'اقساط'], ['stores', 'فروشگاه‌ها']]
  const root = useRef(null)
  const [pill, setPill] = useState(null)
  useEffect(() => {
    const m = () => {
      const b = root.current?.querySelector('button.on')
      if (b) setPill({ x: b.offsetLeft, w: b.offsetWidth })
    }
    m()
    window.addEventListener('resize', m)
    return () => window.removeEventListener('resize', m)
  }, [t])
  return (
    <div className="fl-tabs" ref={root}>
      {pill && <i className="fl-pill" style={{ width: pill.w, transform: `translateX(${pill.x}px)` }} />}
      {items.map(([k, l]) => (
        <button key={k} className={t === k ? 'on' : ''} onClick={() => nav.tab(k)}>
          <Ic d={TI[k]} /><span>{l}</span>
        </button>
      ))}
    </div>
  )
}

function PlanRow({ p }) {
  const nav = useNav()
  const label = { open: 'باز', closed: 'تسویه', liquidated: 'لیکویید', returned: 'مرجوع' }
  return (
    <button className="opt" onClick={() => nav.plan(p.id)}>
      <div className="kv"><b>{p.item}</b><span className={'tag ' + (p.status === 'open' ? 'gold' : p.status === 'closed' ? 'ok' : 'bad')}>{label[p.status]}</span></div>
      <div className="mut sm">{T(p.price)} · {fa(p.inst.filter((i) => i.paid).length)} از ۴ قسط پرداخت شد</div>
    </button>
  )
}


const Lu = ({ k, size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: SICON[k] }} />

function StoreMark({ s }) {
  return (
    <i className={'st-mk' + (s.ic === 'tl' ? ' tl' : '')} style={{ '--brand': s.c }} aria-hidden="true">
      <b className="st-monogram">{s.brand}</b>
      <span className="st-emblem">{s.ic === 'tl'
        ? <svg className="tl-wave" viewBox="0 0 24 18" aria-hidden="true"><path d="M2 4.5c4-2.1 6.2 1.7 10.1-.1 3.5-1.6 5.4-1.1 9.9-.1M2 10c4-2.1 6.2 1.7 10.1-.1 3.5-1.6 5.4-1.1 9.9-.1M2 15.5c4-2.1 6.2 1.7 10.1-.1 3.5-1.6 5.4-1.1 9.9-.1" /></svg>
        : <Lu k={s.ic} size={14} />}</span>
      <span className="st-glint" />
    </i>
  )
}

function MapPreview({ s }) {
  const k = STORES.indexOf(s)
  const dx = (k * 37) % 60 - 30, dy = (k * 23) % 30 - 15
  return (
    <svg className="sm-map" viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="320" height="150" fill="#eef0ec" />
      <path d="M-10 118C60 96 110 134 190 110S290 84 340 96" stroke="#fff" strokeWidth="14" fill="none" />
      <path d="M70 -10C84 40 60 80 92 160" stroke="#fff" strokeWidth="11" fill="none" />
      <path d="M210 -10C200 36 236 70 224 160" stroke="#fff" strokeWidth="9" fill="none" />
      <path d="M-10 52C70 40 130 66 200 46S300 34 340 44" stroke="#fff" strokeWidth="7" fill="none" />
      <rect x="112" y="64" width="54" height="34" rx="9" fill="#dfe9d9" />
      <rect x="232" y="88" width="62" height="38" rx="9" fill="#dfe9d9" />
      <rect x="14" y="14" width="44" height="28" rx="8" fill="#e2e6ea" />
      <g transform={`translate(${160 + dx} ${58 + dy})`}>
        <ellipse cx="0" cy="27" rx="9" ry="3.2" fill="#0002" />
        <path d="M0 26C-14 12-17 4-17-4a17 17 0 0 1 34 0c0 8-3 16-17 30z" fill={s.c} />
        <circle cx="0" cy="-4" r="6.5" fill="#fff" />
      </g>
    </svg>
  )
}

function StoreSheet({ s, open, onClose }) {
  const [copied, setCopied] = useState(false)
  useEffect(() => { setCopied(false) }, [s])
  if (!s) return null
  const hasMap = !!s.addr
  const openMap = () => window.open(`https://www.google.com/maps/search/?api=1&query=${s.ll[0]},${s.ll[1]}`, '_blank', 'noopener')
  const copy = () => { navigator.clipboard?.writeText(s.addr).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1400) }
  return (
    <div className={'sheet-wrap' + (open ? ' open' : '')}>
      <div className="sheet-scrim" onClick={onClose} />
      <div className="sheet sm">
        <i className="sheet-grab" />
        <div className="sm-head">
          <StoreMark s={s} />
          <div className="sm-t"><b>{s.name}</b><small>{s.cat}</small></div>
          <button className="sm-x" aria-label="بستن" onClick={onClose}><SvgI d="M6 6l12 12M18 6L6 18" size={14} /></button>
        </div>
        <div className="sm-ch">
          {s.on && <span><Lu k="globe" size={13} />خرید آنلاین</span>}
          {s.off && <span><Lu k="store" size={13} />خرید حضوری</span>}
        </div>
        {hasMap && (
          <button className="sm-mapbox" onClick={openMap} aria-label="نمایش روی نقشه">
            <MapPreview s={s} />
            <span className="sm-maplbl"><Lu k="pin" size={14} />نمایش روی نقشه</span>
          </button>
        )}
        <div className="sm-rows">
          {hasMap ? (
            <div className="sm-row">
              <i><Lu k="pin" size={18} /></i>
              <div><small>آدرس</small><span>{s.addr}</span></div>
              <button className="sm-cp" onClick={copy} aria-label="کپی آدرس">{copied ? 'کپی شد' : <Lu k="copy" size={16} />}</button>
            </div>
          ) : (
            <div className="sm-row"><i><Lu k="globe" size={18} /></i><div><small>نوع فروشگاه</small><span>فقط آنلاین؛ شعبهٔ حضوری ندارد</span></div></div>
          )}
          {s.hours && <div className="sm-row"><i><Lu k="clock" size={18} /></i><div><small>ساعت کاری</small><span>همه‌روزه، {s.hours}</span></div></div>}
          <div className="sm-row"><i><Lu k="tel" size={18} /></i><div><small>تلفن</small><span dir="ltr" style={{ textAlign: 'right' }}>{s.tel}</span></div></div>
          {s.site && <div className="sm-row"><i><Lu k="globe" size={18} /></i><div><small>وب‌سایت</small><span dir="ltr" style={{ textAlign: 'right' }}>{s.site}</span></div></div>}
        </div>
        <div className="sm-act">
          {hasMap && <button className="btn" onClick={openMap}><Lu k="pin" size={17} />مسیریابی</button>}
          {s.site && <button className={'btn ' + (hasMap ? 'line' : '')} onClick={() => window.open('https://' + s.site, '_blank', 'noopener')}><Lu k="ext" size={16} />ورود به وب‌سایت</button>}
        </div>
      </div>
    </div>
  )
}

function Stores() {
  const [cat, setCat] = useState('همه')
  const [sel, setSel] = useState(null)
  const [open, setOpen] = useState(false)
  const [host, setHost] = useState(null)
  const root = useRef(null)
  useEffect(() => { setHost(root.current?.closest('.screen') || null) }, [])
  const list = STORES.filter((s) => cat === 'همه' || s.cat === cat)
  return (
    <div className="st-pg" ref={root}>
      <div className="st-cats">{CATS.map((c) => <button key={c} className={c === cat ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}</div>
      <div className="st-count">{fa(list.length)} فروشگاه</div>
      {list.length ? (
        <div className="st-list">
          {list.map((s) => (
            <button key={s.name} className="st-row" onClick={() => { setSel(s); setOpen(true) }}>
              <StoreMark s={s} />
              <div className="st-tx">
                <b>{s.name}</b>
                <div className="st-meta">
                  <span className="ch"><Lu k={CAT_ICON[s.cat]} size={10.4} />{s.cat}</span>
                  <i />
                  {s.on && <span className="ch"><Lu k="globe" size={10.4} />آنلاین</span>}
                  {s.on && s.off && <i />}
                  {s.off && <span className="ch"><Lu k="store" size={10.4} />حضوری</span>}
                </div>
              </div>
              <span className="st-chev"><Lu k="chev" size={18} /></span>
            </button>
          ))}
        </div>
      ) : (
        <div className="empty-st" style={{ paddingTop: 40 }}>
          <i><Lu k="search" size={26} /></i>
          <b>فروشگاهی پیدا نشد</b>
          <span>دستهٔ دیگری را انتخاب کنید.</span>
        </div>
      )}
      {host && createPortal(<StoreSheet s={sel} open={open} onClose={() => setOpen(false)} />, host)}
    </div>
  )
}

function HomeBar({ S }) {
  const nav = useNav()
  const t = S.b.tab
  const sub = t === 'notes' || t === 'profile'
  if (t === 'plans' || t === 'stores') return <div className="bzbar tab-head"><b>{t === 'plans' ? 'اقساط' : 'فروشگاه‌ها'}</b></div>
  if (sub) return (
    <div className="bzbar">
      <button className="round" onClick={() => nav.tab('home')}>›</button>
      <b style={{ fontSize: 15 }}>{t === 'notes' ? 'اعلان‌ها' : 'پروفایل'}</b>
      <div className="round" style={{ visibility: 'hidden' }} />
    </div>
  )
  return (
    <div className="bzbar">
      {S.embed
        ? <button className="goldpay-back" aria-label="بازگشت به وال‌گلد" onClick={() => A.exitGoldpay()}><SvgI d="M5 12h14M13 6l6 6-6 6" size={15} />وال‌گلد</button>
        : <button className="round" onClick={() => nav.tab('profile')} aria-label="پروفایل" style={{ padding: 0, overflow: 'hidden', width: 34, height: 34, margin: '4px 4px 4px 4px' }}><img src={profile} alt="" style={{ width: '100%', height: '100%' }} /></button>}
      <span className="bz-logo"><GoldpayLogo stacked h={34} /></span>
      <button className="round bare" onClick={() => nav.tab('notes')} aria-label="اعلان‌ها" style={{ position: 'relative' }}><Ic d={TI.bell} />{S.user.notes.length > (S.b.seen || 0) && <i className="dotb" />}</button>
    </div>
  )
}

function Profile({ S }) {
  const u = S.user
  const [ask, setAsk] = useState(false)
  const coll = openPlans(S).reduce((a, p) => a + p.goldG, 0)
  return (
    <div className="pad" style={{ paddingTop: 6 }}>
      <div style={{ textAlign: 'center', margin: '4px 0 16px' }}>
        <img src={profile} alt="" style={{ width: 84, height: 84, borderRadius: '50%', margin: '0 auto 8px' }} />
        <div className="h" style={{ marginBottom: 0 }}>{u.name}</div>
        <div className="mut mono">{u.phone}</div>
      </div>
      <div className="card">
        <div className="kv"><span>سقف اعتبار</span><b>{T(u.limit)}</b></div>
        <div className="kv"><span>طلای وثیقه‌شده</span><b>{G(coll)}</b></div>
        <div className="kv"><span>طرح‌های باز</span><b>{fa(openPlans(S).length)}</b></div>
      </div>
      {!ask ? <button className="btn line" style={{ color: 'var(--bad)' }} onClick={() => setAsk(true)}>خروج از حساب</button> : (
        <div className="card">
          <div className="h" style={{ fontSize: 14 }}>از حساب Goldpay خارج می‌شوید؟</div>
          <div className="mut sm" style={{ marginBottom: 10 }}>طرح‌ها و اقساط شما حفظ می‌شود و با ورود دوباره می‌بینید.</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn line" onClick={() => setAsk(false)}>انصراف</button>
            <button className="btn" style={{ background: 'var(--bad)' }} onClick={() => A.logout()}>خروج</button>
          </div>
        </div>
      )}
    </div>
  )
}

function Home({ S }) {
  const nav = useNav()
  const u = S.user
  const Logo = <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0 0' }}><GoldpayLogo stacked h={40} /></div>
  if (!u.logged) return (
    <>
      <Scroll><div className="pg">
        {Logo}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 56 }}>
        <img src={goldpayGuestHero} alt="" className="hero-img" />
        <div className="ttl" style={{ fontSize: 21, marginTop: 10 }}>طلایت را نگه دار، قسطی بخر</div>
        <div className="chipx"><span className="dotg" />۴ قسط بدون سود · با پشتوانه‌ی طلا</div>
        <button className="btn big-cta" onClick={() => A.startLogin()}>ورود یا ثبت‌نام</button>
        </div>
      </div></Scroll>
    </>
  )
  const used = openPlans(S).reduce((a, p) => a + p.financed, 0)
  const remaining = Math.max(0, u.limit - used)
  const withGold = Math.min(remaining, (u.gold + u.pool) * S.rate * S.cfg.mult)
  const coll = openPlans(S).reduce((a, p) => a + p.goldG, 0)
  const debt = openPlans(S).reduce((a, p) => a + planDebt(p,S), 0)
  const d = dueItems(S)
  const t = S.b.tab
  let body
  if (t === 'stores') body = <Stores />
  else if (t === 'plans') {
    const rows = openPlans(S).flatMap((p) => p.inst.filter((i) => !i.paid && !i.liq).map((i) => ({ p, i, l: late(i,S) }))).sort((a, b) => idx(a.i.due) - idx(b.i.due))
    body = (
      <div className="pad plans-pg" style={{ paddingTop: 12 }}>
        {rows.length ? rows.map((x, k) => (
          <button key={k} className={'due-row' + (x.l.days > 0 ? ' bad' : '')} onClick={() => nav.plan(x.p.id)}>
            <div><b>{x.p.item}</b><small>قسط {fa(x.i.n)} · {x.l.days > 0 ? 'دیرکرد ' + fa(x.l.days) + ' روز' : dstr(x.i.due)}</small></div>
            <span className="mono">{T(x.i.amt + x.l.fee)}</span>
          </button>
        )) : (
          <div className="empty-st">
            <i><Ic d={TI.plans} /></i>
            <b>قسطی ندارید</b>
            <span>بعد از اولین خرید قسطی، اقساط شما اینجا نمایش داده می‌شود.</span>
          </div>
        )}
      </div>
    )
  }
  else if (t === 'profile') body = <Profile S={S} />
  else if (t === 'notes') body = (
    <div className="pad">
      {u.notes.length ? u.notes.map((n, i) => <div key={i} className="card" style={{ padding: '10px 14px' }}><div>{n.t}</div><div className="sm mut">{n.time}</div></div>) : <div className="mut">اعلانی ندارید.</div>}</div>
  )
  else body = (
    <div className="pg">
      <img src={goldpayBnplHero} alt="" className="hero-img" style={{ marginTop: 50 }} />
      <div className="cap">اعتبار باقی‌مانده</div>
      <div className="ttl mono">{fa(remaining / 1e6)} <span>میلیون تومان</span></div>
      {withGold < remaining && <div className="sm" style={{ color: 'var(--warn)', textAlign: 'center' }}>قابل‌استفاده با طلای آزاد فعلی: {fa(withGold / 1e6)} میلیون</div>}
      <div className="chipx"><span className="dotg" />طلای وثیقه {G(coll)} · بدهی {fa(debt / 1e6)} میلیون</div>
      {S.b.newLine && <div className="note beige" style={{ justifyContent: 'space-between', alignItems: 'center' }}><span>خط اعتبار شما فعال شد · سقف {fa(u.limit / 1e6)} میلیون تومان</span><button style={{ border: 0, background: 'none', opacity: .6 }} onClick={() => A.dismissLine()}>×</button></div>}
      {(!u.line || u.credit > 0) && (
        <>
          <button className={'btn ' + (d.items.length > 0 ? 'line' : 'big-cta cta-live')} style={{ marginTop: d.items.length > 0 ? 10 : 22 }} disabled={!canCredit(S)} onClick={(e) => { const b = e.currentTarget; b.classList.remove('pulse'); void b.offsetWidth; b.classList.add('pulse'); setTimeout(() => A.creditOpen(), 160) }}>دریافت اعتبار</button>
          {!canCredit(S) && <div className="sm mut" style={{ textAlign: 'center', marginTop: 6 }}>طلای آزاد کافی برای دریافت اعتبار ندارید.</div>}
        </>
      )}
      {d.items.length > 0 && (
        <div className="due-list">
          <div className="due-h"><b>اقساط سررسید</b><span className={d.overdue ? 'bad' : ''}>{T(d.total)}</span></div>
          {d.items.map((x, k) => (
            <button key={k} className={'due-row' + (x.days > 0 ? ' bad' : '')} onClick={() => nav.plan(x.p.id)}>
              <div><b>{x.p.item}</b><small>قسط {fa(x.i.n)} · {x.days > 0 ? 'دیرکرد ' + fa(x.days) + ' روز' : dstr(x.i.due)}</small></div>
              <span className="mono">{T(x.total)}</span>
            </button>
          ))}
          <button className="btn big-cta" onClick={() => nav.payDue()}>پرداخت سررسید</button>
        </div>
      )}
    </div>
  )
  return (
    <>
      <HomeBar S={S} />
      <Scroll>{body}</Scroll>
      <FloatTabs S={S} />
    </>
  )
}

function Due({ S }) {
  const nav = useNav()
  const d = dueItems(S)
  return (
    <>
      <Bar back />
      <Scroll><div className="pad" style={{ paddingTop: 4 }}>
        <div className="h">سررسید این دوره</div>
        {d.items.map((x, k) => (
          <div key={k} className="card">
            <div className="kv"><b>{x.p.item}</b><span className="tag">قسط {fa(x.i.n)}</span></div>
            <div className="kv"><span>سررسید</span><span>{dstr(x.i.due)}</span></div>
            <div className="kv"><span>مبلغ قسط</span><span>{T(x.i.amt)}</span></div>
            {x.fee > 0 && <div className="kv"><span>جریمه‌ی دیرکرد ({fa(x.days)} روز)</span><b style={{ color: 'var(--bad)' }}>{T(x.fee)}</b></div>}
          </div>
        ))}
        <div className="card beige">
          <div className="kv"><span>جمع اقساط</span><span>{T(d.total - d.fees)}</span></div>
          {d.fees > 0 && <div className="kv"><span>جمع جریمه‌ها</span><b style={{ color: 'var(--bad)' }}>{T(d.fees)}</b></div>}
          <div className="kv"><b>قابل‌پرداخت</b><b>{T(d.total)}</b></div>
        </div>
        <div className="kv" style={{ marginBottom: 8 }}><span>موجودی نقد وال‌گلد</span><b>{T(S.user.cash)}</b></div>
        <button className="btn" onClick={() => nav.payDue()}>پرداخت {T(d.total)}</button>
      </div></Scroll>
    </>
  )
}

function Plan({ S }) {
  const p = S.user.plans.find((x) => x.id === S.b.planId)
  const nxt = p.inst.find((i) => !i.paid && !i.liq)
  return (
    <>
      <Bar back />
      <Scroll><div className="pad" style={{ paddingTop: 4 }}>
        <div className="h">{p.item}</div>
        <div className="card">
          <div className="kv"><span>مبلغ خرید</span><b>{T(p.price)}</b></div>
          <div className="kv"><span>تأمین‌مالی‌شده</span><span>{T(p.financed)}</span></div>
          <div className="kv"><span>طلای وثیقه</span><span>{G(p.goldG)}</span></div>
          <div className="kv"><span>بدهی مانده</span><b>{T(p.status === 'open' ? planDebt(p,S) : 0)}</b></div>
        </div>
        <div className="card"><Timeline items={planItems(S, p)} /></div>
        {p.liq && <div className="note bad"><div><b>لیکویید شد</b> · بدهی {T(p.liq.debt)} · کسر {G(p.liq.ded)} طلا{p.liq.back > 0 && ' · بازگشت ' + G(p.liq.back)}
          {p.liq.short > 0 && <><br />کسری پس از لیکویید: {T(p.liq.short)} (قانون جبران هنوز در PRD باز است)</>}</div></div>}
        {p.status === 'returned' && <div className="note ok">مرجوع شد · وثیقه آزاد و وجه به کیف پول برگشت.</div>}
        {p.status === 'closed' && <div className="note ok">تسویه کامل شد · طلا آزاد است.</div>}
        {p.status === 'open' && nxt && <button className="btn" onClick={() => A.payInst(p.id)}>پرداخت قسط {fa(nxt.n)} · {T(nxt.amt + late(nxt,S).fee)}</button>}
      </div></Scroll>
    </>
  )
}

const SvgI = ({ d, size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>

const W_ONES = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه', 'ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده']
const W_TENS = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود']
const W_HUND = ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد']
function millionsWords(v) {
  const n = Math.round(v / 1e6), h = Math.floor(n / 100), r = n % 100
  const t = r < 20 ? W_ONES[r] : W_TENS[Math.floor(r / 10)] + (r % 10 ? ' و ' + W_ONES[r % 10] : '')
  return [W_HUND[h], t].filter(Boolean).join(' و ') + ' میلیون'
}

function CreditView({ S }) {
  const m = creditMax(S), amt = S.b.credit.amount
  const [shake, setShake] = useState(false)
  const [shakeMax, setShakeMax] = useState(false)
  const [plan, setPlan] = useState(false)
  const p = (v) => ((v - m.min) / (m.cap - m.min)) * 100
  const locked = m.mine < m.cap
  const need = gramsFor(amt,S)
  const sch = schedule(S.today, amt,S)
  const none = m.mine <= 0
  const onRange = (e) => {
    const v = +e.target.value
    if (v > m.mine) { setShake(true); setShakeMax(true); setTimeout(() => setShake(false), 340); setTimeout(() => setShakeMax(false), 620); A.creditSet(m.mine) } else A.creditSet(v)
  }
  const dot = (i) => { const at = (i / 14) * 100; return at <= p(amt) + 0.01 ? 'on' : locked && at > p(m.mine) + 0.01 ? 'lk' : '' }
  return (
    <>
      <div className="cr-top">
        <button aria-label="بازگشت" onClick={() => A.cancel()}><SvgI d="M4 12h16M14 6l6 6-6 6" size={24} /></button>
        <b>اعتبار گلدپی</b>
        <button className="cr-help" aria-label="سوالات متداول" onClick={() => A.faq()}><SvgI d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.6 9.4a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.2 1-1.2 1.8M12 17.2h.01" size={22} /></button>
      </div>
      <Scroll><div className="cr-pg">
        {S.flow && <Order S={S} />}
        <div className="cr-lbl">اعتبار درخواستی</div>
        <div className="cr-amt"><b>{fa(amt)}</b><span>تومان</span></div>
        <div className="cr-cap">حداکثر اعتبار قابل دریافت {S.cfg.mult.toLocaleString('fa-IR')} برابر ارزش طلای شما</div>
        <div className={'crs' + (shake ? ' shake' : '')} style={{ '--v': p(amt) }}>
          <div className="crs-track">
            <i className="crs-base" /><i className="crs-fill" />
            <div className="crs-dots">{Array.from({ length: 15 }, (_, i) => <i key={i} className={dot(i)} />)}</div>
          </div>
          <input type="range" min={m.min} max={m.cap} step={m.step} value={amt} onChange={onRange} disabled={none} aria-label="مبلغ اعتبار" aria-valuemax={m.mine} />
        </div>
        <div className="crs-ends"><span>{millionsWords(m.min)}</span><span>{millionsWords(m.cap)}</span></div>
        {none && <div className="cr-none">برای دریافت اعتبار ابتدا در وال‌گلد طلا بخرید.</div>}
        <button className={'cr-max' + (shakeMax ? ' shake' : '')} disabled={none} onClick={() => A.creditSet(m.mine)}><span>حداکثر اعتبار قابل دریافت</span><b>{fa(m.mine)} <small>تومان</small></b></button>
        <div className="cr-spacer" />
        <div className="cr-row"><span><i className="cr-i">i</i>طلای مورد نیاز برای وثیقه</span><b>{need.toLocaleString('fa-IR', { maximumFractionDigits: 2 })} <small>گرم</small></b></div>
        <button className={'cr-row cr-plan' + (plan ? ' open' : '')} onClick={() => setPlan(!plan)} aria-expanded={plan}>
          <span><i className="cr-i">i</i>تعداد اقساط</span>
          <b>۴ قسط <SvgI d="M6 9l6 6 6-6" size={16} /></b>
        </button>
        <div className={'cr-pwrap' + (plan ? ' open' : '')} aria-hidden={!plan}>
          <div>
            <div className="cr-plist">
              {sch.map((i) => (
                <div key={i.n}><span>{i.n === 1 ? 'قسط اول · همین حالا' : 'قسط ' + ['', '', 'دوم', 'سوم', 'چهارم'][i.n] + ' · ' + dstr(i.due)}</span><b>{fa(i.amt)} <small>تومان</small></b></div>
              ))}
            </div>
          </div>
        </div>
        <div className="cr-row"><span>کارمزد</span><b className="ok">بدون کارمزد</b></div>
      </div></Scroll>
      <div className="cr-bottom">
        <button className="cr-cta" disabled={none} onClick={() => A.creditSubmit()}>تأیید و ادامه</button>
        <button className="cr-foot" onClick={() => A.intro()}>گلدپی چیست؟ <b>بیشتر بدانید</b></button>
      </div>
    </>
  )
}

const INTRO = [
  { t: 'از هرجا، قسطی خرید کنید', d: 'با گلدپی از فروشگاه‌های طرف قرارداد، چه حضوری و چه آنلاین، خرید اقساطی کنید.', art: introShopping },
  { t: 'بدون چک، سود و ضامن', d: 'تنها با وثیقه گذاشتن طلای خود در وال‌گلد، تا ۱٫۵ برابر ارزش طلایتان اعتبار دریافت کنید.', art: introCollateral },
  { t: 'فرآیندی سریع و آسان', d: 'در وال‌گلد، اعتبار موردنیازتان را آنلاین و سریع دریافت کنید.', art: introFast },
]

function IntroArt({ src }) {
  return <img src={src} alt="" draggable="false" />
}

function Intro() {
  const [i, setI] = useState(0)          // اسلاید هدف (نقطه‌ها و دکمه)
  const [shown, setShown] = useState(0)  // اسلایدی که الان محتوایش دیده می‌شود
  const [phase, setPhase] = useState('in')
  const [dir, setDir] = useState('next')
  const [dx, setDx] = useState(0)
  const [x0, setX0] = useState(0)        // فاصلهٔ درگ در لحظهٔ رها کردن: خروج از همان‌جا ادامه می‌یابد
  const drag = useRef(null)
  const busy = useRef(false)
  const timers = useRef([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const last = i === INTRO.length - 1
  const it = INTRO[shown]
  // خروج هم‌زمان همهٔ آیتم‌ها (حرکت + محو) ← ورود آیتم‌های جدید یکی‌یکی (۱۰۰ms فاصله)
  const go = (n) => {
    n = Math.max(0, Math.min(INTRO.length - 1, n))
    if (n === i || busy.current) return
    busy.current = true
    setDir(n > i ? 'next' : 'prev')
    setI(n)
    setPhase('out')
    const t1 = setTimeout(() => { setShown(n); setPhase('in'); setX0(0) }, 280)
    const t2 = setTimeout(() => { busy.current = false }, 280 + 500 + 200)
    timers.current.push(t1, t2)
  }
  const edge = (d) => (d > 0 ? last : i === 0)
  // سوایپ: با فاصلهٔ کم (~۲۴px) یا یک کشش سریع (flick) اسلاید عوض می‌شود؛ خیلی راحت‌تر از قبل
  const onDown = (e) => {
    drag.current = { x: e.clientX, t: performance.now(), lx: e.clientX, lt: performance.now(), v: 0 }
    try { e.currentTarget.setPointerCapture?.(e.pointerId) } catch { /* ignore */ }
  }
  const onMove = (e) => {
    const g = drag.current
    if (g == null) return
    const now = performance.now()
    const dtm = Math.max(1, now - g.lt)
    g.v = (e.clientX - g.lx) / dtm
    g.lx = e.clientX; g.lt = now
    const d = e.clientX - g.x
    setDx(edge(d) ? d * 0.3 : d)
  }
  const onUp = (e) => {
    const g = drag.current
    if (g == null) return
    drag.current = null
    const d = e.clientX - g.x
    const fast = Math.abs(g.v) > 0.45 && Math.abs(d) > 10
    const thr = 24
    setDx(0)
    if ((d > thr || (fast && g.v > 0)) && i < INTRO.length - 1) { setX0(d); go(i + 1) }
    else if ((d < -thr || (fast && g.v < 0)) && i > 0) { setX0(d); go(i - 1) }
  }
  return (
    <>
      <div className="in-top">
        <button aria-label="بستن" onClick={() => A.introClose()}><SvgI d="M6 6l12 12M18 6L6 18" size={24} /></button>
        <GoldpayLogo stacked h={40} />
        <span style={{ width: 32 }} />
      </div>
      <div className={'in-pg ' + phase + ' ' + dir + (drag.current != null ? ' dragging' : '')} style={{ transform: dx ? `translateX(${dx}px)` : undefined, '--x0': x0 + 'px' }} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={() => { drag.current = null; setDx(0) }}>
        <div className="in-art it" style={{ '--n': 0 }}><span className="in-oval"><IntroArt src={it.art} /></span></div>
        <h3 className="it" style={{ '--n': 1 }}>{it.t}</h3>
        <p className="it" style={{ '--n': 2 }}>{it.d}</p>
      </div>
      <div className="in-bottom">
        <div className="in-dots">{INTRO.map((_, n) => <i key={n} className={n === i ? 'on' : ''} />)}</div>
        <button key={last ? 'start' : 'next'} className={'cr-cta in-cta press ' + (last ? 'primary' : 'soft')} onClick={(e) => { const b = e.currentTarget; b.classList.remove('pulse'); void b.offsetWidth; b.classList.add('pulse'); setTimeout(() => (last ? A.introNext() : go(i + 1)), 160) }}>{last ? 'شروع' : 'بعدی'}</button>
      </div>
    </>
  )
}

function Faq({ S }) {
  const [open, setOpen] = useState(0)
  const c = S.cfg
  const items = [
    ['گلدپی چیست و چگونه کار می‌کند؟', `گلدپی خرید اقساطی (BNPL) با پشتوانهٔ طلای وال‌گلد است. به‌جای دریافت وام یا فروش طلا، بخشی از طلای شما به‌عنوان وثیقه نگه داشته می‌شود و در مقابل اعتباری دریافت می‌کنید که در فروشگاه‌های طرف قرارداد خرج می‌شود. هزینهٔ خرید را در ${fa(4)} قسط مساوی و بدون سود پرداخت می‌کنید.`],
    ['مزایای استفاده از گلدپی چیست؟', 'بدون فروش طلا و بدون از دست دادن سود نگهداری آن، خرید اقساطی می‌کنید. قسط‌ها بدون سود و کارمزد هستند، قسط اول همان لحظهٔ خرید پرداخت می‌شود و بقیه ماهانه است. همه‌چیز در همان حساب وال‌گلد شما دیده می‌شود.'],
    ['چه مقدار اعتبار می‌توان دریافت کرد؟', `سقف اعتبار شما ${c.mult.toLocaleString('fa-IR')} برابر ارزش طلای آزادتان با نرخ روز است و حداکثر تا ${fa(c.cap / 1e6)} میلیون تومان. با افزایش طلای وال‌گلد، سقف شما هم بالاتر می‌رود.`],
    ['طلای من چه زمانی قفل و آزاد می‌شود؟', 'به‌اندازهٔ اعتباری که انتخاب می‌کنید، طلا همان لحظهٔ تأیید در وال‌گلد قفل می‌شود. با پرداخت کامل اقساط، طلای وثیقه آزاد و به موجودی وال‌گلد شما برمی‌گردد. طلای قفل‌شده قابل برداشت یا فروش نیست.'],
    ['قسط‌ها چگونه محاسبه می‌شوند؟', `مبلغ خرید به ${fa(4)} قسط مساوی تقسیم می‌شود. قسط اول موقع خرید و سه قسط بعدی در سررسیدهای ماهانه از کیف پول تومانی وال‌گلد کسر می‌شود. اگر خرید قبل از ${fa(c.cut)}ام ماه انجام شود، قسط دوم ماه بعد و در غیر این‌صورت دو ماه بعد است.`],
    ['اگر قسط را به‌موقع نپردازم چه می‌شود؟', `تا ${fa(c.grace)} روز بعد از سررسید مهلت دارید. بعد از آن برای هر روز تأخیر جریمه محاسبه می‌شود (حدود ۰٫۲۵٪ مبلغ قسط در روز). اگر قسط دوم تا سررسید قسط سوم پرداخت نشود، کل طرح فسخ و بدهی از طلای وثیقه شما برداشت می‌شود؛ مازاد طلا به شما برمی‌گردد.`],
    ['در صورت مرجوعی کالا چه اتفاقی می‌افتد؟', `اگر کالا را تا ${fa(c.refundDays)} روز بعد از خرید مرجوع کنید، مبلغ پرداخت‌شده به کیف پول شما برمی‌گردد، اقساط باقی‌مانده لغو می‌شود و طلای وثیقه آزاد می‌شود.`],
  ]
  return (
    <>
      <div className="cr-top fq-top">
        <button aria-label="بازگشت" onClick={() => A.faqBack()}><SvgI d="M4 12h16M14 6l6 6-6 6" size={24} /></button>
        <b>سوالات متداول</b>
        <span style={{ width: 32 }} />
      </div>
      <Scroll><div className="fq-pg">
        <div className="fq-hero"><span className="fq-oval"><WgMark h={58} /></span></div>
        <h2>خرید اقساطی با گلدپی</h2>
        <p>هرآنچه باید دربارهٔ خرید اقساطی با گلدپی بدانید</p>
        {items.map(([q, a], i) => (
          <div key={q} className={'fq-card' + (open === i ? ' open' : '')}>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span>{q}</span><SvgI d="M6 9l6 6 6-6" size={20} />
            </button>
            <div className="fq-body"><div><div className="fq-text">{a}</div></div></div>
          </div>
        ))}
        <div style={{ height: 18 }} />
      </div></Scroll>
    </>
  )
}

function CreditOk({ S }) {
  const amt = S.b.credit.amount, need = gramsFor(amt,S)
  const g = (v) => v.toLocaleString('fa-IR', { maximumFractionDigits: 3 })
  return (
    <>
      <div className="cr-top">
        <button aria-label="بازگشت و ویرایش مبلغ" onClick={() => A.creditEdit()}><SvgI d="M4 12h16M14 6l6 6-6 6" size={24} /></button>
        <b>تأیید اعتبار</b>
        <span style={{ width: 32 }} />
      </div>
      <Scroll><div className="cr-pg">
        {S.flow && <Order S={S} />}
        <div className="cr-lbl" style={{ marginTop: S.flow ? 20 : 44 }}>اعتبار شما</div>
        <div className="cr-amt"><b>{fa(amt)}</b><span>تومان</span></div>
        <div className="co-list">
          <div className="cr-row"><span>طلای قفل‌شونده</span><b>{g(need)} <small>گرم</small></b></div>
          <div className="cr-row"><span>نرخ محاسبه</span><b>{fa(S.rate)} <small>تومان / گرم</small></b></div>
          <div className="cr-row"><span>طلای آزاد باقی‌مانده</span><b>{g(S.user.gold - need)} <small>گرم</small></b></div>
        </div>
        <div className="cr-lock">
          <SvgI d="M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5z" size={16} />
          <span>با تأیید، {g(need)} گرم از طلای شما در وال‌گلد قفل می‌شود و تا تسویه یا لغو اعتبار قابل برداشت نیست.</span>
        </div>
      </div></Scroll>
      <div className="cr-bottom">
        <button className="cr-cta" onClick={() => A.creditConfirm()}>تأیید و قفل طلا</button>
        <button className="cr-foot" onClick={() => A.creditEdit()}>ویرایش مبلغ</button>
      </div>
    </>
  )
}

function CreditDone({ S }) {
  return (
    <Scroll><div className="center credit-done-screen" style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 0, paddingBottom: 48 }}>
      <img src={goldpayBnplSuccess} alt="" style={{ width: 130, margin: '0 auto 4px' }} />
      <div className="h">اعتبار شما فعال شد</div>
      <div className="mut">{T(S.user.credit)} · {G(S.user.pool)} طلا قفل شد</div>
      <button className="btn" style={{ marginTop: 22 }} onClick={() => A.creditContinue()}>{S.flow ? 'ادامه‌ی خرید از تکنولایف' : 'ورود به گلدپی'}</button>
    </div></Scroll>
  )
}

function KycConfirm({ S }) {
  return (
    <>
      <div className="bzbar">
        <button className="round" aria-label="بستن" onClick={() => A.exitKycConfirm()}><SvgI d="M6 6l12 12M18 6L6 18" size={22} /></button>
        <GoldpayLogo stacked h={40} />
        <div className="round" style={{ visibility: 'hidden' }} />
      </div>
      <Scroll><div className="pad" style={{ paddingTop: 32, paddingBottom: 20 }}>
        <div className="h">تأیید و موافقت</div>
        <div className="mut" style={{ marginTop: 8 }}>شما قبلاً تایید هویتی شده‌اید. برای استفاده از سرویس‌های گلدپی، لطفاً شرایط و ضوابط را بپذیرید.</div>
        <div className="card" style={{ marginTop: 20, padding: '16px 12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input type="checkbox" checked={S.b.kc?.agreed} onChange={(e) => A.kycAgree(e.target.checked)} className="gcb" />
            <span>موافق با شرایط و ضوابط گلدپی هستم</span>
          </label>
        </div>
        <button className="btn" disabled={!S.b.kc?.agreed} onClick={() => A.kycConfirm()} style={{ marginTop: 20 }}>ادامه</button>
      </div></Scroll>
    </>
  )
}

export default function Bnpl({ S }) {
  const nav = useNav()
  const b = S.b.view, u = S.user
  let content
  if (b === 'redirect') content = <Scroll><div className="center" style={{ paddingTop: 150 }}><div style={{ margin: '0 auto 24px', display: 'flex', justifyContent: 'center' }}><GoldpayLogo stacked h={64} /></div><div className="spin" /><b>در حال انتقال از تکنولایف…</b><div className="mut sm">پلتفرم مستقل · طلای شما از وال‌گلد خوانده می‌شود</div></div></Scroll>
  else if (b === 'login') content = <Login S={S} />
  else if (b === 'kycform') content = <KycForm S={S} />
  else if (b === 'kycload') content = <div className="lw-load"><div className="spin" /><b>در حال بررسی اطلاعات شما…</b><div className="mut sm" style={{ marginTop: 6 }}>هویت شما در حال استعلام و تأیید است.</div></div>
  else if (b === 'kycconfirm') content = <KycConfirm S={S} />
  else if (b === 'credit') content = <CreditView S={S} />
  else if (b === 'inquiry') content = <div className="lw-load"><div className="spin" /><b>در حال استعلام طلای شما از وال‌گلد…</b><div className="mut sm" style={{ marginTop: 6 }}>بررسی می‌کنیم طلای آزاد برای این اعتبار کافی باشد.</div></div>
  else if (b === 'faq') content = <Faq S={S} />
  else if (b === 'intro') content = <Intro />
  else if (b === 'creditOk') content = <CreditOk S={S} />
  else if (b === 'creditDone') content = <CreditDone S={S} />
  else if (b === 'summary') content = <Summary S={S} />
  else if (b === 'terms') content = <Terms S={S} />
  else if (b === 'paying') content = <Scroll><div className="center" style={{ paddingTop: 150 }}><div style={{ margin: '0 auto 22px', display: 'flex', justifyContent: 'center' }}><WgMark h={44} /></div><div className="spin" /><b>در حال پرداخت از موجودی وال‌گلد…</b><div className="mut sm">پرداخت قسط اول</div></div></Scroll>
  else if (b === 'done') {
    const p = u.plans[0]
    content = (
      <Scroll><div className="center" style={{ paddingTop: 70 }}>
        <img src={goldpayBnplSuccess} alt="" style={{ width: 130, margin: '0 auto 4px' }} />
        <div className="h">خرید قسطی نهایی شد</div>
        <div className="mut">{G(p.goldG)} طلا وثیقه شد · ۳ قسط باقی است</div>
        {S.ch === 'online' && <button className="btn" style={{ marginTop: 22 }} onClick={() => A.backMerchant()}>بازگشت به تکنولایف</button>}
        <button className={'btn ' + (S.ch === 'online' ? 'line' : '')} style={{ marginTop: S.ch === 'online' ? 10 : 22 }} onClick={() => nav.home()}>مشاهده‌ی طرح‌ها</button>
      </div></Scroll>
    )
  }
  else if (b === 'expired') content = <Scroll><div className="center" style={{ paddingTop: 140 }}><div className="h" style={{ color: 'var(--bad)' }}>زمان رزرو تمام شد</div><div className="mut">رزرو طلا آزاد و نرخ از قفل خارج شد. از ابتدا شروع کنید.</div><button className="btn line" style={{ marginTop: 18 }} onClick={() => A.retry()}>متوجه شدم</button></div></Scroll>
  else if (b === 'plan') content = <Plan S={S} />
  else if (b === 'due') content = <Due S={S} />
  else content = <Home S={S} />
  return (
    <>
      {S.b.notif && (
        <div className="toast" style={S.b.sms ? { cursor: 'pointer' } : undefined} onClick={() => S.b.sms && A.fillOtp()}>
          {S.b.notif}<button onClick={(e) => { e.stopPropagation(); A.dismiss() }}>×</button>
          {S.b.sms && <div style={{ opacity: .6, fontSize: 10.5 }}>برای وارد کردن خودکار کد، لمس کنید</div>}
        </div>
      )}
      {content}
    </>
  )
}
