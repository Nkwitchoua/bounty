import React, { useState } from 'react'
import { Button, Col, Container, Form, FormControl, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModalAuthorization from './ModalAuthorization';

const Header = () => {

    const { currentUser } = useSelector(state => state.authUser);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (btnTitle) => {
        setTitle(btnTitle);
        setShow(true);
    }

    return (
        <Navbar className="navbar navbar-dark bg-dark" expand="lg">
            <Container>
                <Navbar.Brand href="#">Bounty</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                        <Nav.Link onClick={() => navigate("/jobs")}>Jobs</Nav.Link>
                        <Nav.Link onClick={() => navigate("/profiles")}>Profiles</Nav.Link>
                    </Nav>
                    <Form className="d-flex justify-content-center flex-grow-1">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2 w-50"
                            aria-label="Search"
                        />
                        <Button variant="outline-warning">Search</Button>
                    </Form>
                    <NavDropdown.Divider style={{ backgroundColor: "#fff" }} />
                    {
                        currentUser ? 
                        <Col>
                            {}
                            <PersonCircle className='text-light' size={36} />
                        </Col> :
                        <Col className='d-flex justify-content-center justify-content-sm-end gap-2' style={{ width: "300px" }}>
                            <Button
                                variant="outline-light"
                                className='my-2 my-sm-0'
                                onClick={(event) => handleShow(event.target.textContent)}>Login</Button>
                            <Button
                                variant='warning'
                                className='my-2 my-sm-0'
                                onClick={(event) => handleShow(event.target.textContent)}>Sign Up</Button>
                        </Col>
                    }
                </Navbar.Collapse>
            </Container>
            <ModalAuthorization title={title} show={show} handleClose={handleClose} />
        </Navbar>
    )
}

export default Header