import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SignupSec = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [otpSent, setOtpSent] = useState(false); // State to track OTP sending status

    const onSubmit = async (formData) => {
        try {
            const response = await axios.post('http://localhost:9094/api/auth/register', formData);
            console.log(response.data);

            const sendOtpResponse = await axios.post('http://localhost:9094/api/auth/sendOtp', {
                contactNo: formData.contactNo,
                email: formData.emailId
            });
            console.log(sendOtpResponse.data);

            // If OTP sent successfully, set otpSent to true
            setOtpSent(true);

            // Display success message
            toast.success('OTP sent successfully!');

        } catch (error) {
            console.error('Error:', error);
            // Do nothing if OTP sending fails
            toast.info("student sso")
        }
    }; 

    return (
        <React.Fragment>
            <Container>
                <div className="section-title">
                    <h2 className="text-primary">Register</h2>
                    <p className="text-dark">Create an Account</p>
                </div>
                <div className="form-box text-start">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FloatingLabel controlId="email" label="Email ID" className="mb-3">
                            <Form.Control type="email" placeholder="Enter Your Email Address" {...register("emailId", { required: true })} />
                            <FontAwesomeIcon icon={faEnvelope} />
                        </FloatingLabel>
                        <FloatingLabel controlId="phone" label="Phone No" className="mb-3">
                            <Form.Control type="text" placeholder="Enter Your Mobile No" {...register("contactNo", { required: true })} />
                            <FontAwesomeIcon icon={faPhone} />
                        </FloatingLabel>
                        <FloatingLabel controlId="password" label="Password" className="mb-3">
                            <Form.Control type="password" placeholder="Enter Password" {...register("password", { required: true })} />
                            <FontAwesomeIcon icon={faLock} />
                        </FloatingLabel>
                        <FloatingLabel controlId="confirmPassword" label="Confirm Password" className="mb-3">
                            <Form.Control type="password" placeholder="Enter Confirm Password" {...register("confirmPassword", { required: true })} />
                            <FontAwesomeIcon icon={faLock} />
                        </FloatingLabel>
                        {/* Conditionally render Button only if OTP has not been sent */}
                        {!otpSent && (
                            <Button variant="primary" type="submit" onClick={() => toast.info('Attempting to send OTP...')}>Signup</Button>
                        )}
                        <Form.Text className="w-100 d-inline-block text-center mt-3">
                            Already have an account? <Link to="/login" className="text-secondary text-decoration-none">Login</Link>
                        </Form.Text>
                    </Form>
                    {/* Conditionally render Link only if OTP sent successfully */}
                    {otpSent && (
                        <div className="mt-3">
                            <Link to="/otp" className="btn btn-primary" onClick={() => toast.info('Proceeding to OTP Verification...')}>Proceed to OTP Verification</Link>
                        </div>
                    )}

                </div>
            </Container>
        </React.Fragment>
    )
}
