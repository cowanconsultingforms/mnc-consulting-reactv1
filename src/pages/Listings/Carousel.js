import { db, auth, app, dbRef,} from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import {
  query,
  getDocs,
  where,
  collection,
  serverTimestamp,
  orderBy,
  onSnapshot, 
  addDoc,
  doc, 
} from "firebase/firestore";
import {
  useCollection,
  useCollectionData,
  useDocumentData
} from "react-firebase-hooks/firestore";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const CarouselImagePull = () =>{
  /*Let me explain what is going on here, 
   When you use import * as React from 'react';, 
   it imports every react hooks. 
   Read this to get a further explanation on react hooks.   
   https://reactjs.org/docs/hooks-intro.html. I recommend reading
   the all documentation on hooks.

   To back on track, you see that the usestate and useeffect


  */
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = React.useState("");
  const formRef = React.useRef();
  const [type, setType] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [bedrooms, setBedrooms] = React.useState("");
  const [bathrooms, setBathrooms] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [listed_at, setListedAt] = React.useState("");
  const [listed_by, setListedBy] = React.useState("");
  const [images, setImages] = React.useState(""); 
  const [description, setDescription] = React.useState("");

  
  React.useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db,"listings"));
        querySnapshot.forEach((doc) => {
        list.push({id: doc.id, ...doc.data()}); 
        });
        setData(list);
        console.log(list)
    } catch (err)
      {
      console.log(err);
      }
   
    fetchData()
  };
},[data]);
  console.log(data)
};


function CarouselImage() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=1"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=2"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=3"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselImage;