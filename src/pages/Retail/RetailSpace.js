import React, { useState, useEffect } from 'react';
import AllProjects from '../../components/AllProjects';



  const RetailSpace = () =>{

  
  return (
    <div className='page-container'>
    <div className='content-container'>
      <h1 className='text-center'>Retail Space</h1>
      <AllProjects spaceName={"retail"}></AllProjects>
    </div>
  </div>
  );
};

export default RetailSpace;
