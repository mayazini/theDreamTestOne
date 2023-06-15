import React from 'react';
import { Link } from 'react-router-dom';
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

export default function MyProjectCard({ project }) {
  const { projectName, description, creatorName, requirements,projectId } = project;
  const [neededModalOpen, setNeededModalOpen] = React.useState(false);
  const [applyModalOpen, setApplyModalOpen] = React.useState(false);
  const [selectedRequirement, setSelectedRequirement] = React.useState(null);

 

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
        <CardActions>
          <Link to={`/ViewApplicants/${projectId}`}>
            <Button size="small">See Applicants</Button>
          </Link>
        </CardActions>
        </CardActions>
      </Card>

    </>
  );
}
