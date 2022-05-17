import styled from 'styled-components';
import React, { useState ,useEffect,useCallback} from 'react'
import { collection, getDoc ,query,where,doc} from 'firebase/firestore';
import { db } from '../../firebase';
import { useForm } from 'react-hook-form';
import TextField from '../../components/TextField';
import SearchButton from '../../components/Buttons';
import useQueryString from '../../hooks/useQueryString';
import { sendPasswordResetEmail } from 'firebase/auth';


const SearchUserBox = styled.div`
  position: relative;
  text-align: center;
  background-color: #eeeeee;
  color: rgb(128, 128, 128);
  font-size: 20px;
  width: 80%;
  border: 1px solid rgb(197, 197, 197);
`;
const SearchHeader = styled.h4`
  text-decoration: bold;`


const SearchUser = () => {
    const [data, setData] = useState([])
    const [queryString,setSearchQuery] = useQueryString('search');
    const {register,handleSubmit,errors} = useForm()
    const handleSearch = (e) => {
        const userName = e.target.value;
        const userCollRef = db.collection('users');
        const q = query(db,("users"), where("userName", "==", userName));
        const querySnapshot = async ()=> await getDoc(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setData(doc.data())
        });   
    }
    const renderData = (data) => {
        return data.map((item, index) => {
        <TextField key={index} value={item.userName} />
        })
    }
    useEffect(() => { 
        if (data !== null) {
            renderData(data);
        }

    },[])
    return (
      <SearchUserBox>
            <SearchHeader >Search User</SearchHeader>
        <form onSubmit={handleSubmit}>
          <TextField
            canEdit
            label={null}
            onChange={(e) => e.target.value}
                    placeholder={"Search User by Email"}
                    value={setSearchQuery(e=> e.target.value)}
                    
                ></TextField>
            <SearchButton onClick={handleSubmit} type="submit">Search</SearchButton>
        </form>
      </SearchUserBox>
    );
}

export default SearchUser;