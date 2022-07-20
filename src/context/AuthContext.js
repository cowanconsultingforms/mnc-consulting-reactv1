import React, { createContext, useContext } from "react";
import '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setLocalPersistance } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
    const login = async(email, password)=> {
      return signInWithEmailAndPassword(auth, email, password).then(() => {
        setLocalPersistance();
      })
  }
  const signUp = async(email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(() => {
      setLocalPersistance();
    });
  }
  const logOut = () => {
    return signOut(auth);
  }
  const getUserRole = async() => {
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
  const value = {
    user,
    loading,
    admin


  }
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export default AuthContext;
