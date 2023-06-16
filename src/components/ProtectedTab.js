import React, { useContext } from 'react';
import { UserContext } from '../pages/UserContext';
import Tab from 'react-bootstrap/Tab';

const ProtectedTab = ({ children, allowedRoles, eventKey, title }) => {
  const { user } = useContext(UserContext);
  let userRole = 'guest';

  if (user !== null) {
    userRole = user.isAdmin ? 'admin' : 'loggedIn';
  }
  console.log(userRole); // Log the user role
  if (allowedRoles.includes(userRole)) {
    return <Tab eventKey={eventKey} title={title}>{children}</Tab>;
  } else {
      return null; 
  }
};

export default ProtectedTab;
