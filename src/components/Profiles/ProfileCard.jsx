import React from 'react'
import { Card } from 'react-bootstrap';

const ProfileCard = (props) => {

  const {name, surname, photo, career, experience} = props;

  return (
    <Card className='col-12 col-sm-3'>
        <Card.Img variant='top' src={photo ? photo : "../../assets/default_avatar.png"}/>
        <Card.Body>
            <Card.Title>{name} {surname}</Card.Title>
            <Card.Text><strong>{career}</strong>: <small>{experience}</small></Card.Text>
        </Card.Body>
    </Card>
  )
}

export default ProfileCard