import React from "react";
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { doc, useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

export const LoadProfile = () => {
     
       const navigate = useNavigate();
       const formRef = React.useRef();
       const [formError, setFormError] = React.useState({});
       const [formValue, setFormValue] = React.useState({
         email: "",
         
       });
  const user = useAuthState(auth);
  const [value, snapshot, loading, error] = useDocumentDataOnce(
    doc(db, "users", user.email)
  );
  if (!user) {
    value = null;
    snapshot = null;
    loading = false;
    error = null;
  } else {
    const ref = doc(db, "users", user.uid).withConverter(userConverter);
      const [data, loading, error] = useCollectionData(ref);
      
    return (
      <React.Fragment>
        <div>
          <TextFieldProfile
            id="uid-field"
            label="User ID:"
            value={user.uid}
            ref={formRef}
          />

          <TextFieldProfile id="role-field" label="Role :" value={user.role} />

          <TextFieldProfile
            id="admin-field"
            label="Admin ? :"
            value={user.email}
          />
        </div>
      </React.Fragment>
    );
  }
};
const model = Schema.Model({
  
})