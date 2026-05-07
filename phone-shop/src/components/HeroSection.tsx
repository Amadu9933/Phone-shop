import heroBg from '../assets/hero-background.png'

const CSS = `
/* ── Hero Section ─────────────────────────────────────────────────────────── */
.hero {
  position: relative;
  overflow: hidden;
  padding: 56px 0 72px;
}
@media (min-width: 640px)  { .hero { padding: 72px 0 88px; } }
@media (min-width: 1024px) { .hero { padding: 96px 0 104px; } }

/* ── Background image ── */
.hero-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
  user-select: none;
}

/* ── Overlay: heavy on the left for text, fades right to reveal phones ── */
.hero-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
  background:
    linear-gradient(
      105deg,
      rgba(13,12,20,1.00)  0%,
      rgba(13,12,20,0.96) 30%,
      rgba(13,12,20,0.82) 52%,
      rgba(13,12,20,0.48) 70%,
      rgba(13,12,20,0.18) 88%,
      rgba(13,12,20,0.05) 100%
    ),
    linear-gradient(
      to bottom,
      rgba(13,12,20,0.35) 0%,
      transparent 18%,
      transparent 78%,
      rgba(13,12,20,0.70) 100%
    );
}

/* ── Ambient glow behind phones ── */
.hero-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
  background:
    radial-gradient(ellipse 40% 60% at 72% 40%, rgba(232,184,75,0.11) 0%, transparent 55%),
    radial-gradient(ellipse 30% 40% at 88% 70%, rgba(62,207,142,0.07) 0%, transparent 50%);
}

/* ── Content ── */
.hero-content {
  position: relative;
  z-index: 4;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
  max-width: 620px;
}
@media (min-width: 640px)  { .hero-content { padding: 0 24px; max-width: none; } }
@media (min-width: 1024px) { .hero-content { padding: 0 32px; } }

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 13px;
  border-radius: 20px;
  background: rgba(62,207,142,0.08);
  border: 1px solid rgba(62,207,142,0.22);
  font-size: 11px;
  font-weight: 600;
  color: #3ECF8E;
  letter-spacing: 0.9px;
  text-transform: uppercase;
  margin-bottom: 20px;
  font-family: 'DM Sans', sans-serif;
}
.hero-dot-live {
  width: 6px; height: 6px; border-radius: 50%;
  background: #3ECF8E;
  box-shadow: 0 0 6px #3ECF8E;
  animation: hero-blink 2s ease-in-out infinite;
}
@keyframes hero-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

.hero-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(32px, 5.5vw, 60px);
  font-weight: 800;
  color: #F2EDE8;
  line-height: 1.06;
  letter-spacing: -2px;
  margin-bottom: 20px;
}
.hero-title-gold {
  background: linear-gradient(135deg, #E8B84B 0%, #F5D070 50%, #C9922B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-sub {
  font-size: 15px;
  color: #7A728F;
  line-height: 1.72;
  margin-bottom: 28px;
  max-width: 460px;
}
@media (min-width: 640px) { .hero-sub { font-size: 16px; } }

.hero-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 36px;
}
.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  font-size: 12px;
  font-weight: 500;
  color: #9990B8;
  font-family: 'DM Sans', sans-serif;
  white-space: nowrap;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.hero-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 28px;
  height: 52px;
  border-radius: 13px;
  background: linear-gradient(135deg, #E8B84B 0%, #C9922B 100%);
  border: none;
  color: #0D0C14;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 28px rgba(232,184,75,0.42);
  transition: transform 0.18s, box-shadow 0.18s;
  white-space: nowrap;
}
.hero-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 36px rgba(232,184,75,0.52);
}
.hero-btn-primary:active { transform: translateY(0); }

.hero-btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0 22px;
  height: 52px;
  border-radius: 13px;
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.13);
  color: #9990B8;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.18s;
  white-space: nowrap;
}
.hero-btn-ghost:hover {
  border-color: rgba(255,255,255,0.28);
  color: #F2EDE8;
  background: rgba(255,255,255,0.08);
}

/* Bottom seamless fade */
.hero-fade-bottom {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 80px;
  background: linear-gradient(to bottom, transparent, #0D0C14);
  pointer-events: none;
  z-index: 5;
}

/* Separator */
.hero-sep {
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(232,184,75,0.18) 30%,
    rgba(62,207,142,0.10) 60%,
    transparent 100%
  );
}
`

let _injected = false
function injectCss() {
  if (_injected || typeof document === 'undefined') return
  const s = document.createElement('style')
  s.textContent = CSS
  document.head.appendChild(s)
  _injected = true
}

interface HeroSectionProps {
  onShopNow: () => void
  onRepairs: () => void
}

export function HeroSection({ onShopNow, onRepairs }: HeroSectionProps) {
  injectCss()

  return (
    <>
      <section className="hero">

        {/* ── Background image ── */}
        <img src={heroBg} alt="" className="hero-bg-img" />

        {/* ── Overlay & glow ── */}
        <div className="hero-overlay" />
        <div className="hero-glow" />

        {/* ── Content ── */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <div className="hero-dot-live" />
            Ghana's #1 Phone Shop
          </div>

          <h1 className="hero-title">
            Premium{' '}
            <span className="hero-title-gold">UK-Used</span>
            <br />
            Phones — Tested
            <br />
            &amp; Trusted
          </h1>

          <p className="hero-sub">
            Certified pre-owned iPhones, Samsung &amp; Pixel devices. Every phone fully tested, battery health 92–98%, delivered fast across Ghana.
          </p>

          <div className="hero-pills">
            <span className="hero-pill">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke="#3ECF8E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              UK Used &amp; Certified
            </span>
            <span className="hero-pill">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke="#E8B84B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Battery 92–98%
            </span>
            <span className="hero-pill">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke="#3ECF8E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              WhatsApp Ordering
            </span>
            <span className="hero-pill">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke="#E8B84B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Same-Day Repair
            </span>
          </div>

          <div className="hero-actions">
            <button className="hero-btn-primary" onClick={onShopNow}>
              Shop Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <button className="hero-btn-ghost" onClick={onRepairs}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              Repair Services
            </button>
          </div>
        </div>

        <div className="hero-fade-bottom" />
      </section>

      <div className="hero-sep" />
    </>
  )
}
