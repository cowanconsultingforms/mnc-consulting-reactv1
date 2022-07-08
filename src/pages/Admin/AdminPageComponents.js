import { auth, db, storage } from '../../firebase';
import { serverTimestamp, collection,addDoc, onSnapshot } from 'firebase/firestore';

const getUser = async( auth)=>{

try{
  const user = await auth.currentUser;
  console.log(user);
}catch(err){
  console.log(err);
}
}

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