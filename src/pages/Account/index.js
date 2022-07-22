import AccountPage from "../../components/Account/Account";
import SignOutBox from "../../components/Account/SignOutBox";
import { db, auth, app, dbRef,} from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  query,
  getDocs,
  where,
  collection,
  serverTimestamp,
  orderBy,
  onSnapshot, 
  addDoc,
  doc, 
} from "firebase/firestore";
import {
  useCollection,
  useCollectionData,
  useDocumentData
} from "react-firebase-hooks/firestore";
import * as React from 'react';
export const AccountProfile = () => {

    const accountAuditLogger = async ({ action }) => {
      if (action === "Delete Account") {
        const actionLogged = "Deleted Account";
      }
      try {
        const user = auth.currentUser;
        const userName = user.displayName;
        const uid = user.uid;
        const timestamp = serverTimestamp();
        const collectionRef = collection(db, "auditLogs");
        await addDoc(collectionRef, { action, userName, uid, timestamp })
          .then((docRef) => {
            console.log("Audit Log Created");
            console.log(JSON.stringify(docRef));
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    };
}
export default AccountProfile;