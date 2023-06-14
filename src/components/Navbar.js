import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  import Dropdown from 'react-bootstrap/Dropdown';
  import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import './../style.css';
import Logo from ".././images/logo.png";
import GetStarted from ".././images/getStarted.jpeg";
import { UserContext } from '../pages/UserContext';

function Navbar() {
  const { user,setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform logout logic, e.g., clearing session, server-side logout, etc.
    // Clear local storage
    sessionStorage.removeItem('user');
    // Reset user state
    setUser(null);
    // Redirect to the login page or other appropriate route
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  return (
    <>
      <>
      <Nav>
        <table style={{ width: '100%', display: 'block', margin: '0 auto' }}>
          <tr style={{ height: '100px' }}>
            <td style={{ width: '70%', padding: '0 20px 0 0', margin: '0' }}>
              <NavMenu style={{ fontSize: '17px', fontStyle: 'normal' }}>
              {user && (
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-button-dark-example1"
                      variant="secondary"
                      style={{
                        backgroundColor: '#7eb7e6',
                        color: 'black',
                      }}
                    >
                      hello {user.username}
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                      <Dropdown.Item href="#/action-1" active onClick={handleLogout}>
                        Log Out
                      </Dropdown.Item>
                      <Dropdown.Item href="../sendMessage">
                        send message
                      </Dropdown.Item>
                      <Dropdown.Divider
                        style={{
                          backgroundColor: 'black',
                          height: '2px',
                          borderWidth: '0px',
                        }}
                      />
                      <Dropdown.Item href="../myInbox">my inbox</Dropdown.Item>
                      <Dropdown.Item href="../myCreations">
                        my creations
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
                
                  <>
                    <NavLink to="/" activeStyle>
                      home page
                    </NavLink>
                    <NavLink to="/login" activeStyle>
                      login
                    </NavLink>
                    {user && (
                         <Dropdown>
                         <Dropdown.Toggle id="dropdown-button"  style={{backgroundColor: 'white',color:"black",boxShadow: "none",border: 'none'}}>
                           Admins pages
                         </Dropdown.Toggle>
                         <Dropdown.Menu variant="dark" style={{fontSize: '17px'}}>
                           <Dropdown.Item href="../AdminCharts"> Admin Charts</Dropdown.Item>
                           <Dropdown.Item href="../UserList">All users</Dropdown.Item>
                           <Dropdown.Item href="../myCreations">finale products</Dropdown.Item>
                         </Dropdown.Menu >
                       </Dropdown>
                    )}
                  <Dropdown>
                  <Dropdown.Toggle id="dropdown-button"  style={{backgroundColor: 'white',color:"black",boxShadow: "none",border: 'none'}}>
                    spaces
                  </Dropdown.Toggle>
                  <Dropdown.Menu variant="dark" style={{fontSize: '17px'}}>
                    <Dropdown.Item href="../cinemaSpace"> cinema</Dropdown.Item>
                    <Dropdown.Item href="../RetailSpace">retail</Dropdown.Item>
                    <Dropdown.Item href="../myCreations">finale products</Dropdown.Item>
                  </Dropdown.Menu >
                </Dropdown>
                </>
                
              </NavMenu>
            </td>
            <td style={{ width: '50%', padding: '0', margin: '0 200px 0 0', padding: '0' }}>
              <img src={Logo} alt="logo img" className="logo" />
            </td>
            <td style={{ width: '1%' }}>
              <a href="../register" rel="noreferrer">
                <img src={GetStarted} alt="Coding Beauty logo" className="logo" style={{ borderRadius: '0' }}></img>
              </a>
            </td>
          </tr>
        </table>
      </Nav>
    </>
  </>
  )
}
export default Navbar;