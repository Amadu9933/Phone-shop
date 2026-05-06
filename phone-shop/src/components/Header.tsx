import { useState } from 'react'

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
  searchQuery: string
  onSearchChange: (q: string) => void
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

.hdr {
  background: #0D0C14;
  position: sticky;
  top: 0;
  z-index: 100;
  font-family: 'DM Sans', sans-serif;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.hdr-accent {
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, #E8B84B 35%, #3ECF8E 65%, transparent 100%);
}
.hdr-glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 55% 70% at 5% 0%, rgba(232,184,75,0.06) 0%, transparent 60%),
    radial-gradient(ellipse 40% 60% at 95% 100%, rgba(62,207,142,0.04) 0%, transparent 60%);
  pointer-events: none;
}

/* ── Mobile-first inner layout ── */
.hdr-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 12px;
  position: relative;
  z-index: 1;
}
@media (min-width: 640px) {
  .hdr-inner {
    flex-wrap: nowrap;
    height: 64px;
    padding: 0 24px;
    gap: 20px;
  }
}
@media (min-width: 1024px) { .hdr-inner { padding: 0 32px; } }

/* Logo */
.hdr-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  cursor: default;
  user-select: none;
  min-width: 0;
}
@media (min-width: 640px) { .hdr-logo { flex: 0 0 auto; gap: 12px; } }

