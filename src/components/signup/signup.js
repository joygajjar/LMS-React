import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../auth/hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const SignupSec = () => {
  const [formData, setFormData] = useState({
    email: "",
    contact: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // Remove any non-digit characters from the phone number
    let phoneNumber = formData.contact.replace(/\D/g, "");

    // Check if the phone number starts with '0' or if it is a 10-digit number
    if (phoneNumber.startsWith("0")) {
      phoneNumber = "+91" + phoneNumber.slice(1);
    } else if (phoneNumber.length === 10) {
      phoneNumber = "+91" + phoneNumber;
    }

    // Update formData with the formatted phone number
    const updatedFormData = { ...formData, contact: phoneNumber };

    // Check if the contact number is a valid Indian mobile number
    if (!isValidIndianMobileNumber(phoneNumber.replace("+91", ""))) {
      // If not valid, show an alert using SweetAlert
      Swal.fire({
        icon: "error",
        title: "Invalid Contact Number",
        text: "Please enter a valid Indian mobile number.",
      });
      return;
    }

    const response = await signup(updatedFormData);
    let { status, message } = response;
    console.log("response signup component", response);
    if (status) {
      toast.success(message);
      navigate(
        "/otp?email=" + formData.email + "&contact=" + phoneNumber
      );
    } else {
      toast.error("Email Or Contact Already Exist");
    }
  };

  // Function to check if the phone number is a valid Indian mobile number
  const isValidIndianMobileNumber = (phoneNumber) => {
    const indianMobileNumberRegex = /^[6-9]\d{9}$/;
    return indianMobileNumberRegex.test(phoneNumber);
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
            <FloatingLabel controlId="floatingInput" label="Email ID" className="mb-3">
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
            <FloatingLabel controlId="floatingInput" label="Phone No" className="mb-3">
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
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
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
            <FloatingLabel controlId="floatingPassword" label="Confirm Password" className="mb-3">
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
