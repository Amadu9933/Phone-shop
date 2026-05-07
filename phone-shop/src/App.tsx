import { useState } from 'react'
import { Header } from './components/Header'
import { ProductList } from './components/ProductList'
import { OrderForm } from './components/OrderForm'
import { NotificationToast } from './components/NotificationToast'
import { products } from './data/products'
import { useCart } from './context'
import './App.css'

// ─── Global CSS ───────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body, #root {
  background: #0D0C14;
  color: #F2EDE8;
  font-family: 'DM Sans', sans-serif;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

/* ── Responsive main wrapper ── */
.main-wrap {
  flex: 1; max-width: 1280px; width: 100%; margin: 0 auto;
  padding: 0 16px;
}
@media (min-width: 640px) { .main-wrap { padding: 0 24px; } }
@media (min-width: 1024px) { .main-wrap { padding: 0 32px; } }

/* ── Filter bar: scrollable on mobile ── */
.filter-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 0 18px;
  overflow-x: auto;
  flex-wrap: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.filter-bar::-webkit-scrollbar { display: none; }
@media (min-width: 640px) {
  .filter-bar { padding: 20px 0 24px; flex-wrap: wrap; overflow-x: visible; }
}
.filter-btn {
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.10);
  background: transparent;
  color: #9990B8;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.18s;
  white-space: nowrap;
  line-height: 1;
  min-height: 38px;
  flex-shrink: 0;
}
.filter-btn:hover:not(.filter-btn--active) {
  border-color: rgba(255,255,255,0.22);
  color: #F2EDE8;
}
.filter-btn--active {
  background: rgba(232,184,75,0.13);
  border-color: rgba(232,184,75,0.42);
  color: #E8B84B;
  font-weight: 600;
}
.filter-count {
  margin-left: auto;
  font-size: 11.5px;
  color: #3a3650;
  white-space: nowrap;
  flex-shrink: 0;
  display: none;
}
@media (min-width: 480px) { .filter-count { display: block; } }

/* ── Cart page ── */
.cart-page { padding: 20px 0 100px; }
@media (min-width: 640px) { .cart-page { padding: 28px 0 80px; } }

.cart-heading {
  font-family: 'Syne', sans-serif;
  font-size: 20px; font-weight: 800; color: #F2EDE8;
  margin-bottom: 18px;
  display: flex; align-items: center; gap: 10px;
}
@media (min-width: 640px) { .cart-heading { font-size: 26px; margin-bottom: 24px; } }

.cart-badge {
  font-size: 12px; font-weight: 600;
  background: rgba(232,184,75,0.12);
  border: 1px solid rgba(232,184,75,0.35);
  color: #E8B84B; padding: 2px 10px; border-radius: 20px;
  font-family: 'DM Sans', sans-serif;
}
.cart-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  align-items: start;
}
@media (min-width: 768px) { .cart-grid { grid-template-columns: 1fr 360px; gap: 28px; } }
@media (min-width: 1024px) { .cart-grid { grid-template-columns: 1fr 380px; } }

