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
import Spinner from "react-bootstrap/Spinner";
import successSound from "../assets/success.wav";
import { useTranslation } from "react-i18next";
import Loader from "../loadSpinner/loader";
import { useLoading } from "../LoadingContext";

export const Otp = () => {
  const { isLoading, setIsLoading } = useLoading(); 
  const { t } = useTranslation();
  const { sendOtp, resendOtp } = useAuth();
  const searchParams = queryString.parse(window.location.search);
  const emailId = searchParams.email;
  const contactNo = searchParams.contact ? "+" + searchParams.contact.trim() : "";

  const [formData, setFormData] = useState({
    ...initialsendOtpData,
    email: emailId || "",
    contact: contactNo || "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [disableResend, setDisableResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    } 
    setTimeout(() => {
      setIsLoading(false);
      document.body.classList.remove("no-scroll");
    }, 1000);
  }, []);


  const playSuccessSound = () => {
    const audio = new Audio(successSound);
    audio.play();
  };

  const handleOtpChange = (value, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    setLoading(true);
    const response = await sendOtp(formData);
    const { status, message } = response;
    if (status) {
      setIsLoading(true);
      navigate("/login");
      toast.success("OTP verification successful.");
    } else {
      playSuccessSound();
      setIsLoading(false);
      toast.error(message);
    }
    setLoading(false);
  };

  const handleResendOtp = async () => {
    const response = await resendOtp(formData);
    const { status, message } = response;
    if (status) { 
      setIsLoading(true);
      toast.success(message);
     navigate("/otp?email=" + formData.email + "&contact=" + formData.contact);
      setDisableResend(true);
      setResendTimer(30);
      startResendTimer();
    } else {
      const { message } = response;
      toast.error(message);
      setIsLoading(false);
    }
  };

  const startResendTimer = () => {
    const timer = setInterval(() => {
      setResendTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(timer);
          setDisableResend(false);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(startResendTimer);
  }, []);

  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <React.Fragment>
         {isLoading && <Loader />}
      <Container>
        <div className="section-title">
          <h2 className="text-primary">{t("Verification")}</h2>
          <p className="text-dark w-sm-100 w-md-50 mx-auto">{t("Verify Your Details")}</p>
        </div>
        <div className="form-box text-start">
          <Form onSubmit={handleSubmit}>
            <div>
              <div className="otp-input mb-3 text-center">
                <Form.Label className="text-dark">{t("We have sent OTP to your email ID")}</Form.Label>
                <OtpInput
                  value={formData.emailotp}
                  onChange={(value) => handleOtpChange(value, "emailotp")}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <div className="otp-input mb-3 text-center">
                <Form.Label className="text-dark">{t("We have sent OTP to your Mobile No")}</Form.Label>
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
                  {t("Resend OTP")} {disableResend && `(${formatTimer(resendTimer)})`}
                </Link>
              </div>
            </div>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : <span>{t("Verify")}</span>}
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
