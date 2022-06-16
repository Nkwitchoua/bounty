import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import defaultLogo from "../../assets/default_avatar.png"

const ProfileCard = (props) => {

  const {name, surname, photo, career, experience, id} = props;

  return (
    <Card className='col-12 col-lg-2 col-sm-3 my-4 my-sm-0 p-0' style={{height: "370px"}}>
        <Card.Img 
              variant="rounded" 
              className='h-50' 
              style={photo ? {objectFit: "cover"} : {objectFit: "contain"}} 
              src={photo ? photo : defaultLogo}
              alt={name + " " + surname}/>
        <Card.Body>
            <Card.Title>{name} {surname}</Card.Title>
            <Card.Text style={{fontSize: "14px", lineHeight: "18px"}}><strong >{career}</strong>: <small>{experience}</small></Card.Text>
        </Card.Body>
        <Card.Footer className='d-flex justify-content-center'>
          <Button variant='outline-success'>
            <Link to={`/profiles/${id}`} style={{textDecoration: "none", color: "black"}}>Learn more</Link>
          </Button>
        </Card.Footer>
    </Card>
  )
}

export default ProfileCard