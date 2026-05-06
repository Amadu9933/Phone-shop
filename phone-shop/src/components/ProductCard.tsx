import { useState } from 'react'
import type { Product, CartItem } from '../data/types'


interface ProductCardProps {
    product: Product
    onAddToCart: (item: CartItem) => void
    featured?: boolean
}

// ─── Inline SVGs ──────────────────────────────────────────────────────────────
const CartSVG = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
)

const TickSVG = () => (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <polyline points="1,4 3,6.5 7,1.5" stroke="#3ECF8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const PhoneSVG = ({ gold }: { gold?: boolean }) => (
    <svg width="52" height="86" viewBox="0 0 52 86" fill="none" style={{ opacity: 0.28 }}>
        <rect x="2" y="2" width="48" height="82" rx="8" fill={gold ? '#E8B84B' : '#9990B8'} />
        <rect x="8" y="12" width="36" height="52" rx="3" fill="#0D0C14" opacity="0.6" />
        <rect x="18" y="74" width="16" height="4" rx="2" fill="#0D0C14" opacity="0.5" />
    </svg>
)

// ─── Availability config ──────────────────────────────────────────────────────
const AVAIL = {
    'in-stock': { bg: 'rgba(62,207,142,0.12)', border: 'rgba(62,207,142,0.32)', color: '#3ECF8E', label: 'In Stock' },
    'low-stock': { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.32)', color: '#F59E0B', label: 'Low Stock' },
    'out-of-stock': { bg: 'rgba(255,83,112,0.10)', border: 'rgba(255,83,112,0.28)', color: '#FF5370', label: 'Out of Stock' },
} as const


// ─── Component styles (injected once) ─────────────────────────────────────────
const CSS = `
.phc {
  background: #16141F;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.07);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  position: relative;
  transition: border-color 0.22s, transform 0.22s;
  font-family: 'DM Sans', sans-serif;
  box-sizing: border-box;
}
.phc:hover          { border-color: rgba(255,255,255,0.16); transform: translateY(-2px); }
.phc.phc-featured   { border-color: rgba(232,184,75,0.35); }

/* Image area */
.phc-img {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  position: relative;
  background: #1a1828;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.phc-img img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* Pill badge */
.phc-pill {
  position: absolute;
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 9px; font-weight: 600;
  letter-spacing: 0.5px; text-transform: uppercase;
  border: 1px solid; line-height: 1.6;
  pointer-events: none;
}
@media (min-width: 640px) { .phc-pill { font-size: 10px; padding: 3px 10px; } }

/* Body */
.phc-body  { padding: 12px 12px 0; flex: 1; display: flex; flex-direction: column; min-width: 0; }
@media (min-width: 640px) { .phc-body { padding: 14px 14px 0; } }
.phc-cat   { font-size: 10px; font-weight: 600; letter-spacing: 1.4px; text-transform: uppercase; color: #E8B84B; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.phc-name  { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: #F2EDE8; line-height: 1.25; margin-bottom: 4px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
@media (min-width: 640px) { .phc-name { font-size: 15px; margin-bottom: 5px; } }
.phc-desc  { font-size: 11px; color: #7A728F; line-height: 1.55; margin-bottom: 8px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
@media (min-width: 640px) { .phc-desc { font-size: 11.5px; margin-bottom: 10px; } }

.phc-specs { display: flex; flex-direction: column; gap: 3px; margin-bottom: 10px; }
@media (min-width: 640px) { .phc-specs { gap: 4px; margin-bottom: 12px; } }
.phc-spec  { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #B8B0D0; min-width: 0; }
.phc-spec span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.phc-dot   { width: 13px; height: 13px; border-radius: 50%; background: rgba(62,207,142,0.12); border: 1px solid rgba(62,207,142,0.3); flex-shrink: 0; display: flex; align-items: center; justify-content: center; }

/* Footer */
.phc-foot  { padding: 10px 12px 12px; border-top: 1px solid rgba(255,255,255,0.06); margin-top: auto; }
@media (min-width: 640px) { .phc-foot { padding: 12px 14px 14px; } }
.phc-price-row { display: flex; align-items: baseline; gap: 3px; margin-bottom: 10px; }
.phc-curr  { font-size: 12px; font-weight: 500; color: #7A728F; padding-bottom: 1px; }
.phc-price { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: #F2EDE8; letter-spacing: -0.5px; }
@media (min-width: 640px) { .phc-price { font-size: 22px; } }
.phc-price.dim { color: #3a3650; }

/* Qty stepper — touch friendly */
.phc-qty-row   { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.phc-qty-lbl   { font-size: 11px; color: #7A728F; flex-shrink: 0; }
.phc-stepper   { display: flex; align-items: center; height: 36px; border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; overflow: hidden; }
@media (min-width: 640px) { .phc-stepper { height: 30px; } }
.phc-step-btn  { width: 36px; height: 36px; background: #242233; border: none; color: #B8B0D0; font-size: 18px; cursor: pointer; line-height: 1; display: flex; align-items: center; justify-content: center; transition: background 0.15s, color 0.15s; flex-shrink: 0; }
@media (min-width: 640px) { .phc-step-btn { width: 28px; height: 30px; font-size: 16px; } }
.phc-step-btn:active { background: #2C2A3E; color: #F2EDE8; }
.phc-step-btn:hover  { background: #2C2A3E; color: #F2EDE8; }
.phc-step-val  { width: 36px; height: 36px; text-align: center; font-size: 13px; font-weight: 500; color: #F2EDE8; background: #1E1C2A; user-select: none; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border-left: 1px solid rgba(255,255,255,0.07); border-right: 1px solid rgba(255,255,255,0.07); }
@media (min-width: 640px) { .phc-step-val { width: 30px; height: 30px; } }

/* CTA button — 44px tap target on mobile */
.phc-btn       { width: 100%; height: 44px; border-radius: 10px; border: none; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 7px; letter-spacing: 0.1px; transition: opacity 0.18s, transform 0.15s; box-sizing: border-box; }
@media (min-width: 640px) { .phc-btn { height: 38px; font-size: 13px; } }
.phc-btn-gold  { background: #E8B84B; color: #0D0C14; }
.phc-btn-gold:hover { opacity: 0.86; transform: scale(0.985); }
.phc-btn-out   { background: #1E1C2A; color: #4a4560; border: 1px solid rgba(255,255,255,0.06); cursor: not-allowed; }

/* Success toast overlay */
.phc-toast     { position: absolute; inset: 0; background: rgba(13,12,20,0.9); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; border-radius: 16px; opacity: 0; transition: opacity 0.18s; pointer-events: none; z-index: 20; }
.phc-toast.on  { opacity: 1; }
.phc-toast-ring { width: 42px; height: 42px; border-radius: 50%; background: rgba(62,207,142,0.13); border: 1px solid rgba(62,207,142,0.35); display: flex; align-items: center; justify-content: center; }
.phc-toast-txt { font-size: 13px; font-weight: 500; color: #3ECF8E; font-family: 'DM Sans', sans-serif; }
`

