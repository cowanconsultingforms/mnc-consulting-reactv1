import { db } from "../firebase";
import { getDoc, doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

const userCollectionRef = collection(db, "users"); 

class UserDataService{
    addUser = (newUser) => {
        return addDoc(userCollectionRef, newUser);
    }
    updateUser = (id, updatedUser) => { 
        const userDoc = doc(db, 'users', id);
        return updateDoc(userDoc, updatedUser);
    }
    deleteUser = (id) => { 
        const userDoc = doc(db, 'users', id);
        return deleteDoc(userDoc);
    }
    getAllUsers = () => {
        return getDocs(userCollectionRef);
    };
    getUser = (id) => {
        const userDoc = doc(db, 'users', id);
        return getDoc(userDoc);
    }

}
export default new UserDataService();