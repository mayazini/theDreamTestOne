import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import future from '../.././images/theFuture.jpeg';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import ProtectedRoute from '../../components/ProtectedRoute';

function Register() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();

    // Check if all fields are filled
    if (!username || !email || !firstName || !lastName || !password || !repeatPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Check if the repeated password matches the original password
    if (password !== repeatPassword) {
      setErrorMessage("Passwords don't match. Please try again.");
      return;
    }

    // Check password strength
    if (!isPasswordStrong(password)) {
      setErrorMessage(
        'Password should be at least 8 characters long, contain at least one special character, one uppercase letter, and one number.'
      );
      return;
    }

    inputData(userData);
  };

  // Create an object with the input values
  const userData = {
    username,
    firstName,
    lastName,
    linkedIn,
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
      .then((response) => {
        if (!response.ok) {
          throw new Error('Register request failed');
        }
        // Handle the successful registration
        console.log('Registration successful');
        setErrorMessage('Registration successful. Redirecting to login page...');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      })
      .catch((error) => {
        console.error('Error:', error.message);
        setErrorMessage('Username already taken. Please try again.');
        // Handle the registration error
      });

  // Check password strength
  const isPasswordStrong = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <ProtectedRoute allowedRoles={['guest']}>
      <div className='content-wrapper'>
        <MDBContainer fluid>
          <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                  <h1>Sign up</h1>
                  <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='user me-3' size='lg' />
                    <MDBInput label='Your user Name' id='form1' type='text' className='w-100' value={username} onChange={(e) => setUserName(e.target.value)} required />
                  </div>
                  <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='user me-3' size='lg' />
                    <MDBInput label='Your first name' id='form2' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  </div>
                  <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='user me-3' size='lg' />
                    <MDBInput label='Your last name' id='form2' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </div>
                  <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='link me-3' size='lg' />
                    <MDBInput label='Your LinkedIn Link(optional)' id='form2' type='text' value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} />
                  </div>
                  <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='envelope me-3' size='lg' />
                    <MDBInput label='Your Email' id='form2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='lock me-3' size='lg' />
                    <MDBInput label='Password' id='form3' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='key me-3' size='lg' />
                    <MDBInput label='Repeat your password' id='form4' type='password' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                  </div>

                  {/*<div className='mb-4'>
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                </div>*/}
                  <MDBBtn className='mb-4' size='lg' onClick={handleRegister}>
                    Register
                  </MDBBtn>
                  {errorMessage && <div className='alert alert-danger mt-3'>{errorMessage}</div>}
                </MDBCol>
                <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                  <MDBCardImage src={future} fluid />
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </div>
    </ProtectedRoute>
  );
}

export default Register;
