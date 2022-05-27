import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
const NOOP = () => { }

const SearchBar = styled.input`
  width: 500px;
  padding: 10px;
  font-size: 17px;
`


const SearchBarContainer = styled.div`
  display: flex;
`
const SearchButton = styled.button`

`


const Searchbar = ({ value = '', onChange = NOOP, placeholder = '' }) => {
    return (
        <SearchBarContainer>
          <SearchBar type="text" value={value} onChange={onChange} placeholder={placeholder} />
            <SearchButton><FaSearch /></SearchButton>
        </SearchBarContainer>
    );
};

export default Searchbar;
