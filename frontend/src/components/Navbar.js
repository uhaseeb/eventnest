import React, {useContext} from 'react'
import {Link} from 'react-router-dom';
import { Button, Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { userContext } from '../context/context';
import { useNavigate } from 'react-router-dom';

function NavbarComponent(props) {
  const auth = useContext(userContext)
  const navigator = useNavigate('')

  const logoutUser = () => {
    auth.setUser({})
    navigator('/login')
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary bg">
      <Container fluid>
        <Navbar.Brand href="/">EventNest</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/events">Events</Link>
          </Nav>
          <div className="d-flex align-items-center">
            {props.user.username ? (
              <div className="d-flex align-items-center">
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center">
                    <FaUserCircle size={24} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile/update">View Profile</Dropdown.Item>
                    {auth.user.type === 'Organizer' && <Dropdown.Item as={Link} to="/dashboard">View Analytics</Dropdown.Item>}
                    <Dropdown.Item as={Link} to="/login" onClick={logoutUser}>Log Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <span className="me-2">{props.user.username}</span>
              </div>
            ) : (
              <div className="d-flex">
                <Link to="/login">
                <Button variant="outline-success" className="me-2">Login</Button>
                </Link>
                <Link to="/signup">
                <Button variant="outline-primary">Signup</Button>
                </Link>
              </div>
            )}
            </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;