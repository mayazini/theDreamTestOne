import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';

function RetailSpace() {
  return (
    <MDBContainer>
      <MDBRow className="mt-5">
        <MDBCol md="8">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>About My Business</MDBCardTitle>
              <MDBCardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec urna eget nunc luctus efficitur. Mauris
                id facilisis massa, sit amet commodo lorem. Nulla facilisi. Duis vitae nisi massa. Integer ut efficitur
                felis. Cras rhoncus auctor justo, vitae condimentum lacus convallis eu.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Our Needs</MDBCardTitle>
              <MDBCardText>
                <ul>
                  <li>Experienced crochet artisans</li>
                  <li>Quality yarn suppliers</li>
                  <li>Online marketing experts</li>
                </ul>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mt-5">
        <MDBCol>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Apply Now</MDBCardTitle>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="resume" className="form-label">Resume</label>
                  <input type="file" className="form-control" id="resume" />
                </div>
                <MDBBtn color="primary" type="submit">Submit Application</MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default RetailSpace;
