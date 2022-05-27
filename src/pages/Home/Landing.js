import React,{ useState ,useEffect} from 'react';
import styled from "styled-components";
import Searchbar from '../../components/Searchbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { storage,auth } from '../../firebase';
import { ref } from 'firebase/storage';
import { Container, Header, Content, Footer,Sidebar ,Nav,Divider} from 'rsuite';
import './styles.css';
import { Loader, Dropdown, ButtonToolbar, FlexboxGrid } from "rsuite";
import { NavBar } from '../../components/Navbar';
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
  margin-top: 100px;
`
const ImageBox = styled.img`
  justify-content:center;
  align-items:center;`



const Landing = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const DownloadURL = () => {
      const reference = ref(storage, "images/mncdevelopmentlogo.jpg");
      const [value, loading, error] = useDownloadURL(reference);

      return (
        (
          <React.Fragment>
           
            
              { (
                <React.Fragment>
              
                    <ImageBox
                      id="logo"
                      src={value}
                      alt="logo"
                      style="justify-content:center;"
                    ></ImageBox>
      
                </React.Fragment>
              )}
      
          </React.Fragment>
        ),
        [value, loading, error]
      );
  };
    

  return (
    <Main>
      <Container className="LandingContainer">
        <SearchboxModule>
          {<ImageBox src={DownloadURL()} alt="logo" />}
          <Divider />
          <Searchbar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Address, City, Zip Code, State, Listing ID"
            type="search"
          />
        </SearchboxModule>
      </Container>
    </Main>
  );
}
const HomePage = () => {
  
  return (
    <Main>
      
      <Container>
        <Header></Header>
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