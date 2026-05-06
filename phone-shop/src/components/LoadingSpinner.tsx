

interface LoadingSpinnerProps {
    size?: number;
    color?: string;
}

export function LoadingSpinner({ size = 40, color = '#3ECF8E' }: LoadingSpinnerProps) {
    return (
        <div
            style={{
                display: 'inline-block',
                width: `${size}px`,
                height: `${size}px`,
                border: `3px solid ${color}20`,
                borderRadius: '50%',
                borderTopColor: color,
                animation: 'spin 1s ease-in-out infinite',
            }}
        />
    );
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);