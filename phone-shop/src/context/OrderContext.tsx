import { createContext, useContext, useState, useCallback } from 'react'
import type { Order } from '../data/types'
import { storage } from '../utils/storage'

interface OrderContextType {
    orders: Order[]
    addOrder: (order: Order) => void
    getOrders: () => Order[]
    clearOrders: () => void
    updateOrderStatus: (id: string, status: Order['status']) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [orders, setOrders] = useState<Order[]>(() => storage.getOrders())

    const addOrder = useCallback((order: Order) => {
        const saved = storage.saveOrder(order)
        setOrders(prev => [...prev, saved])
    }, [])

    const getOrders = useCallback(() => {
        const loaded = storage.getOrders()
        setOrders(loaded)
        return loaded
    }, [])

    const clearOrders = useCallback(() => {
        storage.clearOrders()
        setOrders([])
    }, [])

    const updateOrderStatus = useCallback((id: string, status: Order['status']) => {
        const updated = orders.map(order =>
            order.id === id ? { ...order, status } : order
        )
        storage.clearOrders()
        updated.forEach(o => storage.saveOrder(o))
        setOrders(updated)
    }, [orders])

    return (
        <OrderContext.Provider value={{ orders, addOrder, getOrders, clearOrders, updateOrderStatus }}>
            {children}
        </OrderContext.Provider>
    )
}

export function useOrder() {
    const context = useContext(OrderContext)
    if (!context) {
        throw new Error('useOrder must be used within OrderProvider')
    }
    return context
}
