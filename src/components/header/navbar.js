import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Logo from '../assets/images/logo.png';
import UPGovernment from '../assets/images/national-symbol.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPaste, faCircleInfo, faPhone, faBarsStaggered, faRightToBracket,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch} from 'react-redux';
import {  logout } from  "../../redux/action";
import { useNavigate } from "react-router-dom";

export const NavbarRow = () => {
  const { t, i18n } = useTranslation();
  const [sticky, setSticky] = useState("");
  
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Retrieve the selected language from local storage
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
    
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 250 ? "is-sticky" : "";
    setSticky(stickyClass);
  };

  const handleLogin = () => {
    navigate('/login');  // Redirect to home after login
  };    

  const handleLogout = () => {
  dispatch(logout()); // Dispatch logout action
  navigate('/home'); // Redirect to home after logout
  };

  const handleLanguageChange = (lng) => {
    // Save the selected language to local storage
    localStorage.setItem('selectedLanguage', lng);
    i18n.changeLanguage(lng);
  };



  const classes = `sticky-header ${sticky}`;

  return (
    <React.Fragment>
      <div className="lg-header d-none d-lg-block">
        <Navbar collapseOnSelect expand="lg" className="py-0">
          <Container fluid>
            <Navbar.Brand href="#home" className="d-flex align-items-center text-primary fw-bold text-uppercase fs-4">
              <img src={Logo} width="60" className="d-inline-block align-top me-2" alt="Vidhya Setu logo" /> Vidhya <span className="text-secondary ms-1">Setu</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Navbar.Text className="me-0 ms-auto">
                <div className="d-flex align-items-center">
                  <div className="gov-detail text-end me-3">
                    <h4 className="text-primary">{t('Higher & Technical Education')}</h4>
                    <p className="text-dark">{t('Education Department')}</p>
                    <p className="text-dark">{t('Government of Uttar Pradesh')}</p>
                  </div>
                  <div>
                    <img src={UPGovernment} alt="Satyameva Jayate" width="40" />
                  </div>
                </div>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className={classes}>
          <div className="header-menu py-2">
            <Container fluid>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Nav.Link href="/home" className="me-3 text-primary active"><FontAwesomeIcon icon={faHouse} className="me-1" /> {t('Home')}</Nav.Link>
                  <Nav.Link href="/circular" className="me-3 text-primary"><FontAwesomeIcon icon={faPaste} className="me-1" /> {t('Circular')}</Nav.Link>
                  <Nav.Link href="/help" className="me-3 text-primary"><FontAwesomeIcon icon={faCircleInfo} className="me-1" /> {t('Help')}</Nav.Link>
                  <Nav.Link href="/contact" className="me-3 text-primary"><FontAwesomeIcon icon={faPhone} className="me-1" /> {t('Contact')}</Nav.Link>
                </div>
                <div className="d-flex align-items-center">
                  <Button variant="outline-primary" className="me-2" onClick={() => handleLanguageChange('en')}>English</Button>
                  <Button variant="outline-secondary" className="me-3" onClick={() => handleLanguageChange('hi')}>हिंदी</Button>
                  <Nav.Link href="/signup" className="me-3 btn btn-primary"><FontAwesomeIcon icon={faRightToBracket} className="me-2" /> {t('Signup')}</Nav.Link>
                  {/* <Nav.Link href="/login" className="btn btn-secondary"><FontAwesomeIcon icon={faRightToBracket} className="me-2" /> {t('Login')}</Nav.Link> */}
                  {!isAuthenticated && (
                      <Nav.Link onClick={handleLogin} className="btn btn-secondary"><FontAwesomeIcon icon={faRightToBracket} className="me-2" />{t('Login')}</Nav.Link>
                  )}
                    {isAuthenticated && (
                      <Nav.Link onClick={handleLogout} className="btn btn-secondary"><FontAwesomeIcon icon={faRightFromBracket} className="me-2" />{t('Logout')}</Nav.Link>
                    )}
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
      <div className={classes}>
        <div className="md-header d-block d-lg-none">
          <Navbar collapseOnSelect expand="lg" className="bg-light">
            <Container>
              <Navbar.Brand href="#home" className="d-flex align-items-center text-primary fw-bold text-uppercase fs-4">
                <img src={Logo} width="60" className="d-inline-block align-top me-2" alt="Vidhya Setu logo" /> Vidhya <span className="text-secondary ms-1">Setu</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav"><FontAwesomeIcon icon={faBarsStaggered} className="fs-2" /></Navbar.Toggle>
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto text-start">
                  <Nav.Link href="/home" className="text-primary pt-3 mt-3 border-top border-primary"><FontAwesomeIcon icon={faHouse} className="me-1" /> {t('Home')}</Nav.Link>
                  <Nav.Link href="/circular" className="text-primary pt-3 mt-3 border-top border-primary"><FontAwesomeIcon icon={faPaste} className="me-1" /> {t('Circular')}</Nav.Link>
                  <Nav.Link href="/help" className="text-primary pt-3 mt-3 border-top border-primary"><FontAwesomeIcon icon={faCircleInfo} className="me-1" /> {t('Help')}</Nav.Link>
                  <Nav.Link href="/contact" className="text-primary pt-3 mt-3 border-top border-primary"><FontAwesomeIcon icon={faPhone} className="me-1" /> {t('Contact')}</Nav.Link>
                  <Nav.Link href="/signup" className="btn btn-primary mt-3 mb-3">{t('Signup')}</Nav.Link>
                  {/* <Nav.Link href="/login" className="btn btn-secondary mb-3">{t('Login')}</Nav.Link> */}
                  {!isAuthenticated && (
                      <Nav.Link onClick={handleLogin} className="btn btn-secondary"><FontAwesomeIcon icon={faRightToBracket} className="me-2" />{t('Login')}</Nav.Link>
                  )}
                    {isAuthenticated && (
                      <Nav.Link onClick={handleLogout} className="btn btn-secondary"><FontAwesomeIcon icon={faRightFromBracket} className="me-2" />{t('Logout')}</Nav.Link>
                    )}
                  <div className="d-flex justify-content-between mt-3">
                    <Button variant="outline-primary" className="me-2" onClick={() => handleLanguageChange('en')}>English</Button>
                    <Button variant="outline-secondary" onClick={() => handleLanguageChange('hi')}>हिंदी</Button>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
    </React.Fragment>
  );
};

