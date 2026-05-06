
interface FilterSidebarProps {
    categories: string[];
    selectedCategories: string[];
    onCategoryChange: (categories: string[]) => void;
    priceRange: [number, number];
    onPriceChange: (range: [number, number]) => void;
    sortBy: string;
    onSortChange: (sort: string) => void;
    isOpen: boolean;
    onToggle: () => void;
}

export function FilterSidebar({
    categories,
    selectedCategories,
    onCategoryChange,
    priceRange,
    onPriceChange,
    sortBy,
    onSortChange,
    isOpen,
    onToggle,
}: FilterSidebarProps) {
    const handleCategoryChange = (category: string, checked: boolean) => {
        if (checked) {
            onCategoryChange([...selectedCategories, category]);
        } else {
            onCategoryChange(selectedCategories.filter(c => c !== category));
        }
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 999,
                    }}
                    onClick={onToggle}
                />
            )}

            <aside style={{
                position: 'fixed',
                top: 0,
                left: isOpen ? 0 : '-300px',
                width: '300px',
                height: '100vh',
                background: 'white',
                boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
                padding: '20px',
                overflowY: 'auto',
                transition: 'left 0.3s ease',
                zIndex: 1000,
                fontFamily: "'DM Sans', sans-serif",
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, color: '#0D0C14' }}>Filters</h3>
                    <button
                        onClick={onToggle}
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

                {/* Categories */}
                <div style={{ marginBottom: '30px' }}>
                    <h4 style={{ marginBottom: '12px', color: '#0D0C14' }}>Categories</h4>
                    {categories.map(category => (
                        <label key={category} style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={(e) => handleCategoryChange(category, e.target.checked)}
                                style={{ marginRight: '8px' }}
                            />
                            {category}
                        </label>
                    ))}
                </div>

                {/* Price Range */}
                <div style={{ marginBottom: '30px' }}>
                    <h4 style={{ marginBottom: '12px', color: '#0D0C14' }}>Price Range</h4>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => onPriceChange([Number(e.target.value), priceRange[1]])}
                            placeholder="Min"
                            style={{
                                flex: 1,
                                padding: '8px',
                                border: '1px solid #E0E0E0',
                                borderRadius: '4px',
                            }}
                        />
                        <span>-</span>
                        <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
                            placeholder="Max"
                            style={{
                                flex: 1,
                                padding: '8px',
                                border: '1px solid #E0E0E0',
                                borderRadius: '4px',
                            }}
                        />
                    </div>
                </div>

                {/* Sort */}
                <div>
                    <h4 style={{ marginBottom: '12px', color: '#0D0C14' }}>Sort By</h4>
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #E0E0E0',
                            borderRadius: '4px',
                        }}
                    >
                        <option value="name">Name</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
            </aside>
        </>
    );
}