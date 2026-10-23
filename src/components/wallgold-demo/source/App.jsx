import { useEffect, useRef, useState } from 'react'
import { useEngine } from './hooks.js'
import Header from './Header.jsx'
import { Phone, BrowserBar } from './ui.jsx'
import Site from './surfaces/Site.jsx'
import Pos from './surfaces/Pos.jsx'
import Bnpl from './surfaces/Bnpl.jsx'
import { surfView } from './surf.js'
import WallGold from './surfaces/WallGold.jsx'
import Android from './Android.jsx'

function activeFrames(S) {
  if (S.wg.view === 'buy') return ['wg']
  if (S.ch === 'instore') {
    const st = S.m.pos.step
    if (st === 'waiting') return ['bnpl']
    return st === 'otp' ? ['site', 'bnpl'] : ['site']
  }
  return ['site']
}

// The original demo is rendered inside the article. Its screens and engine stay
// unchanged; only the stage sizing follows this container instead of the window.
export default function App({ mode = 'mobile' }) {
  const S = useEngine()
  const rootRef = useRef(null)
  const [width, setWidth] = useState(900)
  const [settings, setSettings] = useState(false)
  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const resize = () => setWidth(node.clientWidth)
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  const zoom = Math.min(1, (width - 32) / 1290)
  const embedded = S.wg.view === 'goldpay'
  const browserFlow = S.ch === 'online' && !!S.flow && S.flow.surf === 'web'
  const on = browserFlow ? ['site'] : embedded ? ['wg'] : activeFrames(S)
  return (
    <div ref={rootRef} className={`bnpl-demo-app bnpl-demo-app--${mode}`}>
      {mode === 'mobile' ? (
        <>
          <Header S={S} open={settings} setOpen={setSettings} bar={false} />
          <Android S={S} onSettings={() => setSettings(true)} />
        </>
      ) : (
        <>
          <Header S={S} open={settings} setOpen={setSettings} />
          <div className="wrap">
            <div className="stage" style={{ zoom }}>
              {S.ch === 'online'
                ? <Phone id="site" surf="web" title="TECHNOLIFE" on={on.includes('site')} bg={browserFlow ? '#f8f8f7' : '#fcfeff'} skin={browserFlow ? 'bz' : 'tlapp'}>
                    {browserFlow ? <><BrowserBar url={'pay.goldpay.ir/' + S.flow.orderId} /><Bnpl S={surfView(S, 'web')} /></> : <Site S={S} />}
                  </Phone>
                : <Phone id="site" surf="app" title="GOLDPOS" on={on.includes('site')} bg="#f8f8f7" skin="bz"><Pos S={S} /></Phone>}
              <Phone id="wg" surf="wg" title="WALLGOLD" on={on.includes('wg')} bg={embedded ? '#f8f8f7' : '#fbfbfc'} skin={embedded ? 'bz' : 'wg'}>
                {embedded ? <Bnpl S={surfView(S, 'wg', { embed: true, user: { ...S.user, logged: true } })} /> : <WallGold S={S} />}
              </Phone>
              <Phone id="bnpl" surf="app" title="GOLDPAY" on={on.includes('bnpl')} bg="#f8f8f7" skin="bz">
                <Bnpl S={surfView(S, 'app')} />
              </Phone>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
