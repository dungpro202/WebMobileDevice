
import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import {signout} from './../../actions'

/**
* @author
* @function Header
**/

const Header = (props) => {



  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  }

  const renderLoggerLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link" onClick={logout}>Signout</span>
        </li>
      </Nav>
    )
  }

  const renderNonLoggerLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to="signin" className="nav-link" >Signin</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="signup" className="nav-link" >Signup</NavLink>
        </li>
      </Nav>
    )
  }


  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
      <Container fluid>
        <Link to="/" className="navbar-brand" >Admin Dashboard</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#nav1">nav1</Nav.Link>
            <Nav.Link href="#nav2">nav2</Nav.Link>
            
          </Nav>
          {auth.authenticate ? renderLoggerLinks() : renderNonLoggerLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

}

export default Header