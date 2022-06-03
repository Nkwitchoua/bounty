import React, { useContext, useState } from 'react'
import { Button, Container, FormControl, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { db, storage } from '../firebaseConfig';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from "uuid";
import { signUp } from '../store/actions/authUserActions';
import { AddUser } from '../store/actions/usersActions';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { userContext } from '../contexts/userContext';

const ModalAuthorization = ({show, handleClose, title}) => {

  const { userDocRef } = useContext(userContext)
//   const [userDocRef, setUserDocRef] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [form, setForm] = useState({
      password: "",
      email: "",
      name: "",
      surname: ""
  });

  const [imagePath, setImagePath] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputHandler = (event) => {
    setForm({
        ...form,
        [event.target.name]: event.target.value
    })
  };

  const uploadImage = async () => {
      let imageId = v4();
      const metadata = {
        contentType: 'image/jpeg',
      };
      const imageListRef = ref(storage, "avatars/")
      if(!imageUpload) return null;
      const imageRef = ref(storage, `avatars/${imageUpload.photo.name + imageId}`);
      await uploadBytes(imageRef, imageUpload)
        console.log(userDocRef, "USERDOCREF");
    //   await listAll(imageListRef).forEach(item => {
    //       console.log(item);
          getDownloadURL(ref(storage, `avatars/${imageUpload.photo.name + imageId}`))
            .then(url => {console.log(url)
                updateDoc(doc(db, "users", userDocRef), {
                photo: `${url}`
            }
      )})
    // }
    // )
  }

  const handleAuthorization = () => {
    if(title == "Sign Up") {
       dispatch(signUp(form));
       uploadImage();
       navigate("/");
    } else {
        // handleLogin()
    }
  }

  return (
      <Modal className='bg-dark p-0' show={show} onHide={handleClose}>
            <Modal.Header className='justify-content-center'>
                <Modal.Title >{title}</Modal.Title>
            </Modal.Header>
            {
                title === "Sign Up" ?
                    <Modal.Body className='d-flex flex-wrap gap-3'>
                        <FormControl 
                            name="name"
                            type='text' 
                            placeholder='First name*'
                            onChange={(event) => inputHandler(event)}/>
                        <FormControl 
                            name="surname"
                            type='text' 
                            placeholder='Last name*'
                            onChange={(event) => inputHandler(event)}/>
                        <FormControl 
                            name="email"
                            type='email' 
                            placeholder='Email*'
                            onChange={(event) => inputHandler(event)}/>
                        <FormControl 
                            name="password"
                            type='password' 
                            placeholder='Create password*'
                            onChange={(event) => inputHandler(event)}/>
                        <h6>Upload your photo</h6>
                        <FormControl 
                            name="photo"
                            type='file'
                            onChange={(event) => setImageUpload({
                                photo: event.target.files[0]
                            })}/>
                    </Modal.Body> :
                    <Modal.Body className='d-flex flex-wrap gap-3'>
                        <FormControl 
                            name="name"
                            type='email' 
                            placeholder='Email'
                            onChange={(event) => inputHandler(event)}/>
                        <FormControl 
                            name="surname"
                            type='password' 
                            placeholder='Password'
                            onChange={(event) => inputHandler(event)}/>
                    </Modal.Body>
            }
            <Modal.Footer className='justify-content-evenly'>
                <Button 
                    className='col-5 w-sm-25' 
                    variant="outline-dark" 
                    onClick={handleClose}>Close</Button>
                <Button 
                    className='col-5 w-sm-25' 
                    variant="success"
                    onClick={handleAuthorization}>{title}</Button>
            </Modal.Footer>
      </Modal>
  )
}

export default ModalAuthorization