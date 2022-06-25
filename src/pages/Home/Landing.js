import { ref as referenced } from "firebase/storage";
import React, { useState, useRef } from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  FlexboxGrid,
  Loader,
  Input,
  IconButton,
  Form,
  Schema,
} from "rsuite";
import { ImageBox } from "../../components/Custom/Containers";
import Searchbar from "../../components/Searchbar";
import { storage, db, auth } from "../../firebase";
import { LandingFooter } from "./Footer";
import {
  collection,
  getDoc,
  query,
  where,
  doc,
  orderBy,
  getDocs,
} from "firebase/firestore";
import "./styles.css";
import { FaSearch } from "react-icons/fa";
import { StringType } from "schema-typed";

const model = Schema.Model({
  searchQuery: StringType(),
  type: StringType().isRequired("This field is required."),
});
//this is the home page

export const Landing = () => {
  //react hooks, navigate to a new page,
  const navigate = useNavigate();
  //hooks to manage state of the searchbar
  const [searchQuery, setSearchQuery] = useState("");
  //state manager to select type of query
  const [type, setType] = useState("");
  const [user] = useAuthState(auth);
  const formRef = useRef();
  const handleLogout = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/login");
  };
  const images = [
    {
      id: "1",
      reference: referenced(storage, "images/mncthumbnail1.jpg"),
    },
    {
      id: "2",
      reference: referenced(storage, "images/mncthumbnail2.jpg"),
    },
    {
      id: "3",
      reference: referenced(storage, "images/mncthumbnail3.jpg"),
    },
  ];
  const searchRef = useRef();
  const [value, loading, error] = useDownloadURL(
    referenced(storage, "images/mncdevelopmentlogo.jpg")
  );

  const DownloadURL = () => {
    const reference = referenced(storage, "images/mncdevelopmentlogo.jpg");

    const [value, loading, error] = useDownloadURL(reference);
    return (
      (
        <React.Fragment>
          {
            <React.Fragment>
              {loading && <Loader size="md" content="Loading..." />}
              <ImageBox
                id="logo"
                src={value}
                alt="logo"
                style={{
                  justifyContent: "center",
                  height: "100px",
                  width: "69px",
                }}
              ></ImageBox>
            </React.Fragment>
          }
        </React.Fragment>
      ),
      [value, loading, error]
    );
  };
  const handleSearch = async () => {
    const collRef = collection(db, type);
    const q = query(collRef, where(searchQuery, "==", "zip"));
    await getDocs(q).then(async (doc) => {
      if (doc.exists) {
        console.log(doc.data());
        navigate(`/${type}/${doc.data().id}`);
      } else {
        console.log("No such document!");
      }
    });
  };
  return (
    <Container
      className="home-page"
      style={{ height: "100%", marginTop: "100px" }}
    >
      <div className="search-box">
        {<ImageBox src={DownloadURL()} alt="logo" />}
        <Divider />
        <FlexboxGrid
          justify="start"
          align="bottom"
          className="search-button-grid"
        >
          <FlexboxGrid.Item colspan={24} order={1}>
            <Button
              ref={searchRef}
              className="buy-button"
              value={type}
              style={{
                fontSize: "20px",
                color: "white",
                backgroundColor: "black",
                fontWeight: "bold",
                padding:'15px'
              }}
              onClick={() => setType("forSale")}
            >
              Buy
            </Button>
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={24} order={2}>
            <Button
              ref={searchRef}
              className="rent-button"
              style={{
                fontWeight: "bold",
                padding: "15px",
                fontSize: "20px",
                color: "white",
                backgroundColor: "#858181",
              }}
              value={type}
              onClick={() => setType("forRent")}
            >
              Rent
            </Button>
          </FlexboxGrid.Item>
          <Divider />
          <FlexboxGrid.Item colspan={6} order={3}>
            <Button
              ref={searchRef}
              value={type}
              className="sold-button"
              style={{
                borderBox: "solid 1px black",
                textAlign: "center",
                padding: "15px",
                fontSize: "20px",
                width: "90px",
              }}
              onClick={() => setType("sold")}
            >
              Sold
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <div className="search-input">
          <Form ref={formRef} value={[type, searchQuery]}>
            <Input
              className="home-search-bar"
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Enter an address, city, or zip code"
              type="search"
            />

            <IconButton
              className="search-icon"
              icon={<FaSearch />}
              onClick={handleSearch}
            />
          </Form>
        </div>
      </div>
      <div className="landing-bottom">
        <LandingFooter className="footer" />
      </div>
    </Container>
  );
};
export default Landing;
