import { useCountdown } from '../hooks.js'
import { fa } from '../engine.js'

export default function Timer({ S }) {
  const t = useCountdown(S.flow && S.flow.resEnd)
  if (!t) return null
  const [m, s] = t.split(':')
  return <span className="timer">{fa(+m).padStart(2, '۰')}:{fa(+s).padStart(2, '۰')}</span>
}
