import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Input } from "rsuite";
import { AuthContext } from './hooks/AuthContext';
import React, { useContext } from "react";
//Contains all the firebase configuration
export const auditLogger = async ({
  action = "Created Account",
  user,
  userName,
  uid,
  timestamp,
}) => {
  user = auth.currentUser;

  const docData = {
    user: auth.currentUser.email.split("@")[0],
    userName: auth.currentUser.displayName,
    uid: auth.currentUser.uid,
    timestamp: serverTimestamp(),
    action,
  };
  const docRef = doc(db, "auditLogs");
  await addDoc(docRef, docData).then(() => {
    console.log("Audit Log Created");
    console.log(JSON.stringify(docRef));
  });
};
export const firebaseConfig = {
  apiKey: "AIzaSyDWCSguMcsxy-39ZV2vfPJwQdmd44JP0rk",
  authDomain: "mnc-development.firebaseapp.com",
  databaseURL: "https://mnc-development-default-rtdb.firebaseio.com",
  projectId: "mnc-development",
  storageBucket: "mnc-development.appspot.com",
  messagingSenderId: "963609543814",
  appId: "1:963609543814:web:3b15ab14993c1f49d17d07",
  measurementId: "G-E3FYEFLBKE",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const storage = getStorage(app);

export const database = getDatabase(app);

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    localStorage.setItem(JSON.stringify(user));

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
      userName: user.email.split("@")[0],
      AccountType: "Regular",
      CreatedOn: serverTimestamp,
    });
    return true;
  } catch (error) {
    return { error: error.message };
  }
};
export const createUser = async(email,userName)=>{
  const AuthToken = auth.currentUser.getIdToken();
  localStorage.setItem(JSON.stringify('user', AuthToken));
  const docRef = doc(db, "users");
  await addDoc(collection(db, "users"), {
    uuid: auth.currentUser.uid,
    email: email,
    userName: email.split("@")[0],
    AccountType: "Regular",
    CreatedOn: serverTimestamp,
  });
}
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const q = query(collection(db, "users"), where("uuid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email(),
        name: user.displayName(),
        AccountType: "Regular",
        CreatedOn: serverTimestamp(),
      }).then(() => {
        console.log("User Created");
      });
    }
  } catch (error) {
    return { error: error.message };
  }
};
class User {
  constructor(email, userName, uid, role, created_at) {
    this.email = email;
    this.userName = userName;
    this.uid = uid;
    this.role = role;
    this.created_at = created_at;
  }
  toString() {
    return JSON.stringify(this);
  }
}
const userConverter = {
  toFirestore: (user) => {
    return {
      email: user.email,
      userName: user.userName,
      uid: user.uid,
      role: user.role,
      created_at: user.created_at,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User(
      data.email,
      data.userName,
      data.uid,
      data.role,
      data.created_at
    );
  },
};
export const userSignOut = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    return false;
  }
};
export const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const res =  signInWithPopup(auth, googleProvider).then((res)=>{
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = getDocs(q);
    if (docs.docs.length === 0) {
       addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    })
    
   
   
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
export const getUserInfo = async () => {
  const user = auth.currentUser;
  if (user !== null) {
    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
      return (
        <div>
          <Input value={profile.displayName} />
          <Input value={profile.email} />
          <Input value={profile.uid} />
        </div>
      );
    });
  }
};


export default app;
