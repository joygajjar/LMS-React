import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextField from '@mui/material/TextField';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const RegistrationSec = () => {
    const [value, setValue] = React.useState(null);
    return (
        <React.Fragment>
            <Container>
                <div className="section-title">
                    <h2 className="text-primary">Basic Registration</h2>
                    <p className="text-dark w-sm-100 w-md-50 mx-auto mb-0">Enter your basic details as per institute establishment records.</p>
                    <p className="text-dark w-sm-100 w-md-50 mx-auto fw-medium"><span className='text-danger me-1'>*</span>Indicates required details</p>
                </div>
                <div className="registration-box text-start">
                    <Form>
                        <div className='pb-2 mb-2 pb-lg-4 mb-lg-4 border-bottom border-light'>
                            <Row>
                                <Col xs={12} md={6}>
                                    <FloatingLabel controlId="floatingInput" label="Registered Email ID" className='mb-3'>
                                        <Form.Control type="email" placeholder="name@example.com" value="savan.aghera@qpaix.com" disabled />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={6}>
                                    <FloatingLabel controlId="floatingInput" label="Registered Phone No" className='mb-3'>
                                        <Form.Control type="text" placeholder="Enter Your Mobile No" value="+91 1234567890" disabled />
                                    </FloatingLabel>
                                </Col>
                            </Row> 
                        </div>
                        <div>
                            <h3 className='text-primary border-bottom border-light'><FontAwesomeIcon icon={faAnglesRight} className='me-2' />Personal Info</h3>
                            <Row>
                                <Col xs={12} md={12} lg={3}>
                                    <FloatingLabel controlId="floatingSelect" label="Salutation" className='mb-3'>
                                        <Form.Select aria-label="Floating label select example" required>
                                            <option>Select</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={4} lg={3}>
                                    <FloatingLabel controlId="floatingInput" label="Person Name" className='mb-3'>
                                        <Form.Control type="text" placeholder="Person Name" required />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={4} lg={3}>
                                    <FloatingLabel controlId="floatingInput" label="Middle Name" className='mb-3'>
                                        <Form.Control type="text" placeholder="Middle Name" required />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={4} lg={3}>
                                    <FloatingLabel controlId="floatingInput" label="Surname" className='mb-3'>
                                        <Form.Control type="text" placeholder="Surname" required />
                                    </FloatingLabel>
                                </Col>
                                
                                <Col xs={12} md={6}>
                                    <FloatingLabel controlId="floatingSelect" label="Date of Birth" className='mb-3'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker className='w-100' />
                                        </LocalizationProvider>
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={6}>
                                    <FloatingLabel controlId="floatingSelect" label="Gender" className='mb-3'>
                                        <Form.Select aria-label="Floating label select example" required>
                                            <option>Select</option>
                                            <option value="1">Male</option>
                                            <option value="2">Female</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                            </Row> 
                            <h3 className='text-primary border-bottom border-light'><FontAwesomeIcon icon={faAnglesRight} className='me-2' />Institute Details</h3>
                            <Row>
                                <Col xs={12} md={6}>
                                    <FloatingLabel controlId="floatingSelect" label="Institute Type" className='mb-3'>
                                        <Form.Select aria-label="Floating label select example" required>
                                            <option>Select</option>
                                            <option value="1">Govt-Technical</option>
                                            <option value="2">GIA-Technical</option>
                                            <option value="3">GIA-Higher</option>
                                            <option value="4">University</option>
                                            <option value="5">Private-Technical</option>
                                            <option value="6">Vidyapith</option>
                                            <option value="7">Other</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={6}>
                                    <FloatingLabel controlId="floatingSelect" label="Institute Name" className='mb-3'>
                                        <Form.Select aria-label="Floating label select example" required>
                                            <option>Select</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={6}>
                                    <FloatingLabel controlId="floatingSelect" label="Department Name" className='mb-3'>
                                        <Form.Select aria-label="Floating label select example" required>
                                            <option>Select</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={6}>
                                    <FloatingLabel controlId="floatingSelect" label="Appointment Type" className='mb-3'>
                                        <Form.Select aria-label="Floating label select example" required>
                                            <option>Select</option>
                                            <option value="1">Regular</option>
                                            <option value="2">Adhoc</option>
                                            <option value="3">Contractual</option>
                                            <option value="4">Part Time</option>
                                            <option value="5">Fixpay Class III</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                
                                <Col xs={12} md={6}>
                                    <FloatingLabel controlId="floatingSelect" label="Class Type" className='mb-3'>
                                        <Form.Select aria-label="Floating label select example" required>
                                            <option>Select</option>
                                            <option value="1">Class I</option>
                                            <option value="2">Class II</option>
                                            <option value="3">Class III</option>
                                            <option value="4">Class IV</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={6}>
                                    <FloatingLabel controlId="floatingSelect" label="Work Type" className='mb-3'>
                                        <Form.Select aria-label="Floating label select example" required>
                                            <option>Select</option>
                                            <option value="1">Teaching</option>
                                            <option value="2">Non-Teaching</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={6}>
                                    <FloatingLabel controlId="floatingSelect" label="Designation" className='mb-3'>
                                        <Form.Select aria-label="Floating label select example" required>
                                            <option>Select</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} md={12}>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Upload Photo</Form.Label>
                                    <Form.Control type="file" className='choose-photo' />
                                    <p className='info'>Notes : Upload Scanned Copy of Photo (File size must not exceed 02 mb) </p>
                                </Form.Group>
                                </Col>
                            </Row> 
                            <Row>
                                <Col xs={12} md={12}>
                                    <div className='d-flex justify-content-center mt-2 pt-4 border-top'>
                                        <Button variant="dark" type="button" className='mx-1'>
                                            <span>Cancel</span>
                                        </Button>
                                        <Button variant="primary" type="submit" className='mx-1'>
                                            <span>Submit</span>
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </div>
            </Container>
        </React.Fragment>
    )
}