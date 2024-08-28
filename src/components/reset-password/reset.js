// src/components/ResetSec.js
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../auth/hooks/useAuth"; // Assuming useAuth hook is for authentication
import queryString from "query-string";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const ResetSec = () => {
  const { validateToken, resetPassword } = useAuth();
  const searchParams = queryString.parse(window.location.search);
  const token = searchParams.token;
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validateTokenResponse(token);
  }, [token]);

  const validateTokenResponse = async (token) => {
    let tokendata = {
      token: token,
    };
    const response = await validateToken(tokendata);
    setEmail(response.data);
    console.log("response validate token", response);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let error = { ...errors };

    switch (name) {
      case "password":
        if (!value) {
          error[name] = t("Password is required");
        } else if (!/^[A-Z][a-z]{5,}(?=.*\d{3,})(?=.*[^a-zA-Z\d\s]).*$/.test(value)) {
          error[name] = t("Password must start with a capital letter, be at least 6 characters long, contain only lowercase letters after the first capital letter, have at least one symbol, and include at least 3 numbers");
        } else {
          error[name] = ""; // Clear the error if validation passes
        }
        break;
      default:
        break;
    }

    setPassword(value);
    setErrors(error);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let formdata = {
      email: email,
      password: password,
      token: token,
    };
    const response = await resetPassword(formdata);
    let { status, message } = response;
    console.log("response signup component", response);
    if (status) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <React.Fragment>
      <Container>
        <div className="section-title">
          <h2 className="text-primary">{t("Reset Password")}</h2>
          <p className="text-dark w-sm-100 w-md-50 mx-auto">{t("Add New Password")}</p>
        </div>
        <div className="form-box text-start">
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingPassword" label={t("New Password")} className="mb-3">
              <Form.Control
                type="password"
                placeholder={t("New Password")}
                value={password}
                onChange={handleInputChange}
                name="password"
                required
              />
              <FontAwesomeIcon />
            </FloatingLabel>
            {errors.password && <p className="text-danger">{errors.password}</p>}
            <Button variant="primary" type="submit">
              <span>{t("Reset Password")}</span>
            </Button>
          </Form>
        </div>
      </Container>
    </React.Fragment>
  );
};
