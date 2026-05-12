export const messages = {
  email: {
    success: "🎉 You're subscribed!",
    already_subscribed: 'This email is already subscribed.',
    error: 'Something went wrong. Please try again.',
  },
  validation: {
    emailRequired: 'Email is required',
    emailInvalid: 'Enter a valid email address',
    passwordRequired: 'Password is required',
    passwordMin: 'Password must be at least 6 characters',
    nameRequired: 'Full name is required',
    nameInvalid: 'Enter a valid full name (letters, spaces, hyphens, apostrophes only)',
    confirmRequired: 'Please confirm your password',
    passwordMismatch: 'Passwords do not match',
  },

  auth: {
    welcomeBack: 'Welcome Back!',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    createAccount: 'Create Account',
    signingIn: 'Signing in…',
    creatingAccount: 'Creating account…',
    forgotPassword: 'Forgot Password?',
    resetPasswordTitle: 'Reset Password',
    resetPasswordSubtitle: "Enter your email and we'll send you a reset link.",
    sendLink: 'Send Reset Link',
    sendingLink: 'Sending Link…',
    resetPasswordSent: 'Password reset email sent! Check your inbox.',
  },
  errors: {
    userNotFound: 'No account found with this email.',
    invalidCredentials: 'Incorrect email or password. Please try again.',
    emailInUse: 'This email is already registered. Sign in instead.',
    tooManyRequests: 'Too many attempts. Please wait a moment and try again.',
    network: 'Network error. Check your connection and retry.',
    googleCancelled: 'Google sign-in was cancelled.',
    reportLogin: 'You must be logged in to report an animal.',
  },
  browsePets: {
    title: 'Browse Pets',
    subtitle: 'Find your perfect companion',
    filterButton: 'Filters',
    emptyTitle: 'No pets listed yet — add yours!',
    emptySubtitle: 'Help animals find loving homes by listing your pet for adoption. It only takes a few minutes.',
    ctaButton: 'Add Your Pet',
  },
  lostFound: {
    title: 'Lost & Found',
    subtitle: 'Reunite pets with their families',
    filterButton: 'Filters',
    emptyTitle: 'No reports yet — be the first!',
    emptySubtitle: 'Lost your pet or found a stray? Click here to submit a report and help connect animals with their families.',
    ctaButton: '+ Report an Animal',
    foundReportButton: 'Found / Report an Animal',
    reportFound: 'Found / Report',
    tabs: {
      all: 'All',
      lost: 'Lost',
      found: 'Found',
    }
  },
  chatBotSystemPrompt: `You are VetBot, a virtual veterinarian for PetConnect — a pet adoption platform in Pakistan.

STRICT RULES:
- ONLY answer questions about: animal health, pet behavior, breeds, nutrition, adoption, grooming, and pet care.
- If asked ANYTHING else, reply with exactly: "I can only help with pet and animal questions. 🐾"
- No exceptions. No suggestions. No elaboration on off-topic replies.
- For emergencies: "This sounds critical — go to an emergency vet immediately."
- Be warm, concise, and professional.
- Never act as a general assistant.`
};
