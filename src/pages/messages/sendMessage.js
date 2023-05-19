import React from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function sendMessage() {
  return (
    <div className="content-wrapper">
    <div class="col-lg-6 mb-5 mb-lg-0">
    <h1>Send Message:</h1>
    <div style={{background: "hsla(0, 0%, 100%, 0.55",
    backdropFilter: "blur(30px)",
    zIndex: "1"}}className="card rounded-7 me-lg-n5">
      <div className="card-body p-lg-5 shadow-5">
        <form>
          
          <div className="form-outline mb-4 inputStyle">
            <input type="text" id="form4Example1" className="form-control" />
            <label className="form-label" for="form4Example1">from: </label>
          </div>
  
          
          <div className="form-outline mb-4 inputStyle">
            <input type="email" id="form4Example2" className="form-control" />
            <label className="form-label" for="form4Example2">to:</label>
          </div>
  
          
          <div className="form-outline mb-4 inputStyle">
            <textarea className="form-control" id="form4Example3" rows="4"></textarea>
            <label className="form-label" for="form4Example3">Message</label>
          </div>
 
          <button type="submit" className="btn btn-primary btn-block mb-4">Send</button>
        </form>
      </div>
    </div>
  
  </div>
  </div>
  )
}

export default sendMessage
