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
const forSaleRef = collection(db, "forSale");

class ForSaleDataService{
    addListing = (newListing) => { 
        return addDoc(forSaleRef, newListing);
    }
    updateListing = (id, updatedListing) => {
        const listingDoc = doc(db, 'forSale', id);
        return updateDoc(listingDoc, updatedListing);
    }
    deleteListing = (id) => {
        const listingDoc = doc(db, 'forSale', id);
        return deleteDoc(listingDoc);
    }
    getAllListings = () => {
        return getDocs(forSaleRef);
    }
    getListing = (id) => {
        const listingDoc = doc(db, 'forSale', id);
        return getDoc(listingDoc);
    }
}

const forRentRef = collection(db, "forRent");

class ForRentDataService{
    addListing = (newListing) => { 
        return addDoc(forRentRef, newListing);
    }
    updateListing = (id, updatedListing) => {
        const listingDoc = doc(db, 'forRent', id);
        return updateDoc(listingDoc, updatedListing);
    }
    deleteListing = (id) => {
        const listingDoc = doc(db, 'forRent', id);
        return deleteDoc(listingDoc);
    }
    getAllListings = () => {
        return getDocs(forRentRef);
    }
    getListing = (id) => {
        const listingDoc = doc(db, 'forRent', id);
        return getDoc(listingDoc);
    }
}
const soldRef = collection(db, "sold");
class SoldDataService {
    addListing = (newListing) => {
        return addDoc(soldRef, newListing);
    }
    updateListing = (id, updatedListing) => {
        const listingDoc = doc(db, 'sold', id);
        return updateDoc(listingDoc, updatedListing);
    }
    deleteListing = (id) => {
        const listingDoc = doc(db, 'sold', id);
        return deleteDoc(listingDoc);
    }
    getAllListings = () => {
        return getDocs(soldRef);
    }
    getListing = (id) => {
        const listingDoc = doc(db, 'sold', id);
        return getDoc(listingDoc);
    }
}
export default new UserDataService();
export const forSaleDataService = new ForSaleDataService();
export const forRentDataService = new ForRentDataService();
export const soldDataService = new SoldDataService();