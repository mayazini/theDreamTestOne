import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import future from '../.././images/theFuture.jpeg';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon, MDBCheckbox } from 'mdb-react-ui-kit';

function Register() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  const handleRegister = (event) => {
    event.preventDefault();
    inputData(userData);
  };

    // Create an object with the input values
    const userData = {
     username,
      email,
      password
    };

    const inputData = (userData) => 
    fetch('https://localhost:7225/api/User/Register', {
      method: 'Put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Register request failed');
        }
        // Handle the successful registration
        console.log('Registration successful');
        setErrorMessage('Login successful. Redirecting to login page...');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      })
      .catch(error => {
        console.error('Error:', error.message);
        setErrorMessage('user already taken. Please try again.');
        // Handle the registration error
      });

    
   return (
    <div className='content-wrapper'>
      <MDBContainer fluid>
        <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <h1>Sign up</h1>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput label='Your Name' id='form1' type='text' className='w-100' value={username} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput label='Your Email' id='form2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput label='Password' id='form3' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size='lg' />
                  <MDBInput label='Repeat your password' id='form4' type='password' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                </div>
                
                {/*<div className='mb-4'>
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                </div>*/}
                <MDBBtn className='mb-4' size='lg' onClick={handleRegister}>Register</MDBBtn>
                {errorMessage && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {errorMessage}
                  </div>
                )}
              </MDBCol>
              <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src={future} fluid />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default Register
