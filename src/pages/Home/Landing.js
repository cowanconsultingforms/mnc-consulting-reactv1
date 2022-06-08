import { ref } from 'firebase/storage';
import React, { useState } from 'react';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Divider, FlexboxGrid, Loader } from 'rsuite';
import { ImageBox } from '../../components/Custom/Containers';
import Searchbar from '../../components/Searchbar';
import { storage,db } from '../../firebase';
import { LandingFooter } from './Footer';
import { collection } from 'firebase/firestore';
import './styles.css';






export const Landing = () => {
  //react hooks, navigate to a new page, 
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams,setSearchParams] = useState('');
 
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

  const [value, loading, error] = useDownloadURL(ref(storage, "images/mncdevelopmentlogo.jpg"))
     
  
  const DownloadURL = () => {
    const reference = ref(storage, "images/mncdevelopmentlogo.jpg");
    
      const [value, loading, error] = useDownloadURL(reference);
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
  const handleSearch = () => { 

    const collRef = collection(db,'listings')
    const query = collRef.where('address','==',searchQuery)
  }
  return (
    <Container
      className="home-page"
      style={{ height: "100%", marginTop: "100px" }}
    >
      <div className="search-box">
        {<ImageBox src={DownloadURL()} alt="logo" />}
        <Divider />
        <FlexboxGrid
          justify="space-between"
          align="bottom"
          className="search-button-grid"
        >
          <FlexboxGrid.Item colspan={24} order={1}>
            <Button
              className="buy-button"
              style={{
                padding: "15px",
                border: "none",
                letterSpacing: "1px",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "2px",
                color: "white",
                backgroundColor: "black",
              }}
              onClick={()=>setSearchParams('forSale')}
            >
              Buy
            </Button>
          </FlexboxGrid.Item>
          <Divider />
          <FlexboxGrid.Item colspan={24} order={2}>
            <Button
              className="rent-button"
              style={{
                float: "middle",
                textAlign: "center",
                fontWeight: "bold",
                padding: "15px",
                border: "none",
                letterSpacing: "1px",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "1px",
              }}
              type="submit"
              onClick={() =>setSearchParams('forRent')}
            >
              Rent
            </Button>
          </FlexboxGrid.Item>
          <Divider />
          <FlexboxGrid.Item colspan={6} order={3}>
            <Button
              className="sold-button"
              style={{
                float: "right",
                textAlign: "center",
                padding: "15px",
                border: "none",
                fontSize: "17px",
                cursor: "pointer",
                borderRadius: "0px",
                
              }}
              onClick={()=>setSearchParams('sold')}
            >
              Sold
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Searchbar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter an address, city, or zip code"
          type="search"
          onClick={handleSearch}
        />
      </div>
      <div className="landing-bottom">
        <LandingFooter className="footer" />
      </div>
    </Container>
  );
}
export default Landing;