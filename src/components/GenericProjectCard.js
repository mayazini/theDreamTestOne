import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import img from ".././images/consumer.jpeg";
import '../designPages/ApplyFormStyle.css';
import Modal from '@mui/material/Modal';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBBtn, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import ApplyModal from './ApplyModal';
import { UserContext } from '../pages/UserContext';


export default function GenericProjectCard({ project }) {
  const { user,setUser } = useContext(UserContext);
  const { projectName, description, creatorName, requirements,projectId } = project;
  const [neededModalOpen, setNeededModalOpen] = React.useState(false);
  const [applyModalOpen, setApplyModalOpen] = React.useState(false);
  const [selectedRequirement, setSelectedRequirement] = React.useState(null);

  const handleNeededModalOpen = () => {
    setNeededModalOpen(true);
  };

  const handleNeededModalClose = () => {
    setNeededModalOpen(false);
  };

  const handleApplyModalOpen = (requirement) => {
    setSelectedRequirement(requirement);
    setApplyModalOpen(true);
  };

  const handleApplyModalClose = () => {
    setApplyModalOpen(false);
  };

  const handleApply = (applicationData) => {
    // Handle the application data, e.g., submit it to the server
    console.log(applicationData);
    handleApplyModalClose();
  };

  return (
    <>
      <Card sx={{ width: '200px' }}>
        <CardMedia component="img" alt={projectName} maxHeight="300" image={img} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Project Name: {projectName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Creator: {creatorName}
          </Typography>
        </CardContent>
        <CardActions>
          {user ? (
            <Button size="small" onClick={handleNeededModalOpen}>Needed</Button>
          ) : (
            <p   style={{color: 'red'}}>Applying for projects is for logged in users only</p>
          )}
        </CardActions>
      </Card>

      <Modal
        open={neededModalOpen}
        onClose={handleNeededModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="custom-modal larger-modal"
      >
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle>This Project Needs</MDBCardTitle>
            <form>
              {requirements &&
                requirements.map((requirement, index) => (
                  <div key={index} className="mb-3">
                    <MDBRow>
                      <MDBCol>
                        <Typography color="text">
                          <p className="requirement-info">
                            {requirement.description}
                          </p>
                        </Typography>
                      </MDBCol>
                      <MDBCol>
                        <Button size="small" onClick={() => handleApplyModalOpen(requirement)}>
                          Apply
                        </Button>
                      </MDBCol>
                    </MDBRow>
                  </div>
                ))}
            </form>
          </MDBCardBody>
        </MDBCard>
      </Modal>

      <Modal
        open={applyModalOpen}
        onClose={handleApplyModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="custom-modal"
      >
        <ApplyModal selectedRequirement={selectedRequirement} projectId={projectId} handleApply={handleApply} />
      </Modal>
    </>
  );
}
