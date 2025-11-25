'use client';

export default function Header() {
    return (
        <header style={{
            backgroundColor: '#61067cff',
            borderBottom: '1px solid #30363d',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.5)'
        }}>
            <div className="container" style={{
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div>
                    <h1 style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#f8f8f8ff',
                        lineHeight: '1.2',
                        textAlign: 'center'
                    }}>
                        🎓 SAB Campus
                    </h1>
                    <p style={{
                        fontSize: '13px',
                        color: '#ffffffff',
                        marginTop: '2px',
                        textAlign: 'center'
                    }}>
                        Document Submission Status Portal
                    </p>
                </div>

                <a
                    href="https://sablms.casrilanka.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    SAB LMS
                </a>
            </div>
        </header>
    );
}
