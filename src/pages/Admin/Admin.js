import React,{ useState ,useEffect} from 'react';
import AdminFlex from "../../components/Custom/Containers";
import  Search  from './Search';
import { FlexboxGrid ,Container,Row,Form,Schema, Divider} from 'rsuite';
import './styles.css';
import AddListing from './AddListing';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { query,where,getDoc } from 'firebase/firestore';
import { AddUser } from './SearchUser';

const Header = () => {
  return <h1>Administrator Dashboard</h1>
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
    if (auth.currentUser !== null) {
      getUserInfo();
   }
  },[])
  return (
    <Container fluid="true" className="admin-container">
    <Header />
      
  
      <AddListing  />
      <AddUser />
   
    </Container>
  );
}


export default AdminPage;