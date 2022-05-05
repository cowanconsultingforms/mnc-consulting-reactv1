import { useState } from 'react';
import styled from "styled-components";
import Searchbar from '../components/Searchbar';

const SearchboxModule = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:90%;
  border-bottom: 3px solid rgb(177, 177, 177);
  margin-left: 5%;
`;

const Main = styled.div`
  height: 100%;
`

const Landing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <Main>
      <SearchboxModule>
        <Searchbar 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Address, City, Zip Code, State, Listing ID"
          type="search"
        />
      </SearchboxModule>
    </Main>
  )
}
export default Landing;