import React, { useState } from "react";
import { Container, Button, FloatingLabel, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../auth/hooks/useAuth";

export const SignupSec = () => {
  // Public Signup States
  const [pubCandidatename, setPubCandidatename] = useState("");
  const [pubMobilenumber, setPubMobilenumber] = useState("");
  const [pubEmail, setPubEmail] = useState("");
  const [pubPassword, setPubPassword] = useState("");
  const [pubConfirmPassword, setPubConfirmPassword] = useState("");
  const [showPubPassword, setShowPubPassword] = useState(false);
  const [showPubConfirmPassword, setShowPubConfirmPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Toggle Functions for Public Signup
  const handlePubPasswordToggle = () => {
    setShowPubPassword(!showPubPassword);
  };

  const handlePubConfirmPasswordToggle = () => {
    setShowPubConfirmPassword(!showPubConfirmPassword);
  };

  const handleSubmit = async () => {
    if (!pubCandidatename.trim()) {
      Swal.fire({
        icon: "error",
        title: "Name is required",
        text: "Please enter your name.",
      });
      return;
    }

    if (!/^\d{10}$/.test(pubMobilenumber)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Mobile Number",
        text: "Please enter a valid 10-digit mobile number.",
      });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(pubEmail)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    if (
      pubPassword.length < 8 ||
      !/\d/.test(pubPassword) ||
      !/[!@#$%^&*]/.test(pubPassword)
    ) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 8 characters long and contain a number and a special character.",
      });
      return;
    }

    if (pubPassword !== pubConfirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Please ensure both password fields match.",
      });
      return;
    }

    try {
      // Call APIs
      Swal.fire({
        title: "Confirm?",
        text: "Do you want to final submit?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          signup({
            username: pubCandidatename,
            email: pubEmail,
            phonenumber: pubMobilenumber,
            password: pubPassword,
          });
          navigate("/verifyotp");
        }
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: "There was an error submitting your data. Please try again.",
      });
    }
  };

  return (
    <React.Fragment>
      <Container>
        <div className="section-title text-center mb-4">
          <h2 className="text-primary">Sign Up</h2>
        </div>
        <div className="d-flex justify-content-center">
          <div className="form-box">
            <Form>
              <FloatingLabel
                controlId="floatingPubName"
                label="Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={pubCandidatename}
                  onChange={(e) => setPubCandidatename(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPubMobileNumber"
                label="Mobile Number"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Mobile Number"
                  value={pubMobilenumber}
                  onChange={(e) => setPubMobilenumber(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPubEmail"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={pubEmail}
                  onChange={(e) => setPubEmail(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPubPassword"
                label="Password"
                className="mb-3 position-relative"
              >
                <Form.Control
                  type={showPubPassword ? "text" : "password"}
                  placeholder="Password"
                  value={pubPassword}
                  onChange={(e) => setPubPassword(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={showPubPassword ? faEyeSlash : faEye}
                  onClick={handlePubPasswordToggle}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                  }}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPubConfirmPassword"
                label="Confirm Password"
                className="mb-3 position-relative"
              >
                <Form.Control
                  type={showPubConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={pubConfirmPassword}
                  onChange={(e) => setPubConfirmPassword(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={showPubConfirmPassword ? faEyeSlash : faEye}
                  onClick={handlePubConfirmPasswordToggle}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                  }}
                />
              </FloatingLabel>
              <Button
                variant="primary"
                onClick={handleSubmit}
                className="mt-3 w-100"
              >
                <span>Sign Up</span>
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};
