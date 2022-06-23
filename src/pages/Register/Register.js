import styled from 'styled-components';
import { Modal } from 'rsuite';
import ModalDiv from '../../components/Modals';
import TextField from '../../components/TextField';
import { getStorage,ref,getDownloadURL } from 'firebase/storage';
import React, { useState, useEffect } from 'react';

export const Register = () => {
    const storage = getStorage();
    const pathRef = ref(storage, "images/mncdevelopmentlogo.jpg");
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();
    const handleOpen = (value) => {
        setSize(value);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const getImage = () => {
      getDownloadURL(pathRef)
        .then((url) => {
          setLogo(url);
          const img = document.getElementById("logo");
          img.setAttribute("src", url);
        })
        .catch((error) => {
          console.log(error);
          switch (error.code) {
            case "storage/object-not-found":
              // File doesn't exist
              break;
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect the server response
              break;
          }
        });
    };
    return (
      <ModalDiv className="modal-register">
            <Modal backdrop={'static'} autoFocus>
                <Modal.Header>
                    <Modal.Title>
                    
                    </Modal.Title>
                </Modal.Header>
          <img id="logo" />
          <TextField
            label={"email"}
            value={value}
            onChange={(value) => setValue(value)}
            placeholder={"email"}
            type={"email"}
            autoFocus={true}
          />
        </Modal>
      </ModalDiv>
    );
}