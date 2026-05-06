import type { CartItem } from '../data/types';

interface CartModalProps {
    cartItems: CartItem[];
    onClose: () => void;
    onRemoveItem: (id: string) => void;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onCheckout: () => void;
}

export function CartModal({
    cartItems,
    onClose,
    onRemoveItem,
    onUpdateQuantity,
    onCheckout,
}: CartModalProps) {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClick={onClose}
            >
                <div
                    style={{
                        background: 'white',
                        borderRadius: '8px',
                        maxWidth: '600px',
                        width: '90%',
                        maxHeight: '80vh',
                        overflow: 'auto',
                        padding: '20px',
                        fontFamily: "'DM Sans', sans-serif",
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h2 style={{ margin: 0, color: '#0D0C14' }}>Shopping Cart</h2>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '24px',
                                cursor: 'pointer',
                                color: '#7A728F',
                            }}
                        >
                            ×
                        </button>
                    </div>

                    {cartItems.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#7A728F' }}>Your cart is empty</p>
                    ) : (
                        <>
                            <div style={{ marginBottom: '20px' }}>
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '12px 0',
                                            borderBottom: '1px solid #E0E0E0',
                                        }}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                objectFit: 'cover',
                                                borderRadius: '4px',
                                                marginRight: '12px',
                                            }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ margin: '0 0 4px 0', color: '#0D0C14' }}>{item.name}</h4>
                                            <p style={{ margin: 0, color: '#3ECF8E', fontWeight: 'bold' }}>
                                                GH₵{item.price.toFixed(2)}
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                                style={{
                                                    padding: '4px 8px',
                                                    border: '1px solid #E0E0E0',
                                                    background: 'white',
                                                    cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                                                }}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                style={{
                                                    padding: '4px 8px',
                                                    border: '1px solid #E0E0E0',
                                                    background: 'white',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => onRemoveItem(item.id)}
                                            style={{
                                                marginLeft: '12px',
                                                background: '#FF5370',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                padding: '4px 8px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div style={{ borderTop: '1px solid #E0E0E0', paddingTop: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <strong style={{ color: '#0D0C14' }}>Total:</strong>
                                    <strong style={{ color: '#3ECF8E' }}>GH₵{totalAmount.toFixed(2)}</strong>
                                </div>
                                <button
                                    onClick={onCheckout}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        background: '#3ECF8E',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontSize: '16px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}