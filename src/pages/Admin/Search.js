import React,{forwardRef} from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, onSnapshot,collection, DocumentSnapshot ,query,where, serverTimestamp,setDoc} from "firebase/firestore";
import { db ,auth} from "../../firebase";
import { Form,Container,Button,Schema,FlexboxGrid, ButtonToolbar } from "rsuite";
import './styles.css';
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import TextField from "../../components/Custom/TextField";
import { async } from "@firebase/util";

//This Component is used to search for a user by email
// It uses a custom text field to send the form ref to react on submission

const { StringType} = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired(),
});

const TextFieldSearch= forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});

//code to render search user from the admin page
const Search = () => {
  const collectionRef = collection(db, "users");
  const navigate = useNavigate();
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    email: "",
  });
  const auditLogger = async ({ action = "Modified User Account" }) => {
    const user = auth.currentUser;
    const userName = user.displayName;
    const uid = user.uid;
    const timestamp = serverTimestamp();
    const docRef = collection("auditLogs").doc();
    await setDoc(docRef, { action, userName, uid, timestamp }).then(() => {
      console.log("Audit Log Created");
      console.log(JSON.stringify(docRef));
    });
  };
  const HandleSubmit = async() => {
    if (!formRef.current.check()) {
      return;
    }
    
    const q = query(collection(db, "users"), where("email", "==", formValue.email));
    getDoc(db, "users", "email", formValue.email).then((snap) => {
      if (snap.exists) {
        console.log(snap.data());
        return (
          <React.Fragment>
            {snap.data().map((id, value) => {
              return (
                <React.Fragment>
                  <Container className="search-result">
                    <input value={value} key={id} type="text"></input>
                  </Container>
                </React.Fragment>
              );
            })
            }
          </React.Fragment>
        )
      }
    });
    }


  return (
    <Container>
      <h4>Look Up User</h4>

      <Form
        ref={formRef}
        onChange={setFormValue}
        onCheck={setFormError}
        value={formValue}
        model={model}
        className="search-form"
        checkTrigger={'change'}
        onSubmit={HandleSubmit}
      >
        <TextFieldSearch
          name="email"
          label="User Email"
          ref={formRef}
          accepter={StringType()}
          placeholder="Search User By Email"
          className="user-input"
          style={{              
                  width: " 75%",
                  padding: "12px 20px",
                  margin: "8px 0",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  boxSizing: "border-box",
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  outline: "none",
                }}
        />

          <Button
            className="search-button"
            value="Search"
            type='submit'
          >
            Search
          </Button>
      
      </Form>
      {formValue}
    </Container>
  );
}

export  default Search;