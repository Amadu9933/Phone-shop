import { CartProvider } from './CartContext'
import { NotificationProvider } from './NotificationContext'
import { OrderProvider } from './OrderContext'
import { FilterProvider } from './FilterContext'
import { ProductProvider } from './ProductContext'

export function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <NotificationProvider>
            <CartProvider>
                <OrderProvider>
                    <FilterProvider>
                        <ProductProvider>
                            {children}
                        </ProductProvider>
                    </FilterProvider>
                </OrderProvider>
            </CartProvider>
        </NotificationProvider>
    )
}

// Export all hooks for easy access
export { useCart } from './CartContext'
export { useNotification } from './NotificationContext'
export { useOrder } from './OrderContext'
export { useFilter } from './FilterContext'
export { useProduct } from './ProductContext'
