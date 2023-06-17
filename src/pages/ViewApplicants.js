import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import { useNavigate } from 'react-router-dom';

function ViewApplicants() {
  const [applicants, setApplicants] = useState([]);
  const { projectId } = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = () => {
    fetch(`https://localhost:7225/api/Applications/GetApplicantsByProject/${projectId}`)
      .then((response) => response.json())
      .then((data) => {
        setApplicants(data);
        console.log(data)
      })
      .catch((error) => {
        setErrorMessage('Registration successful. Redirecting to login page...');
        setTimeout(() => {
          navigate('/myCreations');
        }, 3000);
        console.error('Error:', error);
      });
  };

  const handleApproveUser = (applicationId) => {
    fetch(`https://localhost:7225/api/Applications/UpdateApplicationStatus/${applicationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Accepted' }),
    })
      .then(() => {
        fetchApplicants();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleDisapproveUser = (applicationId) => {
    fetch(`https://localhost:7225/api/Applications/UpdateApplicationStatus/${applicationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Declined' }),
    })
      .then(() => {
        fetchApplicants();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleDownload = async (uploadedFileName, applicantName) => {
    if (!uploadedFileName) {
      console.error('No file has been uploaded');
      return;
    }

    fetch(`https://localhost:7225/api/Applications/DownloadResume/${applicantName}/${uploadedFileName}`, {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        // Create a new object URL for the blob
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', uploadedFileName);
        // Append to html link element page
        document.body.appendChild(link);
        // Start download
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('Failed to download the resume.');
        console.error('Error:', error.message);
      });
  };

  return ( 
    <ProtectedRoute allowedRoles={['loggedIn','admin']}>
      {errorMessage && <div className='alert alert-danger mt-3'>{errorMessage}</div>}
    <div className="container">
      <h1>Project Applicants</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Requirement</th>
            <th>Applicant name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Status</th>
            <th>Resume</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((application) => (
            <tr key={application.Id}>
              <td>{application.ReqDescription}</td>
              <td>{application.ApplicantName}</td>
              <td>{application.Email}</td>
              <td>{application.Message}</td>
              <td>{application.ApplicationStatus === 'Pending' ? 'Not viewed' : application.ApplicationStatus}</td>
              <td>
                <button onClick={() => handleDownload(application.ResumePath, application.ApplicantName)}>Download</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
              </td>
              <td>
                {application.ApplicationStatus === 'Accepted' ? (
                  <button className="btn btn-warning" onClick={() => handleDisapproveUser(application.Id, application.UserName)}>
                    Disapprove
                  </button>
                ) : (
                  <>  <button className="btn btn-success" onClick={() => handleApproveUser(application.Id, application.UserName)}>
                  Approve
                </button>
                 <button className="btn btn-warning" onClick={() => handleDisapproveUser(application.Id, application.UserName)}>
                 Disapprove
               </button></>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </ProtectedRoute>
  );
}

export default ViewApplicants;
