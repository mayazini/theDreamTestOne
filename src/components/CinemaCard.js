import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import img from ".././images/consumer.jpeg";
import '../designPages/ApplyFormStyle.css';
import Modal from '@mui/material/Modal';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBBtn, MDBRow,MDBCol } from 'mdb-react-ui-kit';

export default function CinemaCard({ project }) {
  const { projectName, description, creatorName, requirements } = project;
  const [open, setOpen] = React.useState(false);
  const [selectedRequirement, setSelectedRequirement] = React.useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = (requirement) => {
    setSelectedRequirement(requirement);
    handleOpen();
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
          description: {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Creator: {creatorName}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpen}>Needed</Button>
        </CardActions>
      </Card>

            <Modal
        open={open}
        onClose={handleClose}
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
                        <Button size="small" onClick={() => handleApply(requirement)}>
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
        open={selectedRequirement !== null}
        onClose={() => setSelectedRequirement(null)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="custom-modal" 
      >
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle>Apply Now</MDBCardTitle>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email/phone number</label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Message</label>
                <textarea
                  className="form-control mt-1"
                  id="message"
                  placeholder="Enter message for project creator"
                  rows="4"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="resume" className="form-label">Resume (optional)</label>
                <input type="file" className="form-control" id="resume" />
              </div>
              <MDBBtn color="primary" type="submit">Submit Application</MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
      </Modal>
    </>
  );
}
