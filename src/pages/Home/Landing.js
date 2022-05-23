import React,{ useState } from 'react';
import styled from "styled-components";
import Searchbar from '../../components/Searchbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { storage } from '../../firebase';
import { ref } from 'firebase/storage';
import { Container, Header, Content, Footer,Sidebar ,Nav,Navbar,Divider} from 'rsuite';

import { Loader, Dropdown, ButtonToolbar, FlexboxGrid } from "rsuite";
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
  margin-top: 60px;
`



const Landing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const DownloadURL = () => {
      const reference = ref(storage, "images/mncdevelopmentlogo.jpg");
      const [value, loading, error] = useDownloadURL(reference);

      return (
        (
          <React.Fragment>
            <div style="margin-top:250px;">
              {loading && !error && <Loader size="lg" content="Loading..." />}
              {!loading && !error && (
                <React.Fragment>
                  <p style="margin-top:20%;">
                    <img src={value} alt="logo"></img>
                  </p>
                </React.Fragment>
              )}
            </div>
          </React.Fragment>
        ),
        [value, loading, error]
      );
    };
  return (
    <Main>
      <Divider />
      {<img src={DownloadURL()} alt="logo" />}
     
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
const HomePage = () => {
  
  return (
    <Main>
      
      <Container>
        <Header><Navbar /></Header>
        <Container>
          <Content>Content</Content>
          <Sidebar>Sidebar</Sidebar>
        </Container>
        <Footer>Footer</Footer>
      </Container>
    </Main>
  );
}
export default Landing;