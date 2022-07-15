import { db, auth, app, dbRef,} from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { Link} from "react-router-dom";

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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Datatable = () =>{
  
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = React.useState("");
  const formRef = React.useRef();
  const [type, setType] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [bedrooms, setBedrooms] = React.useState("");
  const [bathrooms, setBathrooms] = React.useStateuseState("");
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
},[]);
  console.log(data)
};




function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

