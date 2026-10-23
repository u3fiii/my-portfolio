import { useState } from 'react'
import { A, G, ITEM, calc, OTP, fa } from '../engine.js'
import { Scroll, GoldpayLogo } from '../ui.jsx'
import Timer from './Timer.jsx'
import goldCredit from '../assets/gold-credit-orbit.png'

const Top = ({ back, title }) => (
  <div className="bzbar">
    {back ? <button className="round" onClick={back}>›</button> : <div className="round" style={{ visibility: 'hidden' }} />}
    {title ? <b style={{ fontSize: 15 }}>{title}</b> : <GoldpayLogo stacked h={34} tail="POS" />}
    <div className="round" style={{ visibility: 'hidden' }} />
  </div>
)

export default function Pos({ S }) {
  const p = S.m.pos
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const otpCells = [0, 1, 2, 3, 4, 5]

  if (p.step === 'home') return (
    <Scroll><div className="pg" style={{ minHeight: '100%' }}>
      <Top />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 40 }}>
        <img src={goldCredit} alt="" className="hero-img" style={{ width: 150, height: 150 }} />
        <div className="cap">فروشگاه شما</div>
        <div className="ttl" style={{ fontSize: 21, marginBottom: 12 }}>تکنولایف · شعبه‌ی ولیعصر</div>
        <div className="chipx"><span className="dotg" />{ITEM.name} · {fa(ITEM.price / 1e6)} میلیون</div>
        <button className="btn big-cta" onClick={() => A.posStart()}>فروش جدید</button>
      </div>
    </div></Scroll>
  )

  if (p.step === 'phone') return (
    <>
      <Top back={() => A.posNew()} title="فروش جدید" />
      <Scroll><div className="pad">
        <div className="h">شماره‌ی موبایل مشتری</div>
        <div className="mut sm" style={{ marginBottom: 10 }}>مشتری باید قبلاً در وال‌گلد ثبت‌نام کرده باشد.</div>
        <input className="field" style={{ width: '100%', direction: 'ltr', textAlign: 'left', fontWeight: 700, fontSize: 16 }} inputMode="numeric" placeholder="09123456789" value={phone} onChange={(e) => setPhone(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && A.posOtpSend(phone)} />
        {p.err && <div className="note bad">{p.err}</div>}
        <button className="btn soft sm" style={{ marginBottom: 12 }} onClick={() => setPhone('09121234567')}>استفاده از شماره‌ی دمو</button>
        <button className="btn" disabled={phone.replace(/\D/g, '').length < 10} onClick={() => A.posOtpSend(phone)}>ارسال کد تأیید به مشتری</button>
      </div></Scroll>
    </>
  )

  if (p.step === 'otp') return (
    <>
      <Top back={() => { setCode(''); A.posStart() }} title="کد تأیید مشتری" />
      <Scroll><div className="pad">
        <div className="h">کد را از مشتری بگیرید</div>
        <div className="mut sm">کد ۶ رقمی روی گوشی <b className="mono" style={{ color: 'var(--ink)' }}>{S.user.phone}</b> ارسال شد. این کد فقط اعتبار را بررسی می‌کند و هیچ پرداختی را تأیید نمی‌کند.</div>
        <div style={{ position: 'relative' }}>
          <div className="otp">{otpCells.map((i) => <i key={i} style={{ borderColor: p.err ? 'var(--bad)' : code.length === i ? 'var(--ink)' : undefined }}>{code[i] ? fa(+code[i]) : ''}</i>)}</div>
          <input inputMode="numeric" value={code} aria-label="کد مشتری" onChange={(e) => { const d = e.target.value.replace(/\D/g, '').slice(0, 6); setCode(d); if (d.length === 6) A.posOtpOk(d) }} style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%' }} />
        </div>
        {p.err && <div className="note bad">{p.err}</div>}
        <button className="btn soft sm" style={{ marginBottom: 12 }} onClick={() => { setCode(OTP); A.posOtpOk(OTP) }}>پر کردن کد دمو</button>
        <button className="btn" disabled={code.length < 6} onClick={() => A.posOtpOk(code)}>تأیید کد</button>
      </div></Scroll>
    </>
  )

  if (p.step === 'amount') return (
    <>
      <Top back={() => A.posNew()} title="فروش جدید" />
      <Scroll><div className="pad">
        <div className="note ok"><span>مشتری: <b>{S.user.name}</b></span></div>
        <div className="card">
          <div className="sm mut">مبلغ فروش</div>
          <div className="big mono">{fa(ITEM.price)} <span style={{ fontSize: 13, fontWeight: 600 }} className="mut">تومان</span></div>
          <div className="sm mut">{ITEM.name}</div>
        </div>
        <button className="btn big-cta" onClick={() => A.posSend()}>ارسال لینک پرداخت</button>
      </div></Scroll>
    </>
  )

  if (p.step === 'waiting' && S.flow) {
    const c = calc(S), b = S.surf.app.view
    return (
      <>
        <Top title="در انتظار پرداخت" />
        <Scroll><div className="pad">
          <div className="center" style={{ padding: '36px 10px 20px' }}><div className="spin" /><div className="h">در انتظار پرداخت مشتری</div><div><Timer S={S} /></div></div>
          <div className="card kv"><span>وضعیت</span><span className={'tag ' + (b === 'terms' ? 'gold' : 'warn')}>{b === 'terms' ? 'مشتری شرایط را می‌بیند' : b === 'paying' ? 'در حال پرداخت' : 'مشتری در حال بررسی اعتبار'}</span></div>
          {!c.enough && b === 'summary' && <div className="note warn"><div>کسری طلای <b>همین خرید</b>: {G(c.buyG)}<div className="sm">موجودی کل مشتری برای صندوق‌دار نمایش داده نمی‌شود.</div></div></div>}
          <button className="btn line" style={{ marginTop: 6 }} onClick={() => A.cancel()}>لغو فروش</button>
        </div></Scroll>
      </>
    )
  }

  if (p.step === 'done') return (
    <Scroll><div className="center" style={{ paddingTop: 110 }}>
      <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'var(--ok-s)', color: 'var(--ok)', display: 'grid', placeItems: 'center', margin: '0 auto 14px', fontSize: 32 }}>✓</div>
      <div className="h">پرداخت موفق</div>
      <div className="mut">کالا را به مشتری تحویل بدهید.</div>
      <button className="btn" style={{ marginTop: 24 }} onClick={() => { setCode(''); setPhone(''); A.posNew() }}>فروش جدید</button>
    </div></Scroll>
  )

  return (
    <Scroll><div className="center" style={{ paddingTop: 130 }}>
      <div className="h" style={{ color: 'var(--bad)' }}>زمان رزرو تمام شد</div>
      <div className="mut">رزرو طلای مشتری آزاد شد.</div>
      <button className="btn line" style={{ marginTop: 20 }} onClick={() => { setCode(''); A.posNew() }}>شروع دوباره</button>
    </div></Scroll>
  )
}
