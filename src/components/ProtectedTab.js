import React, { useContext } from 'react';
import { UserContext } from '../pages/UserContext';
import TabPane from 'react-bootstrap/TabPane';

const ProtectedTab = ({ children, allowedRoles, eventKey, title }) => {
  console.log('ProtectedTab is being rendered');
  const { user } = useContext(UserContext);

  if (!user) {
    return null; // Hide the tab if user is not logged in
  }

  const userRole = user.isAdmin ? 'admin' : 'loggedIn';
  console.log(userRole); // Log the user role
 
  if (allowedRoles.includes(userRole)) {
    return <TabPane eventKey={eventKey} title={title} >{children}</TabPane>;
  } else {
    return <TabPane eventKey={eventKey} title={title} className='hidden'>{children}</TabPane>;
  }
};

export default ProtectedTab;
