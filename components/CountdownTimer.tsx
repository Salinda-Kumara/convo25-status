'use client';

import { useEffect, useState, useRef } from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const FlipDigit = ({ value, label }: { value: number, label: string }) => {
    const [displayValue, setDisplayValue] = useState(value);
    const [nextValue, setNextValue] = useState(value);
    const [isFlipping, setIsFlipping] = useState(false);
    const prevValueRef = useRef(value);

    useEffect(() => {
        if (value !== prevValueRef.current) {
            setNextValue(value);
            setIsFlipping(true);

            const timeout = setTimeout(() => {
                setDisplayValue(value);
                setIsFlipping(false);
                prevValueRef.current = value;
            }, 300);

            return () => clearTimeout(timeout);
        }
    }, [value]);

    const formattedValue = displayValue.toString().padStart(2, '0');
    const formattedNext = nextValue.toString().padStart(2, '0');

    return (
        <div className="countdown-box">
            <div className="flip-digit">
                {!isFlipping && (
                    <div className="flip-digit-static">
                        <span>{formattedValue}</span>
                    </div>
                )}

                {isFlipping && (
                    <>
                        <div className="flip-digit-top-flip">
                            <span>{formattedValue}</span>
                        </div>

                        <div className="flip-digit-bottom-flip">
                            <span>{formattedNext}</span>
                        </div>
                    </>
                )}
            </div>
            <span className="countdown-label">{label}</span>
        </div>
    );
};

export default function CountdownTimer() {
    const calculateTimeLeft = (): TimeLeft => {
        // Target date: December 12, 2025 in Sri Lankan time (UTC+5:30)
        const targetDate = new Date('2025-12-08T00:00:00+05:30');
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        let timeLeft: TimeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!mounted) return null;

    return (
        <div className="countdown-container">
            <div className="countdown-label-top">Submission Deadline</div>
            <div className="countdown-wrapper">
                <FlipDigit value={timeLeft.days} label="DAYS" />
                <FlipDigit value={timeLeft.hours} label="HOURS" />
                <FlipDigit value={timeLeft.minutes} label="MINUTES" />
                <FlipDigit value={timeLeft.seconds} label="SECONDS" />
            </div>
        </div>
    );
}
