import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import MyCinemaCreations from './cinema/myCinemaCreations';
import ".././style.css"
function MyCreations() {


  return (
    <>

      <div class="page-container">
        <h1>My  Creations</h1>
        <div class="tab-container">
          <Tabs defaultActiveKey="tab1" id="my-page-tabs">
            <Tab eventKey="tab1" title="Cinema">
              <div class="content-wrapper">
                <MDBContainer>
               <MyCinemaCreations></MyCinemaCreations>
            </MDBContainer>
              </div>
            </Tab>
            <Tab eventKey="tab2" title="Retail">
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
            </Tab>
            <Tab eventKey="tab3" title="Other">
              <div class="tab-content"></div>
            </Tab>
          </Tabs>
        </div>
      </div>

      
  
    </>
  );
}

export default MyCreations;
