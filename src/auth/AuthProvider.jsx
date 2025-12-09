import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Firestore
import { app } from "../firebaseConfig";
import { Auth } from "./AuthContext";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // ⭐ NEW
  const [loading, setLoading] = useState(true);

  // Create User
  const createUser = async (email, password) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Default role = user
    await setDoc(doc(db, "users", result.user.uid), {
      email,
      role: "user",
    });

    return result;
  };

  // SignIn Email/Password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const googleSignIn = async () => {
    const result = await signInWithPopup(auth, provider);

    const userRef = doc(db, "users", result.user.uid);
    const userSnap = await getDoc(userRef);

    // If first time Google login → create role entry
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: result.user.email,
        role: "user",
      });
    }

    return result;
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    return signOut(auth);
  };

  const ForgetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // ⭐ Load User + Role
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Load role from Firestore
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setRole(snap.data().role);
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    role,      // ⭐ exposed
    loading,
    createUser,
    logout,
    signIn,
    updateUser,
    googleSignIn,
    ForgetPassword,
  };

  return <Auth value={authData}>{children}</Auth>;
};

export default AuthProvider;
