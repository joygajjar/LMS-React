// src/components/ForgotSec.js
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import { initialForgotPasswordData } from "../constant/ComponentState";
import { forgotPassword } from "../../services/authService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const ForgotSec = () => {
  const [formData, setFormData] = useState(initialForgotPasswordData);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const response = await forgotPassword(formData);
    let { status, message } = response;
    console.log("response signup component", response);
    if (status) {
      toast.success(message);
      navigate("/login");
    } else {
      toast.error(message);
    }
  };

  return (
    <React.Fragment>
      <Container>
        <div className="section-title">
          <h2 className="text-primary">{t('Verify Account Detail')}</h2>
          <p className="text-dark w-sm-100 w-md-50 mx-auto">
            {t("Enter your Email ID/Phone No/Government ID and we'll send you a link to reset your password")}
          </p>
        </div>
        <div className="form-box text-start">
          <Form onSubmit={(e) => handleSubmit(e, formData)}>
            <FloatingLabel
              controlId="floatingInput"
              label={t('Email ID/Phone No/Government ID')}
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder={t('Enter your Email ID/Phone No/Government ID')}
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <FontAwesomeIcon icon={faUser} />
            </FloatingLabel>
            <Button variant="primary" type="submit">
              <span>{t('Submit')}</span>
            </Button>
            <Form.Text className="w-100 d-inline-block text-center mt-3">
              {t('Already have an account ?')}{" "}
              <Link to="/login" className="text-secondary text-decoration-none">
                {t('Login')}
              </Link>
            </Form.Text>
          </Form>
          <Modal>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <div className="text-center">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="fs-1 mb-1 text-primary p-2 rounded-circle border border-primary"
                />
              </div>
              <h3 className="text-center fs-4 text-primary mb-1 w-md-50 w-sm-100 mx-auto">
                {t('Reset Password Link Sent Successfully')}
              </h3>
              <p className="text-center text-dark">
                {t('Check and open the link we sent to continue')}
              </p>
            </Modal.Body>
          </Modal>
        </div>
      </Container>
    </React.Fragment>
  );
};