let _phcCss = false
function injectCardCss() {
    if (_phcCss || typeof document === 'undefined') return
    const s = document.createElement('style')
    s.textContent = CSS
    document.head.appendChild(s)
    _phcCss = true
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ProductCard({ product, onAddToCart, featured = false }: ProductCardProps) {
    injectCardCss()

    const [qty, setQty] = useState(1)
    const [toast, setToast] = useState(false)
    const [imgErr, setImgErr] = useState(false)

    const avail = AVAIL[product.availability] ?? AVAIL['in-stock']
    const isOut = product.availability === 'out-of-stock'
    const useImg = !imgErr && !!product.image

    const handleAdd = () => {
        if (isOut) return
        onAddToCart({ ...product, quantity: qty })
        setQty(1)
        setToast(true)
        setTimeout(() => setToast(false), 1700)
    }

    return (
        <div className={`phc${featured ? ' phc-featured' : ''}`}>

            {/* Image */}
            <div className="phc-img">
                {useImg
                    ? <img src={product.image} alt={product.name} onError={() => setImgErr(true)} />
                    : <PhoneSVG gold={featured} />
                }
                <span className="phc-pill" style={{ top: 10, right: 10, background: avail.bg, borderColor: avail.border, color: avail.color }}>
                    {avail.label}
                </span>
                {featured && (
                    <span className="phc-pill" style={{ top: 10, left: 10, background: 'rgba(232,184,75,0.13)', borderColor: 'rgba(232,184,75,0.35)', color: '#E8B84B' }}>
                        Popular
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="phc-body">
                <div className="phc-cat">{product.category}</div>
                <div className="phc-name">{product.name}</div>
                <div className="phc-desc">{product.description}</div>
                {product.specs && product.specs.length > 0 && (
                    <div className="phc-specs">
                        {product.specs.slice(0, 4).map((s, i) => (
                            <div key={i} className="phc-spec">
                                <div className="phc-dot"><TickSVG /></div>
                                <span>{s}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="phc-foot">
                <div className="phc-price-row">
                    <span className="phc-curr">GH₵</span>
                    <span className={`phc-price${isOut ? ' dim' : ''}`}>
                        {product.price.toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                    </span>
                </div>

                {isOut ? (
                    <button className="phc-btn phc-btn-out" disabled>Out of stock</button>
                ) : (
                    <>
                        <div className="phc-qty-row">
                            <span className="phc-qty-lbl">Qty</span>
                            <div className="phc-stepper">
                                <button className="phc-step-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                                <div className="phc-step-val">{qty}</div>
                                <button className="phc-step-btn" onClick={() => setQty(q => Math.min(10, q + 1))}>+</button>
                            </div>
                        </div>
                        <button className="phc-btn phc-btn-gold" onClick={handleAdd}>
                            <CartSVG /> Add to cart
                        </button>
                    </>
                )}
            </div>

            {/* Toast overlay */}
            <div className={`phc-toast${toast ? ' on' : ''}`}>
                <div className="phc-toast-ring">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <polyline points="3,9 7,13 15,5" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                <div className="phc-toast-txt">Added to cart</div>
            </div>
        </div>
    )
}