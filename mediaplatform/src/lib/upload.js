// upload.js

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; // Adjust the path based on your Firebase setup

const upload = async (file) => {
const data = new Date()
  const storageRef = ref(storage, 'images/${file.name}');
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        reject("Something went wrong!" + error.code); 
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL); // Return the download URL upon successful upload
        });
      }
    );
  });
};

export default upload;