.hdr-logo-icon {
  width: 36px; height: 36px; border-radius: 9px;
  background: linear-gradient(135deg, #E8B84B 0%, #C9922B 100%);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 0 1px rgba(232,184,75,0.3), 0 3px 12px rgba(232,184,75,0.2);
  transition: transform 0.2s, box-shadow 0.2s;
}
@media (min-width: 640px) { .hdr-logo-icon { width: 40px; height: 40px; border-radius: 10px; } }
.hdr-logo-icon:hover {
  transform: scale(1.06);
  box-shadow: 0 0 0 1px rgba(232,184,75,0.5), 0 5px 18px rgba(232,184,75,0.3);
}
.hdr-logo-name {
  font-family: 'Syne', sans-serif;
  font-size: 16px; font-weight: 800;
  color: #F2EDE8; line-height: 1; letter-spacing: -0.2px;
}
@media (min-width: 640px) { .hdr-logo-name { font-size: 18px; } }
.hdr-logo-name span { color: #E8B84B; }
.hdr-logo-sub {
  font-size: 9px; font-weight: 500;
  color: #4a4560; letter-spacing: 1.6px;
  text-transform: uppercase; margin-top: 2px;
  display: none;
}
@media (min-width: 480px) { .hdr-logo-sub { display: block; } }

/* Search — full-width row on mobile */
.hdr-search-wrap {
  width: 100%;
  order: 3;
  position: relative;
}
@media (min-width: 640px) {
  .hdr-search-wrap {
    flex: 1;
    max-width: 380px;
    min-width: 160px;
    width: auto;
    order: 0;
  }
}
.hdr-search {
  width: 100%; height: 40px;
  background: #16141F;
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 10px;
  padding: 0 14px 0 36px;
  color: #F2EDE8;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color 0.18s, background 0.18s;
}
@media (min-width: 640px) { .hdr-search { height: 36px; font-size: 13px; } }
.hdr-search::placeholder { color: #4a4560; }
.hdr-search:focus {
  border-color: rgba(232,184,75,0.35);
  background: #1a1828;
}
.hdr-search-icon {
  position: absolute;
  left: 11px; top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #4a4560;
}

/* Actions */
.hdr-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.hdr-btn-ghost {
  display: flex; align-items: center; gap: 7px;
  padding: 0 10px; height: 38px;
  background: #16141F;
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 9px;
  color: #9990B8;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px; font-weight: 500;
  cursor: pointer;
  transition: all 0.18s;
  white-space: nowrap;
  min-width: 38px;
  justify-content: center;
}
@media (min-width: 640px) { .hdr-btn-ghost { padding: 0 14px; } }
.hdr-btn-ghost:hover {
  border-color: rgba(255,255,255,0.2);
  color: #F2EDE8;
  background: #1a1828;
}
.hdr-btn-ghost.flash {
  color: #3ECF8E;
  border-color: rgba(62,207,142,0.3);
}
/* Hide export label on mobile, show on desktop */
.hdr-export-label { display: none; }
@media (min-width: 640px) { .hdr-export-label { display: inline; } }

.hdr-btn-cart {
  display: flex; align-items: center; gap: 6px;
  padding: 0 12px; height: 38px;
  background: linear-gradient(135deg, #E8B84B 0%, #C9922B 100%);
  border: none; border-radius: 9px;
  color: #0D0C14;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px; font-weight: 700;
  cursor: pointer;
  position: relative;
  transition: opacity 0.18s, transform 0.15s;
  box-shadow: 0 2px 10px rgba(232,184,75,0.22);
  white-space: nowrap;
}
@media (min-width: 640px) { .hdr-btn-cart { padding: 0 16px; gap: 7px; } }
.hdr-btn-cart:hover { opacity: 0.88; transform: translateY(-1px); }
.hdr-btn-cart:active { transform: translateY(0); }
.hdr-cart-badge {
  position: absolute;
  top: -7px; right: -7px;
  min-width: 18px; height: 18px;
  border-radius: 9px;
  background: #FF5370; color: #fff;
  font-size: 10px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  padding: 0 4px;
  border: 2px solid #0D0C14;
  animation: badge-pop 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
}
@keyframes badge-pop {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

/* Status bar — hidden on mobile */
.hdr-status-bar {
  display: none;
  border-top: 1px solid rgba(255,255,255,0.04);
  position: relative; z-index: 1;
}
@media (min-width: 640px) { .hdr-status-bar { display: block; } }
.hdr-status-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  height: 34px;
}
@media (min-width: 1024px) { .hdr-status-inner { padding: 0 32px; } }
.hdr-status-item {
  display: flex; align-items: center; gap: 6px;
  font-size: 11px; color: #3a3650; white-space: nowrap;
}
.hdr-status-dot {
  width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
}
.hdr-status-dot.green { background: #3ECF8E; box-shadow: 0 0 5px #3ECF8E; }
.hdr-status-dot.gold  { background: #E8B84B; }
.hdr-status-divider {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.04), rgba(255,255,255,0));
}
`

let _hdrCss = false
function injectHeaderCss() {
  if (_hdrCss || typeof document === 'undefined') return
  const s = document.createElement('style')
  s.textContent = CSS
  document.head.appendChild(s)
  _hdrCss = true
}

export function Header({ cartCount, onCartClick, searchQuery, onSearchChange }: HeaderProps) {
  injectHeaderCss()

  return (
    <header className="hdr">
      <div className="hdr-accent" />
      <div className="hdr-glow" />

      {/* ── Main row ── */}
      <div className="hdr-inner">

        {/* Logo */}
        <div className="hdr-logo">
          <div className="hdr-logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#0D0C14">
              <rect x="5" y="2" width="14" height="20" rx="2.5" />
              <rect x="9" y="18" width="6" height="1.5" rx="0.75" fill="rgba(0,0,0,0.3)" />
              <rect x="8" y="4.5" width="8" height="10" rx="1" fill="rgba(0,0,0,0.22)" />
            </svg>
          </div>
          <div>
            <div className="hdr-logo-name">Hamraaz<span>Deals</span></div>
            <div className="hdr-logo-sub">Ghana · Est. 2024</div>
          </div>
        </div>

        {/* Search */}
        <div className="hdr-search-wrap">
          <svg className="hdr-search-icon" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="hdr-search"
            type="text"
            placeholder="Search phones, accessories…"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="hdr-actions">
          <button className="hdr-btn-cart" onClick={onCartClick}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="#0D0C14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Cart
            {cartCount > 0 && (
              <span key={cartCount} className="hdr-cart-badge">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Status bar (replaces old conflicting category strip) ── */}
      <div className="hdr-status-bar">
        <div className="hdr-status-inner">
          <div className="hdr-status-item">
            <div className="hdr-status-dot green" />
            Open now · Fast delivery
          </div>
          <div className="hdr-status-item">
            <div className="hdr-status-dot gold" />
            16 products in stock
          </div>
          <div className="hdr-status-divider" />
          <div className="hdr-status-item">
            WhatsApp: +233 540 985 004
          </div>
        </div>
      </div>
    </header>
  )
}