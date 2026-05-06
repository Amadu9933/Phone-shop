

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            padding: '20px',
            fontFamily: "'DM Sans', sans-serif",
        }}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                    padding: '8px 12px',
                    border: '1px solid #E0E0E0',
                    background: currentPage === 1 ? '#F5F5F5' : 'white',
                    color: currentPage === 1 ? '#999' : '#0D0C14',
                    borderRadius: '4px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                }}
            >
                Previous
            </button>

            {start > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        style={{
                            padding: '8px 12px',
                            border: '1px solid #E0E0E0',
                            background: 'white',
                            color: '#0D0C14',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        1
                    </button>
                    {start > 2 && <span>...</span>}
                </>
            )}

            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    style={{
                        padding: '8px 12px',
                        border: '1px solid #E0E0E0',
                        background: page === currentPage ? '#3ECF8E' : 'white',
                        color: page === currentPage ? 'white' : '#0D0C14',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    {page}
                </button>
            ))}

            {end < totalPages && (
                <>
                    {end < totalPages - 1 && <span>...</span>}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        style={{
                            padding: '8px 12px',
                            border: '1px solid #E0E0E0',
                            background: 'white',
                            color: '#0D0C14',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                    padding: '8px 12px',
                    border: '1px solid #E0E0E0',
                    background: currentPage === totalPages ? '#F5F5F5' : 'white',
                    color: currentPage === totalPages ? '#999' : '#0D0C14',
                    borderRadius: '4px',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                }}
            >
                Next
            </button>
        </div>
    );
}