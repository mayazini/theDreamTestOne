import React from 'react'
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './../style.css';
import Logo from ".././images/logo.png";
function Navbar() {
  return (
    <>
     <Nav>
    <table>
      <tr style={{height: "100px"}}>
        <td  style={{width:"45%", marginLeft: "80px"}}>
        <NavMenu style={{fontSize: '17px', fontStyle: "normal"}}>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" style={{backgroundColor: '#7eb7e6',color:"black"}}>
          hello user
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark" >
          <Dropdown.Item href="#/action-1" active>
            Log Out
          </Dropdown.Item>
          <Dropdown.Item href="../sendMessage">send message</Dropdown.Item>
          <Dropdown.Divider style={{ backgroundColor: 'black', height: '2px', borderWidth: '0px' }} />
          <Dropdown.Item href="../myInbox">my inbox</Dropdown.Item>
          <Dropdown.Item href="../myCreations">my creations</Dropdown.Item>
        </Dropdown.Menu >
      </Dropdown>
        <NavLink to="/home" activeStyle>
          home page
        </NavLink>
        <NavLink to="/login" activeStyle>
          login
        </NavLink>
        <Dropdown>
        <Dropdown.Toggle id="dropdown-button" variant="primary" style={{backgroundColor: 'white',color:"black",boxShadow: "none"}}>
          spaces
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark" style={{fontSize: '17px', fontStyle: "normal"}}>
          <Dropdown.Item href="../sendMessage"> cinema</Dropdown.Item>
          <Dropdown.Item href="../myInbox">retail</Dropdown.Item>
          <Dropdown.Item href="../myCreations">finale products</Dropdown.Item>
        </Dropdown.Menu >
      </Dropdown>
      </NavMenu>
        </td>
        <td style={{width:"200%", marginLeft: "80px"}}>
        <img src={Logo} alt="logo img" className="logo"/>    
        </td>
        <td style={{width:"1%"}}>
        <img src={Logo} alt="logo img" className="logo"/>    
        </td>
      </tr>
    </table>
     
    </Nav>
  </>
  )
}
export default Navbar;
