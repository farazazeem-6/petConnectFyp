import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
} from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Email Signup
export const registerUser = async (email: string, password: string, name: string) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(response.user, {
        displayName: name,
        photoURL: `https://ui-avatars.com/api/?name=${name}`,
    });

    return response.user;
};

// Email Login
export const loginUser = async (email: string, password: string) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
};

// Google Login
export const loginWithGoogle = async () => {
    const response = await signInWithPopup(auth, provider);
    return response.user;
};

// Logout
export const logoutUser = async () => {
    await auth.signOut();
};