import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewApplicants() {
  const [applicants, setApplicants] = useState([]);
  const { projectId } = useParams();

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = () => {
    fetch(`https://localhost:7225/api/Applications/GetApplicantsByProject/${projectId}`)
      .then((response) => response.json())
      .then((data) => {
        setApplicants(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleApproveUser = (applicationId, userName) => {
    fetch(`https://your-api-url.com/api/UpdateApplicationStatus/${applicationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'approved' }),
    })
      .then(() => {
        fetchApplicants();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleDisapproveUser = (applicationId, userName) => {
    fetch(`https://your-api-url.com/api/UpdateApplicationStatus/${applicationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'not approved' }),
    })
      .then(() => {
        fetchApplicants();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleDownload = async (uploadedFileName, userName) => {
    if (!uploadedFileName) {
      console.error('No file has been uploaded');
      return;
    }

    // Fetch the file data from your API
    fetch(`https://localhost:7225/api/Applications/DownloadResume/${userName}/${uploadedFileName}`, {
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
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  };

  return (
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
            <tr key={application.id}>
              <td>{application.ReqDescription}</td>
              <td>{application.ApplicantName}</td>
              <td>{application.Email}</td>
              <td>{application.Message}</td>
              <td>{application.Status === 'Pending' ? 'Not viewed' : application.Status}</td>
              <td>
                <button onClick={() => handleDownload(application.ResumePath, application.UserName)}>Download</button>
              </td>
              <td>
                {application.Status === 'Accepted' ? (
                  <button className="btn btn-warning" onClick={() => handleDisapproveUser(application.id, application.UserName)}>
                    Disapprove
                  </button>
                ) : (
                  <>  <button className="btn btn-success" onClick={() => handleApproveUser(application.id, application.UserName)}>
                  Approve
                </button>
                 <button className="btn btn-warning" onClick={() => handleDisapproveUser(application.id, application.UserName)}>
                 Disapprove
               </button></>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewApplicants;
