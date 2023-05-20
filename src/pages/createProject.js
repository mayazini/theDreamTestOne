import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../designPages/CreateNewProject.css'; // Import the custom CSS file

const CreateNewProject = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmission = (event) => {
    event.preventDefault();
    const projectData = {
      projectName,
      description
    };
    inputData(projectData);
  };

  const inputData = (projectData) => {
    fetch('https://localhost:7225/api/CinemaProjects/CreateNewProject', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectData)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Creating project request failed');
        }
        setErrorMessage('Project created successfully. Redirecting to your projects page...');
        setTimeout(() => {
          navigate('/myCreations');
        }, 3000);
      })
      .catch((error) => {
        console.error('Error:', error.message);
        setErrorMessage('Project creation failed. Please try again.');
      });
  };

  return (
    <div className="content-wrapper">
      <div className="col-lg-6 mb-5 mb-lg-0">
        <div className="card rounded-7 custom-card">
          <div className="card-body p-lg-5 shadow-5">
            <form className="Auth-form-content">
              <h3 className="Auth-form-title">Create New Project</h3>
              <div className="form-group mt-3 inputStyle">
                <label htmlFor="projectName">Project Name</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  id="projectName"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="form-group mt-3 inputStyle">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control mt-1"
                  id="description"
                  placeholder="Enter project description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                onClick={handleSubmission}
                className="btn btn-primary btn-block mb-4"
              >
                Create Project
              </button>
              {errorMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewProject;
