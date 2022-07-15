import { auth, db, storage } from '../../firebase';
import { serverTimestamp, collection,addDoc, onSnapshot } from 'firebase/firestore';
import { styled } from '@mui/system';
import { Paper } from '@mui/material';
import * as React from 'react';
const getUser = async( auth)=>{

try{
  const user = await auth.currentUser;
  return user;
 
}catch(err){
  console.log(err);
}
}
export const Item = styled(Paper)({
  


})
export const auditLogger = async ({ action = "Added Listing" }) => {

  try{
    const user = getUser( auth);
    const userName = user.displayName;
    const uid = user.uid;
    const timestamp = serverTimestamp();
    const collectionRef = collection(db,"auditLogs");
    await addDoc(collectionRef, { action, userName, uid, timestamp }).then((docRef) => {
      console.log("Audit Log Created");
      console.log(JSON.stringify(docRef));
    })}
  catch(err){
    console.log(err);
  }
}

export default auditLogger;