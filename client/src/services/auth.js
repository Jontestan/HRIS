import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail 
} from "firebase/auth";

import { auth } from "../firebase/config";

// Register user
export const register = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Login user
export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logout = async () => {
  return await signOut(auth);
};

// Password reset
export const resetPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};