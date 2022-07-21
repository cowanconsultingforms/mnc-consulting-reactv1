<<<<<<< HEAD
import React, { createContext, useContext } from "react";
import '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setLocalPersistance } from "../firebase";

=======
import React, { createContext, useContext,useCallback } from "react";
import { auth, db,signIn,createUser  } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { where,query,collection,getDoc } from "firebase/firestore";
>>>>>>> 715867b625559e92d1e0857e131dffeb22f622b4
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
<<<<<<< HEAD
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
=======
  const [ loading, setLoading ] = useState(true);
  const [ userData, setUserData ] = useState({});
  const [getUser] = useCallback(
    () => {
       if (user) {
      const email = auth.currentUser.email;
>>>>>>> 715867b625559e92d1e0857e131dffeb22f622b4
      const userRef = collection(db, "users")
      const q = query(userRef, where("email", "==", email));
      const userDoc = getDoc(q).then((doc) => {
        setUserData(...doc[ 0 ]);
        return userDoc;
      }
        
      );
    }
    return getUser;
    },
    [user],
  )
    const login =(email, password)=> {
      return signInWithEmailAndPassword(auth,email, password);
  }
  const signUp = async(email, password) => {
    return createUserWithEmailAndPassword(auth,email, password);
  }
  const logOut = () => {
    return signOut(auth());
  }

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      getUser();
      setLoading(false);
    })
    return unsubscribe;
<<<<<<< HEAD
  }, []);
  const value = {
    user,
    loading,
    admin


=======
  }, [getUser]);
  const values = {
    user,
    loading,
    userData
>>>>>>> 715867b625559e92d1e0857e131dffeb22f622b4
  }
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export default AuthContext;
