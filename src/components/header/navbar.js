import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Dropdown } from "react-bootstrap";
import Logo from "../assets/images/logo.png";
import UPGovernment from "../assets/images/national-symbol.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPaste,
  faCircleInfo,
  faPhone,
  faBarsStaggered,
  faRightToBracket,
  faRightFromBracket,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/action";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavDropdown from "react-bootstrap/NavDropdown";

export const NavbarRow = () => {
  const { t, i18n } = useTranslation();
  const [sticky, setSticky] = useState("");

  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Retrieve the selected language from local storage
    const selectedLanguage = localStorage.getItem("selectedLanguage");
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }

    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  useEffect(() => {
    const disableBackButton = () => {
      window.history.pushState(null, null, window.location.pathname);
      window.addEventListener("popstate", onPopState);
    };

    const onPopState = () => {
      window.history.pushState(null, null, window.location.pathname);
    };

    disableBackButton();

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [isAuthenticated]);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 250 ? "is-sticky" : "";
    setSticky(stickyClass);
  };

  const handleLogin = () => {
    navigate("/login"); // Redirect to home after login
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/home"); // Redirect to home after logout
    toast.success("Logout Successfully");
  };

  const handleLanguageChange = (lng) => {
    // Save the selected language to local storage
    localStorage.setItem("selectedLanguage", lng);
    i18n.changeLanguage(lng);
  };

  const classes = `sticky-header ${sticky}`;

  return (
    <React.Fragment>
      <div className="lg-header d-none d-lg-block">
        <div className={classes}>
          <div className="header-menu py-2">
            <Container fluid>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Navbar.Brand
                    href="#home"
                    className="me-4 d-flex align-items-center text-primary fw-bold text-uppercase fs-4"
                  >
                    <img
                      src={Logo}
                      width="60"
                      className="d-inline-block align-top me-2"
                      alt="Vidhya Setu logo"
                    />{" "}
                    Vidhya <span className="text-blue ms-1">Setu</span>
                  </Navbar.Brand>

                  <Nav.Link href="/home" className="text-primary active">
                    <FontAwesomeIcon icon={faHouse} className="me-1" />{" "}
                    {t("Home")}
                  </Nav.Link>
                  <NavDropdown title="Course" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      2024 - 2025
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      2023 - 2024
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      2022 - 2023
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      2021 - 2022
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Other" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      2024 - 2025
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      2023 - 2024
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      2022 - 2023
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      2021 - 2022
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
                <div className="d-flex align-items-center">
                  {!isAuthenticated && (
                    <Nav.Link href="/signup" className="me-3 btn btn-secondary">
                      <FontAwesomeIcon
                        icon={faRightToBracket}
                        className="me-2"
                      />
                      {t("Signup")}
                    </Nav.Link>
                  )}

                  {!isAuthenticated && (
                    <Nav.Link onClick={handleLogin} className="btn btn-primary">
                      <FontAwesomeIcon
                        icon={faRightToBracket}
                        className="me-2"
                      />
                      {t("Login")}
                    </Nav.Link>
                  )}
                  {isAuthenticated && (
                    <Nav.Link
                      onClick={handleLogout}
                      className="btn btn-secondary"
                    >
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className="me-2"
                      />
                      {t("Logout")}
                    </Nav.Link>
                  )}
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
      <div className="md-header d-block d-lg-none">
        <Navbar collapseOnSelect expand="lg" className="bg-light">
          <Container>
            <Navbar.Brand
              href="#home"
              className="d-flex align-items-center text-primary fw-bold text-uppercase fs-4"
            >
              <img
                src={Logo}
                width="60"
                className="d-inline-block align-top me-2"
                alt="Vidhya Setu logo"
              />{" "}
              Vidhya <span className="text-secondary ms-1">Setu</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav">
              <FontAwesomeIcon icon={faBarsStaggered} className="fs-2" />
            </Navbar.Toggle>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto text-start">
                <Nav.Link
                  href="#home"
                  className="text-primary pt-3 mt-3 border-top border-primary"
                >
                  <FontAwesomeIcon icon={faHouse} className="me-1" /> Home
                </Nav.Link>
                <Nav.Link
                  href="#circular"
                  className="text-primary pt-3 mt-3 border-top border-primary"
                >
                  <FontAwesomeIcon icon={faPaste} className="me-1" /> Circular
                </Nav.Link>
                <Nav.Link
                  href="#help"
                  className="text-primary pt-3 mt-3 border-top border-primary"
                >
                  <FontAwesomeIcon icon={faCircleInfo} className="me-1" /> Help
                </Nav.Link>
                <Nav.Link
                  href="#contact"
                  className="text-primary pt-3 mt-3 border-top border-primary"
                >
                  <FontAwesomeIcon icon={faPhone} className="me-1" /> Contact
                </Nav.Link>
                <Nav.Link
                  href="/signup"
                  className="btn btn-secondary mt-3 mb-3"
                >
                  Signup
                </Nav.Link>
                <Nav.Link href="/login" className="btn btn-primary mb-3">
                  Login
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </React.Fragment>
  );
};
