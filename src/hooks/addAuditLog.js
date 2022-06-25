import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db, auth, app } from "../firebase";
import { query, getDocs, where, collection,serverTimestamp ,addDoc} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";


export const addAuditLog = () => { 
    
    const auditLog = collection('auditLog');
    
   
    const addToLog = async(e, action) => {
        const auditLog = collection(db,'auditLog');
       
            e.preventDefault()
            await addDoc(auditLog,{
         
                Action: action,
                Timestamp: serverTimestamp()
            }).then((res) => {
                console.log(res)
            });
    }
}

export default addAuditLog;