import React, { useEffect } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { GetLinksIcons, GetUser } from '../store/actions/usersActions';
import defaultAvatar from "../assets/default_avatar.png"
import { Discord, Facebook, Instagram, Twitch, Twitter, Youtube } from 'react-bootstrap-icons';

const Profile = () => {

  
  const params = useParams();
  const { user, userLoading, linksIconsLoading, linksIcons } = useSelector(state => state.users);
  const { currentUserId } = useSelector(state => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetUser(params.userId));
  }, [params]);
  
  useEffect(() => {
      if(user) {
        dispatch(GetLinksIcons(user.links))
      }
  }, [user]);

  const icons = {
      discord: <Discord/>,
      instagram: <Instagram/>,
      youtube: <Youtube/>,
      twitter: <Twitter/>,
      twitch: <Twitch/>,
      facebook: <Facebook/>
  }

  if(userLoading || linksIconsLoading) {
      return <Container className='d-flex justify-content-center align-items-center hw-100'>
                <Spinner animation='border'/>
            </Container>
  }

  return (
    <Container className='my-5'>
        <Row style={{border: "1px solid #dfdfdf", borderRadius: "5px"}}>
            <Row className='p-3'>
                <Col className='col-4 col-sm-3 col-md-1 d-flex align-items-center'>
                    <img 
                        className='rounded-circle' 
                        style={{width: "50px", height: "50px"}} 
                        src={user.photo ? user.photo : defaultAvatar}/>
                </Col>
                <Col className='col-8 col-sm-7 d-flex flex-column justify-content-center'>
                    <h4>{user.name} {user.surname}</h4>
                    <p className='m-0'>Experience: {user.experience ? user.experience : 0}</p>
                </Col>
                <Col className='d-flex justify-content-center'>
                    {
                        currentUserId === params.userId ?
                            <Button variant='warning' className='my-3 d-flex align-items-center'>
                                <Link 
                                    style={{textDecoration: "none", color: "black"}}
                                    to={`/edit-profile/${currentUserId}`}
                                    >Edit Profile</Link>
                            </Button> :
                            <></>
                    }
                </Col>
            </Row>
            <Col className='p-3 col-12 col-sm-4 bg-light text-center' style={{border: "1px solid #efefef"}}>
                <div className='border-bottom my-2'>
                    <h4>Followers:</h4>
                    <p>{user.followers}</p>
                </div>
                <div className='border-bottom my-2'>
                    <h4>Following:</h4>
                    <p>{user.following}</p>
                </div>
                <div>
                    <h5 className='text-dark'>Social Media:</h5>
                    <div className='d-flex'>
                        {   user.links ?
                            linksIcons.map((link, index) => {
                                return (
                                    <a href={user.links[index]}>
                                        <div 
                                            style={{
                                                width: "36px", 
                                                height: "36px", 
                                                borderRadius: "50%",
                                                backgroundColor: "#afafaf",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                color: "white",
                                                zIndex: "1",
                                                marginRight: "10px",
                                                cursor: "pointer",
                                                border: "1px solid grey",
                                                "&:hover": {
                                                    backgroundColor: "#dfdfdf",
                                                    color: "black"
                                                }
                                            }}>
                                            {icons[link] ? icons[link] : link}
                                        </div>
                                    </a>
                                )
                            }) :
                            <h5>No social media...</h5>
                        }
                    </div>
                </div>
            </Col>
            <Col className='p-3' style={{border: "1px solid #efefef"}}>
                <h4>{user.career}</h4>
                <p>{user.description}</p>
            </Col>
        </Row>
    </Container>
  )
}

export default Profile