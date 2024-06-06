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

export const ForgotSec = () => {
    const [formData, setFormData] = useState(initialForgotPasswordData);
const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (evt) => {
    evt.preventDefault();
    const response = await forgotPassword(formData);
    let { status, message } = response;
    console.log("response signup component", response);
    if (status) {
      alert(message);
      navigate("/login");
    } else {
      alert(message);
    }
  };
    

  return (
    <React.Fragment>
      <Container>
        <div className="section-title">
          <h2 className="text-primary">Verify Account Detail</h2>
          <p className="text-dark w-sm-100 w-md-50 mx-auto">
            Enter your Email ID/Phone No/Government ID and we'll send you a link
            to reset your password
          </p>
        </div>
        <div className="form-box text-start">
          <Form onSubmit={(e) => handleSubmit(e, formData)}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email ID/Phone No/Government ID"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Enter Email ID/Phone No/Government ID"
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}

              />
              <FontAwesomeIcon icon={faUser} />
            </FloatingLabel>
            {/* make disbale logic as per need */}
            <Button variant="primary" type="submit">
              <span>Submit</span>
            </Button>

            <Form.Text className="w-100 d-inline-block text-center mt-3">
              Already have an account ?{" "}
              <Link to="/login" className="text-secondary text-decoration-none">
                Login
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
                Reset Password Link Sent Successfully
              </h3>
              <p className="text-center text-dark">
                Check and open the link we sent to continue
              </p>
            </Modal.Body>
          </Modal>
        </div>
      </Container>
    </React.Fragment>
  );
};
