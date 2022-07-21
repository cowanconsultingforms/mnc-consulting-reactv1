import { ref, getDownloadURL } from "firebase/storage";
import { storage, auth,db } from "../../firebase";
import { serverTimestamp,collection,addDoc } from "firebase/firestore";
export const images = [
  {
    id: "1",
    imageUrl: getDownloadURL(ref(storage, "images/mncthumbnail1.jpg")),
  },
  {
    id: "2",
    imageUrl: getDownloadURL(ref(storage, "images/mncthumbnail2.jpg")),
  },
  {
    id: "3",
    imageUrl: getDownloadURL(ref(storage, "images/mncthumbnail3.jpg")),
  },
];

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
export default images;