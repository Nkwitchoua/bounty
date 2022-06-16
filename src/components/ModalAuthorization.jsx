import React, { useState } from 'react'
import { Button, FormControl, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../store/actions/authUserActions';
import { useNavigate } from 'react-router-dom';

const ModalAuthorization = ({show, handleClose, title}) => {

  const [form, setForm] = useState({
      password: "",
      email: "",
      name: "",
      surname: ""
  });

  const { currentUserId } = useSelector(state => state.authUser)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputHandler = (event) => {
    setForm({
        ...form,
        [event.target.name]: event.target.value
    })
  };

  const handleAuthorization = () => {
    if(title == "Sign Up") {
       dispatch(signUp(form));
       handleClose();
       navigate(`/edit-profile/${currentUserId}`);
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