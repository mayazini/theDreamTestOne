import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { Chip } from '@mui/material';
import { Done, HourglassEmpty, Clear } from '@mui/icons-material';

function ApplicationsOfUser({username}) {
  const [applicants, setApplicants] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = () => {
    fetch(`https://localhost:7225/api/Applications/ApplicationsByApplicantName/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setApplicants(data);
        console.log(data);
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
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', uploadedFileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('Failed to download the resume.');
        console.error('Error:', error.message);
      });
  };

  return (
    <ProtectedRoute allowedRoles={['loggedIn', 'admin']}>
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
                <td>
                  {application.ApplicationStatus === 'Pending' ? (
                    <Chip label="Pending" color="default" icon={<HourglassEmpty />} />
                  ) : application.ApplicationStatus === 'Accepted' ? (
                    <Chip label="Accepted" color="success" icon={<Done />} />
                  ) : (
                    <Chip label="Declined" color="error" icon={<Clear />} />
                  )}
                </td>
                <td>
                  <button onClick={() => handleDownload(application.ResumePath, application.ApplicantName)}>Download</button>
                  {errorMessage && <div className="error-message">{errorMessage}</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProtectedRoute>
  );
}

export default ApplicationsOfUser;
