import { useState, useEffect } from 'react';

export interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export function useChatVet() {
    const [messages, setMessages] = useState<Message[]>([]);

    // Premium UI State Flags
    const [isFetching, setIsFetching] = useState(false); // True while waiting for Groq
    const [isSuccess, setIsSuccess] = useState(false);   // True when the AI successfully replies
    const [error, setError] = useState<string | null>(null); // Holds any error messages

    // 1. ON MOUNT: Load saved messages from Session Storage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedSession = sessionStorage.getItem('vet-chat-session');
            if (savedSession) {
                setMessages(JSON.parse(savedSession));
            }
        }
    }, []);

    // 2. ON MESSAGE CHANGE: Save to Session Storage automatically
    useEffect(() => {
        // We only save if there are messages. If it's empty, we ensure storage is clean.
        if (messages.length > 0) {
            sessionStorage.setItem('vet-chat-session', JSON.stringify(messages));
        }
    }, [messages]);

    // 3. The Main Function to send a message
    const sendMessage = async (userText: string) => {
        if (!userText.trim()) return;

        // Reset success/error states before starting a new request
        setIsSuccess(false);
        setError(null);
        setIsFetching(true);

        const newUserMessage: Message = { role: 'user', content: userText };
        const updatedMessages = [...messages, newUserMessage];

        setMessages(updatedMessages);

        try {
            const response = await fetch('/api/chatBot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            if (!response.ok) throw new Error('Network error connecting to the Vet.');

            const data = await response.json();

            const aiReply: Message = { role: 'assistant', content: data.reply };
            setMessages((prevHistory) => [...prevHistory, aiReply]);

            // Mark as completely successful so UI knows it can stop the skeleton loader
            setIsSuccess(true);

        } catch (err) {
            console.error('Failed to send message:', err);
            // Set the error state so your UI can show a red warning box
            setError("The virtual vet is currently offline. Please try again.");
        } finally {
            // Always turn off the fetching flag, whether it succeeded or failed
            setIsFetching(false);
        }
    };

    // 4. NEW: The Reset Button Logic
    const resetChat = () => {
        setMessages([]); // Clear the UI array
        setIsSuccess(false);
        setError(null);
        // Physically delete it from the browser's session memory
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('vet-chat-session');
        }
    };

    return {
        messages,
        isFetching,
        isSuccess,
        error,
        sendMessage,
        resetChat
    };
}