import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from '../UserContext';

const CreateNewProject = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [CreatorName, setCreatorname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleSubmission = (event) => {
    event.preventDefault();
    if (user) {
      setCreatorname(user.username);
      const projectData = {
        projectName,
        description,
        CreatorName
      };
      inputData(projectData);
    } else {
      setErrorMessage('You need to be logged in to create a new project.');
    }
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
  <div className="col-lg-12 d-flex justify-content-center align-items-center">
    <form className="Auth-form">
      <div className="Auth-form-content">
        <div
          className="card rounded-7 me-lg-n5"
          style={{
            background: "hsla(0, 0%, 100%, 0.55",
            backdropFilter: "blur(30px)",
            zIndex: "1",
            width: "200%",
            maxWidth: "500px"
          }}
        >
          <div className="card-body p-lg-5 shadow-5">
            <h3 className="Auth-form-title">Create New Project</h3>
            <div className="form-group mt-3">
              <label>Project Name</label>
              <input
                type="text"
                className="form-control mt-1"
                id="projectName"
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Description</label>
              <textarea
                className="form-control mt-1"
                id="description"
                placeholder="Enter project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              ></textarea>
            </div>
            <div className="d-grid gap-2 mt-3">
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
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
  );
};

export default CreateNewProject;
