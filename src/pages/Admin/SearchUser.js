import styled from 'styled-components';
import React, { useState ,useEffect,useCallback} from 'react'
import {  getDoc ,query,where,doc} from 'firebase/firestore';
import { db } from '../../firebase';
import { Form,FlexboxGrid, Button,Schema } from 'rsuite';
import TextField from '../../components/TextField';
import SearchButton from '../../components/Buttons';
import useQueryString from '../../hooks/useQueryString';
import {useCollection} from 'react-firebase-hooks/firestore';
import { Timestamp, addDoc, collection } from "firebase/firestore";
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

const { StringType } = Schema.Types;
const model = Schema.Model({
    email: StringType().isRequired("This field is required.")

  });
const TextFieldSearch= React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});

const SearchUser = () => {
    const [data, setData] = useState([])
    const[collection,loading,error] = useCollection(db,'users');
      const formRef = React.useRef();
      const [formError, setFormError] = React.useState({});
      const [formValue, setFormValue] = React.useState({
       user:"",
      });
  const HandleSubmit = () => {
    if (!formRef.current.check()) {
      console.error("Form Error");
    } else {
      console.log(formValue);
      const { email, } = formValue;
     
      query(collection, formValue.email).then(
        (res) => {
          console.log(res);
          sessionStorage.setItem("user", JSON.stringify(res));
          setData(JSON.parse(sessionStorage.getItem("user")));
        },
        [user, loading, error]
      )}
  
    }

    const renderData = (data) => {
        return data.map((item, index) => {
        <TextField key={index} value={item.userName} />
        })
    }
    useEffect(() => { 
        if (data === null) {
            renderData(data);
        }

    },[])
  return (
  
      <SearchUserBox>
        <SearchHeader>Search User</SearchHeader>
        <Form
          ref={formRef}
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
        >
          <TextFieldSearch
           
            label={email}
           
            placeholder={"Search User by Email"}
            name="email"
            value={setFormValue(email)}
          ></TextFieldSearch>
          <Button
            style={{
              backgroundColor: "rgb(83, 83, 83)",
              color: "white",
              width: "55px",
              height: "55px",
              fontSize: "17px",
            }}
            onClick={HandleSubmit}
            type="submit"
          >
            Search
          </Button>
        </Form>
      </SearchUserBox>
  
  );
}

export default SearchUser;