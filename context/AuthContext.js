import React from "react";
import {
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";

import {
  signInWithPopUp,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "../app/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("Jakub");

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider(
      signInWithPopUp(auth, provider)
    );
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubsribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubsribe;
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
