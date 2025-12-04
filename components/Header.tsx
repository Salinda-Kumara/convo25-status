'use client';

import Link from 'next/link';
import CountdownTimer from './CountdownTimer';

interface HeaderProps {
    showNav?: boolean;
    showCountdown?: boolean;
    subtitle?: string;
}

export default function Header({
    showNav = true,
    showCountdown = true,
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
                <div className="header-right">
                    {showCountdown && <CountdownTimer />}
                    {showNav && (
                        <nav className="header-nav">
                            <Link href="/eligibility" className="header-link">
                                Eligibility List
                            </Link>
                        </nav>
                    )}
                </div>
            </div>
        </header>
    );
}
