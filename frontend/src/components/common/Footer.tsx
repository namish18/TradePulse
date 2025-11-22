const linkStyle: React.CSSProperties = {
  color: 'var(--color-gray-400)',
  transition: 'color var(--transition-base)',
  textDecoration: 'none',
  cursor: 'pointer',
};

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-primary-light)',
        borderTop: '1px solid rgba(2, 6, 111, 0.2)',
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem',
          }}
        >
          {/* Brand */}
          <div>
            <h3 style={{ color: 'var(--color-white)', fontWeight: '700', fontSize: '1.125rem', marginBottom: '1rem' }}>
              Trading Platform
            </h3>
            <p style={{ color: 'var(--color-gray-400)', fontSize: '0.875rem' }}>
              Advanced trading analytics and risk management tools.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ color: 'var(--color-white)', fontWeight: '600', marginBottom: '1rem' }}>Product</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Features', 'Pricing', 'Documentation'].map((item) => (
                <li key={item} style={{ marginBottom: '0.5rem' }}>
                  <a
                    href="#"
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-white)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-gray-400)';
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: 'var(--color-white)', fontWeight: '600', marginBottom: '1rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['About', 'Blog', 'Contact'].map((item) => (
                <li key={item} style={{ marginBottom: '0.5rem' }}>
                  <a
                    href="#"
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-white)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-gray-400)';
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ color: 'var(--color-white)', fontWeight: '600', marginBottom: '1rem' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Privacy', 'Terms', 'Security'].map((item) => (
                <li key={item} style={{ marginBottom: '0.5rem' }}>
                  <a
                    href="#"
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-white)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-gray-400)';
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: '1px solid rgba(2, 6, 111, 0.2)',
            paddingTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <p style={{ color: 'var(--color-gray-400)', fontSize: '0.875rem', order: 1 }}>
            © 2024 Trading Platform. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', order: 2 }}>
            {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
              <a
                key={social}
                href="#"
                style={linkStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-white)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-gray-400)';
                }}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
