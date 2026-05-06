import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product, CartItem } from '../data/types';
import { storage } from '../utils/storage';
import { useNotification } from '../context';
import { ReviewSection } from './ReviewSection';
import { BreadcrumbNavigation } from './BreadcrumbNavigation';
import { LoadingSpinner } from './LoadingSpinner';

export function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (id) {
            const products = storage.getProducts();
            const foundProduct = products.find((p: Product) => p.id === id);
            setProduct(foundProduct || null);
            setLoading(false);
        }
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;

        const cartItem: CartItem = {
            ...product,
            quantity,
        };

        storage.addToCart(cartItem);
        addNotification('Added to cart!', 'success');
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
                <LoadingSpinner />
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Product not found</h2>
                <button onClick={() => navigate('/')}>Go back</button>
            </div>
        );
    }

    const availabilityColor = {
        'in-stock': '#3ECF8E',
        'low-stock': '#F59E0B',
        'out-of-stock': '#FF5370',
    }[product.availability];

    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <BreadcrumbNavigation
                items={[
                    { label: 'Home', path: '/' },
                    { label: 'Products', path: '/' },
                    { label: product.name },
                ]}
            />

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '20px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '40px',
            }}>
                {/* Product Image */}
                <div>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{
                            width: '100%',
                            maxWidth: '500px',
                            height: 'auto',
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        }}
                    />
                </div>

                {/* Product Details */}
                <div>
                    <h1 style={{ color: '#0D0C14', marginBottom: '16px' }}>{product.name}</h1>
                    <p style={{
                        color: availabilityColor,
                        fontWeight: 'bold',
                        marginBottom: '16px',
                        textTransform: 'capitalize',
                    }}>
                        {product.availability.replace('-', ' ')}
                    </p>
                    <p style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#3ECF8E',
                        marginBottom: '20px',
                    }}>
                        GH₵{product.price.toFixed(2)}
                    </p>
                    <p style={{ color: '#7A728F', lineHeight: '1.6', marginBottom: '20px' }}>
                        {product.description}
                    </p>

                    {product.specs && (
                        <div style={{ marginBottom: '30px' }}>
                            <h3 style={{ color: '#0D0C14', marginBottom: '12px' }}>Specifications</h3>
                            <ul style={{ color: '#7A728F', paddingLeft: '20px' }}>
                                {product.specs.map((spec, index) => (
                                    <li key={index}>{spec}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Quantity and Add to Cart */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #E0E0E0',
                                    background: 'white',
                                    cursor: 'pointer',
                                }}
                            >
                                -
                            </button>
                            <span style={{ minWidth: '40px', textAlign: 'center' }}>{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #E0E0E0',
                                    background: 'white',
                                    cursor: 'pointer',
                                }}
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            disabled={product.availability === 'out-of-stock'}
                            style={{
                                padding: '12px 24px',
                                background: product.availability === 'out-of-stock' ? '#CCC' : '#3ECF8E',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '16px',
                                cursor: product.availability === 'out-of-stock' ? 'not-allowed' : 'pointer',
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews */}
            <ReviewSection productId={product.id} />
        </div>
    );
}