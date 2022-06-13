import React,{ useState ,useEffect,forwardRef} from 'react'
import styled from 'styled-components';
import { db, auth } from "../../firebase";
import { doc, getDoc ,query,collection,where} from "firebase/firestore";
import { ProfileButton } from "../../components/Custom/Buttons";
import { useAuthState, } from 'react-firebase-hooks/auth';
import { useDocumentDataOnce ,useCollectionData} from 'react-firebase-hooks/firestore';
import { Form,Schema,Button,Input, FlexboxGrid } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';

const TextFieldProfile = forwardRef((props, ref) => {
  const { uid,userName,role,email, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${userName}`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={userName} accepter={accepter} {...rest} />
    </Form.Group>
  );
});
//model for the rsuite form based on user in firebase
const model = Schema.Model({
  uid: Schema.Types.StringType(),
  role: Schema.Types.StringType(),
  email: Schema.Types.StringType().isEmail("Incorrect Email Format"),
  role:Schema.Types.StringType(),

});
//portion of Account page that loads current user's profile
export const LoadProfile = () => {
 
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    email: '',
    role: '',
    uid: '',
    userName:''
  });

  const [user, loading, error] = useAuthState(auth);
  const handleSubmit = () => {
    
  }
  const renderProfile = () => {
    const q = query(collection('users')).where('uid', '==', user.uid);
    getDoc(q).then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setFormValue(data);
        return (
          <div className="profile-container">
            <FlexboxGrid>
            <FlexboxGridItem>
            
              </FlexboxGridItem>
            </FlexboxGrid>
            </div>
        )
      }
    })
    return (
      <div className="account-page-profile">
        <h1>Profile</h1>
        <Form ref={formRef} model={model} onSubmit={handleSubmit}>
          <TextFieldProfile
          accepter={Input} />
        </Form>
        </div>
    )
  }

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
      renderProfile(user);
      setFormValue({
        uid: user.uid,
      })
    }
    },[user])
  
    //returns the heading of the profile page box using Rsuite Form Validation to validate the input
    return (
    <div className="account-page-profile">
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
            <Button onClick={handleProfileChange} type="submit">Save</Button>
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
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
