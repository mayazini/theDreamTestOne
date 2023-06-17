import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from '../pages/UserContext';

const CreateNewProject = ({spaceName}) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [requirements, setRequirements] = useState([{ name: '', amount: '' }]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleSubmission = (event) => {
    event.preventDefault();
    if (user) {
      setCreatorName(user.username);
      const projectData = {
        projectName,
        description,
        creatorName:user.username,
        requirements
      };
      inputData(projectData);
    } else {
      setErrorMessage('You need to be logged in to create a new project.');
    }
  };

  const addRequirement = () => {
    setRequirements([...requirements, { name: '', amount: '' }]);
  };

  const updateRequirement = (index, field, value) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index][field] = value;
    setRequirements(updatedRequirements);
  };

  const removeRequirement = (index) => {
    const updatedRequirements = [...requirements];
    updatedRequirements.splice(index, 1);
    setRequirements(updatedRequirements);
  };

  const inputData = (projectData) => {
    const { projectName, description, creatorName, requirements } = projectData;
    const requestData = {
      spaceName,
      projectName,
      description,
      creatorName,
      requirements: requirements.map(({ name, amount }) => ({ name, amount }))
    };
  
    fetch('https://localhost:7225/api/Projects/CreateNewProject', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
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
    <center>
      <div className="content-wrapper">
        <div className="col-lg-12 d-flex justify-content-center align-items-center">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <div className="card rounded-7 me-lg-n5" style={{ background: "hsla(0, 0%, 100%, 0.55", backdropFilter: "blur(30px)", zIndex: "1", width: "200%", maxWidth: "500px" }}>
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
                  <div className="form-group mt-3">
                    <label>Requirements</label>
                    {requirements.map((requirement, index) => (
                      <div className="input-group mb-3" key={index}>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter requirement"
                          value={requirement.name}
                          onChange={(e) => updateRequirement(index, 'name', e.target.value)}
                        />
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Amount"
                          value={requirement.amount}
                          onChange={(e) => updateRequirement(index, 'amount', e.target.value)}
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => removeRequirement(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={addRequirement}
                    >
                      Add Requirement
                    </button>
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
    </center>
  );
};

export default CreateNewProject;
