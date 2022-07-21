import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import {Button,Box} from "@mui/material";
import {InputUnstyled} from '@mui/base';
import React from "react";
import './styles.css'
const NOOP = () => { }

const SearchBar = styled.input`
  padding: 10px;
  font-size: 17px;
  float: left;
  width: 80%;
  border: none;
  height: 55px;
  background: white;
  border-radius: 0;
  border: black solid 1px;
`;


const SearchBarContainer = styled.div`
  display: flex;
  width:100%;

`



const Searchbar = ({ value = "", onChange = NOOP, placeholder = "" }) => {
  return (
    <SearchBarContainer>
      <InputUnstyled className="search-input"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <Button className="home-search-button" >
        <FaSearch />
      </Button>
    </SearchBarContainer>
  );
};

export default Searchbar;