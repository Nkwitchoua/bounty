import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Dropdown, Form, FormControl, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ModalAuthorization from './ModalAuthorization';
import { authUserSignOut } from '../store/actions/authUserActions';
import { SearchUsers } from "../store/actions/usersActions";

const Header = () => {

    const { currentUserData, currentUserId } = useSelector(state => state.authUser);
    const [ searchType, setSearchType ] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [ searchMenu, setSearchMenu ] = useState(false);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (btnTitle) => {
        setTitle(btnTitle);
        setShow(true);
    };
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authUserSignOut());
        window.location.reload();
        navigate("/");
    }

    const handleSearch = () => {
        if(!searchQuery) {
            return;
        }
        navigate("/search")
        dispatch(SearchUsers(searchQuery, searchType));
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
                    <Form className="d-flex justify-content-center flex-grow-1 position-relative">
                        <div className='position-relative mx-3 m-0 p-0'>
                            <FormControl
                                type="search"
                                placeholder={searchType ? `Searching for ${searchType}` : "Search"}
                                className="dropdown-toggle"
                                id="search-menu-drop"
                                aria-label="Search"
                                onClick={() => setSearchMenu(true)}
                                onChange={(event) => setSearchQuery(event.target.value)}
                            />
                        <Dropdown 
                            autoClose="outside" 
                            onToggle={() => setSearchMenu(false)} 
                            show={searchMenu}
                            className="header__search-menu">
                            <Dropdown.Menu>
                                <Dropdown.Item 
                                    onClick={() => {
                                        setSearchType("projects")
                                        setSearchMenu(false)
                                        }}>
                                            Find Projects
                                </Dropdown.Item>
                                <Dropdown.Item 
                                        onClick={() => {
                                            setSearchType("professionals")
                                            setSearchMenu(false);
                                        }}>
                                    Find Professionals
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </div>
                        <Button 
                            variant="outline-warning"
                            disabled
                            onClick={() => handleSearch()}>Search</Button>
                    </Form>
                    <NavDropdown.Divider style={{ backgroundColor: "#fff" }} />
                    {
                        currentUserData ? 
                        <Col className='d-flex justify-content-center justify-content-sm-end'>
                            <Dropdown>
                                <Dropdown.Toggle 
                                    variant="dark" 
                                    id="dropdown-basic" 
                                    className='d-flex justify-content-end gap-3 align-items-center px-3'>
                                        <h6 className='text-light m-0'>{currentUserData.name} {currentUserData.surname}</h6>
                                        {
                                            currentUserData.photo ? 
                                            <img src={currentUserData.photo} style={{width: "40px", height: "40px", borderRadius: "50%"}}/> :
                                            <PersonCircle className='text-light' size={24} />
                                        }
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item><Link style={{textDecoration: "none", color:"black"}} to={`profiles/${currentUserId}`}>My Profile</Link></Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLogout()}>Log out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            
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