import { createContext } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import {signIn,signOut,signUp,auth} from '../firebase';
export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    login: () => {},
    logout: () => {}
});