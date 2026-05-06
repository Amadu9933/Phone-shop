import { useState } from 'react';
import type { Product } from '../data/types';
import { storage } from '../utils/storage';
import { useNotification } from '../context';

interface AdminFormProps {
    product?: Product;
    onSave: () => void;
    onCancel: () => void;
}

export function AdminForm({ product, onSave, onCancel }: AdminFormProps) {
    const { addNotification } = useNotification();
    const [formData, setFormData] = useState<Product>({
        id: product?.id || Date.now().toString(),
        name: product?.name || '',
        category: product?.category || 'phone',
        price: product?.price || 0,
        image: product?.image || '',
        availability: product?.availability || 'in-stock',
        description: product?.description || '',
        specs: product?.specs || [],
    });

    const [specsInput, setSpecsInput] = useState((formData.specs ?? []).join('\n'));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.description.trim()) {
            addNotification('Please fill in required fields', 'error');
            return;
        }

        const updatedProduct: Product = {
            ...formData,
            specs: specsInput.split('\n').filter(s => s.trim()),
        };

        if (product) {
            // Update existing
            storage.updateProduct(product.id, updatedProduct);
            addNotification('Product updated!', 'success');
        } else {
            // Add new
            storage.addProduct(updatedProduct);
            addNotification('Product added!', 'success');
        }

        onSave();
    };

    const handleDelete = () => {
        if (product && window.confirm('Are you sure you want to delete this product?')) {
            storage.deleteProduct(product.id);
            addNotification('Product deleted!', 'success');
            onSave();
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            fontFamily: "'DM Sans', sans-serif",
        }}>
            <h2 style={{ color: '#0D0C14', marginBottom: '20px' }}>
                {product ? 'Edit Product' : 'Add New Product'}
            </h2>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', color: '#0D0C14' }}>
                    Name *
                </label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #E0E0E0',
                        borderRadius: '4px',
                    }}
                    required
                />
            </div>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', color: '#0D0C14' }}>
                    Category
                </label>
                <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as 'phone' | 'accessory' })}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #E0E0E0',
                        borderRadius: '4px',
                    }}
                >
                    <option value="phone">Phone</option>
                    <option value="accessory">Accessory</option>
                </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', color: '#0D0C14' }}>
                    Price (GH₵)
                </label>
                <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    min="0"
                    step="0.01"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #E0E0E0',
                        borderRadius: '4px',
                    }}
                />
            </div>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', color: '#0D0C14' }}>
                    Image URL
                </label>
                <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #E0E0E0',
                        borderRadius: '4px',
                    }}
                />
            </div>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', color: '#0D0C14' }}>
                    Availability
                </label>
                <select
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value as any })}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #E0E0E0',
                        borderRadius: '4px',
                    }}
                >
                    <option value="in-stock">In Stock</option>
                    <option value="low-stock">Low Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', color: '#0D0C14' }}>
                    Description *
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #E0E0E0',
                        borderRadius: '4px',
                        resize: 'vertical',
                    }}
                    required
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '4px', color: '#0D0C14' }}>
                    Specifications (one per line)
                </label>
                <textarea
                    value={specsInput}
                    onChange={(e) => setSpecsInput(e.target.value)}
                    rows={4}
                    placeholder="6.1&quot; display&#10;256GB&#10;48MP camera"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #E0E0E0',
                        borderRadius: '4px',
                        resize: 'vertical',
                    }}
                />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                    type="button"
                    onClick={onCancel}
                    style={{
                        padding: '10px 20px',
                        background: '#7A728F',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Cancel
                </button>
                {product && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        style={{
                            padding: '10px 20px',
                            background: '#FF5370',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Delete
                    </button>
                )}
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        background: '#3ECF8E',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    {product ? 'Update' : 'Add'} Product
                </button>
            </div>
        </form>
    );
}