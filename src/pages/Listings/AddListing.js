import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { forSaleDataService,forRentDataService,SoldDataService } from "../../services/crudoperations";