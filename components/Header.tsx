'use client';

import Link from 'next/link';

interface HeaderProps {
    showNav?: boolean;
    subtitle?: string;
}

export default function Header({
    showNav = true,
    subtitle = "Document Submission Status Portal"
}: HeaderProps) {
    return (
        <header className="app-header">
            <div className="container header-container">
                <div className="header-title-container">
                    <h1 className="header-title">
                        🎓 SAB Campus
                    </h1>
                    <p className="header-subtitle">
                        {subtitle}
                    </p>
                </div>
                {showNav && (
                    <nav style={{ display: 'flex', gap: '16px' }}>
                        <Link href="/eligibility" className="header-link">
                            Eligibility List
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
}
