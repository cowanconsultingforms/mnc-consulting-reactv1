import React,{ useState ,useEffect} from 'react'
import styled from 'styled-components';
import { db, userSignOut, auth } from "../../firebase";
import { doc, getDoc, deleteDoc ,query,collection,where} from "firebase/firestore";
import { ProfileButton } from "../../components/Custom/Buttons";
import { useAuthState, } from 'react-firebase-hooks/auth';
import { useDocumentDataOnce ,useCollectionData} from 'react-firebase-hooks/firestore';
import { Form,Schema } from 'rsuite';
//styled components, can be replaced in css file
const AccountPageProfile = styled.div`
  height: 100%;
  display:flex;
  position: relative;
  text-align: left;
  background-color: rgb(238, 238, 238);
  color: rgb(128, 128, 128);
  font-size: 20px;
  width: 90%;
  left: 5%;
  position: relative;
`;

const AccountInput = styled.input`
  display: block;
  margin-top: 10px;
  padding: 10px;
  font-size: 17px;
  width: 87%;
  border: 1px solid rgb(197, 197, 197);
  height: 28px;
  left: 5%;
`;
const ProfileNoEdit = styled.input`
  pointer-events: none;
  color: white;
  background-color: rgb(158, 158, 158);
  border: 1px solid rgb(197, 197, 197);
  height: 28px;
  display: block;
  margin-top: 10px;
  padding: 10px;
  font-size: 17px;
  width: 87%;
`;

const ErrorMessage = styled.label`
  color: red;
  display: none;
`;
const TextFieldProfile = React.forwardRef((props, ref) => {
  const { user, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${user}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={user} accepter={accepter} {...rest} />
    </Form.Group>
  );
});
//model for the rsuite form based on user in firebase
const model = Schema.Model({
  uid: Schema.Types.StringType(),
  role: Schema.Types.StringType(),
  email: Schema.Types.StringType().isEmail("Incorrect Email Format"),
  isAdmin: Schema.Types.BooleanType(),

});
//portion of Account page that loads current user's profile
export const LoadProfile = () => {
 
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    email: formValue,
  });

  const [user, loading, error] = useAuthState(auth);

  

  const handleProfileChange = (e) => {
    const userName = e.target.value;
    const docRef = doc(db, "users", userName).where('email','===',formValue.email);

    const docSnap = async () => await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
    }
  };
  

  useEffect(() => {
    if (user) {
      setFormValue({
        uid: user.uid,
      })
    }
  })
  
    //returns the heading of the profile page box using Rsuite Form Validation to validate the input
  return (
    <AccountPageProfile>
      <h4>Profile</h4>
      <Form
        ref={formRef}
        onChange={setFormValue}
        onCheck={setFormError}
        formValue={formValue}
        model={model}
      >
        <Form.Group controlId="profile-lookup">
          <Form.Control checkAsync>
            <TextFieldProfile
              id="email-field"
              label="User Email :"
              value={formValue}
              canEdit
              onChange={setFormValue((e) => e.target.value)}
              required
            />
            <ProfileButton onClick={handleProfileChange}>Save</ProfileButton>
          </Form.Control>
        </Form.Group>
      </Form>
    </AccountPageProfile>
  );
  }



//  const retrieveUser = () => {
 //   user = localStorage.getItem("user");

  //  if (!error && !loading && user) {
  //    setUserName(user);
  //  }
// };
//const LoadProfile = () => {
  //  const user = sessionStorage.getItem("user");
  //  const [value, snapshot, loading, error] = useDocumentDataOnce(
  //    doc(db, "users", user.email)
 //   );
 /*  if (!user) {
    value = null;
    snapshot = null;
    loading = false;
    error = null;
  } else {
    const ref = doc(db, "users", user.uid).withConverter(userConverter);
    const [data, loading, error] = useCollectionData(ref);
  }
      return (
        <React.Fragment>
          <div>
            <TextFieldProfile
              id="uid-field"
              label="User ID:"
              value={user.uid}
              ref={formRef}
            />

            <TextFieldProfile
              id="role-field"
              label="Role :"
              value={user.role}
            />

            <TextFieldProfile
              id="admin-field"
              label="Admin ? :"
              value={user.email}
            />
          </div>
        </React.Fragment>
      );
    } */
export default LoadProfile;
