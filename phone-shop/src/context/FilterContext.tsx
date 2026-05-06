import { createContext, useContext, useState, useCallback } from 'react'

interface FilterContextType {
    filter: 'all' | 'phone' | 'accessory'
    searchQuery: string
    setFilter: (filter: 'all' | 'phone' | 'accessory') => void
    setSearchQuery: (query: string) => void
    resetFilters: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: React.ReactNode }) {
    const [filter, setFilter] = useState<'all' | 'phone' | 'accessory'>('all')
    const [searchQuery, setSearchQuery] = useState('')

    const resetFilters = useCallback(() => {
        setFilter('all')
        setSearchQuery('')
    }, [])

    return (
        <FilterContext.Provider value={{ filter, searchQuery, setFilter, setSearchQuery, resetFilters }}>
            {children}
        </FilterContext.Provider>
    )
}

export function useFilter() {
    const context = useContext(FilterContext)
    if (!context) {
        throw new Error('useFilter must be used within FilterProvider')
    }
    return context
}
