import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./db";
import { uploadImageToCloudinary } from "../cloudinary";

export const createUserProfile = async (
    uid: string,
    name: string,
    email: string,
    googlePhotoURL: string | null
) => {
    let photoURL = googlePhotoURL;

    // ── Google image upload to Cloudinary
    if (googlePhotoURL) {
        const res = await fetch(googlePhotoURL);
        const blob = await res.blob();
        const file = new File([blob], "avatar.jpg", { type: blob.type });

        const cloudinaryUrl = await uploadImageToCloudinary(file);
        if (cloudinaryUrl) photoURL = cloudinaryUrl;
    }

    // Make a doc in Firestore
    await setDoc(doc(db, "users", uid), {
        uid,
        name,
        email,
        photoURL: photoURL ?? `https://ui-avatars.com/api/?name=${name}`,
        createdAt: serverTimestamp(),
    });
};