import React, { useEffect,useState,useRef} from 'react';
import { db, auth, app } from '../../firebase';
import { query, getDocs, where, collection, serverTimestamp,orderBy } from 'firebase/firestore';
import { useCollection ,useCollectionData, useDocumentData} from 'react-firebase-hooks/firestore';
import { Container, FlexboxGrid,Carousel,Form,Panel,Uploader,Button,ButtonToolbar } from 'rsuite';
import Listing from './Listing';
export const ListingPage = () => { 
  const [listings] = useCollectionData(db, collection('listings'));
  const listingRef = collection('listings');
  const placeholder = useRef();
  const q = query(listingRef, orderBy("listed_at", "desc"));
  const [listing] = useCollectionData(q,{ idField: "listed_at" });
  const getNextListing = async (e) => { 
    e.preventDefault();
    const listings = await getDocs(listingRef).then((docs) => {
      return docs.map((doc) => {
        return listings = {
          id: doc.id,
          ...doc.data()
        }
      })
    })
  }
  const getPrevListing = async (e) => {
    e.preventDefault();
    
  }
  useEffect(() => {
    return () => {
      
    };
  }, [listings])


  return(
 
  <Container className="listing-page-container">
    <div class="listing-page-grid-container main-container">
        <div class="listing-page-grid-item listing-page-images">
          <div id="listing-page-slideshow-container">
            <div class="mySlides" style="display: block;">
              <div id="first-slide-number" class="numbertext"></div>
              <img id="first-slide-image"></img>
            </div>
            <div class='admin'>
              <button id='set-recommend-button' class='unrecommended recommended-button image-button' onclick='markRecommended(true)'>
                <span id='recommended-icon-span' title="Set Recommended">
                  <i class='far fa-thumbs-up' style='font-size:36px'></i>
                </span>
              </button>
            </div>
            <Button class="prev image-button" onClick={getNextListing}>❮</Button>
            <Button class="next image-button" onclick="plusSlides(1)">❯</Button>
          </div>
          <div id='photo-container'>
            <div id="gallery-container">

            </div>
            <button>
              <label><i class="material-icons" style="font-size: 38px;">burst_mode</i></label>
              <br />
              All Images
            </button>
          </div>
        </div>
        <div class="listing-page-grid-item listing-page-description-container">
          <div class="listing-page-description-item listing-page-area description">
            <b>
              <p id='listing-page-address' class="editable" style="margin: 0; font-size: 30px; letter-spacing: 1.5px;">
              </p>
            </b>
            <label id='listing-page-city' class="editable"></label>,
            <label id='listing-page-state' class="editable"></label>
            <label id='listing-page-zip-code' class="editable"></label>
          </div>
          <div class="listing-page-description-item description">
            <p>
              <label style="font-size: 25px; font-weight: bold;">Status: </label><label style="font-size: 20px;"
                id='status-label'>No Information</label>
            </p>
            <p style="font-size: 21px;">
              <label><b>Price: $</b></label><label id='listing-page-price' class="editable"></label>
            </p>
            <p style="font-size: 15px; margin: 25px 0;">
              <label><i class="fas fa-bed"></i><b> Bedrooms: </b></label><label id='listing-page-bedrooms'
                class="editable"></label>
            </p>
            <p style="font-size: 15px;">
              <label><i class="fas fa-bath"></i><b> Bathrooms: </b></label><label id='listing-page-bathrooms'
                class="editable"></label>
            </p>

            <h3>
              Description:
            </h3>
            <p id='listing-page-description' class="editable">
              The house is the best house!
            </p>
          </div>

          <div class="listing-page-contact-box listing-page-description-item"
            style="border: rgb(180, 180, 180, 0.3) 2px solid;">
            <h2><b>CONTACT AGENT(S)</b></h2>
            <form class="contact-form" method="POST">
              <input class="contact-item name" type="text" placeholder="Full Name" required />
              <input class="contact-item email" type="email" placeholder="Email" required />
              <input class="contact-item phone" type="tel" placeholder="Phone (Recommended)" />
              <textarea class="contact-text-area contact-item message" placeholder="Message" required></textarea>
              <button type="submit" class="contact-item contact-button">Contact An Agent</button>
            </form>
          </div>
        </div>
      </div>
    
  
    </Container>
    )
}
const fileList = [
  {
    name: "a.png",
    fileKey: 1,
    url: "https://user-images.githubusercontent.com/1203827/47638792-92414e00-db9a-11e8-89c2-f8f430a23cd3.png",
  },
  {
    name: "b.png",
    fileKey: 2,
    url: "https://user-images.githubusercontent.com/1203827/47638807-9d947980-db9a-11e8-9ee5-e0cc9cd7e8ad.png",
  },
];
const instance = (
  <Uploader
    listType="picture-text"
    defaultFileList={fileList}
    action="//jsonplaceholder.typicode.com/posts/"
></Uploader>
);

export default ListingPage;