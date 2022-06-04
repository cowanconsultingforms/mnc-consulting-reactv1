import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
export const images = [
  {
    id: "1",
    imageUrl: getDownloadURL(ref(storage, "images/mncthumbnail1.jpg")),
  },
  {
    id: "2",
    imageUrl: getDownloadURL(ref(storage, "images/mncthumbnail2.jpg")),
  },
  {
    id: "3",
    imageUrl: getDownloadURL(ref(storage, "images/mncthumbnail3.jpg")),
  },
];

export default images;