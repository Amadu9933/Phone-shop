

export function Footer() {
    return (
        <footer style={{
            background: '#0D0C14',
            color: '#7A728F',
            padding: '40px 20px',
            marginTop: 'auto',
            fontFamily: "'DM Sans', sans-serif",
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
            }}>
                <div>
                    <h3 style={{ color: '#E8B84B', marginBottom: '16px' }}>HamraazDeals</h3>
                    <p>Your trusted source for the latest  mobile phones and accessories</p>
                </div>
                <div>
                    <h4 style={{ color: 'white', marginBottom: '12px' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><a href="#" style={{ color: '#7A728F', textDecoration: 'none' }}>Home</a></li>
                        <li><a href="#" style={{ color: '#7A728F', textDecoration: 'none' }}>Products</a></li>
                        <li><a href="#" style={{ color: '#7A728F', textDecoration: 'none' }}>Cart</a></li>
                        <li><a href="#" style={{ color: '#7A728F', textDecoration: 'none' }}>Orders</a></li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ color: 'white', marginBottom: '12px' }}>Contact</h4>
                    <p>Phone: +233 540 985 004</p>
                    <p>Email: amaduhamza999@gmail.com</p>
                    <p>Address: Accra, Ghana</p>
                </div>
                <div>
                    <h4 style={{ color: 'white', marginBottom: '12px' }}>Follow Us</h4>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <a href="#" style={{ color: '#3ECF8E' }}>Facebook</a>
                        <a href="#" style={{ color: '#3ECF8E' }}>Twitter</a>
                        <a href="#" style={{ color: '#3ECF8E' }}>Instagram</a>
                    </div>
                </div>
            </div>
            <div style={{
                textAlign: 'center',
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid #2A2831',
            }}>
                <p>&copy; 2026 HamraazDeals. All rights reserved.</p>
            </div>
        </footer>
    );
}