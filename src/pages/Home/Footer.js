import React, { useEffect} from "react";
import { Container} from "rsuite";
import { useDownloadURL } from 'react-firebase-hooks/storage'
import { getDownloadURL, ref ,child} from "firebase/storage";
import { storage } from "../../firebase";
import { ImageBox } from "../../components/Custom/Containers";
import { images } from '../../components/Constants/constants';





export const Footer = ( {images = images.imageUrl}) => {
  
const [value, loading, error] = useDownloadURL(storage, images.imageUrl);
  const ref1 = ref(storage, "images/mncthumbnail1.jpg");
  const ref2 = ref(storage, "images/mncthumbnail2.jpg");
  const ref3 = ref(storage, "images/mncthumbnail3.jpg");
  const refs= [ref1,ref2,ref3];
    
  const GetThumbNails = ({ refs }) => {
    
    return refs.map((ref) => {
      getDownloadURL(ref).then(URL => {

      
        <ImageBox
         
          src={URL}
        />
      });
    })
  }
    
  
  useEffect = ({ refs }) => {
   
    return images.map((id, image) => {
      return (
        <ImageBox
          id={id}
          className="thumbnail"
          style={{
            justifyContent: "center",
            height: "100px",
            width: "69px",
          }}
        >
          {!loading && !error(<img src={value} alt="thumbnail" />)}
        </ImageBox>
      ), [loading,error,value]
    });
  }
    
  
    return (
      <Container style={{ display: 'flex' }}>
        <img style="display: block;-webkit-user-select: none;margin: auto;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="https://firebasestorage.googleapis.com/v0/b/mnc-development.appspot.com/o/images%2FMNCThumbnail1.jpg?alt=media&amp;token=f11cffd3-fc91-4a3f-9e60-6fe500690670"></img>
        {GetThumbNails}
      </Container>
    )

  
}