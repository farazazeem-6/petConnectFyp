import { useEffect, useState } from 'react';

export function useTypewriter(text: string, speed: number = 30) {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const safeText = typeof text === 'string' ? text : '';

        if (!safeText) {
            setDisplayedText('');
            setIsTyping(false);
            setIsComplete(false);
            return;
        }

        setDisplayedText('');
        setIsTyping(true);
        setIsComplete(false);

        let currentIndex = 0;

        const interval = setInterval(() => {
            const nextChar = safeText[currentIndex];

            // Prevent undefined from ever being appended
            if (nextChar === undefined) {
                clearInterval(interval);
                setIsTyping(false);
                setIsComplete(true);
                return;
            }

            setDisplayedText((prev) => prev + nextChar);

            currentIndex++;

            if (currentIndex >= safeText.length) {
                clearInterval(interval);
                setIsTyping(false);
                setIsComplete(true);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return {
        displayedText,
        isTyping,
        isComplete,
    };
}