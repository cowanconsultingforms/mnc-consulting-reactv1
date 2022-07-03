import { auth, db, storage } from '../../firebase';
import { serverTimestamp, collection,addDoc, onSnapshot } from 'firebase/firestore';



export const auditLogger = async ({ action = "Added Listing" }) => {
    const user = auth.currentUser;
    const userName = user.displayName;
    const uid = user.uid;
    const timestamp = serverTimestamp();
    const collectionRef = collection(db,"auditLogs");
    await addDoc(collectionRef, { action, userName, uid, timestamp }).then(() => {
      console.log("Audit Log Created");
      console.log(JSON.stringify(docRef));
    });
  };

export default TextField;