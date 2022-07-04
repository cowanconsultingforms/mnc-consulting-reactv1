import React,{ useState ,useEffect} from 'react';
import './styles.css';
import AddListingForm from './AddListing';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { query,where,getDoc } from 'firebase/firestore';
import FileUploader from './FileUploader';
import { Box, Typography } from '@mui/material';
import SearchUser from './SearchUser';
const Header = () => {
  return <Typography variant="h4" sx={{fontWeight:'bold',fontFamily:'Garamond'}}>Administrator Dashboard</Typography>
}
const HeaderTwo = () => {
  return <Typography variant="h4" sx={{fontWeight:'bold'}}>Add New Listing</Typography>
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
    <Box className="admin-container">
   <Header />
    <AddListingForm />
     <SearchUser />
    
    </Box>
  );
}


export default AdminPage;