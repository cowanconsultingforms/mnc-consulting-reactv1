import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db, auth, app } from "../firebase";
import { query, getDocs, where, collection,serverTimestamp ,addDoc} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";


export const addAuditLog = ({action}) => { 
    
    
    const [action,setAction]=useState("");
    const [user]=useAuthState(auth);
    const addToLog = async(e, action) => {
        e.preventDefault();
        if(user){
        const user = auth.currentUser.email.split("@")[0];
        const auditLog = collection(db,'auditLog');
        try{
            await addDoc(auditLog,{user,Action: action,DateTime: serverTimestamp()
            }).then((res) => {
                console.log(res)
            });
        }
        catch(err){
        }
        
       
            
            
    }
}
}

export default addAuditLog;