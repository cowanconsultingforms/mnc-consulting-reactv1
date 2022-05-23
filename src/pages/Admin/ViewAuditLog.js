import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { db, auth, app} from "../../firebase";
import { query, getDocs,where,collection ,doc,addDoc} from 'firebase/firestore';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from "react-firebase-hooks/auth";


const ViewAuditLog = () => {
    
   
  const auditLog = collection("auditLog");
  const docRef = auditLog.doc();
  const q = query()
  
  
  const renderAuditLog = () => {
    const [values,loading,error,snapshot ] = useCollectionData(doc(db), 'auditLog', docRef,
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    });
    return values.map((snapshot) => {
      doc = snapshot.data()
      return (
        <React.Fragment>
          <div className="AuditLog">
            <p>{doc.action}</p>
            <p>{doc.userName}</p>
            <p>{doc.timestamp}</p>
          </div>
        </React.Fragment>
      );
    });
  }


    return (
        <div>
        <button onClick={()=>renderAuditLog()}></button>
        </div>
    )
}