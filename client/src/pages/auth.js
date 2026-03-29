import { auth } from "../firebase/config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";

// Login function
export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Register function
export const register = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Logout function
export const logout = async () => {
  return await signOut(auth);
};

// Password reset
export const resetPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};
