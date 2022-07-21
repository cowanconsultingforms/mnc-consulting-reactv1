import React, { createContext, useContext,useCallback } from "react";
import { auth, db,signIn,createUser  } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { where,query,collection,getDoc } from "firebase/firestore";
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ userData, setUserData ] = useState({});
  const [getUser] = useCallback(
    () => {
       if (user) {
      const email = auth.currentUser.email;
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
  }, [getUser]);
  const values = {
    user,
    loading,
    userData
  }
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export default AuthContext;
