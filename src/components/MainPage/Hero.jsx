import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import HeroImg from '../../assets/hero.jpg'

const Hero = () => {
  return (
    <Container className='my-5 '>
        <Row className='flex-column flex-sm-row'>
            <Col >
                <h1 className='my-4'>Everything you need to <strong className='text-success'>get bounty</strong></h1>
                <p className='my-4'>Any project you are looking for, you can find here!</p>
                <Col className='d-flex justify-content-evenly justify-content-sm-start gap-sm-4 my-4'>
                    <Button className='fw-bold' variant='outline-dark'>Find Worker</Button>
                    <Button className='fw-bold' variant='success'>Find Project</Button>
                </Col>
            </Col>
            <Col>
                <img className='w-100' src={HeroImg}/>
            </Col>
        </Row>
    </Container>
  )
}

export default Hero