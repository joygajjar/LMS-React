import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


export const LoginSec = () => {
    
    const [showPassword, setShowPassword] = useState(false);
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(faEye);
    const handleToggle = () => {
      setShowPassword(!showPassword);
      if (type==='password'){
        setIcon(faEyeSlash);
        setType('text')
     } else {
        setIcon(faEye)
        setType('password')
     }
    };
    
    return (
        <React.Fragment>
            <Container>
                <div className="section-title">
                    <h2>Login</h2>
                    <p>Login yourself</p>
                </div>
                <div className="form-box text-start">
                    <Form>
                        <FloatingLabel controlId="floatingInput" label="Email ID/Phone No" className="mb-3">
                            <Form.Control type="email" placeholder="Email ID/Phone No" required />
                            <FontAwesomeIcon icon={faEnvelope} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type={showPassword ? 'text' : 'password'}
                            placeholder="Password" required />
                            <FontAwesomeIcon icon={icon} onClick={handleToggle} />
                        </FloatingLabel>
                        <div className="d-block d-md-flex my-2 my-md-3 align-items-center justify-content-between">
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember Me" required />
                            </Form.Group>
                            <Link to="/" className="text-center text-md-start d-block d-md-inline-block mt-md-0 mt-2 text-primary text-decoration-none">Forgot Password?</Link>
                        </div>
                        <Button variant="primary" type="submit">
                            <span>Login</span>
                        </Button>
                        
                        <Form.Text className="w-100 d-inline-block text-center mt-3">
                            Don't have an account? <Link to="/" className="text-primary">Register here</Link>
                        </Form.Text>
                    </Form>
                </div>
            </Container>
        </React.Fragment>
    )
}