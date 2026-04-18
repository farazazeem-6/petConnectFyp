import { messages } from '../constants/messages';

export const mapAuthError = (error: string | null) => {
    if (!error) return null;

    if (error.includes('user-not-found'))
        return messages.errors.userNotFound;

    if (
        error.includes('wrong-password') ||
        error.includes('invalid-credential') ||
        error.includes('INVALID_LOGIN_CREDENTIALS')
    )
        return messages.errors.invalidCredentials;

    if (error.includes('email-already-in-use'))
        return messages.errors.emailInUse;

    if (error.includes('too-many-requests'))
        return messages.errors.tooManyRequests;

    if (error.includes('network-request-failed'))
        return messages.errors.network;

    if (error.includes('popup-closed-by-user'))
        return messages.errors.googleCancelled;

    return error;
};