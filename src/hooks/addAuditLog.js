import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db, auth, app } from "../firebase";
import { query, getDocs, where, collection,serverTimestamp } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";


const addAuditLog = ({ user, action }) => { 
    const auditLog = collection('auditLog');
    const user = useAuthState(auth);
    const[collection,loading,error] = useCollection(db,auditLog)
    const addToLog = (user,action) => {
        const auditLog = db.collection('auditLog');
        const addToLog = auditLog.add({
            user: user.uid,
            UserName: user.displayName,
            action: action,
            time: serverTimestamp.now()
        });
    }
    return (
        <div>
        </div>
    )
}