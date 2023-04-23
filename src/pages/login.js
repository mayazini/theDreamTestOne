import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"


function Login() {
  return (
   
    <div className="content-wrapper">
      
     <div class="col-lg-6 mb-5 mb-lg-0">
    <form className="Auth-form">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Sign In</h3>
        <div style={{background: "hsla(0, 0%, 100%, 0.55",
      backdropFilter: "blur(30px)",
      zIndex: "1"}}className="card rounded-7 me-lg-n5">
      <div className="card-body p-lg-5 shadow-5">
        <div className="form-group mt-3">
          <label>User Name</label>
          <input
            type="userName"
            className="form-control mt-1"
            placeholder="Enter user name"
          />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Enter password"
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
        <p className="forgot-password text-right mt-2">
        don't have an <a href="./register">account? </a>
        </p>
      </div>
      </div>
      </div>
    </form>
  </div>
  </div>
  );
}

export default Login;
