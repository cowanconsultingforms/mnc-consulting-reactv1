import React,{ useState ,useEffect} from 'react';

import  Search  from './Search';
import { Container} from 'rsuite';
import './styles.css';
import AddListing from './AddListing';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { query,where,getDoc } from 'firebase/firestore';
//import { AddUser } from './AddUser';
import FileUploader from './FileUploader';
import { Box, Typography } from '@mui/material';
const Header = () => {
  return <Typography variant="h1">Administrator Dashboard</Typography>
}
const HeaderTwo = () => {
  return <Typography variant="h4">Add New Listing</Typography>
}
const AdminPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState({uid:"",email:"",userName:"",role:"",});
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [currentUser,setCurrentuser] = useState('')

  useEffect(() => {

   })

  return (
    <Box fluid="true" className="admin-container">
   
  
     
    
    </Box>
  );
}


export default AdminPage;