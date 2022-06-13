import React,{ useState ,useEffect} from 'react';
import AdminFlex from "../../components/Custom/Containers";
import  Search  from './Search';
import { FlexboxGrid ,Container,Header,Row,Form,Schema, Divider} from 'rsuite';
import './styles.css';
import AddListing from './AddListing';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { query,where } from 'firebase/firestore';



const AdminPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      query(db, 'users', where('uid', '==', user.uid)).then(res => { 
        setData(res.docs[0].data())
      })
    }
  })
  return (
    <Container fluid="true" className="admin-container">
  
        <h1> Administrator Page</h1>
  
   
       <AddListing />
   
    </Container>
  );
}


export default AdminPage;