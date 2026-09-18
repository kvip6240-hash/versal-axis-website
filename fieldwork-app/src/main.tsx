import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App.tsx'

gsap.registerPlugin(ScrollTrigger)

// ── Lenis smooth scroll ──────────────────────────────────────────────────────
const lenis = new Lenis({
  duration: 1.8,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.65,
  touchMultiplier: 1.4,
  infinite: false,
})

// Sync Lenis with GSAP's ticker so ScrollTrigger works perfectly
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

lenis.on('scroll', ScrollTrigger.update)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
