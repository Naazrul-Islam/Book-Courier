import React, { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile, // ✅ ADD THIS
} from "firebase/auth";
import { app } from "../firebaseConfig";
import { Auth } from "./AuthContext";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ CREATE USER
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ SIGN IN
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ GOOGLE LOGIN
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // ✅ UPDATE USER PROFILE (🔥 MAIN FIX)
  const updateUser = (profileData) => {
    return updateProfile(auth.currentUser, profileData);
  };

  // ✅ LOGOUT
  const logout = () => {
    setUser(null);
    setRole(null);
    return signOut(auth);
  };

  // ✅ LOAD USER & ROLE
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
      value={{
        user,
        role,
        loading,
        createUser,
        signIn,
        googleSignIn,
        updateUser, // ✅ MUST BE HERE
        logout,
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export default AuthProvider;
