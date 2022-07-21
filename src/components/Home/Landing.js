import { ref as referenced } from "firebase/storage";
import React, { useState, useRef } from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Divider,
  IconButton,
  Box,
  Grid,
  TextField,
} from "@mui/material";
import { ImageBox } from "../Custom/Containers";
import { storage, db, auth } from "../../firebase";
import {
  collection,
  getDoc,
  query,
  where,
  doc,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { ColorTabs } from "./ColorTabs";
import { useEffect } from "react";
import MNCLogo from "../Constants/MNCLogo";
import{ SearchForm} from './SearchForm';
import { propTypes } from "react-bootstrap/esm/Image";

const inputProps = {
  type: "search",
  fullWidth: true,
};

export const Landing = () => {
  //react hooks, navigate to a new page,

  const navigate = useNavigate();

  //hooks to manage state of the searchbar

  //state manager to select type of query

  const [type, setType] = useState("");


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

  useEffect(() => {
    const loadLogo = () => {
      return;
    }
  })


  return (
    <Box
      component="div"
      className="search-box"
      style={{
        height: "100%",
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {<MNCLogo />}
      <Divider />
      <Grid
        container
        spacing={0}
        justifyContent="center"
        alignItems="bottom"
        className="search-button-grid"
      >
        <Grid item colSpan={4} order={1}>
          <Button
            ref={searchRef}
            className="buy-button"
            value={type}
            style={{
              fontSize: "16px",
              color: "white",
              backgroundColor: "black",
              fontWeight: "bold",
              padding: "15px",
              fontFamily: "Garamond",
            }}
            onClick={() => setType("forSale")}
          >
            Buy
          </Button>
        </Grid>

        <Grid item colSpan={4} order={2}>
          <Button
            ref={searchRef}
            className="rent-button"
            style={{
              fontWeight: "bold",
              padding: "15px",
              fontSize: "16px",
              color: "white",
              backgroundColor: "#858181",
              fontFamily: "Garamond",
            }}
            value={type}
            onClick={() => setType("forRent")}
          >
            Rent
          </Button>
        </Grid>
        <Divider />
        <Grid item colSpan={4} order={3}>
          <Button
            ref={searchRef}
            value={type}
            className="sold-button"
            style={{
              borderBox: "solid 1px black",
              textAlign: "center",
              padding: "15px",
              fontSize: "16px",
              width: "90px",
              fontFamily: "Garamond",
              backgroundColor: "lightgrey",
            }}
            onClick={() => setType("sold")}
          >
            Sold
          </Button>
        </Grid>
        <SearchForm type={type} />
      </Grid>
    </Box>
  );
};
Landing.propTypes = {
  type:propTypes.string
}
export default Landing;
