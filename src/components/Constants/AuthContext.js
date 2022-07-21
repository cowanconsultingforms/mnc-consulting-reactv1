/*
import { createContext } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import {signIn,signOut,signUp,auth} from '../firebase';
export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    login: () => {},
    logout: () => {}
});

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        currentUser: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        currentUser: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
*/