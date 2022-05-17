import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { db, auth, } from "../../firebase";
import { query, getDocs,where,collection } from 'firebase/firestore';



const ViewAuditLog = ({ onCLick, isAdmin }) => {
    
    const [admin, setAdmin] = useState(false);
    const auditLog = db.collection('auditLog');
    const AdminCheck = () => {
        const user = sessionStorage.getItem('user');
        getDocs(db, 'users', where('userName', '==', user)).then((doc) => {
            console.log(doc.data());
        })
        

    return;
    }


    return (
        <div>
        <button onClick={AdminCheck}></button>
        </div>
    )
}