import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export const OtpSec = ({ email, contact }) => {
    const [mailOtp, setMailOtp] = useState('');
    const [mobileOtp, setMobileOtp] = useState('');
    const [verificationError, setVerificationError] = useState('');

    useEffect(() => {
        // Log the email and contact for verification
        console.log("Email:", email);
        console.log("Contact:", contact);
    }, []);

    const handleVerification = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:9094/api/auth/verifyOtp", {
                emailotp: mailOtp,
                mobileotp: mobileOtp,
                email: email,
                contact: contact
            });

            if (response.data.status === "success") {
                // Handle successful verification, e.g., redirect the user
                console.log("Verification successful");
            } else {
                // Handle verification failure
                setVerificationError(response.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle errors
        }
    };

    return (
        <React.Fragment>
            <Container>
                <div className="section-title">
                    <h2 className="text-primary">Verification</h2>
                    <p className="text-dark w-sm-100 w-md-50 mx-auto">Verify Your Details</p>
                </div>
                <div className="form-box text-start">
                    <Form onSubmit={handleVerification}>
                        <div>
                            <div className='otp-input mb-3 text-center'>
                                <Form.Label className='text-dark'>We have sent OTP to your mail ID</Form.Label>
                                <OtpInput
                                    value={mailOtp}
                                    onChange={setMailOtp}
                                    numInputs={6}
                                    renderInput={(props) => <input {...props} />}
                                />
                            </div>
                            <div className='resend-link text-center mb-3'>
                                <Link to="#" className='text-decoration-none text-secondary'>Resend OTP</Link>
                            </div>
                            <div className='otp-input mb-3 text-center'>
                                <Form.Label className='text-dark'>We have sent OTP to your Mobile No</Form.Label>
                                <OtpInput
                                    value={mobileOtp}
                                    onChange={setMobileOtp}
                                    numInputs={6}
                                    renderInput={(props) => <input {...props} />}
                                />
                            </div>
                            <div className='resend-link text-center mb-3'>
                                <Link to="#" className='text-decoration-none text-secondary'>Resend OTP</Link>
                            </div>
                        </div>
                        {verificationError && (
                            <p className="text-danger">{verificationError}</p>
                        )}
                        <Button variant="primary" type="submit">
                            <span>Verify</span>
                        </Button>
                        <Form.Text className="w-100 d-inline-block text-center mt-3">
                            Already have an account ? <Link to="/login" className="text-secondary text-decoration-none">Login</Link>
                        </Form.Text>
                    </Form>
                </div>
            </Container>
        </React.Fragment>
    )
}
