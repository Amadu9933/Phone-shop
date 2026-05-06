import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { CartItem } from '../data/types'
import { storage } from '../utils/storage'

interface CartContextType {
    cart: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    cartTotal: number
    cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])

    useEffect(() => {
        setCart(storage.getCart())
    }, [])

    const addToCart = useCallback((item: CartItem) => {
        const updated = storage.addToCart(item)
        setCart(updated)
    }, [])

    const removeFromCart = useCallback((id: string) => {
        const updated = storage.removeFromCart(id)
        setCart(updated)
    }, [])

    const updateQuantity = useCallback((id: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id)
            return
        }
        const currentCart = storage.getCart()
        const updated = currentCart.map((item: CartItem) =>
            item.id === id ? { ...item, quantity } : item
        )
        storage.saveCart(updated)
        setCart(updated)
    }, [removeFromCart])

    const clearCart = useCallback(() => {
        storage.clearCart()
        setCart([])
    }, [])

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context
}
