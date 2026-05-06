import { Link } from 'react-router-dom';

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface BreadcrumbNavigationProps {
    items: BreadcrumbItem[];
}

export function BreadcrumbNavigation({ items }: BreadcrumbNavigationProps) {
    return (
        <nav style={{
            padding: '10px 20px',
            background: '#F8F9FA',
            fontFamily: "'DM Sans', sans-serif",
        }}>
            <ol style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
            }}>
                {items.map((item, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        {index > 0 && <span style={{ margin: '0 8px', color: '#7A728F' }}>/</span>}
                        {item.path ? (
                            <Link
                                to={item.path}
                                style={{
                                    color: index === items.length - 1 ? '#0D0C14' : '#3ECF8E',
                                    textDecoration: 'none',
                                    fontWeight: index === items.length - 1 ? 'bold' : 'normal',
                                }}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span style={{
                                color: '#0D0C14',
                                fontWeight: 'bold',
                            }}>
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}