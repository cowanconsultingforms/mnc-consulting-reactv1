import React from "react";
import { useEffect, useState, useRef } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
export const accountAuditLogger = async ({ action }) => {
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
export default accountAuditLogger;
