import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { initialsendOtpData } from "../constant/ComponentState";
import { resendOtp, sendOtp } from "../../services/authService";
import queryString from "query-string";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const OtpSec = () => {
  // Get the search params from the URL
  const searchParams = queryString.parse(window.location.search);
  const emailId = searchParams.email;
  const contactNo = "+" + searchParams.contact.trim();

  // Initialize form data state
  const [formData, setFormData] = useState({
    ...initialsendOtpData,
    email: emailId || "",
    contact: contactNo || ""
  });

  // Initialize navigate function
  const navigate = useNavigate();

  // Handle OTP input change
  const handleOtpChange = (value, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log("formData", formData);
    const response = await sendOtp(formData);
    const { status, message } = response;
    console.log("response signup component", response);
    if (status) {
      toast.success("Account Registered Successfully")
      navigate('/success'); // replace '/success' with your target route
    }else{
      toast.error("Please Enter Valid OTP");
    }
  };

  const handleResendOTP = async (evt) => {
    evt.preventDefault();
    console.log("formData", formData);
    try {
      const response = await resendOtp(formData);
      const { status, message } = response;
      console.log("response signup component", response);
      if (status) {
        toast.success("OTP Resend Successfully");
      } else {
        toast.error("Please Enter Valid >>>>>");
      }
    } catch (error) {
      if (error.response && error.response.status === 404 || error.response.data === "Maximum OTP attempts exceeded. Please try again later.") {
        toast.error("Maximum OTP attempts exceeded. Please try again later.");
      } else {
        toast.error("An error occurred. Please try again later.");
        console.error("Error:", error);
      }
    }
  };


  return (
    <React.Fragment>
      <Container>
        <div className="section-title">
          <h2 className="text-primary">Verification</h2>
          <p className="text-dark w-sm-100 w-md-50 mx-auto">
            Verify Your Details
          </p>
        </div>
        <div className="form-box text-start">
          <Form onSubmit={handleSubmit}>
            <div>
              <div className="otp-input mb-3 text-center">
                <Form.Label className="text-dark">
                  We have sent OTP to your email ID
                </Form.Label>
                <OtpInput
                  value={formData.emailotp}
                  onChange={(value) => handleOtpChange(value, "emailotp")}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <div className="otp-input mb-3 text-center">
                <Form.Label className="text-dark">
                  We have sent OTP to your Mobile No
                </Form.Label>
                <OtpInput
                  value={formData.mobileotp}
                  onChange={(value) => handleOtpChange(value, "mobileotp")}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <div className="resend-link text-center mb-3">
              <Link to="#" className="text-decoration-none text-secondary" onClick={handleResendOTP}>
                  Resend OTP
                </Link>
              </div>
            </div>
            <Button variant="primary" type="submit">
              <span>Verify</span>
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
