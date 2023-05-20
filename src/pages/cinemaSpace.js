import React, { useState, useEffect } from 'react';
import CinemaCard from '../components/CinemaCard';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import CreateNewProject from './createProject';

const ProjectCard = ({ project }) => {
  return (
    <MDBCol md='4' className='mb-4'>
      <CinemaCard project={project} />
    </MDBCol>
  );
};

const CinemaProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects data from your API
    fetch('https://localhost:7225/api/CinemaProjects/GetCinemaProjects', {
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
        <h1 className='text-center'>Cinema Space</h1>
        <div className='tab-container'>
          <Tabs defaultActiveKey='tab1' id='my-page-tabs'>
            <Tab eventKey='tab1' title='Projects'>
              <MDBContainer>
                <MDBRow className='bg mb-3' style={{ height: '50px' }}></MDBRow>

                {chunkProjects(projects, 3).map((row, index) => (
                  <MDBRow className='card-row' key={index}>
                    {row.map((project, i) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </MDBRow>
                ))}
              </MDBContainer>
            </Tab>
            <Tab eventKey='tab2' title='My Projects'>
              <div className='tab-content'>
                <MDBContainer>
                  <MDBRow className='bg mb-3'></MDBRow>
                  <MDBRow className='bg mb-3' style={{ borderTop: 'solid' }}></MDBRow>
                </MDBContainer>
              </div>
            </Tab>
            <Tab eventKey='tab3' title='New Projects+'>
              <div className='content-wrapper'><CreateNewProject ></CreateNewProject></div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CinemaProjects;
