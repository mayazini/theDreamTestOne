import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { Chip } from '@mui/material';
import { Done, HourglassEmpty, Clear } from '@mui/icons-material';

function ApplicationsOfUser({spaceName, applicantName}) {
  const [applicants, setApplicants] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = () => {
    fetch(`https://localhost:7225/api/Applications/ApplicationsByApplicantName/${spaceName}/${applicantName}`)
      .then((response) => {
        if(!response.ok) throw new Error("No applications found");
        return response.json();
      })
      .then((data) => {
        setApplicants(data);
      })
      .catch((error) => {
        setApplicants(null);
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
      {applicants ? (
        <table className="table">
          <thead>
            <tr>
             <th>Project name</th>
              <th>Requirement</th>
              <th>Creator name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Status</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>
            {applicants && applicants.map((application) => (
              <tr key={application.id}>
                 <td>{application.project.projectName}</td>
                <td>{application.requirement.description}</td>
                <td>{application.project.creatorName}</td>
                <td>{application.email}</td>
                <td>{application.message}</td>
                <td>
                  {application.status === 'Pending' ? (
                    <Chip label="Pending" color="default" icon={<HourglassEmpty />} />
                  ) : application.status === 'Accepted' ? (
                    <Chip label="Accepted" color="success" icon={<Done />} />
                  ) : (
                    <Chip label="Declined" color="error" icon={<Clear />} />
                  )}
                </td>
                <td>
                  <button onClick={() => handleDownload(application.resumePath, application.applicantName)}>Download</button>
                  {errorMessage && <div className="error-message">{errorMessage}</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <p>No applications found.</p>
      )}
      </div>
    </ProtectedRoute>
  );
}

export default ApplicationsOfUser;
