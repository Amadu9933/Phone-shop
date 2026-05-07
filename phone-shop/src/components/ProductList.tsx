import { useState } from 'react'
import type { Product } from '../data/types'
import { ProductCard } from './ProductCard'
import { useCart } from '../context'

type FilterKey = 'all' | 'iphone' | 'samsung' | 'pixel' | 'repair' | 'accessory' | 'phone'

interface ProductListProps {
    products: Product[]
    filter?: FilterKey
    searchQuery?: string
}

// ─── Pagination ───────────────────────────────────────────────────────────────
const PAGE_SIZE = 12

function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
    if (total <= 1) return null
    const pages = Array.from({ length: total }, (_, i) => i + 1)
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, paddingTop: 40 }}>
            <button
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
                style={{
                    width: 34, height: 34, borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.10)',
                    background: 'transparent', color: page === 1 ? '#3a3650' : '#9990B8',
                    cursor: page === 1 ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.18s',
                }}
            >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>

            {pages.map(p => (
                <button
                    key={p}
                    onClick={() => onChange(p)}
                    style={{
                        width: 34, height: 34, borderRadius: 8,
                        border: `1px solid ${p === page ? 'rgba(232,184,75,0.4)' : 'rgba(255,255,255,0.10)'}`,
                        background: p === page ? 'rgba(232,184,75,0.12)' : 'transparent',
                        color: p === page ? '#E8B84B' : '#7A728F',
                        cursor: 'pointer', fontSize: 13, fontWeight: p === page ? 600 : 400,
                        fontFamily: "'DM Sans', sans-serif",
                        transition: 'all 0.18s',
                    }}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={() => onChange(page + 1)}
                disabled={page === total}
                style={{
                    width: 34, height: 34, borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.10)',
                    background: 'transparent', color: page === total ? '#3a3650' : '#9990B8',
                    cursor: page === total ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.18s',
                }}
            >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>
        </div>
    )
}

// ─── Filter helper ────────────────────────────────────────────────────────────
function matchesFilter(p: Product, filter: string): boolean {
    if (filter === 'all') return true
    return p.category === filter
}

function matchesSearch(p: Product, q: string): boolean {
    if (!q.trim()) return true
    const qLower = q.toLowerCase()
    return (
        p.name.toLowerCase().includes(qLower) ||
        (p.description ?? '').toLowerCase().includes(qLower) ||
        (p.category ?? '').toLowerCase().includes(qLower)
    )
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ProductList({ products, filter = 'all', searchQuery = '' }: ProductListProps) {
    const { addToCart } = useCart()
    const [page, setPage] = useState(1)

    const visible = products.filter(p => matchesFilter(p, filter) && matchesSearch(p, searchQuery))
    const totalPages = Math.ceil(visible.length / PAGE_SIZE)
    const safePage = Math.min(page, Math.max(1, totalPages))
    const slice = visible.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

    const handlePageChange = (p: number) => {
        setPage(p)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (visible.length === 0) {
        return (
            <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '80px 20px', gap: 14,
                background: '#16141F',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16,
            }}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(122,114,143,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <p style={{ color: '#7A728F', fontSize: 14, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                    {searchQuery
                        ? `No results for "${searchQuery}"`
                        : 'No products in this category'
                    }
                </p>
            </div>
        )
    }

    return (
        <div>
            {/* Grid — auto-fill with minmax so cards fill space at every viewport */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: 20,
                width: '100%',
            }}>
                {slice.map((product, i) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                        featured={i === 0 && safePage === 1}
                    />
                ))}
            </div>

            <Pagination page={safePage} total={totalPages} onChange={handlePageChange} />
        </div>
    )
}