.cart-items { display: flex; flex-direction: column; gap: 10px; }
.cart-item {
  background: #16141F;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px;
  padding: 14px;
  display: flex; align-items: center;
  justify-content: space-between; gap: 12px;
  transition: border-color 0.2s;
}
@media (min-width: 640px) { .cart-item { padding: 15px 18px; gap: 16px; } }
.cart-item:hover { border-color: rgba(255,255,255,0.15); }
.cart-item-name {
  font-family: 'Syne', sans-serif;
  font-size: 13px; font-weight: 700; color: #F2EDE8;
  margin-bottom: 3px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
@media (min-width: 480px) { .cart-item-name { font-size: 14px; } }
.cart-item-sub   { font-size: 12px; color: #7A728F; margin-bottom: 4px; }
.cart-item-total { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 800; color: #E8B84B; letter-spacing: -0.3px; }
@media (min-width: 480px) { .cart-item-total { font-size: 16px; } }

.cart-rm-btn {
  width: 40px; height: 40px; border-radius: 8px; flex-shrink: 0;
  border: 1px solid rgba(255,83,112,0.22);
  background: rgba(255,83,112,0.07); color: #FF5370;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background 0.18s, border-color 0.18s;
}
.cart-rm-btn:hover { background: rgba(255,83,112,0.2); border-color: rgba(255,83,112,0.5); }

.cart-summary {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 0 0;
  border-top: 1px solid rgba(255,255,255,0.07);
  margin-top: 14px;
}
.cart-total-label { font-size: 10.5px; color: #3a3650; letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 4px; }
.cart-total-amt   { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: #E8B84B; letter-spacing: -0.5px; }
@media (min-width: 640px) { .cart-total-amt { font-size: 26px; } }
.cart-clear-btn {
  padding: 0 16px; height: 40px; border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.10);
  background: transparent; color: #7A728F;
  font-family: 'DM Sans', sans-serif; font-size: 13px;
  cursor: pointer; transition: all 0.18s;
}
.cart-clear-btn:hover { border-color: rgba(255,255,255,0.22); color: #F2EDE8; background: rgba(255,255,255,0.04); }

.cart-empty {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 60px 20px; gap: 14px;
  background: #16141F; border: 1px solid rgba(255,255,255,0.07); border-radius: 16px;
}
.cart-empty-txt  { font-size: 14px; color: #7A728F; }
.cart-browse-btn {
  margin-top: 4px; padding: 10px 24px; border-radius: 20px;
  border: 1px solid rgba(232,184,75,0.42);
  background: rgba(232,184,75,0.12); color: #E8B84B;
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: opacity 0.18s; min-height: 44px;
}
.cart-browse-btn:hover { opacity: 0.8; }

.back-btn {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 13px; font-weight: 500; color: #7A728F;
  cursor: pointer; border: none; background: none;
  font-family: 'DM Sans', sans-serif; padding: 0 0 18px;
  transition: color 0.18s; min-height: 44px;
}
.back-btn:hover { color: #F2EDE8; }

/* ── Mobile floating cart bar ── */
.mob-cart-bar {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: #16141F;
  border-top: 1px solid rgba(232,184,75,0.25);
  padding: 12px 16px;
  padding-bottom: max(12px, env(safe-area-inset-bottom, 0px));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  z-index: 200;
  box-shadow: 0 -8px 24px rgba(0,0,0,0.5);
}
.mob-cart-bar-left { display: flex; flex-direction: column; }
.mob-cart-bar-count { font-size: 11px; color: #7A728F; margin-bottom: 2px; }
.mob-cart-bar-total { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: #E8B84B; letter-spacing: -0.4px; }
.mob-cart-bar-btn {
  background: linear-gradient(135deg, #E8B84B 0%, #C9922B 100%);
  color: #0D0C14;
  border: none; border-radius: 12px;
  padding: 0 22px; height: 48px;
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700;
  cursor: pointer; white-space: nowrap;
  display: flex; align-items: center; gap: 8px;
  box-shadow: 0 2px 12px rgba(232,184,75,0.3);
  flex-shrink: 0;
}
@media (min-width: 768px) { .mob-cart-bar { display: none; } }

/* ── Footer ── */
.app-footer { background: #080710; border-top: 1px solid rgba(255,255,255,0.05); padding: 24px 0; }
.app-footer-inner {
  max-width: 1280px; margin: 0 auto; padding: 0 16px;
  display: flex; align-items: center; justify-content: center;
  flex-direction: column; gap: 10px; text-align: center;
}
@media (min-width: 640px) {
  .app-footer-inner { padding: 0 32px; flex-direction: row; justify-content: space-between; text-align: left; }
}
.footer-copy { font-size: 12.5px; color: #3a3650; }
.footer-wa   { display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: #3ECF8E; font-weight: 500; }
.footer-dot  { width: 6px; height: 6px; border-radius: 50%; background: #3ECF8E; box-shadow: 0 0 6px #3ECF8E; flex-shrink: 0; }
`

let _globalInjected = false
function injectGlobal() {
  if (_globalInjected || typeof document === 'undefined') return
  const s = document.createElement('style')
  s.textContent = GLOBAL_CSS
  document.head.appendChild(s)
  _globalInjected = true
}

// ─── Filter config — single source of truth ───────────────────────────────────
type FilterKey = 'all' | 'iphone' | 'samsung' | 'pixel' | 'repair' | 'accessory'

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All Products' },
  { key: 'iphone', label: 'iPhones' },
  { key: 'samsung', label: 'Samsung' },
  { key: 'pixel', label: 'Google Pixel' },
  { key: 'repair', label: 'Repair & Parts' },
  { key: 'accessory', label: 'Accessories' },
]

function countVisible(filterKey: string, searchQuery: string) {
  return products.filter(p => {
    const filterMatch = filterKey === 'all' ? true : p.category === filterKey

    const q = searchQuery.toLowerCase().trim()
    const searchMatch = !q
      || p.name.toLowerCase().includes(q)
      || (p.description ?? '').toLowerCase().includes(q)
      || p.category.includes(q)

    return filterMatch && searchMatch
  }).length
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  injectGlobal()

  const { cart, cartTotal, cartCount, removeFromCart, clearCart } = useCart()
  const [showCart, setShowCart] = useState(false)
  const [filter, setFilter] = useState<FilterKey>('all')
  const [searchQuery, setSearch] = useState('')

  const handleRemove = (id: string) => removeFromCart(id)
  const handleClear = () => { clearCart(); setShowCart(false) }
  const handleOrderSubmitted = () => { clearCart(); setShowCart(false) }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0D0C14' }}>
      <NotificationToast />

      {/* ── Header — logo + search + cart only. NO tabs inside. ── */}
      <Header
        cartCount={cartCount}
        onCartClick={() => setShowCart(v => !v)}

        searchQuery={searchQuery}
        onSearchChange={q => { setSearch(q); setShowCart(false) }}
      />

      <main className="main-wrap">

        {showCart ? (
          /* ══ CART VIEW ══════════════════════════════════════════════════ */
          <div className="cart-page">
            <button className="back-btn" onClick={() => setShowCart(false)}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Continue shopping
            </button>

            <div className="cart-heading">
              Shopping Cart
              {cart.length > 0 && (
                <span className="cart-badge">{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
              )}
            </div>

            <div className="cart-grid">
              {/* Left — item list */}
              <div>
                {cart.length === 0 ? (
                  <div className="cart-empty">
                    <svg width="42" height="42" viewBox="0 0 24 24" fill="none"
                      stroke="rgba(122,114,143,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <p className="cart-empty-txt">Your cart is empty</p>
                    <button className="cart-browse-btn" onClick={() => setShowCart(false)}>
                      Browse products
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="cart-items">
                      {cart.map(item => (
                        <div key={item.id} className="cart-item">
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-sub">
                              {item.quantity} × GH₵{item.price.toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                            </div>
                            <div className="cart-item-total">
                              GH₵{(item.price * item.quantity).toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                            </div>
                          </div>
                          <button className="cart-rm-btn" onClick={() => handleRemove(item.id)} aria-label="Remove">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="cart-summary">
                      <div>
                        <div className="cart-total-label">Order total</div>
                        <div className="cart-total-amt">
                          GH₵{cartTotal.toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                      <button className="cart-clear-btn" onClick={handleClear}>Clear all</button>
                    </div>
                  </>
                )}
              </div>

              {/* Right — checkout form */}
              {cart.length > 0 && (
                <div>
                  <OrderForm cartItems={cart} onOrderSubmitted={handleOrderSubmitted} />
                </div>
              )}
            </div>
          </div>

        ) : (
          /* ══ PRODUCTS VIEW ══════════════════════════════════════════════ */
          <div style={{ paddingBottom: cartCount > 0 ? 120 : 40 }}>

            {/*
              ┌─────────────────────────────────────────────────┐
              │  THE ONE FILTER BAR — only rendered here, once  │
              └─────────────────────────────────────────────────┘
            */}
            <div className="filter-bar">
              {FILTERS.map(({ key, label }) => {
                const count = countVisible(key, '')
                return (
                  <button
                    key={key}
                    className={`filter-btn${filter === key ? ' filter-btn--active' : ''}`}
                    onClick={() => setFilter(key)}
                  >
                    {label}
                    {key !== 'all' && (
                      <span style={{
                        marginLeft: 5,
                        fontSize: 10,
                        opacity: 0.6,
                        fontWeight: 400,
                      }}>
                        {count}
                      </span>
                    )}
                  </button>
                )
              })}
              <span className="filter-count">
                {countVisible(filter, searchQuery)} product{countVisible(filter, searchQuery) !== 1 ? 's' : ''}
              </span>
            </div>

            <ProductList
              products={products}
              filter={filter}
              searchQuery={searchQuery}
            />
          </div>
        )}
      </main>

      {/* ── Mobile floating cart bar ── */}
      {!showCart && cartCount > 0 && (
        <div className="mob-cart-bar">
          <div className="mob-cart-bar-left">
            <span className="mob-cart-bar-count">{cartCount} item{cartCount !== 1 ? 's' : ''} in cart</span>
            <span className="mob-cart-bar-total">GH₵{cartTotal.toLocaleString('en-GH', { minimumFractionDigits: 2 })}</span>
          </div>
          <button className="mob-cart-bar-btn" onClick={() => setShowCart(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            View Cart
          </button>
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="app-footer">
        <div className="app-footer-inner">
          <span className="footer-copy">© 2026 HamraazDeal Ghana. All rights reserved.</span>
          <div className="footer-wa">
            <div className="footer-dot" />
            WhatsApp: +233 540 985 004
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App