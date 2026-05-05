import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed: number = 30) {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isComplete, setIsComplete] = useState(false); // Tells the UI the animation is 100% done

    useEffect(() => {
        if (!text) return;

        setDisplayedText('');
        setIsTyping(true);
        setIsComplete(false);

        // Keep spaces and line breaks intact
        const wordsAndSpaces = text.split(/(\s+)/);
        let currentIndex = 0;

        const intervalId = setInterval(() => {
            if (currentIndex < wordsAndSpaces.length) {
                setDisplayedText((prev) => prev + wordsAndSpaces[currentIndex]);
                currentIndex++;
            } else {
                // The text has finished printing
                setIsTyping(false);
                setIsComplete(true);
                clearInterval(intervalId);
            }
        }, speed);

        return () => clearInterval(intervalId);

    }, [text, speed]);

    return { displayedText, isTyping, isComplete };
}