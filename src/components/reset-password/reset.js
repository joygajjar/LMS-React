import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth"; // Assuming useAuth hook is for authentication
import queryString from "query-string";

export const ResetSec = () => {
  
 const { validateToken, resetPassword } = useAuth();
 const searchParams = queryString.parse(window.location.search);
 const token = searchParams.token;
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
 //useffect for run any function on pageload
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
 }
  // Assuming you have these functions in your useAuth hook
  const handleInputChange = (e) => {
    setPassword(e.target.value);
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
      alert(message);
      } else {
      alert(message);
    }
  };
   

  return (
    <React.Fragment>
      <Container>
        <div className="section-title">
          <h2 className="text-primary">Reset Password</h2>
          <p className="text-dark w-sm-100 w-md-50 mx-auto">Add New Password</p>
        </div>
        <div className="form-box text-start">
          <Form onSubmit={(e)=>handleSubmit(e)} >
            <FloatingLabel controlId="floatingPassword" label="New Password" className="mb-3">
              <Form.Control
                type="password"
                
                placeholder="New Password"
                value={password}
                onChange={handleInputChange}
                name="password"
                required
              />
              <FontAwesomeIcon />
            </FloatingLabel>
             <Button variant="primary" type="submit">
              <span>Reset Password</span>
            </Button>
          </Form>
        </div>
      </Container>
    </React.Fragment>
  );
};
