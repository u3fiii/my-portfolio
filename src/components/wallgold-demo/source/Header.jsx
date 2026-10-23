import { A, SC, dstr } from './engine.js'

const FIELDS = [['mult', 'ضریب اعتبار', 1], ['cap', 'سقف هر کاربر (میلیون تومان)', 1e6], ['resMin', 'رزرو و قفل نرخ (دقیقه)', 1], ['cut', 'روز کات سررسید', 1], ['grace', 'مهلت بخشش دیرکرد (روز)', 1], ['mdr', 'کارمزد پذیرنده MDR (٪)', 1], ['cycle', 'سیکل تسویه فروشنده (روز)', 1], ['refundDays', 'مهلت مرجوعی (روز)', 1]]

export default function Header({ S, open, setOpen, bar = true }) {
  const canRefund = S.m.sales.some((x) => x.st === 'paid')
  return (
    <>
      {bar && <div className="top">
        <button className="icon-btn dark" onClick={() => setOpen(true)}>☰ تنظیمات دمو</button>
        <div className="brand">دموی خرید قسطی با توثیق طلا<small>سمت خریدار</small></div>
        <div className="sp" />
        <div className="chan-seg">
          <button className={S.ch === 'online' ? 'on' : ''} onClick={() => A.chan('online')}>خرید آنلاین</button>
          <button className={S.ch === 'instore' ? 'on' : ''} onClick={() => A.chan('instore')}>خرید حضوری</button>
        </div>
        <button className="icon-btn" onClick={() => A.reset()}>↻ ریست</button>
      </div>}
      {open && (
        <>
          <div className="scrim" onClick={() => setOpen(false)} />
          <aside className="drawer">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>تنظیمات دمو</h3><button className="icon-btn" onClick={() => setOpen(false)}>بستن ×</button>
            </div>
            <button className="icon-btn" style={{ alignSelf: 'flex-start' }} onClick={() => { A.reset(); setOpen(false) }}>↻ ریست دمو</button>
            <div className="mut sm">با تغییر سناریو یا تاریخ، دمو از اول شروع می‌شود.</div>

            <div className="dg"><label>کاربر</label>
              <div className="radio">{Object.entries(SC).map(([k, v]) => <button key={k} className={S.sc === k ? 'on' : ''} onClick={() => A.scn(k)}>{v.label}</button>)}</div></div>

            <div className="dg"><label>وضعیت کاربر در گلدپی</label>
              <div className="row2">
                <button className={'chipb ' + (!S.cfg.kyc ? 'on' : '')} onClick={() => A.kycMode(false)}>KYC شده · ورود مستقیم</button>
                <button className={'chipb ' + (S.cfg.kyc ? 'on' : '')} onClick={() => A.kycMode(true)}>نیاز به KYC</button></div></div>

            <div className="dg"><label>تاریخ خرید (قانون کات ۲۰ام)</label>
              <div className="row2">
                <button className={'chipb ' + (S.day === 19 ? 'on' : '')} onClick={() => A.dayset(19)}>۱۹ مهر · قبل از کات</button>
                <button className={'chipb ' + (S.day === 21 ? 'on' : '')} onClick={() => A.dayset(21)}>۲۱ مهر · بعد از کات</button></div></div>

            <div className="dg"><label>ماشین زمان · امروز {dstr(S.today)}</label>
              <div className="row2">
                <button className="chipb" onClick={() => A.day(1)}>+۱ روز</button>
                <button className="chipb" onClick={() => A.day(7)}>+۷ روز</button>
                <button className="chipb" onClick={() => A.nextDue()}>تا سررسید بعدی</button></div></div>

            <div className="dg"><label>بازار و رزرو</label>
              <div className="row2">
                <button className="chipb" onClick={() => A.rate(-10)}>نرخ طلا ۱۰٪ −</button>
                <button className="chipb" onClick={() => A.rate(10)}>نرخ طلا ۱۰٪ +</button>
                <button className="chipb" onClick={() => A.expireNow()}>منقضی‌کردن رزرو</button></div></div>

            <div className="dg"><label>اتفاق سمت فروشنده</label>
              <button className="chipb danger" disabled={!canRefund} style={{ opacity: canRefund ? 1 : .4 }} onClick={() => A.refundLatest()}>مرجوعی کامل آخرین سفارش (تا ۷ روز)</button></div>

            <div className="dg"><label>پیکربندی سوپرادمین (آینده‌نگر)</label>
              {FIELDS.map(([k, l, mul]) => (
                <div className="cfg" key={k}><span>{l}</span>
                  <input type="number" step="any" defaultValue={S.cfg[k] / mul} onBlur={(e) => A.cfg(k, +e.target.value * mul)} /></div>
              ))}</div>
          </aside>
        </>
      )}
    </>
  )
}
