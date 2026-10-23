// موتور دمو: state و قوانین PRD، مستقل از UI
let version=0;const listeners=new Set();
function emit(){version++;listeners.forEach(l=>l())}
export const subscribe=l=>{listeners.add(l);return()=>listeners.delete(l)};
export const getVersion=()=>version;
export const getState=()=>S;
/* ============ helpers ============ */
export const fa=n=>Math.round(n).toLocaleString('fa-IR');
export const T=n=>fa(n)+' تومان';
export const G=g=>(Math.round(g*1000)/1000).toLocaleString('fa-IR',{maximumFractionDigits:3})+' گرم';
export const MONTHS=['','فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
const mlen=m=>m<=6?31:m<=11?30:29;
export const dstr=d=>`${fa(d.d)} ${MONTHS[d.m]}`;
export const idx=d=>{let s=d.d;for(let i=1;i<d.m;i++)s+=mlen(i);return d.y*366+s};
const addDays=(d,n)=>{let{y,m,d:dd}=d;dd+=n;while(dd>mlen(m)){dd-=mlen(m);m++;if(m>12){m=1;y++}}return{y,m,d:dd}};
const monthDate=(d,k)=>{let m=d.m+k,y=d.y;while(m>12){m-=12;y++}return{y,m,d:1}};
const clock=()=>new Date().toLocaleTimeString('fa-IR',{hour:'2-digit',minute:'2-digit'});

export const ACT={
  user:['کاربر','#475569'],site:['سایت تکنولایف','#0b7ea6'],bnpl:['پلتفرم BNPL','#2f4390'],
  core:['موتور اعتبار (سرور)','#7c3aed'],wg:['اپ اصلی وال‌گلد','#b8860b'],panel:['پنل فروشنده','#2f3a4a'],admin:['سوپرادمین','#be185d']
};
export const SC={
  new:{label:'کاربر جدید · ۶ گرم',gold:6,line:false,logged:false},
  existing:{label:'دارای خط اعتبار · ۶ گرم',gold:6,line:true,logged:true},
  short:{label:'کمبود طلا · ۳ گرم',gold:3,line:true,logged:true},
  none:{label:'بدون طلا · ۰ گرم',gold:0,line:true,logged:true}
};
export const ITEM={name:'لپ‌تاپ ایسوس ROG Zephyrus G14',price:180e6};
export const OTP='584210';
let S;
const newB=()=>({view:'home',tab:'home',payErr:'',planId:null,agree:false,notif:null,newLine:false,login:{step:'phone',err:''}});
export const focus=id=>{S.cur=id;S.b=S.surf[id]};
const flowHere=()=>S.flow&&S.flow.surf===S.cur?S.flow:null;

/* ============ state ============ */
function init(keep={}){
  const sc=keep.sc||'new',ch=keep.ch||'online',day=keep.day||21;
  const cfg=keep.cfg||{mult:1.5,cap:300e6,resMin:10,cut:20,mdr:3,grace:5,cycle:30,refundDays:7,kyc:true};
  const s0=SC[sc],inst=ch==='instore';
  S={sc,ch,day,cfg,rate:26269000,rate0:26269000,today:{y:1405,m:7,d:day},
    user:{registered:!cfg.kyc,name:'سارا محمدی',phone:'۰۹۱۲ ۱۲۳ ۴۵۶۷',gold:s0.gold,pool:0,credit:0,reserved:0,line:inst?true:s0.line,logged:inst?true:s0.logged,limit:0,cash:300e6,plans:[],notes:[]},
    web:{logged:false},
    site:{view:'cart',method:'bnpl',msg:''},
    surf:{app:newB(),web:newB(),wg:newB()},cur:'app',
    wg:{view:'home',buyG:0,moves:[],err:'',onboarded:false},
    m:{tab:inst?'pos':'sales',saleTab:ch,settle:'gold',sales:[],ledger:[],pending:[],refund:null,pos:{step:'home'}},
    flow:null,log:[],seq:1001,hl:[]};
  S.b=S.surf.app;
  if(S.user.line)refreshLimit();
  addLog('admin','core','پیکربندی فعال: ضریب '+cfg.mult.toLocaleString('fa-IR')+'، سقف '+T(cfg.cap)+'، کات سررسید ۲۰ام');
}
const totalGold=()=>S.user.gold+S.user.pool+S.user.reserved+openPlans().reduce((a,p)=>a+p.goldG,0);
const openPlans=(state=S)=>state.user.plans.filter(p=>p.status==='open');
const refreshLimit=()=>{S.user.limit=Math.min(S.cfg.mult*totalGold()*S.rate,S.cfg.cap,S.user.credit||Infinity)};
const collat=()=>S.user.gold+S.user.pool;
const giveBack=g=>{if(S.user.credit)S.user.pool+=g;else S.user.gold+=g};
function calc(state=S){
  const price=state.flow.price,c=state.cfg;
  const used=openPlans(state).reduce((a,p)=>a+p.financed,0);
  const remaining=Math.max(0,state.user.limit-used);
  const availableGold=state.user.gold+state.user.pool;
  const usable=Math.min(remaining,availableGold*state.rate*c.mult);
  const needFull=price/c.mult/state.rate;
  return{used,remaining,usable,needFull,enough:usable>=price-1,buyG:Math.max(0,needFull-availableGold)};
}
function addLog(from,to,text){S.log.unshift({from,to,text,t:clock()});S.hl=[from,to];if(S.log.length>80)S.log.pop()}
const note=t=>S.user.notes.unshift({t,time:clock()});

function schedule(date,F,state=S){
  const q=F/4,add=date.d<state.cfg.cut?1:2;
  return[{n:1,amt:q,due:{...date},paid:true},...[0,1,2].map(i=>({n:i+2,amt:q,due:monthDate(date,add+i),paid:false}))];
}
function late(i,state=S){
  if(i.paid||i.liq)return{days:0,fee:0};
  const days=idx(state.today)-idx(i.due);
  if(days<=0)return{days:0,fee:0};
  return{days,fee:Math.max(0,days-state.cfg.grace)*(0.9/365)*i.amt};
}
function dueItems(state=S){
  const unpaid=openPlans(state).flatMap(p=>p.inst.filter(i=>!i.paid&&!i.liq).map(i=>({p,i})));
  if(!unpaid.length)return{items:[],date:null,fees:0,total:0,overdue:false};
  const min=Math.min(...unpaid.map(x=>idx(x.i.due)));
  const items=unpaid.filter(x=>idx(x.i.due)===min||late(x.i,state).days>0).map(x=>({...x,fee:late(x.i,state).fee,days:late(x.i,state).days,total:x.i.amt+late(x.i,state).fee}));
  return{items,date:unpaid.find(x=>idx(x.i.due)===min).i.due,fees:items.reduce((a,x)=>a+x.fee,0),total:items.reduce((a,x)=>a+x.total,0),overdue:items.some(x=>x.days>0)};
}
const planDebt=(p,state=S)=>p.inst.filter(i=>!i.paid&&!i.liq).reduce((a,i)=>a+i.amt+late(i,state).fee,0);

/* ============ flow actions ============ */
const A={
  focus(id){focus(id)},
  scn(v){init({sc:v,ch:S.ch,day:S.day,cfg:S.cfg});emit()},
  chan(v){init({sc:S.sc,ch:v,day:S.day,cfg:S.cfg});emit()},
  dayset(v){init({sc:S.sc,ch:S.ch,day:+v,cfg:S.cfg});emit()},
  reset(){init({sc:S.sc,ch:S.ch,day:S.day,cfg:S.cfg});emit()},

  method(v){S.site.method=v;emit()},
  startOnline(){
    focus('web');
    if(S.site.method!=='bnpl'){S.site.msg='در این دمو فقط مسیر «پرداخت قسطی وال‌گلد» فعال است.';return emit()}
    newFlow('online');
    S.site.view='waiting';S.site.msg='';
    S.m.pending.push({id:S.flow.orderId,price:S.flow.price,ch:'online',st:'wait'});
    addLog('site','bnpl','ریدایرکت کاربر به دامنه‌ی BNPL با شناسه‌ی سفارش '+S.flow.orderId+' و مبلغ '+T(S.flow.price));
    addLog('site','panel','سفارش در پنل فروشنده ثبت شد: در انتظار پرداخت');
    S.b.login={step:'phone',err:''};S.b.view='redirect';emit();
    setTimeout(()=>{focus('web');if(S.b.view==='redirect'){if(S.web.logged)enterSummary();else S.b.view='login';emit()}},900);
  },
  startLogin(){S.b.login={step:'phone',err:''};S.b.view='login';emit()},
  sendOtp(raw){
    const d=String(raw).replace(/[۰-۹]/g,c=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(c)).replace(/\D/g,'');
    if(d.length<11){S.b.login.err='شماره‌ی موبایل معتبر نیست';return emit()}
    S.user.phone=d.replace(/^(\d{4})(\d{3})(\d{4})$/,'$1 $2 $3').replace(/\d/g,c=>'۰۱۲۳۴۵۶۷۸۹'[c]);
    S.b.login={step:'otp',err:'',sentAt:Date.now()};
    S.b.sms=true;S.b.notif='پیامک · کد تأیید Goldpay: '+fa(OTP).replace(/٬/g,'');
    addLog('bnpl','core','درخواست OTP برای '+S.user.phone);addLog('core','user','ارسال پیامک کد تأیید');emit()
  },
  resendOtp(){S.b.login.sentAt=Date.now();S.b.login.err='';S.b.sms=true;S.b.sms=true;S.b.notif='پیامک · کد تأیید Goldpay: '+fa(OTP).replace(/٬/g,'');addLog('core','user','ارسال مجدد پیامک');emit()},
  fillOtp(){if(S.b.login.step==='otp'){S.b.login.fill=OTP;S.b.login.err='';S.b.notif=null;S.b.sms=false;emit()}},
  editPhone(){S.b.login={step:'phone',err:''};S.b.notif=null;emit()},
  verifyOtp(raw){
    S.b.sms=false;
    const d=String(raw).replace(/[۰-۹]/g,c=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(c)).replace(/\D/g,'');
    if(d!==OTP){S.b.login.err='کد واردشده درست نیست';return emit()}
    S.b.notif=null;
    // شمارهٔ جدید: قبل از ورود باید ثبت‌نام کامل شود
    if(!S.user.registered){S.b.view='kycform';S.b.su={err:''};addLog('core','bnpl','کاربر وال‌گلد نیست یا KYC نکرده؛ هدایت به احراز هویت');return emit()}
    afterLogin(false);emit()
  },
  kycSubmit(f){
    const dg=v=>String(v||'').replace(/[۰-۹]/g,c=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(c)).replace(/\D/g,'');
    const nid=dg(f.nid),birth=dg(f.birth);
    const err=nid.length!==10?'کد ملی باید ۱۰ رقم باشد.':birth.length!==8?'تاریخ تولد را کامل وارد کنید؛ مثل ۱۳۷۰/۰۱/۰۱':'';
    if(err){S.b.su={err,f};return emit()}
    S.b.su={err:'',f};S.b.view='kycload';
    addLog('user','bnpl','ارسال کد ملی و تاریخ تولد برای احراز هویت');addLog('bnpl','core','استعلام هویت');emit();
    const cur=S.cur;setTimeout(()=>{
      focus(cur);if(S.b.view!=='kycload')return;
      if(/^(\d)\1{9}$/.test(nid)){S.b.su={err:'کد ملی معتبر نیست؛ اطلاعات را بررسی کنید.',f};S.b.view='kycform';addLog('core','bnpl','استعلام ناموفق: کد ملی معتبر نیست')}
      else{S.user.registered=true;addLog('core','bnpl','هویت تأیید شد (KYC انجام شد)');afterLogin(true)}
      emit()
    },1800)
  },
  kycMode(v){S.cfg.kyc=!!v;init({sc:S.sc,ch:S.ch,day:S.day,cfg:S.cfg});emit()},
  login(){S.user.logged=true;addLog('user','bnpl','ورود با موبایل + OTP');enterSummary();emit()},
  full(){S.flow.opt='full';reserve();emit()},
  split(){S.flow.opt='split';reserve();emit()},
  buy(){
    S.wg.from=S.cur;
    const c=calc();S.wg.view='buy';S.wg.buyG=c.buyG;
    addLog('bnpl','wg','دیپ‌لینک به اپ وال‌گلد برای خرید '+G(c.buyG)+' طلا (context سفارش حفظ می‌شود)');emit()
  },
  doBuy(){
    const cost=S.wg.buyG*S.rate;
    if(S.user.cash<cost){S.wg.err='موجودی نقد کافی نیست؛ ابتدا واریز تومان کنید.';return emit()}
    S.wg.err='';S.user.cash-=cost;
    S.user.gold+=S.wg.buyG;S.wg.moves.unshift('خرید '+G(S.wg.buyG)+' طلا · '+T(cost));refreshLimit();S.wg.view='bought';
    addLog('user','wg','خرید '+G(S.wg.buyG)+' طلا به نرخ '+T(S.rate));
    addLog('wg','core','موجودی منبع واحد طلا به‌روز شد؛ میرور در BNPL هم‌زمان تغییر کرد');emit()
  },
  goldpay(){
    focus('wg');S.wg.view='goldpay';
    // کاربری که قبلاً در گلدپی ثبت‌نام/رضایت داده مستقیم به هوم‌پیج می‌رود؛ وگرنه اول آنبوردینگ و بعد رضایت
    if(!S.user.line&&!S.wg.onboarded){S.b.introMode='onboard';S.b.faqFrom='home';S.b.view='intro'}
    else{S.b.view='home';S.b.tab='home'}
    emit()
  },
  goldpayCredit(){A.goldpay()},
  exitGoldpay(){focus('wg');S.wg.view='home';S.b.notif=null;S.b.sms=false;emit()},
  wgHome(){S.wg.view='home';emit()},
  wgTrade(){S.wg.view='trade';emit()},
  services(){S.wg.view='services';emit()},
  creditSet(v){const m=creditMax();S.b.credit.amount=Math.max(Math.min(Math.round(v/STEP)*STEP,m.mine),m.min);S.b.credit.err='';emit()},
  creditBuy(){
    S.wg.from=S.cur;
    const m=creditMax(),g=Math.max(0,gramsFor(m.cap)-S.user.gold);
    S.wg.view='buy';S.wg.buyG=g;
    addLog('bnpl','wg','دیپ‌لینک به اپ وال‌گلد برای خرید '+G(g)+' طلا جهت افزایش سقف اعتبار');emit()
  },
  creditSubmit(){
    const amt=S.b.credit.amount;S.b.view='inquiry';
    addLog('bnpl','core','درخواست اعتبار '+T(amt));addLog('core','wg','استعلام موجودی طلای آزاد');emit();
    const cur=S.cur;setTimeout(()=>{
      focus(cur);if(S.b.view!=='inquiry')return;
      const need=gramsFor(amt);
      if(S.user.gold+1e-9>=need){addLog('wg','core','طلای آزاد کافی است: '+G(S.user.gold)+' ≥ '+G(need));S.b.view='creditOk'}
      else{S.b.credit.err='طلای آزاد برای این مبلغ کافی نیست؛ مبلغ را کمتر کنید یا طلا بخرید.';S.b.view='credit';creditStart(true);S.b.credit.err='طلای آزاد برای این مبلغ کافی نیست.'}
      emit()
    },1500);
  },
  creditConfirm(){
    const amt=S.b.credit.amount,need=gramsFor(amt);
    S.user.gold-=need;S.user.pool+=need;S.user.credit=(S.user.credit||0)+amt;S.user.line=true;S.user.rateLock=S.rate;
    refreshLimit();
    addLog('user','bnpl','تأیید دریافت اعتبار '+T(amt));
    addLog('bnpl','wg','قفل '+G(need)+' طلا برای خط اعتبار (نرخ '+T(S.rate)+')');
    addLog('core','bnpl','خط اعتبار '+T(amt)+' فعال شد');
    S.wg.moves.unshift('قفل '+G(need)+' طلا برای اعتبار گلدپی');
    S.b.view='creditDone';emit()
  },
  creditContinue(){if(flowHere())enterSummary();else{S.b.view='home';S.b.tab='home'}emit()},
  creditOpen(){creditStart();emit()},
  creditEdit(){creditStart(true);emit()},
  faq(){S.b.faqFrom=S.b.view;S.b.view='faq';emit()},
  intro(){S.b.introMode='info';S.b.faqFrom=S.b.view;S.b.view='intro';emit()},
  introNext(){if(S.b.introMode==='onboard'){S.b.view='kycconfirm';S.b.kc={agreed:false};emit()}else A.faqBack()},
  introClose(){if(S.b.introMode==='onboard'){S.wg.view='services';S.b.view='home';emit()}else A.faqBack()},
  kycAgree(v){S.b.kc.agreed=!!v;emit()},
  kycConfirm(){if(!S.b.kc.agreed)return;S.wg.onboarded=true;S.b.introMode=null;enterHome();addLog('user','bnpl','رضایت‌نامهٔ گلدپی از داخل وال‌گلد (KYC قبلاً انجام شده)');emit()},
  exitKycConfirm(){focus('wg');S.wg.view='services';emit()},
  faqBack(){S.b.view=S.b.faqFrom||'home';emit()},
  backBuy(){
    const from=S.wg.from||'wg';focus(from);S.wg.view=from==='wg'?'goldpay':'home';
    if(S.b.view==='credit')creditStart(true);else if(flowHere())S.b.view='summary';
    emit()
  },
  agree(v){S.b.agree=!!v;emit()},
  pay(){
    if(!S.b.agree)return;
    const need=S.flow.financed/4+S.flow.cash;
    if(S.user.cash<need){S.b.payErr='موجودی نقد وال‌گلد برای این پرداخت کافی نیست.';return emit()}
    S.b.payErr='';S.b.view='paying';emit();
    const cur=S.cur;setTimeout(()=>{focus(cur);if(S.b.view==='paying')complete()},1200);
  },
  backMerchant(){S.site.view='success';S.b.view='home';addLog('bnpl','site','بازگشت کاربر به سایت (ریدایرکت)؛ سایت وضعیت را از callback سروری تأیید می‌کند');S.flow=null;emit()},
  cancel(){
    if(!flowHere()){S.b.view='home';S.b.notif=null;S.b.sms=false;S.b.login={step:'phone',err:''};if(S.cur==='wg'&&S.wg.view==='goldpay'&&!S.user.line&&!S.wg.onboarded)S.wg.view='services';return emit()}
    cancelFlow('کاربر از پرداخت انصراف داد');emit()
  },
  retry(){S.site.view='cart';S.b.view='home';S.flow=null;S.m.pos={step:'home'};emit()},
  plan(v){S.b.view='plan';S.b.planId=v;emit()},
  home(){S.b.view='home';emit()},
  payInst(v){payInst(v);emit()},
  payDue(){const d=dueItems();d.items.forEach(x=>payInst(x.p.id));S.b.view='home';emit()},
  logout(){S.user.logged=false;S.b.view='home';S.b.tab='home';S.b.login={step:'phone',err:''};S.b.notif=null;S.b.newLine=false;addLog('user','bnpl','خروج از حساب');emit()},
  tab(v){if(v==='notes')S.b.seen=S.user.notes.length;S.b.tab=v;S.b.view='home';emit()},
  due(){S.b.view='due';emit()},
  dismissLine(){S.b.newLine=false;emit()},
  dismiss(){S.b.notif=null;emit()},

  /* time machine */
  day(v){advance(+v);emit()},
  nextDue(){
    const dues=openPlans().flatMap(p=>p.inst.filter(i=>!i.paid&&!i.liq).map(i=>idx(i.due)));
    if(!dues.length)return;const n=Math.min(...dues)-idx(S.today);advance(n>0?n:1);emit()
  },
  rate(v){S.rate=Math.round(S.rate*(1+ +v/100)/1e4)*1e4;addLog('core','wg','نرخ طلا: '+T(S.rate)+' / گرم');emit()},
  expireNow(){if(S.flow&&S.flow.resEnd){S.flow.resEnd=Date.now()-1;tickTimer()}},

  /* merchant panel */
  mtab(v){S.m.tab=v;emit()},
  saleTab(v){S.m.saleTab=v;emit()},
  settle(v){S.m.settle=v;addLog('panel','core','تنظیم تسویه: '+(v==='gold'?'طلا':'تومان')+' (فقط برای واریزهای جدید)');emit()},
  refund(v){S.m.refund={id:v,step:1};emit()},
  refund2(){S.m.refund.step=2;emit()},
  refundNo(){S.m.refund=null;emit()},
  refundGo(){doRefund(S.m.refund.id);S.m.refund=null;emit()},
  posStart(){S.m.pos={step:'phone',err:''};emit()},
  posOtpSend(raw){
    focus('app');
    const d=String(raw).replace(/[۰-۹]/g,c=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(c)).replace(/\D/g,'');
    if(!/^09\d{9}$/.test(d)){S.m.pos.err='شماره‌ی موبایل معتبر نیست؛ مثل ۰۹۱۲۱۲۳۴۵۶۷';return emit()}
    S.user.phone=d.replace(/(\d{4})(\d{3})(\d{4})/,'$1 $2 $3').replace(/\d/g,c=>'۰۱۲۳۴۵۶۷۸۹'[c]);
    S.m.pos={step:'otp',err:''};S.b.sms=false;S.b.view='home';S.b.tab='home';
    S.b.notif='کد تأیید خرید حضوری در تکنولایف: '+fa(OTP).replace(/٬/g,'')+' · فقط به صندوق‌دار بگویید.';
    addLog('panel','core','درخواست OTP خرید حضوری برای '+S.user.phone);addLog('core','user','ارسال OTP اختصاصی خرید حضوری (فقط برای بررسی اعتبار؛ پرداخت را تأیید نمی‌کند)');emit()
  },
  posOtpOk(v=''){
    const d=String(v).replace(/[۰-۹]/g,c=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(c)).replace(/\D/g,'');
    if(d!==OTP){S.m.pos.err='کد واردشده درست نیست';return emit()}
    S.m.pos.step='amount';S.m.pos.err='';S.b.notif=null;addLog('panel','core','OTP تأیید شد → نام مشتری برای صندوق‌دار نمایش داده می‌شود');emit()
  },
  posSend(){
    focus('app');
    newFlow('instore');S.flow.resEnd=Date.now()+S.cfg.resMin*60000;
    S.m.pos.step='waiting';S.b.view='summary';
    addLog('panel','core','ایجاد درخواست پرداخت '+T(S.flow.price)+'؛ تایمر رزرو '+fa(S.cfg.resMin)+' دقیقه‌ای شروع شد');
    addLog('core','bnpl','دیپ‌لینک/پیامک: همان صفحه‌ی خرید آنلاین روی گوشی کاربر باز می‌شود');
    const c=calc();if(!c.enough)addLog('core','panel','به پنل فقط «کسری همین خرید» اعلام شد: '+G(c.buyG));
    emit()
  },
  cfg(k,v){S.cfg[k]=v;addLog('admin','core','تغییر آینده‌نگر پارامتر «'+k+'» → '+v);emit()},
  refundLatest(){const s=S.m.sales.find(x=>x.st==='paid'&&idx(S.today)-idx(x.date)<=S.cfg.refundDays);if(s){doRefund(s.id);emit()}},
  posNew(){S.m.pos={step:'home'};S.flow=null;S.b.view='home';emit()}
};
function newFlow(ch){
  S.flow={orderId:'TL-'+fa(S.seq++).replace(/٬/g,''),price:ITEM.price,ch,surf:S.cur,opt:null,resEnd:null,financed:0,cash:0,goldNeed:0};
}
function afterLogin(isNew){
  const web=S.cur==='web';
  if(web)S.web.logged=true;else if(S.cur==='app')S.user.logged=true;
  addLog('user','bnpl',(isNew?'ثبت‌نام و ورود':'ورود')+(web?' در مرورگر':' در اپ')+' با موبایل + OTP');
  if(flowHere())enterSummary();else enterHome();
}
function enterHome(){
  S.b.view='home';S.b.tab='home';
}
function enterSummary(){
  if(!S.user.line)return creditStart();
  S.b.newLine=false;
  S.b.view='summary';S.b.agree=false;
  const c=calc();
  addLog('bnpl','core','استعلام اعتبار برای '+T(S.flow.price));
  addLog('core','bnpl',c.enough?'اعتبار و طلای آزاد کافی است':'کمبود: اعتبارِ قابل‌استفاده '+T(c.usable)+' < مبلغ خرید');
  if(c.enough&&S.ch==='online'){S.flow.opt='full';reserve()}
}
/* ---- دریافت اعتبار (اسلایدر) ---- */
const STEP=5e6,MINC=10e6;
export const creditMax=(state=S)=>{
  const cap=Math.max(0,state.cfg.cap-(state.user.credit||0)),mine=Math.min(cap,Math.floor(state.cfg.mult*state.user.gold*state.rate/STEP)*STEP);
  return{cap,mine,step:STEP,min:Math.min(MINC,mine)};
};
export const canCredit=(state=S)=>(!state.user.line||state.user.credit>0)&&creditMax(state).mine>0;
export const gramsFor=(amt,state=S)=>amt/(state.cfg.mult*state.rate);
function creditStart(keep){
  const m=creditMax();
  const fl=flowHere();const want=keep&&S.b.credit?S.b.credit.amount:(fl?Math.ceil(fl.price/STEP)*STEP:m.mine);
  S.b.credit={amount:Math.max(Math.min(want,m.mine),m.min),err:''};
  S.b.view='credit';S.b.tab='home';
  addLog('bnpl','core','شروع دریافت اعتبار؛ سقف گلدپی '+T(m.cap)+'، سقف شما '+T(m.mine));
}
function reserve(){
  const f=S.flow,c=calc(),cfg=S.cfg;
  f.financed=f.opt==='split'?c.usable:f.price;f.cash=f.price-f.financed;
  f.goldNeed=f.financed/cfg.mult/S.rate;f.rate=S.rate;
  const fp=Math.min(S.user.pool,f.goldNeed);S.user.pool-=fp;S.user.gold-=f.goldNeed-fp;S.user.reserved+=f.goldNeed;
  if(!f.resEnd)f.resEnd=Date.now()+cfg.resMin*60000;
  S.b.view='terms';S.b.agree=false;
  addLog('bnpl','core','تأیید کاربر ('+(f.opt==='split'?'split':'کامل')+')');
  addLog('core','wg','رزرو (earmark) '+G(f.goldNeed)+' روی منبع واحد طلا؛ نرخ قفل شد: '+T(f.rate)+' · تا '+fa(cfg.resMin)+' دقیقه');
}
function releaseReserve(){
  if(S.user.reserved>0){giveBack(S.user.reserved);S.user.reserved=0}
}
function cancelFlow(why){
  releaseReserve();
  const o=S.m.pending.find(p=>S.flow&&p.id===S.flow.orderId);if(o)o.st='cancel';
  addLog('bnpl','core',why+' → رزرو آزاد شد');
  if(S.ch==='online'){S.site.view='cart';S.site.msg='پرداخت انجام نشد.'}else S.m.pos={step:'home'};
  S.b.view='home';S.flow=null;S.wg.view='home';
}
function complete(){
  const f=S.flow,first=f.financed/4,pay=first+f.cash;
  S.user.cash-=pay;S.wg.moves.unshift('پرداخت خرید تکنولایف · '+T(pay));
  const plan={id:'P'+f.orderId,orderId:f.orderId,merchant:'تکنولایف',item:ITEM.name,price:f.price,financed:f.financed,cash:f.cash,goldG:f.goldNeed,
    date:{...S.today},ch:f.ch,status:'open',inst:schedule(S.today,f.financed)};
  S.user.plans.unshift(plan);S.user.reserved-=f.goldNeed;if(S.user.reserved<1e-9)S.user.reserved=0;
  addLog('user','core','پرداخت '+T(pay)+(f.cash?' (قسط اول '+T(first)+' + مابه‌التفاوت نقدی '+T(f.cash)+')':' (قسط اول)'));
  addLog('core','wg','رزرو → وثیقه‌ی نهایی: '+G(f.goldNeed)+' قفل شد (همزمان با پرداخت قسط اول)');
  const fee=f.price*S.cfg.mdr/100,net=f.price-fee,unlock=addDays(S.today,S.cfg.cycle);
  S.m.ledger.unshift({orderId:f.orderId,gross:f.price,fee,net,mode:S.m.settle,rate:S.rate,grams:S.m.settle==='gold'?net/S.rate:null,date:{...S.today},unlock,state:'locked'});
  S.m.sales.unshift({id:f.orderId,ch:f.ch,phone:S.user.phone,price:f.price,date:{...S.today},st:'paid',tag:'مستقیم'});
  const o=S.m.pending.find(p=>p.id===f.orderId);if(o)o.st='paid';
  addLog('core','panel','callback سروری: سفارش '+f.orderId+' پرداخت شد'+(f.ch==='instore'?' → پنل صندوق خودکار «پرداخت موفق» می‌شود':''));
  addLog('core','panel','واریز '+T(net)+' (منهای MDR '+fa(S.cfg.mdr)+'٪) به کیف فروشنده، '+(S.m.settle==='gold'?'تبدیل به '+G(net/S.rate)+' طلا':'به تومان')+'، قفل تا '+dstr(unlock));
  refreshLimit();
  S.b.view='done';S.b.planId=plan.id;
  if(f.ch==='instore')S.m.pos.step='done';
  emit();
}
function payInst(pid){
  const p=S.user.plans.find(x=>x.id===pid);if(!p||p.status!=='open')return;
  const i=p.inst.find(x=>!x.paid);const l=late(i);
  if(S.user.cash<i.amt+l.fee){S.b.notif='موجودی نقد کافی نیست؛ در وال‌گلد واریز تومان کنید.';return}
  S.user.cash-=i.amt+l.fee;S.wg.moves.unshift('پرداخت قسط '+fa(i.n)+' · '+T(i.amt+l.fee));
  i.paid=true;i.fee=l.fee;i.paidOn={...S.today};
  addLog('user','core','پرداخت قسط '+fa(i.n)+' ('+T(i.amt+l.fee)+')');
  if(p.inst.every(x=>x.paid)){
    p.status='closed';S.user.gold+=p.goldG;S.wg.moves.unshift('آزادسازی '+G(p.goldG)+' طلای وثیقه به بالانس وال‌گلد');refreshLimit();
    note('طرح «'+p.item+'» تسویه شد؛ '+G(p.goldG)+' طلا آزاد شد.');
    addLog('core','wg','تسویه‌ی کامل → آزادسازی '+G(p.goldG)+' وثیقه و بازگشت ظرفیت اعتبار');
  }
}
function liquidate(p){
  const debt=planDebt(p),need=debt/S.rate;let ded,back=0,short=0;
  if(need<=p.goldG){ded=need;back=p.goldG-need}else{ded=p.goldG;short=(need-p.goldG)*S.rate}
  S.user.gold+=back;p.status='liquidated';
  p.inst.forEach(i=>{if(!i.paid)i.liq=true});
  p.liq={debt,ded,back,short,date:{...S.today},rate:S.rate};
  refreshLimit();
  note('طرح «'+p.item+'» لیکویید شد: بدهی '+T(debt)+' از '+G(ded)+' طلای وثیقه کسر شد.'+(back?' '+G(back)+' به شما برگشت.':'')+(short?' کسری '+T(short)+' باقی ماند.':''));
  S.surf.app.notif='اعلان: طرح لیکویید شد — '+G(ded)+' طلا کسر شد';
  addLog('core','wg','لیکوید کل طرح '+p.orderId+': بدهی '+T(debt)+' ≈ '+G(need)+' · کسر '+G(ded)+(short?' · کسری '+T(short):' · بازگشت '+G(back)));
}
function advance(n){
  for(let k=0;k<n;k++){
    S.today=addDays(S.today,1);
    openPlans().forEach(p=>{
      p.inst.forEach(i=>{if(!i.paid&&!i.noted&&idx(i.due)<=idx(S.today)){i.noted=true;note('قسط '+fa(i.n)+' طرح «'+p.item+'» سررسید شد.');addLog('core','bnpl','یادآوری سررسید قسط '+fa(i.n)+' · '+dstr(i.due))}});
      if(!p.inst[1].paid&&idx(S.today)>idx(p.inst[2].due))liquidate(p);
    });
    S.m.ledger.forEach(e=>{if(e.state==='locked'&&idx(S.today)>=idx(e.unlock)){e.state='free';addLog('core','panel','پایان سیکل تسویه: '+T(e.net)+' آزاد شد')}});
  }
}
function doRefund(id){
  const s=S.m.sales.find(x=>x.id===id),p=S.user.plans.find(x=>x.orderId===id),e=S.m.ledger.find(x=>x.orderId===id);
  const paid=p.inst.filter(i=>i.paid).reduce((a,i)=>a+i.amt+(i.fee||0),0)+p.cash;
  s.st='refunded';e.state='refunded';p.status='returned';
  S.user.cash+=paid;S.wg.moves.unshift('بازگشت وجه مرجوعی · '+T(paid));S.user.gold+=p.goldG;refreshLimit();
  note('مرجوعی «'+p.item+'»: '+T(paid)+' به کیف پول شما برگشت و '+G(p.goldG)+' طلا آزاد شد.');
  S.surf.app.notif='اعلان: مرجوعی ثبت شد، وثیقه آزاد شد';
  addLog('panel','core','مرجوعی کامل (تأیید دومرحله‌ای مودال)، بدون OTP');
  addLog('core','panel','اعتبار لاک‌شده از کیف فروشنده برگشت؛ MDR به فروشنده برگشت (سر صفر)');
  addLog('core','bnpl','واریز '+T(paid)+' به کیف پول کاربر · اقساط باقی‌مانده لغو · '+G(p.goldG)+' وثیقه آزاد');
}


export {A,calc,late,planDebt,dueItems,openPlans,schedule,refreshLimit,init,emit};
export function tickTimer(){
  const f=S.flow;if(!f||!f.resEnd)return;
  if(f.resEnd-Date.now()>0)return;
  const prev=S.cur;focus(f.surf||S.cur);
  if(['summary','terms','paying'].includes(S.b.view)||S.wg.view==='buy'){
    releaseReserve();const o=S.m.pending.find(p=>p.id===f.orderId);if(o)o.st='expired';
    addLog('core','bnpl','پنجره‌ی رزرو منقضی شد → رزرو آزاد، نرخ آزاد، عملیات ریست');
    S.b.view='expired';S.wg.view='home';
    if(f.ch==='online'){S.site.view='cart';S.site.msg='زمان پرداخت به پایان رسید.'}else S.m.pos.step='expired';
    S.flow=null;emit();
  }
  focus(prev);
}
setInterval(tickTimer,1000);
init();
