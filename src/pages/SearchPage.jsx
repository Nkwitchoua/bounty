import React, { useEffect } from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/Profiles/ProfileCard';
import { GetUsers } from '../store/actions/usersActions';

const SearchPage = () => {

    const navigate = useNavigate();
    const {users, usersLoading} = useSelector(state => state.users);
    const dispatch = useDispatch();
  
    if(usersLoading) {
        return <Spinner className='position-absolute top-50 start-50 translate-middle' animation='grow'/>
    }
        
    return (
        <Container>
            <Row className='d-block d-sm-flex gap-0 gap-sm-5 mx-0 my-5'>
            {
                users.map(user => {
                    return <ProfileCard 
                              key={user.id} 
                              name={user.name}
                              surname={user.surname}
                              photo={user.photo}
                              experience={user.experience}
                              career={user.career}
                              id={user.id}
                          />
                })
            }
            </Row>
        </Container>
    )
}

export default SearchPage