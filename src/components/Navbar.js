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
    <table style={{width: '100%', display: 'block', margin: '0 auto'}}>
      <tr style={{height: "100px"}}>
        <td  style={{width:"50%", padding: '0 20px 0 0', margin: '0'}}>
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
        <Dropdown.Toggle id="dropdown-button"  style={{backgroundColor: 'white',color:"black",boxShadow: "none",border: 'none'}}>
          spaces
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark" style={{fontSize: '17px'}}>
          <Dropdown.Item href="../sendMessage"> cinema</Dropdown.Item>
          <Dropdown.Item href="../myInbox">retail</Dropdown.Item>
          <Dropdown.Item href="../myCreations">finale products</Dropdown.Item>
        </Dropdown.Menu >
      </Dropdown>
      </NavMenu>
        </td>
        <td style={{width:"50%", padding: '0', margin: '0 200px 0 0',padding:'0'}}>
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
