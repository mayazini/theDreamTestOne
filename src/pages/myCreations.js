import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import MyCreationsBySpace from '../components/MyCreationsBySpace';
import ".././style.css"
import ProtectedRoute from '../components/ProtectedRoute';

function MyCreations() {
  return (
    <ProtectedRoute allowedRoles={['admin','loggedIn']}>
    <>
      <div class="page-container">
        <h1>My  Creations</h1>
        <div class="tab-container">
          <Tabs defaultActiveKey="tab1" id="my-page-tabs">
            <Tab eventKey="tab1" title="Cinema">
              <div class="content-wrapper">
                <MDBContainer>
                <MyCreationsBySpace spaceName={'cinema'}></MyCreationsBySpace>
            </MDBContainer>
              </div>
            </Tab>
            <Tab eventKey="tab2" title="Retail">
              <div class="tab-content">
              <MDBContainer>
              <MyCreationsBySpace spaceName={'retail'}></MyCreationsBySpace>
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
    </ProtectedRoute>
  );
}

export default MyCreations;
