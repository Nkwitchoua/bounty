import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProjectCard from './ProjectCard';

const types = ["Development & IT", "Writing and Translation", "Design", "Marketing", "Admin & Customer Support", "Finance & Accounting"];

const ProjectsList = () => {
  return (
    <Container>
        <Row>
            <h1>Find your ideal project</h1>
            <Col className='d-flex gap-4 flex-wrap justify-content-around my-5'>
                {
                    types.map(type => <ProjectCard key={type} projectType={type}/>)
                }   
            </Col>
        </Row>
    </Container>
  )
}

export default ProjectsList