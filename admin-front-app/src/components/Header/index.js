
import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { signout } from './../../actions'
import './style.css'

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
    <Navbar collapseOnSelect expand="lg" bg="danger" variant="danger" style={{ zIndex: 1, position: "fixed", top: 0, left: 0, right: 0, marginBottom: "100px"}}>
      <Container fluid>
        <Link to="/" className="navbar-brand" style={{color: "white"}} >Admin Dashboard</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav><NavLink className="navcustom"  to={`/`} exact >Home</NavLink></Nav>
            <Nav><NavLink to={`/account`} exact >Account</NavLink></Nav>
            <Nav><NavLink to={`/page`} exact >Page</NavLink></Nav>
            <Nav><NavLink to={`/category`}>Category</NavLink></Nav>
            <Nav><NavLink to={`/products`}>Products</NavLink></Nav>
            <Nav><NavLink to={`/orders`}>Orders</NavLink></Nav>
          </Nav>
          {auth.authenticate ? renderLoggerLinks() : renderNonLoggerLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

}

export default Header