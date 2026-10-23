import { useEffect, useRef, useState } from 'react'
import { A } from './engine.js'
import { WgMark, BrowserBar } from './ui.jsx'
import Site from './surfaces/Site.jsx'
import Bnpl from './surfaces/Bnpl.jsx'
import { surfView, focusProps } from './surf.js'
import WallGold from './surfaces/WallGold.jsx'

const faTime = () => new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', hour12: false })

function StatusBar({ dark }) {
  const [t, setT] = useState(faTime)
  useEffect(() => { const i = setInterval(() => setT(faTime()), 20000); return () => clearInterval(i) }, [])
  return (
    <div className={'dsb ' + (dark ? 'light' : '')}>
      <span>{t}</span>
      <span className="dsb-r">
        <svg width="14" height="12" viewBox="0 0 24 20" fill="currentColor"><path d="M2 14h4v6H2zM9 9h4v11H9zM16 3h4v17h-4z" /></svg>
        <svg width="20" height="12" viewBox="0 0 28 14" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="1" y="1" width="22" height="12" rx="3" /><rect x="3.5" y="3.5" width="14" height="7" rx="1.2" fill="currentColor" stroke="none" /><path d="M25 5v4" strokeLinecap="round" /></svg>
      </span>
    </div>
  )
}

function ChromeIcon({ size = 56 }) {
  return (
    <div className="chrome-ico" style={{ width: size, height: size }}>
      <i />
    </div>
  )
}

function Launcher({ open, onSettings }) {
  const apps = [
    { id: 'chrome', label: 'Chrome', icon: <ChromeIcon /> },
    { id: 'wg', label: 'وال‌گلد', icon: <div className="wg-ico"><WgMark h={30} /></div> },
    { id: 'settings', label: 'تنظیمات دمو', icon: <div className="set-ico"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></svg></div> },
  ]
  return (
    <div className="launcher-body">
      <div className="lw-clock"><b>{faTime()}</b><span>سه‌شنبه ۲۸ مهر</span></div>
      <div className="lw-grid">
        {apps.map((a) => (
          <button key={a.id} className="lw-app" onClick={() => (a.id === 'settings' ? onSettings() : open(a.id))}>
            {a.icon}<span>{a.label}</span>
          </button>
        ))}
      </div>
      <div className="lw-search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>جستجو</div>
    </div>
  )
}

function Chrome({ S }) {
  const web = S.ch === 'online' && !!S.flow && S.flow.surf === 'web'
  return (
    <div className={'screen ' + (web ? 'bz' : 'tlapp')} data-id="site" style={{ background: web ? '#f8f8f7' : '#fcfeff' }}>
      <BrowserBar url={web ? 'pay.goldpay.ir/' + S.flow.orderId : 'techno-life.ir/checkout'} />
      {web ? <Bnpl S={surfView(S, 'web')} /> : <Site S={S} />}
    </div>
  )
}
export default function Android({ S, onSettings }) {
  const [app, setApp] = useState('home')
  const prev = useRef(S.wg.view)

  useEffect(() => { if (S.ch !== 'online') A.chan('online') }, [S.ch])

  // کروم: فلوی گلدپی داخل مرورگر اجرا می‌شود. فقط «خرید طلا» اپ وال‌گلد را باز می‌کند و بعدش به مرورگر برمی‌گردد
  useEffect(() => {
    const p = prev.current
    prev.current = S.wg.view
    if (S.wg.view === 'buy' && p !== 'buy') setApp('wg')
    else if (S.wg.from === 'web' && (p === 'buy' || p === 'bought') && S.wg.view !== 'buy' && S.wg.view !== 'bought') setApp('chrome')
  }, [S.wg.view, S.wg.from])

  const inGoldpay = S.wg.view === 'goldpay'
  const wgNative = S.wg.view === 'buy' || S.wg.view === 'bought'

  const back = () => {
    if (app === 'wg' && S.wg.view === 'goldpay') return A.services()
    if (app === 'wg' && S.wg.view === 'services') return A.wgHome()
    setApp('home')
  }

  let body
  if (app === 'chrome') body = <Chrome S={S} />
  else if (app === 'wg') body = wgNative || !inGoldpay
    ? <div className="screen wg" data-id="wg" style={{ background: '#fbfbfc' }}><WallGold S={S} /></div>
    : <div className="screen bz" data-id="bnpl" style={{ background: '#f8f8f7' }}><Bnpl S={surfView(S, 'wg', { embed: true, user: { ...S.user, logged: true } })} /></div>
  else body = <Launcher open={setApp} onSettings={onSettings} />

  return (
    <div className="droid">
      <div className={'dphone ' + (app === 'home' ? 'is-launcher' : '')}>
        <StatusBar dark={app === 'home'} />
        <div className="dbody" key={app} {...focusProps(app === 'chrome' ? 'web' : 'wg')}>{body}</div>
        <div className="dnav">
          <button aria-label="بازگشت" onClick={back}><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4v16L4 12z" /></svg></button>
          <button aria-label="خانه" onClick={() => setApp('home')}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><circle cx="12" cy="12" r="8" /></svg></button>
          <button aria-label="برنامه‌های اخیر" onClick={() => setApp('home')}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="5" y="5" width="14" height="14" rx="2.5" /></svg></button>
        </div>
      </div>
    </div>
  )
}
