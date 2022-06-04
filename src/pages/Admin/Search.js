import React,{forwardRef} from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, onSnapshot,collection, DocumentSnapshot ,query,where} from "firebase/firestore";
import { db } from "../../firebase";
import { Form,Container,Button,Schema,FlexboxGrid, ButtonToolbar } from "rsuite";
import './styles.css';
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";



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
const Search = () => {
  const collectionRef = collection(db, "users");
  const navigate = useNavigate();
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    email: "",});
  const HandleSubmit = () => {
    if (!formRef.current.check()) {
      return;
    }
    ;
    const q = query(collection(db, "cities"), where("capital", "==", true));
    const docRef =doc(db, "users", "email", formValue.email).then((snap) => {
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
    <React.Fragment>
      <h4>Look Up User</h4>

      <Form
        ref={formRef}
        onChange={setFormValue}
        onCheck={setFormError}
        value={formValue}
        model={model}
        className="search-form"
      >
        <TextFieldSearch
          name="email"
          label="User Email"
          accepter={TextFieldSearch}
          ref={formRef}
          onChange={setFormValue}
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
        <ButtonToolbar>
          <Button
            type="submit"
            onClick={HandleSubmit}
            className="search-button"
            value="Search"
          >
            Search
          </Button>
        </ButtonToolbar>
      </Form>
    </React.Fragment>
  );
}

export  default Search;