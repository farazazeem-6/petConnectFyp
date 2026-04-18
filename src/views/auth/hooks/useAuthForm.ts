import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { mapAuthError } from '@/utils';
import { StaticRoutes } from '@/constants';

export const useAuthForm = ({ user, loading, error }: any) => {
    const router = useRouter();
    const [apiError, setApiError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (submitted && user && !loading) {
            router.push(StaticRoutes.HOME);
        }
    }, [submitted, user, loading, router]);

    useEffect(() => {
        if (submitted) {
            setApiError(mapAuthError(error));
        }
    }, [error, submitted]);

    const clearFieldError = (key: string) => {
        if (fieldErrors[key]) {
            setFieldErrors((prev) => ({ ...prev, [key]: '' }));
        }
        if (apiError) setApiError(null);
    };

    return {
        apiError,
        setApiError,
        fieldErrors,
        setFieldErrors,
        clearFieldError,
        setSubmitted,
    };
};