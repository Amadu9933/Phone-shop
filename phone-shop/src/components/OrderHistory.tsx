import { useState, useEffect } from 'react';
import type { Order } from '../data/types';
import { storage } from '../utils/storage';
import { LoadingSpinner } from './LoadingSpinner';

export function OrderHistory() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userOrders = storage.getOrders();
        setOrders(userOrders.reverse()); // Most recent first
        setLoading(false);
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return '#F59E0B';
            case 'confirmed': return '#3ECF8E';
            case 'shipped': return '#3ECF8E';
            case 'delivered': return '#3ECF8E';
            default: return '#7A728F';
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: "'DM Sans', sans-serif",
        }}>
            <h1 style={{ color: '#0D0C14', marginBottom: '30px' }}>Order History</h1>

            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <p style={{ color: '#7A728F', fontSize: '18px' }}>No orders yet</p>
                    <p style={{ color: '#999' }}>Your order history will appear here once you place an order.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '20px' }}>
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            style={{
                                border: '1px solid #E0E0E0',
                                borderRadius: '8px',
                                padding: '20px',
                                background: 'white',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '16px',
                            }}>
                                <div>
                                    <h3 style={{ color: '#0D0C14', margin: '0 0 4px 0' }}>
                                        Order #{order.id}
                                    </h3>
                                    <p style={{ color: '#7A728F', margin: 0 }}>
                                        {new Date(order.createdAt).toLocaleDateString()} at{' '}
                                        {new Date(order.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{
                                        color: getStatusColor(order.status),
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize',
                                        marginBottom: '4px',
                                    }}>
                                        {order.status}
                                    </div>
                                    <div style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: '#3ECF8E',
                                    }}>
                                        GH₵{order.totalAmount.toFixed(2)}
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <h4 style={{ color: '#0D0C14', marginBottom: '8px' }}>Items</h4>
                                <div style={{ display: 'grid', gap: '8px' }}>
                                    {order.items.map((item, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '8px',
                                                background: '#F8F9FA',
                                                borderRadius: '4px',
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        objectFit: 'cover',
                                                        borderRadius: '4px',
                                                    }}
                                                />
                                                <div>
                                                    <div style={{ fontWeight: 'bold', color: '#0D0C14' }}>{item.name}</div>
                                                    <div style={{ color: '#7A728F', fontSize: '14px' }}>
                                                        Quantity: {item.quantity}
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ fontWeight: 'bold', color: '#3ECF8E' }}>
                                                GH₵{(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '16px',
                                paddingTop: '16px',
                                borderTop: '1px solid #E0E0E0',
                            }}>
                                <div>
                                    <h4 style={{ color: '#0D0C14', marginBottom: '4px' }}>Customer</h4>
                                    <p style={{ color: '#7A728F', margin: 0 }}>{order.customerName}</p>
                                    <p style={{ color: '#7A728F', margin: 0 }}>{order.customerPhone}</p>
                                    <p style={{ color: '#7A728F', margin: 0 }}>{order.customerEmail}</p>
                                </div>
                                <div>
                                    <h4 style={{ color: '#0D0C14', marginBottom: '4px' }}>Shipping Address</h4>
                                    <p style={{ color: '#7A728F', margin: 0 }}>{order.customerAddress}</p>
                                </div>
                                <div>
                                    <h4 style={{ color: '#0D0C14', marginBottom: '4px' }}>Payment Method</h4>
                                    <p style={{ color: '#7A728F', margin: 0, textTransform: 'capitalize' }}>
                                        {order.paymentMethod}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}