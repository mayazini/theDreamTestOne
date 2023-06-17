import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

function About() {
  return (
    <MDBContainer fluid className='text-center p-5 '>
      <h1>About "The Dream"</h1>
      <MDBRow>
        <MDBCol lg='8' className='mx-auto'>
          <p>Welcome to "The Dream" - a unique platform where passion and collaboration come together to make dreams a reality. Our mission is to help you turn your ideas into reality, no matter how big or small they may be.</p>

          <p>Here at "The Dream", we believe that every idea deserves a chance to come to life. Maybe you're a director with an innovative film idea but need a crew and actors. Or perhaps you're an entrepreneur looking for talented individuals to join your startup. No matter what your project is, The Dream is the place for you.</p>

          <p>By uploading your project to our platform, you're not just sharing an idea, you're extending an invitation - an invitation for others to join you on your journey. It doesn't matter if they share your passion or come from an entirely different field, as long as they believe in your dream and can contribute to its realization, they're welcome to join.</p>

          <p>On "The Dream", every collaboration is a step towards making your dream come true. </p>
          <p className="forgot-password text-right mt-2"><a href="./register">Start your journey today </a>
           and find the people who believe in your dream as much as you do.</p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default About;
