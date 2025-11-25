'use client';

export default function Header() {
    return (
        <header className="app-header">
            <div className="container header-container">
                <div className="header-title-container">
                    <h1 className="header-title">
                        🎓 SAB Campus
                    </h1>
                    <p className="header-subtitle">
                        Document Submission Status Portal
                    </p>
                </div>

                <a
                    href="https://sablms.casrilanka.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="header-link"
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
