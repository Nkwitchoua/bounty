import { hover } from '@testing-library/user-event/dist/hover'
import React from 'react'
import "./MainPage.css";

const ProjectCard = ({projectType}) => {
  return (
    <div className='project__card'>
        <h4>{projectType}</h4>
        <p>300 projects</p>
    </div>
  )
}

export default ProjectCard