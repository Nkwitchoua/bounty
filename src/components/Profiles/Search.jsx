import React from 'react'
import { Col, Container, FormControl, Row } from 'react-bootstrap'
import "./Profiles.css"
import { Search } from 'react-bootstrap-icons'
import Hero_Search from "../../assets/hero_search.jpg"

const SearchProfiles = () => {
  return (
    <Container className='shadow bg-light p-5'>
        <Row>
            <Col>
                <div className='search__profiles_box-title'>
                    <h2 className='text-start mb-2 mb-sm-5'>Any professional you are looking for, you can find here.</h2>
                    <p className='mb-2 mb-sm-5'>Popular: </p>
                </div>
                <div className='search__profiles_box-input position-relative'>
                    <FormControl className='rounded-pill' type='text' placeholder='Search for profiles...'/>
                    <button className='search__profiles-btn bg-warning rounded-circle'><Search size={20}/></button>
                </div>
            </Col>
            <Col className='d-none d-sm-flex justify-content-center align-items-center shadow-sm'>
                <img src={Hero_Search}/>
            </Col>
        </Row>
    </Container>
  )
}

export default SearchProfiles