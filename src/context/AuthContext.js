import React, { createContext, useContext } from "react";
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword,signOut } from "firebase/auth";
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const login =(email, password)=> {
      return signInWithEmailAndPassword(email, password);
  }
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(email, password);
  }
  const getUser = async() => {
    if (user) {
      const userRef = collection(db, "users")
      const q = query(userRef,where)
    }
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    })
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export default AuthContext;
