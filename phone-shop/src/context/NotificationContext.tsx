import { createContext, useContext, useState, useCallback } from 'react'
import type { Notification } from '../data/types'

interface NotificationContextType {
    notifications: Notification[]
    addNotification: (message: string, type?: 'success' | 'error' | 'info' | 'warning', duration?: number) => void
    removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([])

    const addNotification = useCallback((
        message: string,
        type: 'success' | 'error' | 'info' | 'warning' = 'info',
        duration = 4000
    ) => {
        const id = Date.now().toString()
        const notification: Notification = { id, type, message, duration }

        setNotifications(prev => [...prev, notification])

        if (duration > 0) {
            setTimeout(() => {
                removeNotification(id)
            }, duration)
        }
    }, [])

    const removeNotification = useCallback((id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
    }, [])

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}

export function useNotification() {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotification must be used within NotificationProvider')
    }
    return context
}
