import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';  
import MyCinemaCreations from './myCinemaCreations';
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
                my creations
                 x
                  
                projects i joined
              </div>
            </Tab>
            <Tab eventKey="tab2" title="Retail">
              <div class="tab-content">Content for Tab 2 goes here</div>
            </Tab>
            <Tab eventKey="tab3" title="Other">
              <div class="tab-content">Content for Tab 3 goes here</div>
            </Tab>
          </Tabs>
        </div>
      </div>

      
  
    </>
  );
}

export default MyCreations;
