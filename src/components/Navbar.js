import React from 'react'
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './../style.css';
function Navbar() {
  return (
    <>
    <Nav>
      <NavMenu>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" style={{backgroundColor: '#7d7878',color:"white"}}>
          hello user
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark" >
          <Dropdown.Item href="#/action-1" active>
            Log Out
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">send nessage</Dropdown.Item>
          <Dropdown.Divider style={{ backgroundColor: 'black', height: '2px', borderWidth: '0px' }} />
          <Dropdown.Item href="#/action-3">my inbox</Dropdown.Item>
          <Dropdown.Item href="#/action-4">my creations</Dropdown.Item>
        </Dropdown.Menu >
      </Dropdown>
        <NavLink to="/home" activeStyle>
          home page
        </NavLink>
        <NavLink to="/login" activeStyle>
          login
        </NavLink>
        <NavLink to="/about" activeStyle>
          about
        </NavLink>
      </NavMenu>
    </Nav>
  </>
  )
}
export default Navbar;
