import { messages } from '@/constants';
import { EMAIL_REGEX } from '@/utils/helpers';
import { useRef, useState, useEffect } from 'react';

export type SubscribeStatus =
    | 'idle'
    | 'loading'
    | 'success'
    | 'already_subscribed'
    | 'error';

export const SUBSCRIBE_MESSAGES: Record<
    Exclude<SubscribeStatus, 'idle' | 'loading'>,
    string
> = {
    success: messages.email.success,
    already_subscribed: messages.email.already_subscribed,
    error: messages.email.error,
};

const AUTO_CLEAR_DELAY = 5000; // ms

export const useFooterNewsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<SubscribeStatus>('idle');
    const inputRef = useRef<HTMLInputElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Auto-clear the status message after 5 seconds
    useEffect(() => {
        if (status === 'idle' || status === 'loading') return;

        timerRef.current = setTimeout(() => {
            setStatus('idle');
        }, AUTO_CLEAR_DELAY);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [status]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setStatus('idle');
        inputRef.current?.setCustomValidity('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 1. Empty check — browser native popup
        if (!email.trim()) {
            inputRef.current?.focus();
            inputRef.current?.reportValidity();
            return;
        }

        // 2. Regex validation — browser native tooltip
        if (!EMAIL_REGEX.test(email)) {
            inputRef.current?.setCustomValidity(messages.email.error);
            inputRef.current?.reportValidity();
            return;
        }

        // 3. Clear any previous custom validity before API call
        inputRef.current?.setCustomValidity('');
        setStatus('loading');

        try {
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setEmail('');
            } else if (res.status === 409 || data.error === 'already_subscribed') {
                setStatus('already_subscribed');
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    const showNote = status !== 'idle' && status !== 'loading';
    const isLoading = status === 'loading';
    const isSuccess = status === 'success';

    return {
        email,
        status,
        inputRef,
        showNote,
        isLoading,
        isSuccess,
        handleChange,
        handleSubmit,
    };
};