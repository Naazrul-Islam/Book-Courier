import React, { useState, useEffect, createContext } from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebaseConfig";
import { Auth } from "./AuthContext";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create User
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // SignIn
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const googleSignIn = async () => {
    return signInWithPopup(auth, provider);
  };

  // Logout
  const logout = () => {
    setUser(null);
    setRole(null);
    return signOut(auth);
  };

  // Load user & role from backend
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const res = await fetch(
            `http://localhost:3000/user-role/${currentUser.email}`
          );
          const data = await res.json();
          setRole(data.role?.toLowerCase() || null);
        } catch (err) {
          console.log("Role fetch error:", err);
          setRole(null);
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Auth.Provider
      value={{ user, role, loading, createUser, signIn, googleSignIn, logout }}
    >
      {children}
    </Auth.Provider>
  );
};

export default AuthProvider;
