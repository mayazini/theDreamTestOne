import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import CreateNewProject from './CreateNewProject';
import "../style.css";
import GenericProjectC from './GenericProjectCard';
import MyCreationsBySpace from './MyCreationsBySpace';

const ProjectCard = ({ project,spaceName }) => {
  return (
    <MDBCol md='4' className='mb-4'>
    <div className='project-card'>
      <GenericProjectC spaceName={spaceName} project={project} />
    </div>
  </MDBCol>
  );
};


  const AllProjects = ({spaceName}) =>{
    const [projects, setProjects] = useState([]);

    useEffect(() => {
      // Fetch projects data from your API
      fetch(`https://localhost:7225/api/Projects/GetProjects/${spaceName}`, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  }, []);
  
    const chunkProjects = (arr, size) => {
      const chunkedArr = [];
      for (let i = 0; i < arr.length; i += size) {
        chunkedArr.push(arr.slice(i, i + size));
      }
      return chunkedArr;
    };
  
  return (
    <div className='page-container'>
    <div className='content-container'>
      <div className='tab-container'>
        <Tabs defaultActiveKey='tab1' id='my-page-tabs'>
          <Tab eventKey='tab1' title='Projects'>
            <MDBContainer>
              <MDBRow className='bg mb-3' style={{ height: '50px' }}></MDBRow>
              <MDBRow className='bg mb-3'>             
              {chunkProjects(projects, 3).map((row, index) => (
                <MDBRow className='card-row' key={index}>
                  {row.map((project, i) => (
                    <ProjectCard spaceName={spaceName}  key={project.id} project={project} />
                  ))}
                </MDBRow>
              ))}
            </MDBRow>
            </MDBContainer>
          </Tab>
          <Tab eventKey='tab2' title='My Projects'>
            <div className='tab-content'>
              <MDBContainer> 
                <MyCreationsBySpace spaceName={spaceName}></MyCreationsBySpace>
              </MDBContainer>
            </div>
          </Tab>
          <Tab eventKey='tab3' title='New Projects+'>
           <CreateNewProject spaceName={spaceName}></CreateNewProject>
          </Tab>
        </Tabs>
      </div>
    </div>
  </div>
  );
};

export default AllProjects;
