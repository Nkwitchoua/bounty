import React, { useEffect } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetUsers } from '../store/actions/usersActions';
import SearchProfiles from '../components/Profiles/Search';
import ProfileCard from '../components/Profiles/ProfileCard';


const Profiles = () => {

    const navigate = useNavigate();
    const {users, usersLoading} = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetUsers())
    }, [])

  if(!users) {
      return <Spinner className='position-absolute top-50 start-50 translate-middle' animation='grow'/>
  }

  return (
      <Container>
          <h1 className='text-center my-5'>Find ideal candidate for your project!</h1>
          <SearchProfiles/>
          <Row className='d-block d-sm-flex gap-5 mx-0 my-5 '>
              {
                  users.map(user => {
                      return <ProfileCard 
                                key={user.id} 
                                name={user.name}
                                surname={user.surname}
                                photo={user.photo}
                                experience={user.experience}
                                career={user.career}
                            />
                  })
              }
          </Row>
      </Container>
  )
}

export default Profiles