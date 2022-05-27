import React from "react";
import { FlexboxGrid } from "rsuite";
import { useDownloadURL } from 'react-firebase-hooks'
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
import { DownloadURL } from '../../hooks/useDownloadUrl'
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";






export const Footer = ({ reference }) => {
    const refObject = [
      {
        id: 1,
        path: `images/mncthumbnail${id}.jpg`,
      },
      {
        id: 2,
        path: `images/mncthumbnail${id}.jpg`,
      },
      {
        id: 3,
        path: `images/mncthumbnail${id}.jpg`,
      },
    ];
      
    
    
    const GetThumbNails = () => {
        const [value, loading, error] = useDownloadURL(storage, refObject.path);
        refObject.forEach(getDownloadURL(ref(storage, path)).then((url) => {
            return (
                <React.Fragment>
                    <FlexboxGrid>
                        <FlexboxGridItem>
                        
                        </FlexboxGridItem>
                    </FlexboxGrid>
                </React.Fragment>
         )   
        }))
       
    
        
    }

}