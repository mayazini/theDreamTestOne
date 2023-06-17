import React, { useState, useEffect } from 'react';
import AllProjects from '../../components/AllProjects';



  const CinemaSpace = () =>{

  
  return (
    <div className='page-container'>
    <div className='content-container'>
      <h1 className='text-center'>Cinema Space</h1>
      <AllProjects spaceName={"cinema"}></AllProjects>
    </div>
  </div>
  );
};

export default CinemaSpace;