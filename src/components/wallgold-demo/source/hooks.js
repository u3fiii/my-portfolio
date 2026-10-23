import { useSyncExternalStore, useEffect, useState } from 'react'
import { subscribe, getVersion, getState } from './engine.js'

export function useEngine() {
  useSyncExternalStore(subscribe, getVersion)
  return getState()
}

export function useCountdown(resEnd) {
  const [, tick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 500)
    return () => clearInterval(id)
  }, [])
  if (!resEnd) return null
  const s = Math.max(0, Math.ceil((resEnd - Date.now()) / 1000))
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0')
}
