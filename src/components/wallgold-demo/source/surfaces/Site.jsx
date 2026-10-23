import { A, T, ITEM, fa } from '../engine.js'
import { Scroll, TlLogo, ProductImg, WgMark } from '../ui.jsx'
import mellat from '../assets/Behpardakht-Mellat-Logo-PNG-Way2pay-99-05-26.png'
import saman from '../assets/saman-Bank-icon.png'

const Ico = ({ d }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
function Tabs({ on }) {
  const t = [['خانه', 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z'], ['دسته‌بندی', 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z'], ['سبد خرید', 'M3 4h3l2 12h10l2-8H7M9 20a1 1 0 1 0 0 .01M17 20a1 1 0 1 0 0 .01'], ['بلاگ', 'M4 5h16v14H4zM8 9h8M8 13h5'], ['ورود', 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0']]
  return <div className="tl-tabs">{t.map(([l, d]) => <div key={l} className={on === l ? 'on' : ''}><Ico d={d} />{l}</div>)}</div>
}

export default function Site({ S }) {
  const v = S.site.view
  const bar = (title) => (
    <div className="tl-bar">
      {title ? <><div style={{ fontWeight: 800, flex: 1 }}>{title}</div></> : <div className="tl-search"><Ico d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3" />محصول، برند یا دسته مورد نظرتان را جستجو کنید</div>}
      <TlLogo />
    </div>
  )
  if (v === 'cart') {
    const orig = Math.round(ITEM.price / .92 / 1e5) * 1e5
    const bnpl = S.site.method === 'bnpl'
    return (
      <>
        <div className="tl-bar tl-bar2">
          <b className="tl-ttl">تکمیل خرید</b>
          <TlLogo />
        </div>
        <Scroll><div className="tl-pg">
          <div className="tl-steps">
            {['سبد خرید', 'ارسال', 'پرداخت'].map((x, n) => <span key={x} className={n < 2 ? 'done' : 'on'}><i>{n < 2 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg> : fa(3)}</i>{x}</span>)}
          </div>

          <div className="tl-card tl-prod">
            <div className="tl-img"><ProductImg w={92} /></div>
            <div className="tl-pi">
              <small>ارسال توسط تکنولایف · فردا</small>
              <b>{ITEM.name}</b>
              <span className="tl-spec">۳۲ گیگابایت رم · ۱ ترابایت SSD</span>
              <div className="tl-price"><span className="tl-badge">۸٪</span><s>{fa(orig)}</s></div>
              <b className="tl-now">{T(ITEM.price)}</b>
            </div>
          </div>

          <div className="tl-h">روش پرداخت</div>
          <button className={'tl-opt' + (!bnpl ? ' on' : '')} onClick={() => A.method('bank')}>
            <span className="rad" />
            <div className="tl-ot"><b>پرداخت اینترنتی</b><small>همهٔ کارت‌های عضو شتاب</small></div>
            <span className="tl-banks"><img src={mellat} alt="" /><img src={saman} alt="" /></span>
          </button>
          <button className={'tl-opt' + (bnpl ? ' on' : '')} onClick={() => A.method('bnpl')}>
            <span className="rad" />
            <div className="tl-ot"><b>خرید اقساطی با گلدپی</b><small>۴ قسط بدون سود، با پشتوانهٔ طلای وال‌گلد</small></div>
            <span className="tl-chip tl-brand"><WgMark h={24} /></span>
          </button>
          {S.site.msg && <div className="note warn">{S.site.msg}</div>}

          <div className="tl-h">خلاصهٔ سفارش</div>
          <div className="tl-card tl-sum">
            <div><span>قیمت کالا</span><span>{T(orig)}</span></div>
            <div><span>تخفیف</span><span className="red">−{T(orig - ITEM.price)}</span></div>
            <div><span>هزینهٔ ارسال</span><span className="grn">رایگان</span></div>
            <div className="tot"><span>مبلغ قابل پرداخت</span><b>{T(ITEM.price)}</b></div>
          </div>
        </div></Scroll>
        <div className="tl-dock tl-dock2">
          <div><small>مبلغ قابل پرداخت</small><b>{T(ITEM.price)}</b></div>
          <button className="tl-cta" onClick={() => A.startOnline()}>{bnpl ? 'ادامه با گلدپی' : 'پرداخت'}</button>
        </div>
      </>
    )
  }
  if (v === 'waiting') return (
    <>
      {bar('در انتظار پرداخت')}
      <Scroll><div className="center"><div className="spin" /><b>در حال انتقال به Goldpay…</b>
        <div className="mut sm" style={{ marginTop: 6 }}>پس از پایان، نتیجه با ریدایرکت و تماس سروری به تکنولایف می‌رسد.</div></div></Scroll>
    </>
  )
  return (
    <>
      {bar()}
      <Scroll><div className="center" style={{ paddingTop: 40 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#e3f6ec', color: 'var(--ok)', display: 'grid', placeItems: 'center', margin: '0 auto 14px', fontSize: 30 }}>✓</div>
        <div className="h">سفارش شما ثبت شد</div>
        <div className="mut">پرداخت قسطی با Goldpay تأیید شد. اقساط بعدی را در Goldpay ببینید.</div>
        <div className="tl-sec" style={{ margin: '18px 0', textAlign: 'right' }}>
          <div className="kv"><span>کالا</span><b>{ITEM.name}</b></div>
          <div className="kv"><span>روش پرداخت</span><span>اقساطی · Goldpay</span></div>
          <div className="kv"><span>مبلغ سفارش</span><b>{T(ITEM.price)}</b></div>
        </div>
        <button className="tl-cta" style={{ width: '100%' }} onClick={() => A.retry()}>سفارش جدید</button>
      </div></Scroll>
      <Tabs on="خانه" />
    </>
  )
}
