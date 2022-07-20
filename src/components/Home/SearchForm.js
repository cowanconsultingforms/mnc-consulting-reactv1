import { Box, TextField, IconButton } from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import React,{useState} from "react";
import {collection,where,getDocs,query} from 'firebase/firestore';
export const SearchForm = (props) => {
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
      value={[type, searchQuery]}
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
        inputProps={inputProps}
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
