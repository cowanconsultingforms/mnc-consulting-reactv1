import React, { useState,useEffect ,useRef} from "react";
import { db, auth, app} from "../../firebase";
import { query, getDocs,where,collection ,doc,addDoc,onSnapshot} from 'firebase/firestore';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { Container} from "rsuite";


export const ViewAuditLog = () => {
    
   
  const auditLog = collection("auditLog");
  const placeHolder = useRef();
  const q = query(auditLog,orderBy("DateTime","desc"));
  const [values] = useCollectionData(q,{ idField: "DateTime" });
  const [data, setData] = useState([values]);
  const renderAuditLog = async (e) => {
    e.preventDefault();
    return values.map(data => {
      return (
        <React.Fragment>
          <Container className="audit-log-frame">
            <p>{data.DateTime}</p>
            <p>{data.User}</p>
            <p>{data.Action}</p>
            <p>{data.Description}</p>
          </Container>
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
        <div>
        <button onClick={()=>renderAuditLog()}>Audit Log</button>
        </div>
    )
}