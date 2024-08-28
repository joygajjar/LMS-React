import React, { useState } from "react";
import {
  Container,
  Button,
  FloatingLabel,
  Form,
  Nav,
  Tab,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../auth/hooks/useAuth";
import { loginHRMS } from "../../services/authServiceHRMS";
import { loginSSO } from "../../services/authServiceSSO";

export const LoginSec = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEye);
  const [activeTab, setActiveTab] = useState("public");
  const { login } = useAuth();
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  const handleToggle = () => {
    setShowPassword(!showPassword);
    if (type === "password") {
      setIcon(faEyeSlash);
      setType("text");
    } else {
      setIcon(faEye);
      setType("password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: userName,
      password: password,
    };
    login(formData);
  };

  const handleSubmitHRMS = async (e) => {
    e.preventDefault();
    const formData = {
      username: userName,
      password: password,
    };
    loginHRMS(formData);
  };

  const handleSubmitSSO = async (e) => {
    e.preventDefault();
    const formData = {
      username: userName,
      password: password,
    };
    loginSSO(formData);
  };

  return (
    <React.Fragment>
      <Container>
        <div className="section-title text-center mb-4">
          <h2 className="text-primary">Login</h2>
        </div>
        <div className="form-box text-start mb-4 tab-style">
          <Tab.Container id="login-tabs" defaultActiveKey="public">
            <Nav
              variant="tabs"
              className="d-flex align-items-center justify-content-center gap-2 mb-3 mb-lg-5 border-0"
            >
              <Nav.Item>
                <Nav.Link
                  eventKey="public"
                  onClick={() => setActiveTab("public")}
                  className={activeTab === "public" ? "active" : ""}
                >
                  Public Login
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="faculty"
                  onClick={() => setActiveTab("faculty")}
                  className={activeTab === "faculty" ? "active" : ""}
                >
                  Faculty Login
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="student"
                  onClick={() => setActiveTab("student")}
                  className={activeTab === "student" ? "active" : ""}
                >
                  Student Login
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="public">
                <Form onSubmit={handleSubmit}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email ID/Phone No"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Email ID"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="form-control-feedback"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="position-relative mb-3"
                  >
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <FontAwesomeIcon
                      icon={icon}
                      onClick={handleToggle}
                      className="form-control-feedback"
                    />
                  </FloatingLabel>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mb-3 w-100"
                  >
                    <span>Login</span>
                  </Button>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="faculty">
                <Form onSubmit={handleSubmitHRMS}>
                  <FloatingLabel
                    controlId="floatingFacultyEmail"
                    label="Faculty Email/Phone No"
                    className="mb-3"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Faculty Email"
                      required
                    />
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="form-control-feedback"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingFacultyPassword"
                    label="Faculty Password"
                    className="position-relative mb-3"
                  >
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Faculty Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <FontAwesomeIcon
                      icon={icon}
                      onClick={handleToggle}
                      className="form-control-feedback"
                    />
                  </FloatingLabel>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mb-3 w-100"
                  >
                    <span>Login</span>
                  </Button>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="student">
                <Form onSubmit={handleSubmitSSO}>
                  <FloatingLabel
                    controlId="floatingStudentEmail"
                    label="Student Email/Phone No"
                    className="mb-3"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Student Email"
                      required
                    />
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="form-control-feedback"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingStudentPassword"
                    label="Student Password"
                    className="position-relative mt-3"
                  >
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Student Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <FontAwesomeIcon
                      icon={icon}
                      onClick={handleToggle}
                      className="form-control-feedback"
                    />
                  </FloatingLabel>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-3 w-100"
                  >
                    <span>Login</span>
                  </Button>
                </Form>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </Container>
    </React.Fragment>
  );
};
