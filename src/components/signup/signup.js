import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../auth/hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useTranslation } from 'react-i18next';

export const SignupSec = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    contact: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate inputs on change
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    let error = {};

    switch (name) {
      case "email":
        if (!value) {
          error[name] = t("Email is required");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error[name] = t("Invalid email format");
        }
        break;
      case "contact":
        if (!value) {
          error[name] = t("Phone number is required");
        } else if (!/^\d{10}$/.test(value)) {
          error[name] = t("Invalid phone number format");
        }
        break;
      case "password":
        if (!value) {
          error[name] = t("Password is required");
        } else if (!/^[A-Z][a-z]{5,}(?=.*\d{3,})(?=.*[^a-zA-Z\d\s]).*$/.test(value)) {
          error[name] = t("Password must start with a capital letter, be at least 6 characters long, contain only lowercase letters after the first capital letter, have at least one symbol, and include at least 3 numbers");
        }
        break;
      case "confirmPassword":
        if (!value) {
          error[name] = t("Confirm Password is required");
        } else if (value !== formData.password) {
          error[name] = t("Passwords do not match");
        }
        break;
      default:
        break;
    }

    // Update the errors state
    setErrors((prevErrors) => {
      // Remove the error for the input if the validation passes
      if (!error[name]) {
        const { [name]: removedError, ...rest } = prevErrors;
        return rest;
      }

      // Otherwise, return the updated errors object
      return {
        ...prevErrors,
        ...error,
      };
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // Validate all fields before submitting
    let hasErrors = false;
    for (const key in formData) {
      validateInput(key, formData[key]);
      if (errors[key]) {
        hasErrors = true;
      }
    }

    // If there are errors, prevent form submission
    if (hasErrors) {
      return;
    }

    setLoading(true);

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
      setLoading(false);
      // If not valid, show an alert using SweetAlert
      return;
    }

    const response = await signup(updatedFormData);
    let { status, message } = response;
    setLoading(false);
    console.log("response signup component", response);
    if (status) {
      toast.success(message);
      navigate(
        "/otp?email=" + formData.email + "&contact=" + phoneNumber
      );
    } else {
      toast.error(message);
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
          <h2 className="text-primary">{t("Register")}</h2>
          <p className="text-dark">{t("Create an Account")}</p>
        </div>
        <div className="form-box text-start">
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingInput" label={t("Email ID")} className="mb-3">
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t("Enter Your Email Address")}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
              {!errors.email && <FontAwesomeIcon icon={faEnvelope} />}
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label={t("Phone No")} className="mb-3">
              <Form.Control
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder={t("Enter Your Mobile No")}
                isInvalid={!!errors.contact}
              />
              <Form.Control.Feedback type="invalid">
                {errors.contact}
              </Form.Control.Feedback>
              {!errors.contact && <FontAwesomeIcon icon={faPhone} />}
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label={t("Password")} className="mb-3">
              <Form.Control
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={t("Enter Password")}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
              {!errors.password && <FontAwesomeIcon icon={faLock} />}
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label={t("Confirm Password")} className="mb-3">
              <Form.Control
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder={t("Enter Confirm Password")}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
              {!errors.confirmPassword && <FontAwesomeIcon icon={faLock} />}
            </FloatingLabel>

            <Button variant="primary" type="submit" disabled={loading || Object.keys(errors).length > 0}>
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <span>{t("Signup")}</span>
              )}
            </Button>

            <Form.Text className="w-100 d-inline-block text-center mt-3">
              {t("Already have an account?")}{" "}
              <Link to="/login" className="text-secondary text-decoration-none">
                {t("Login")}
              </Link>
            </Form.Text>
          </Form>
        </div>
      </Container>
    </React.Fragment>
  );
};
