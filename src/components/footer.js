import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import './../style.css';

export default function Footer() {
  return (
    <footer className='footer'>
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='https://m.youtube.com/channel/UCd0gqzV0hskK1z2Pui9lmDA?fbclid=PAAaZWxtk3GAsqcZJ7MMx8G-RdbUilDBF0kC_224Vgl7Cdu3a3dS08sj5_RoA_aem_th_AcRrVjmEHR6Tp_SyAqeLqtc6X6tNxvn95EO49Q5I7afOgVYQrBqzqXeiOshZ4-S1HUI' className='me-4 text-reset'>
            <MDBIcon fab icon="youtube" />
          </a>
          <a href='https://instagram.com/thedream4us?igshid=NTc4MTIwNjQ2YQ==' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='https://github.com/mayazini' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="cloud" className="me-3" />
                The Dream
              </h6>
              <p>
                Be who you want to be and do what you love to do 
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>feilds</h6>
              <p>
                <a href='/cinemaSpace' className='text-reset'>
                  Cinema
                </a>
              </p>
              <p>
                <a href='retailSpace' className='text-reset'>
                  Retail
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  and more...
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='/home' className='text-reset'>
                  home page
                </a>
              </p>
              <p>
                <a href='/login' className='text-reset'>
                  login
                </a>
              </p>
             
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Israel, Tlv 
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                thedream@gamil.com
              </p>
             
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </MDBFooter>
    </footer>
  );
}