import { sendPasswordReset, auth, db } from "../../firebase";
import React, { useState, useRef, forwardRef, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "rsuite";


export const usePasswordReset = () => {
    
    const  [email,setEmail ] = useState(user.email);
    const userEmail = useRef();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
       
        if (user && !loading && !error) {
           userEmail.current = setEmail(user.email);
            
        }
    },[email,user,loading,error])

    return (
        <div className="password-reset-button">
        <Button className="button-password-button" onClick = {()=> sendPasswordReset(userEmail)}>Send Password Reset Email</Button>
        </div>
    )
}
export default usePasswordReset;