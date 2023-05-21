import React, { useState, useEffect, useRef, useContext  } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";



const GetUserData = (username, password) => {
  // Fetch user data from the API
  // Replace with your actual API call implementation
  return fetch('https://localhost:7225/api/User/GetUserData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error:', error.message);
      throw error;
    });
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const formRef = useRef(null);

  const { setUser } = useContext(UserContext);
  const handleSubmit = (event) => {
      event.preventDefault();
        GetUserData(username, password)
      .then(data => {
        // Handle the response
        console.log(data);
        // Show success message and redirect
      
        setUser({ username: username });

        setErrorMessage('Login successful. Redirecting to home page...');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      })
      .catch(error => {
        console.error(error);
        // Show error message
        setErrorMessage('Invalid username or password. Please try again.');
      });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    const handleFormSubmit = () => {
      // Handle form submission
    };

    const form = formRef.current; // Access the form element using formRef
    if (form) {
      form.addEventListener('submit', handleFormSubmit);
    }

    return () => {
      if (form) {
        form.removeEventListener('submit', handleFormSubmit);
      }
    };
  }, []);

  return (
    <div className="content-wrapper">
      <div className="col-lg-6 mb-5 mb-lg-0">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div
              style={{
                background: "hsla(0, 0%, 100%, 0.55",
                backdropFilter: "blur(30px)",
                zIndex: "1"
              }}
              className="card rounded-7 me-lg-n5"
            >
              <div className="card-body p-lg-5 shadow-5">
                <div className="form-group mt-3">
                  <label>User Name</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Enter user name"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <p className="forgot-password text-right mt-2">
                    Forgot <a href="#">password?</a>
                  </p>
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary"> 
                    Submit
                  </button>
                </div>
                {errorMessage && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {errorMessage}
                  </div>
                )}
                <p className="forgot-password text-right mt-2">
                  Don't have an <a href="./register">account?</a>
                  </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;