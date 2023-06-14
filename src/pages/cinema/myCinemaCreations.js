import React, { useContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { UserContext } from '../UserContext';
import CinemaCard from '../../components/CinemaCard';

const ProjectCard = ({ project }) => {
  return (
    <MDBCol md='4' className='mb-4'>
      <CinemaCard project={project} />
    </MDBCol>
  );
};

function MyCinemaCreations() {
  const { user, setUser } = useContext(UserContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (user) {
      // Fetch projects data from your API
      fetch('https://localhost:7225/api/CinemaProjects/GetCinemaProjectsByName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ CreatorName: user.username })
      })
        .then((response) => response.json())
        .then((data) => {
          setProjects(data);
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    }
  }, [user]);

  const chunkProjects = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  return (
    <div class='tab-content'>
      <MDBContainer>
        <MDBRow className='bg mb-3'>
          <h1>Projects I Created</h1>
          {chunkProjects(projects, 3).map((row, index) => (
            <MDBRow className='card-row' key={index}>
              {row.map((project, i) => (
                <ProjectCard key={project.Id} project={project} />
              ))}
            </MDBRow>
          ))}
        </MDBRow>
        <MDBRow className='bg mb-3' style={{ borderTop: 'solid' }}>
          <h1>Projects I Joined</h1>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default MyCinemaCreations;
