import { ref } from 'firebase/storage';
import React, { useState } from 'react';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Divider, FlexboxGrid, Loader,Input, IconButton } from 'rsuite';
import { ImageBox } from '../../components/Custom/Containers';
import Searchbar from '../../components/Searchbar';
import { storage,db,auth } from '../../firebase';
import { LandingFooter } from './Footer';
import { collection, getDoc } from 'firebase/firestore';
import './styles.css';
import { FaSearch } from "react-icons/fa";



//this is the home page

export const Landing = () => {
  //react hooks, navigate to a new page, 
  const navigate = useNavigate();
  //hooks to manage state of the searchbar
  const [searchQuery, setSearchQuery] = useState('');
  const [type,setType] = useState('');
  const [user] = useAuthState(auth);
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
  const handleSearch = async(type,searchQuery) => { 

    const collRef = collection(db, type);
    const q = collRef.where(searchQuery, '==', 'zip');
    await getDoc(q).then(async (doc) => {
      if (doc.exists) {
        console.log(doc.data());
        navigate(`/${type}/${doc.data().id}`);
      } else {
        console.log("No such document!");
      }
    })
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
              onClick={()=>setType('forSale')}
            >
              Buydfgfgdfgdgd
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
              onClick={() =>setType('forRent')}
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
              onClick={()=>setType('sold')}
            >
              Sold
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <div className="search-input">
        <Input className="home-search-bar"
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Enter an address, city, or zip code"
          type="search"
          onClick={handleSearch}
        />
      <IconButton className="search-icon" icon={<FaSearch />} onClick={handleSearch} />
      </div>
      </div>
      <div className="landing-bottom">
        <LandingFooter className="footer" />
      </div>
    </Container>
  );
}
export default Landing;