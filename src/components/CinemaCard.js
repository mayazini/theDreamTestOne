import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import img from ".././images/consumer.jpeg";


export default function CinemaCard({ project }) {
  const { projectName, Description,CreatorName } = project;
  return (
    <Card sx={{ width: '200px' }}>
       <CardMedia component="img" alt={projectName} maxHeight="300" image={img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          project name: {projectName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          description: {Description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        creator: {CreatorName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Apply</Button>
        <Button size="small">Needed</Button>
      </CardActions>
    </Card>
  );
}