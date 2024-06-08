import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAuth } from "../../auth/hooks/useAuth";
import { toast } from "react-toastify";
import queryString from "query-string";
import { initialsendOtpData } from "../constant/ComponentState";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner component

export const OtpSec = () => {
  // Get the search params from the URL
  const { sendOtp, resendOtp } = useAuth();
  const searchParams = queryString.parse(window.location.search);
  const emailId = searchParams.email;
  const contactNo = searchParams.contact ? "+" + searchParams.contact.trim() : "";

  // Initialize form data state
  const [formData, setFormData] = useState({
    ...initialsendOtpData,
    email: emailId || "",
    contact: contactNo || "",
  });

  // Initialize navigate function
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to track form submission loading
  const [disableResend, setDisableResend] = useState(false); // State to disable the resend link
  const [resendTimer, setResendTimer] = useState(30); // Timer for disabling the resend link

  // Handle OTP input change
  const handleOtpChange = (value, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true); // Set loading to true when form is submitting
    console.log("formData", formData);
    const response = await sendOtp(formData);
    const { status, message } = response;
    console.log("response signup component", response);
    if (status) {
      // Navigate to the desired route on successful OTP verification
      navigate("/login"); //target route
      toast.success("OTP verification successful.");
    } else {
      toast.error(message);
    }
    setLoading(false); // Set loading back to false after form submission
  };

  // Handle OTP resend
  const handleResendOtp = async () => {
      const response = await resendOtp(formData);
      const { status, message } = response;
      if (status) { 
        toast.success(message);
        navigate("/otp?email=" + formData.email + "&contact=" + formData.contact);
        setDisableResend(true); // Disable resend link
        setResendTimer(30); // Reset timer
        startResendTimer(); // Start timer
      } else {
        const { message } = response;
        toast.error(message);
      }
  };

  // Function to start the resend timer
  const startResendTimer = () => {
    const timer = setInterval(() => {
      setResendTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(timer);
          setDisableResend(false); // Enable resend link after timer finishes
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(startResendTimer); // Clear timer on component unmount
  }, []);

  // Format the countdown timer to display minutes and seconds
  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <React.Fragment>
      <Container>
        <div className="section-title">
          <h2 className="text-primary">Verification</h2>
          <p className="text-dark w-sm-100 w-md-50 mx-auto">Verify Your Details</p>
        </div>
        <div className="form-box text-start">
          <Form onSubmit={handleSubmit}>
            <div>
              <div className="otp-input mb-3 text-center">
                <Form.Label className="text-dark">We have sent OTP to your email ID</Form.Label>
                <OtpInput
                  value={formData.emailotp}
                  onChange={(value) => handleOtpChange(value, "emailotp")}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <div className="otp-input mb-3 text-center">
                <Form.Label className="text-dark">We have sent OTP to your Mobile No</Form.Label>
                <OtpInput
                  value={formData.mobileotp}
                  onChange={(value) => handleOtpChange(value, "mobileotp")}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <div className="resend-link text-center mb-3">
                <Link
                  to="#"
                  className={`text-decoration-none text-secondary ${disableResend ? "disabled" : ""}`}
                  onClick={handleResendOtp}
                  style={{ pointerEvents: disableResend ? "none" : "auto" }}
                >
                  Resend OTP {disableResend && `(${formatTimer(resendTimer)})`}
                </Link>
              </div>
            </div>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : <span>Verify</span>}
            </Button>
            <Form.Text className="w-100 d-inline-block text-center mt-3">
              Already have an account?{" "}
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
