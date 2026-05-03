import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
    sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "./config";
import { createUserProfile } from "./userProfile.service";

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Email Signup
export const registerUser = async (email: string, password: string, name: string) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(response.user, {
        displayName: name,
        photoURL: `https://ui-avatars.com/api/?name=${name}`,
    });
    // ── Firestore doc create
    await createUserProfile(
        response.user.uid,
        name,
        email,
        null // In email signup there is no google photo
    );


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
    const user = response.user;
    // ── Firestore doc created
    await createUserProfile(
        user.uid,
        user.displayName ?? "",
        user.email ?? "",
        user.photoURL // google image wil go in  cloudinary
    );

    return user;
};

// Logout
export const logoutUser = async () => {
    await auth.signOut();
};

// Password Reset
export const sendPasswordReset = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
};