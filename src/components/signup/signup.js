import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
import { initialSignupData } from "../constant/ComponentState";
import { signup } from "../../services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignupSec = () => {
  const [formData, setFormData] = useState(initialSignupData);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))}

    
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const response = await signup(formData);
    let { status, message } = response;
    console.log("response signup component", response);
    if (status) {
      toast.success("OTP Sent Successfully")
      navigate("/otp?email="+formData.email+"&contact="+formData.contact);
    } 
     else {
      toast.error("Email Or Contact Number Already Exist");
    }
  };

  return (
    <React.Fragment>
      <Container>
        <div className="section-title">
          <h2 className="text-primary">Register</h2>
          <p className="text-dark">Create an Account</p>
        </div>
        <div className="form-box text-start">
          <Form onSubmit={(e) => handleSubmit(e, formData)}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email ID"
              className="mb-3"
            >
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Your Email Address"
                required
              />
              <FontAwesomeIcon icon={faEnvelope} />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Phone No"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="Enter Your Mobile No"
                required
              />
              <FontAwesomeIcon icon={faPhone} />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                required
              />
              <FontAwesomeIcon icon={faLock} />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Confirm Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Enter Confirm Password"
                required
              />
              <FontAwesomeIcon icon={faLock} />
            </FloatingLabel>

            <Button variant="primary" type="submit">
              <span>Signup</span>
            </Button>

            <Form.Text className="w-100 d-inline-block text-center mt-3">
              Already have an account ?{" "}
              <Link to="/login" className="text-secondary text-decoration-none">
                Login
              </Link>
            </Form.Text>
          </Form>
        </div>
      </Container>
    </React.Fragment>
  );
};
