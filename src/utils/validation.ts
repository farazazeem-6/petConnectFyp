import { REGEX } from '../constants/regex';
import { messages } from '../constants/messages';

export const validateLogin = (email: string, password: string) => {
    const errors: Record<string, string> = {};

    if (!email) errors.email = messages.validation.emailRequired;
    else if (!REGEX.EMAIL.test(email))
        errors.email = messages.validation.emailInvalid;

    if (!password) errors.password = messages.validation.passwordRequired;
    else if (password.length < 6)
        errors.password = messages.validation.passwordMin;

    return errors;
};

export const validateSignup = (
    name: string,
    email: string,
    password: string,
    confirm: string
) => {
    const errors: Record<string, string> = {};

    if (!name.trim()) errors.name = messages.validation.nameRequired;
    else if (!REGEX.FULL_NAME.test(name.trim())) errors.name = messages.validation.nameInvalid;

    if (!email) errors.email = messages.validation.emailRequired;
    else if (!REGEX.EMAIL.test(email))
        errors.email = messages.validation.emailInvalid;

    if (!password) errors.password = messages.validation.passwordRequired;
    else if (password.length < 6)
        errors.password = messages.validation.passwordMin;

    if (!confirm) errors.confirm = messages.validation.confirmRequired;
    else if (confirm !== password)
        errors.confirm = messages.validation.passwordMismatch;

    return errors;
};

export const validateResetEmail = (email: string): string | null => {
    if (!email.trim()) return messages.validation.emailRequired;
    if (!REGEX.EMAIL.test(email.trim())) return messages.validation.emailInvalid;
    return null;
};