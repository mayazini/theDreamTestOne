import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';  
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

function myCinemaCreations() {
  return (
    <div class="tab-content">
    <MDBContainer>
    <MDBRow className='bg mb-3'>
     <h1>Projects I Created</h1>
    </MDBRow>
    <p>kkkkkk</p>
    <MDBRow className='bg mb-3' style={{borderTop: 'solid'}}>
      <h1>Projects I Joined</h1>
    </MDBRow>
  </MDBContainer>
      </div>
  )
}

export default myCinemaCreations
