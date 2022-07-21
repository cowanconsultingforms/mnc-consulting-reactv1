import React, { useEffect,useState} from "react";
import { Container,Panel ,PlaceholderParagraphProps} from "rsuite";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
import { ImageBox } from "../Custom/Containers";
import { Link,  useNavigate } from "react-router-dom";
import {Box,Grid,Stack,Divider,Paper} from '@mui/material'
import {styled} from '@mui/material/styles'



export const Footer = () => {
  const navigate = useNavigate();
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [url3,setUrl3] = useState('');

  const gsRef1 = async () => {
       await getDownloadURL(
         ref(
           storage,
           "gs://mnc-development.appspot.com/images/mncthumbnail1.jpg"
         )
       ).then((url) => {
         setUrl1(url);
        
       });
     };

  const gsRef2 = async () => {
       await getDownloadURL(
         ref(
           storage,
           "gs://mnc-development.appspot.com/images/mncthumbnail2.jpg"
         )
       ).then((url) => {
         setUrl2(url);
       });
     };
  const gsRef3 = async () => {
    await getDownloadURL(
      ref(
        storage,
        "gs://mnc-development.appspot.com/images/mncthumbnail3.jpg"
      )
    ).then((url) => {
      setUrl3(url);
       });
  };
  
  useEffect(() => {
    gsRef1();
    gsRef2();
    gsRef3();

 
  },[]);
  
  return (
    <React.Fragment>
      <Grid spacing={2}
        container="true"
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        className="home-footer"
      >
        <Grid item>
        {
          <ImageBox
            src={url1}
            id="image1"
            height="250px"
            width="175px"
            border="1px"
            style={{ padding: "10px" }}
          />
          }
          </Grid>
        <Divider />
        <Grid item>
        {
          <ImageBox
            src={url2}
            id="image2"
            height="250px"
            width="175px"
            border="1px"
            style={{ padding: "10px" }}
          />
          }
          </Grid>
        <Grid item>
        {
          <ImageBox
            src={url3}
            id="image3"
            height="250px"
            width="175px"
            border="1px"
            style={{ padding: "10px" }}
          />
          
        }
        </Grid>
        </Grid>
      <div>
        {" "}
        <Panel className="footer-bottom">
          <Container
            style={{
              margin: "0in",
              marginBottom: ".0001pt",
              textAlign: "center",
              fontSize: "10.0pt",
              lineHeight: "2",
            }}
          >
            Copyright © MNC Development, Inc. 2008-present. All rights reserved.
            <Container
              style={{
                margin: "0in",
                marginBottom: ".0001pt",
                textAlign: "center",
                fontSize: "10.0pt",
                lineHeight: "2",
              }}
            ></Container>
            31 Buffalo Avenue, Brooklyn, New York 11233|Phone:1-718-771-5811 or
            1-877-732-3492|Fax: 1-877-760-2763 or 1-718-771-5900
             <Link to={'/contact'}>   info@mncdevelopment.com</Link>
          </Container>
          <Container
            style={{
              margin: "0in",
              marginBottom: ".0001pt",
              textAlign: "center",
              fontSize: "10.0pt",
              lineHeight: "2",
            }}
          >
            MNC Development and the MNC Development logos are trademarks of MNC
            Development, Inc.
          </Container>
          <Container
            style={{
              margin: "0in",
              marginBottom: ".0001pt",
              textAlign: "center",
              fontSize: "10.0pt",
              lineHeight: "2",
            }}
          >
            MNC Development, Inc. as a NYS licensed Real Estate Broker fully
            supports the principles of the Fair Housing Act and the Equal
            Opportunity Act. Listing information is deemed reliable, but is not
            guaranteed
          </Container>
        </Panel>
      </div>
    </React.Fragment>
  );
}
export default Footer;