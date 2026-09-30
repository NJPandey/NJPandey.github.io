const DEFAULT_HUE = 168
const PERIOD_MS = 45000

let currentHue = DEFAULT_HUE

export function getAccentHue() {
  return currentHue
}

export function startHueRotation() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {}
  }
  let rafId = 0
  const start = performance.now()
  const tick = (now) => {
    const elapsed = (now - start) % PERIOD_MS
    currentHue = (DEFAULT_HUE + (elapsed / PERIOD_MS) * 360) % 360
    document.documentElement.style.setProperty('--accent-hue', currentHue.toFixed(1))
    rafId = requestAnimationFrame(tick)
  }
  rafId = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(rafId)
}
