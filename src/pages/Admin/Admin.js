import React,{ useState ,useEffect} from 'react';

import  Search  from './Search';
import { FlexboxGrid ,Container,Row,Form,Schema, Divider} from 'rsuite';
import './styles.css';
import AddListing from './AddListing';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { query,where,getDoc } from 'firebase/firestore';
import { AddUser } from './AddUser';
import FileUploader from './FileUploader';
const Header = () => {
  return <h1>Administrator Dashboard</h1>
}
const HeaderTwo = () => {
  return <h2>Add New Listing</h2>
}
const AdminPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState({uid:"",email:"",userName:"",role:"",});
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);

  const getUserInfo = async () => { 
    if (user) {
      console.log(user);
      const q = query(db, "users", where("uid", "==", user.uid));
      await getDoc(q).then((doc) => {
        setData(...doc.data());
        console.log(data);
        if (doc.data().admin) {
          setAdmin(true);
        }
      })
    }
  }
  useEffect(() => {

   })

  return (
    <Container fluid="true" className="admin-container">
    <Header />
      <HeaderTwo />
  
      <AddUser />
    
    </Container>
  );
}


export default AdminPage;