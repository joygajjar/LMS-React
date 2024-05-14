import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../assets/images/logo.png';
import UPGovernment from '../assets/images/national-symbol.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPaste, faCircleInfo, faPhone, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';

export const NavbarRow = () => {
    return (
      <React.Fragment>
        <div className="lg-header d-none d-lg-block">
          <Navbar collapseOnSelect expand="lg" className="py-0">
            <Container fluid>
              <Navbar.Brand href="#home" className="d-flex align-items-center text-primary fw-bold text-uppercase fs-4">
                <img src={Logo} width="60" className="d-inline-block align-top me-2" alt="Vidhya Setu logo"
                /> Vidhya <span className="text-secondary ms-1">Setu</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Navbar.Text className="me-0 ms-auto">
                  <div className="d-flex align-items-center">
                    <div className="gov-detail text-end me-3">
                      <h4 className="text-primary">Higher & Technical Education</h4>
                      <p className="text-secondary">Education Department</p>
                      <p className="text-secondary">Government of Uttar Pradesh</p>
                    </div>
                    <div>
                      <img src={UPGovernment} alt="Satyameva Jayate" width="40" />
                    </div>
                  </div>
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div className="header-menu py-2 bg-primary">
            <Container fluid>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Nav.Link href="#home" className="me-4 text-white active"><FontAwesomeIcon icon={faHouse} className="me-1" /> Home</Nav.Link>
                  <Nav.Link href="#circular" className="me-4 text-white"><FontAwesomeIcon icon={faPaste} className="me-1" /> Circular</Nav.Link>
                  <Nav.Link href="#help" className="me-4 text-white"><FontAwesomeIcon icon={faCircleInfo} className="me-1" /> Help</Nav.Link>
                  <Nav.Link href="#contact" className="me-4 text-white"><FontAwesomeIcon icon={faPhone} className="me-1" /> Contact</Nav.Link>
                </div>
                <div className="d-flex align-items-center">
                  <Nav.Link href="#signup" className="me-4 text-white">Signup</Nav.Link>
                  <Nav.Link href="#login" className="me-4 btn btn-secondary">Login</Nav.Link>
                </div>
              </div>
            </Container>
          </div>
        </div>
        <div className="md-header d-block d-lg-none">
          <Navbar collapseOnSelect expand="lg" className="bg-light">
            <Container>
              <Navbar.Brand href="#home" className="d-flex align-items-center text-primary fw-bold text-uppercase fs-4">
                <img src={Logo} width="60" className="d-inline-block align-top me-2" alt="Vidhya Setu logo"
                /> Vidhya <span className="text-secondary ms-1">Setu</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav"><FontAwesomeIcon icon={faBarsStaggered} className="fs-2" /></Navbar.Toggle>
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto text-start">
                  <Nav.Link href="#home" className="text-primary pt-3 mt-3 border-top border-primary"><FontAwesomeIcon icon={faHouse} className="me-1" /> Home</Nav.Link>
                  <Nav.Link href="#circular" className="text-primary pt-3 mt-3 border-top border-primary"><FontAwesomeIcon icon={faPaste} className="me-1" /> Circular</Nav.Link>
                  <Nav.Link href="#help" className="text-primary pt-3 mt-3 border-top border-primary"><FontAwesomeIcon icon={faCircleInfo} className="me-1" /> Help</Nav.Link>
                  <Nav.Link href="#contact" className="text-primary pt-3 mt-3 border-top border-primary"><FontAwesomeIcon icon={faPhone} className="me-1" /> Contact</Nav.Link>
                  <Nav.Link href="#signup" className="btn btn-primary mt-3 mb-3">Signup</Nav.Link>
                  <Nav.Link href="#login" className="btn btn-secondary mb-3">Login</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </React.Fragment>
    );
  };