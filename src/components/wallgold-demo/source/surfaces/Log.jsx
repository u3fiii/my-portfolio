import { ACT } from '../engine.js'

export default function Log({ S }) {
  return (
    <div className="log">
      <div className="actors">
        {Object.entries(ACT).map(([k, [n, c]]) => {
          const lit = S.hl.includes(k)
          return <span key={k} className={'ac ' + (lit ? 'lit' : '')} style={lit ? { background: c } : undefined}>{n}</span>
        })}
      </div>
      <div className="loglist">
        {S.log.map((e, i) => (
          <div className="ev" key={S.log.length - i}>
            <time>{e.t}</time>
            <div>
              <span className="arrow">
                <span className="pill" style={{ background: ACT[e.from][1] }}>{ACT[e.from][0]}</span> ← <span className="pill" style={{ background: ACT[e.to][1] }}>{ACT[e.to][0]}</span>
              </span>
              <div>{e.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
