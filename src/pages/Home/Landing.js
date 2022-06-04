import React,{ useState ,useEffect} from 'react';
import styled from "styled-components";
import Searchbar from '../../components/Searchbar';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { storage,auth } from '../../firebase';
import { ref,getDownloadURL } from 'firebase/storage';
import { Container,Divider,Button} from 'rsuite';
import './styles.css';
import { Loader, Dropdown, ButtonToolbar, FlexboxGrid } from "rsuite";
import { Footer } from './Footer';
import { ImageBox } from '../../components/Custom/Containers';
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



const Landing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const images = [
    {
      id: "1",
      reference: ref(storage, "images/mncthumbnail1.jpg"),
    },
    {
      id: "2",
      reference: ref(storage, "images/mncthumbnail2.jpg"),
    },
    {
      id: "3",
      reference: ref(storage, "images/mncthumbnail3.jpg"),
    },
  ];
  const renderFooter = ({images}) => {
    
  }
  const DownloadURL = ({images}) => {
    const reference = ref(storage, "images/mncdevelopmentlogo.jpg");
    const { values } = images;
      const [value, loading, error] = useDownloadURL(values.reference);
      return (
        (
          <React.Fragment>
              { (
                <React.Fragment>
                {loading && <Loader size="md" content="Loading..." />}
                    <ImageBox
                      id="logo"
                      src={value}
                      alt="logo"
                      style={{justifyContent:'center',height:'100px',width:'69px'}}
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
      <Container className="home-page">
        <SearchboxModule>
          {<ImageBox src={DownloadURL()} alt="logo" />}
          <Divider />
          <ButtonToolbar>
            <Button className="buy-button">
            </Button>
            <Button className="rent-button"></Button>
            <Button className="sold-button"></Button>
          </ButtonToolbar>
          <Searchbar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Address, City, Zip Code, State, Listing ID"
            type="search"
          />
        </SearchboxModule>
        { <Footer />}
      </Container>
    </Main>
  );
}
export default Landing;