import React, { useState, useRef, forwardRef ,useEffect} from "react";
import { ref as reference } from "firebase/database";
import app, { storage, db } from "../../firebase";
import { getDoc ,onSnapshot,query,orderBy,doc} from "firebase/firestore";
import { async } from "@firebase/util";
import { useCollectionData,useDocument ,useCollection, useCollectionOnce} from "react-firebase-hooks/firestore";
import { Container,Form } from "rsuite";
import { useDownloadURL } from "react-firebase-hooks/storage";


  const TextField = forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
  });
const ForSaleListing = ({ type = 'forSale', docId, street, city, state, zip, description, listed_at, listed_by, price, images, id }) => {
  
  const q = query(db,`${type}`)
  const getOneListing = async() => {
    getDoc(q).then((doc) => {
      const listing = doc.data();
    })
  }
  return (
    <div>
      {getOneListing()}
    </div>
  )
}
const Listing = () => {
  const {
    street,
    city,
    state,
    zip,
    description,
    listed_at,
    listed_by,
    price,
    images,
    id,
    accepter,
    ...rest
  } = this.props;
  const listingRef = useRef();
  const [listing,setListing] = useState([])
  const [values, loading, error] = useDownloadURL(reference(storage, `${id}/images/${0}.jpg`));
  const [type, setType] = useState('');
    const docRef = doc(db,`listings/${type}/${type}/${id}`)
    
    const loadListing = async(type) => {
        const q = query(db, `listings/${type}/${type}/`, orderBy('created_at', 'desc'));
        await getDoc(q).then((doc) => {
            listingRef = doc.data();
        })
        listingRef.current = listing;

    }

    
  
    return (
      <div>
      </div>
    )
}
class ListingClass  {
  constructor(props) {
    this.props = props;
    this.state = {
      type: '',
      docId: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      description: '',
      listed_at: '',
      listed_by: '',
      price: '',
      images: [],
      id: '',
    };
  }
  async loadListing(type) {
    const q = query(db, `listings/${type}/${type}/`, orderBy('created_at', 'desc'));
    await getDoc(q).then((doc) => {
      this.listingRef = doc.data();
    }
    ).catch((error) => {
      console.log(error);
    }
    );
    this.listingRef.current = this.listing;
  }
}
const listingConverter: FirestoreDataConverter<ListingClass> = {
  
}