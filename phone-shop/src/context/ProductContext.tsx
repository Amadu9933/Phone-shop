import { createContext, useContext, useState, useCallback } from 'react'
import type { Product } from '../data/types'
import { products as initialProducts } from '../data/products'
import { storage } from '../utils/storage'

interface ProductContextType {
    products: Product[]
    addProduct: (product: Omit<Product, 'id'>) => void
    updateProduct: (id: string, data: Partial<Product>) => void
    deleteProduct: (id: string) => void
    getProductById: (id: string) => Product | undefined
    resetProducts: () => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>(() => storage.getProducts())

    const addProduct = useCallback((product: Omit<Product, 'id'>) => {
        const newProduct: Product = {
            ...product,
            id: `prod_${Date.now()}`,
        }
        const updated = storage.addProduct(newProduct)
        setProducts(updated)
    }, [])

    const updateProduct = useCallback((id: string, data: Partial<Product>) => {
        const updated = storage.updateProduct(id, data)
        setProducts(updated)
    }, [])

    const deleteProduct = useCallback((id: string) => {
        const updated = storage.deleteProduct(id)
        setProducts(updated)
    }, [])

    const getProductById = useCallback((id: string) => {
        return products.find(p => p.id === id)
    }, [products])

    const resetProducts = useCallback(() => {
        storage.saveProducts(initialProducts)
        setProducts(initialProducts)
    }, [])

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProductById, resetProducts }}>
            {children}
        </ProductContext.Provider>
    )
}

export function useProduct() {
    const context = useContext(ProductContext)
    if (!context) {
        throw new Error('useProduct must be used within ProductProvider')
    }
    return context
}
