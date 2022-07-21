import { Box, TextField, IconButton } from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

import { query, collection,getDocs,where } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { db } from '../../firebase';
import { PropTypes } from "prop-types";
import { InputProps } from "@mui/material";

export const SearchForm = ({type}) => {
  const formRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = async () => {
    const collRef = collection(db, `listings/${type}/properties`);
    const q = query(collRef, where(searchQuery, "==", "zip"));
    await getDocs(q).then(async (doc) => {
      if (doc.exists) {
        console.log(doc.data());
      } else {
        console.log("No such document!");
      }
    });
  };
  return (
    <Box
      component="form"
      ref={formRef}
      value={ searchQuery}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
      }}
    >
      <TextField
        className="home-search-bar"
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Enter an address, city, or zip code"
        type="search"
        sx={{
          width: "fit-content",
          fontSize: "16px",
          boxSizing: "borderBox",
        }}
      />

      <IconButton
        className="search-icon"
        aria-label="search"
        onClick={handleSearch}
      >
        <SearchTwoToneIcon />
      </IconButton>
    </Box>
  );
};
