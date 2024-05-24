import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const ResetSec = () => {
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
                    <h2 className="text-primary">Reset Password</h2>
                    <p className="text-dark w-sm-100 w-md-50 mx-auto">Add New Password</p>
                </div>
                <div className="form-box text-start">
                    <Form>
                        <FloatingLabel controlId="floatingPassword" label="New Password" className="mb-3">
                            <Form.Control type={showPassword ? 'text' : 'password'}
                            placeholder="New Password" required />
                            <FontAwesomeIcon icon={icon} onClick={handleToggle} />
                        </FloatingLabel>
                        <Button variant="primary" type="submit">
                            <span>Reset Password</span>
                        </Button>
                    </Form>
                </div>
            </Container>
        </React.Fragment>
    )
}