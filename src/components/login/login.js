import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { initialLoginData } from "../../components/constant/ComponentState";
import { useAuth } from "../../auth/hooks/useAuth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/action";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import successSound from "../assets/success.wav";

export const LoginSec = () => {
  const { t, i18n } = useTranslation();
  const [formdata, setFormdata] = useState(initialLoginData);
  const { login } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const playSuccessSound = () => {
    const audio = new Audio(successSound);
    audio.play();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const response = await login(formdata);
    let { status, message, data } = response;
    if (status) {
      playSuccessSound()
      toast.success(message);
      navigate("/registration");
    } else {
      toast.error(message);
    }
  };

  return (
    <React.Fragment>
      <Container>
        <div className="section-title">
          <h2 className="text-primary">{t("Login")}</h2>
          <p className="text-dark">{t("Login yourself")}</p>
        </div>
        <div className="form-box text-start">
          <Form onSubmit={(e) => handleSubmit(e, formdata)}>
            <FloatingLabel
              controlId="floatingInput"
              label={t("Email ID/Phone No/Government ID")}
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="username"
                value={formdata.username}
                onChange={handleInputChange}
                placeholder={t("Enter Email ID/Phone No/Government ID")}
                required
              />
              <FontAwesomeIcon />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label={t("Password")}>
              <Form.Control
                placeholder={t("Password")}
                type="password"
                name="password"
                value={formdata.password}
                onChange={handleInputChange}
                required
              />
              <FontAwesomeIcon />
            </FloatingLabel>
            <div className="d-block d-md-flex my-2 my-md-3 align-items-center justify-content-between">
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label={t("Remember Me")} required />
              </Form.Group>
              <Link
                to="/forgot"
                className="text-center text-md-start d-block d-md-inline-block mt-md-0 mt-2 text-secondary text-decoration-none"
              >
                {t("Forgot Password?")}
              </Link>
            </div>
            <Button variant="primary" type="submit">
              <span>{t("Login")}</span>
            </Button>
            <Form.Text className="w-100 d-inline-block text-center mt-3">
              {t("Don't have an account?")}{" "}
              <Link
                to="/signup"
                className="text-secondary text-decoration-none"
              >
                {t("Signup here")}
              </Link>
            </Form.Text>
          </Form>
        </div>
      </Container>
    </React.Fragment>
  );
};
