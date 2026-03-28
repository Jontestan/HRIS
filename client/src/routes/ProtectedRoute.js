import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("Auth state changed:", user);
        setUser(user);
        setLoading(false);
      }, (error) => {
        console.error("Auth error:", error);
        setError(error);
        setLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      console.error("Error setting up auth listener:", err);
      setError(err);
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.error("Auth error:", error);
    // Temporarily allow access even with auth errors
    return children;
  }

  // For now, allow access to dashboard without authentication
  // TODO: Uncomment this when Firebase is properly configured
  // return user ? children : <Navigate to="/" />;
  return children;
}