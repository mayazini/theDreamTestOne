import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBBtn } from 'mdb-react-ui-kit';
import Modal from '@mui/material/Modal';
import axios from 'axios';

function ApplyModal({ selectedRequirement, handleClose, handleApply }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resume, setResume] = useState(null);
  const ProjectId = 2;
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('applicationData.ProjectId', ProjectId);
    formData.append('applicationData.UserName', name);
    formData.append('applicationData.Email', email);
    formData.append('applicationData.Message', message);
    formData.append('applicationData.ResumeData', resume);
    formData.append('applicationData.ResumeStream', null);
    formData.append('applicationData.Requirement.RequirementId', 1);
    formData.append('applicationData.Requirement.Description', 'Requirement description');

    if (resume) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const resumeStream = new Blob([event.target.result]);
        formData.append('applicationData.ResumeStream', resumeStream);
        sendApplication(formData);
      };
      reader.readAsArrayBuffer(resume);
    } else {
      sendApplication(formData);
    }
  };

  const sendApplication = async (formData) => {
    try {
      // Send the form data to the server
      await axios.post('https://localhost:7225/api/Applications/Apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the successful submission (e.g., show a success message, close the modal)
      handleApplySuccess();
    } catch (error) {
      // Handle the error (e.g., show an error message)
      console.log('Error:', error.response.data);
    }
  };

  const handleApplySuccess = () => {
    // Perform any actions after a successful application submission
    // (e.g., show a success message, close the modal)
    handleClose();
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
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email/phone number</label>
              <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Message</label>
              <textarea
                className="form-control mt-1"
                id="message"
                placeholder="Enter message for project creator"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="resume" className="form-label">Resume (optional)</label>
              <input type="file" className="form-control" id="resume" onChange={(e) => setResume(e.target.files[0])} />
            </div>
            <MDBBtn color="primary" type="submit">Submit Application</MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </Modal>
  );
}

export default ApplyModal;
