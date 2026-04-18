export const REGEX = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    /** Allows letters (including accented), spaces, hyphens, and apostrophes. Min 2 chars. */
    FULL_NAME: /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([ '-][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/,
    ONLY_DIGITS: /\D/g,
    ONLY_NON_DIGITS: /[0-9]/g,
};