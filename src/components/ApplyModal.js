import React, { useContext, useState,useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBBtn } from 'mdb-react-ui-kit';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { UserContext } from '../pages/UserContext';

function ApplyModal({ selectedRequirement, projectId,handleClose, handleApply }) {
  const [ApplicantName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [ResumePath, setResumePath] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useContext(UserContext);

    useEffect(() => {
      setName(user.username);
    }, []); // Run only once on component mount


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const fileData = new FormData();
    fileData.append('file', selectedFile);  // 'selectedFile' is a File object  
    return fetch(`https://localhost:7225/api/Applications/UploadResume/${ApplicantName}`, {
      method: 'POST',
      body: fileData,
    })
    .then(response => {
      if (!response.ok) {
        setErrorMessage('application failed. Please try again.');
        throw new Error(`Upload failed: ${response.status}`);
      }
  
      return response.json();
    })
    .then(data => {
      console.log('Upload successful:', data);
      setErrorMessage('applied to project successfuly');
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedFile!=null) {
      console.log(selectedFile.name);
      setResumePath(selectedFile.name);
    }
    console.log(ResumePath);
    // First, upload the file
    handleUpload().then(() => {
      const requestData = {
         projectId,
          ApplicantName,
          email,
          message,
          selectedRequirement,
          ResumePath:selectedFile.name
      };
     console.log(ApplicantName);
      fetch('https://localhost:7225/api/Applications/Apply', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.error('upload file didnt work', error);
    });
  };

  return (
    <Modal
      open={selectedRequirement !== null}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="custom-modal"
    >
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>Apply Now</MDBCardTitle>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email/phone number</label>
              <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className="form-control mt-1"
                id="message"
                placeholder="Enter message for project creator"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={100}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="resume" className="form-label">Resume (optional)</label>
              <input type="file" onChange={handleFileChange} />
            </div>
            <MDBBtn color="primary" type="submit">Submit Application</MDBBtn>
              {errorMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                  {errorMessage}
                </div>
              )}
          </form>
        </MDBCardBody>
      </MDBCard>
    </Modal>
  );
}

export default ApplyModal;