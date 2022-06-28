import React, { useState,useEffect ,useRef} from "react";
import { db, auth, app} from "../../firebase";
import { query, getDocs,where,collection ,doc,addDoc,onSnapshot,orderBy} from 'firebase/firestore';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { Box ,Table,TableContainer,TableCell,TableHead} from "@mui/material";


export const ViewAuditLog = () => {
    
   
  const auditLog = collection("auditLog");
  
  const q = query(auditLog,orderBy("DateTime","desc").limit(25));
  const [values] = useCollectionData(q,{ idField: "DateTime" });
  const [data, setData] = useState([values]);
  const renderAuditLog = async (e) => {
    e.preventDefault();
    return values.map(data => {
      return (
        <React.Fragment>
          <Box className="audit-log-frame" component="div">
            <p>{data.DateTime}</p>
            <p>{data.User}</p>
            <p>{data.Action}</p>
            <p>{data.Description}</p>
          </Box>
        </React.Fragment>
      );
    })
    }

  useEffect(() => {
    const collRef = collection(db, "auditLog");
    const q = query(collRef, orderBy("DateTime", "desc"));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setData(
        querySnapshot.docs.map(doc => ({
          Action: doc.data().Action,
          DateTime: doc.data().DateTime,
          Description: doc.data().Description,
          Username: doc.data().Username,
          UserID: doc.data().UserID,
        }))
      )
    });
    return () => unsubscribe();
  },[]);

    return (
        <React.Fragment>
        <button onClick={()=>renderAuditLog()}>Audit Log</button>
        </React.Fragment>
    )
}

export default ViewAuditLog;