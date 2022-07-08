import React, { useState, useRef, forwardRef ,useEffect} from "react";
import { ref as reference } from "firebase/database";
import app, { storage, db } from "../../firebase";
import { getDoc ,onSnapshot,query,orderBy,doc,getDocs} from "firebase/firestore";
import { async } from "@firebase/util";
import { useCollectionData,useDocument ,useCollection, useCollectionOnce} from "react-firebase-hooks/firestore";
import { Container,Form ,Table} from "rsuite";
import { useDownloadURL } from "react-firebase-hooks/storage";
import PropTypes from "prop-types";


  const TextField = forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
  });
const ForSaleListing = ({ type , docId, street, city, state, zip, description, listed_at, listed_by, price, images, id }) => {

  const q = query(db,`${type}`)
  const getOneListing = async() => {
    getDocs(q).then((doc) => {
      const listing = doc.data();
    })
  }
  const addNewListing = async () => {
    
  }
  return (
    <ForSaleListing>
      {getOneListing()}
    </ForSaleListing>
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
    db,
    images,
    id,
    accepter,
    ...rest
  } = this.props;
  const listingRef = useRef();
  const [listing,setListing] = useState({})
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

ForSaleListing.propTypes = {
  type: PropTypes.string.isRequired,
  docId: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zip: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  listed_at: PropTypes.string.isRequired,
  listed_by: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,

}
