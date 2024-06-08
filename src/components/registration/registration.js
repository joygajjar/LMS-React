import React, { useState, useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ProgressBar from 'react-bootstrap/ProgressBar'; // Import ProgressBar

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAuth } from "../../auth/hooks/useAuth";
import { initialRegistrationData, initialStudentData } from "../../components/constant/ComponentState";
import { getAllCategories, getAllReligions, registerStudent, fetchLocationData } from '../../services/authService';
import { toast } from 'react-toastify';

export const RegistrationSec = () => {
    const [formDetails, setFormDetails] = useState(initialRegistrationData);
    const [stuformDetails, setStuformDetails] = useState(initialStudentData);//for personInfo
    const { registration, getAllAddmissionTypes, getAllHSCPassStates, getAllHSCBoards } = useAuth();


    const [hscBoards, setHSCBoards] = useState([]);
    const [addmissionTypes, setAddmissionTypes] = useState([]);
    const [hscPassStates, setHSCPassStates] = useState([]);

    const [categories, setCategories] = useState([]);
    console.log(categories);
    const [religions, setReligions] = useState([]);

    const [locations, setLocations] = useState({});
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [filteredTalukas, setFilteredTalukas] = useState([]);


    const [activeStep, setActiveStep] = useState(0);

    const token = useSelector(state => state.auth.token);
    const registeredEmail = useSelector(state => state.auth.user.email);
    const registeredContact = useSelector(state => state.auth.user.contactNo);
    const years = [];
    for (let year = 1947; year <= 2100; year++) {
        years.push(year);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("categoriesData started",)

                const addmissionTypesData = await getAllAddmissionTypes();
                setAddmissionTypes(addmissionTypesData);
                console.log(addmissionTypesData)
                const hscPassStatesData = await getAllHSCPassStates();
                setHSCPassStates(hscPassStatesData);
                const hscBoardsData = await getAllHSCBoards();
                setHSCBoards(hscBoardsData);

                //personInfo API

                const categoriesData = await getAllCategories();
                console.log("categoriesData", categoriesData)
                setCategories(categoriesData);
                const religionsData = await getAllReligions();
                setReligions(religionsData);

                const locationData = await fetchLocationData();
                setLocations(locationData);

            } catch (error) {
                console.error('Failed to fetch dropdown data:', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(value)
        setFormDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    };
    
    const handleStateChange = (event) => {
        const state = event.target.value;
        setSelectedState(state);
        setSelectedDistrict('');
        setFilteredTalukas([]);
        setStuformDetails((prevDetails) => ({
          ...prevDetails,
          state: state,
          district: '',
          taluka: ''
        }));
      };
    
      const handleDistrictChange = (event) => {
        const district = event.target.value;
        setSelectedDistrict(district);
        setFilteredTalukas(Object.keys(locations[selectedState][district] || {}));
        setStuformDetails((prevDetails) => ({
          ...prevDetails,
          district: district,
          taluka: ''
        }));
      };
    
      const handleTalukaChange = (event) => {
        const taluka = event.target.value;
        setStuformDetails((prevDetails) => ({
          ...prevDetails,
          taluka: taluka
        }));
      };

    const stuhandleChange = (e) => {
        const { name, value } = e.target
        console.log(value)
        setStuformDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formDetails)
            let formdata = {
                name: formDetails.basicBoardDetailsName,
                hscSeatNo: formDetails.hscSeatNo,
                examMonth: formDetails.examMonth,
                examYear: formDetails.examYear,
                addmissionType: {
                    id: formDetails.addmissionType
                },
                hscPassState: {
                    id: formDetails.hscPassState
                },
                hscBoard: {
                    id: formDetails.hscBoard
                }
            }

            const response = await registration(formdata, token);
            console.log(response);

            let studata = {
                studentName: stuformDetails.studentName,
                fatherName: stuformDetails.fatherName,
                gender: stuformDetails.gender,
                pancardNo: stuformDetails.pancardNo,
                fullAadharNo: stuformDetails.fullAadharNo,
                dob: stuformDetails.dob,
                category: {
                    id: stuformDetails.category,
                },
                religion: {
                    id: stuformDetails.religion
                },
                minority: false,
                presentAddress: stuformDetails.presentAddress,
                permanentAddress: stuformDetails.permanentAddress,
                pincode: stuformDetails.pincode,
                state:stuformDetails.state,
                district:stuformDetails.district,
                taluka:stuformDetails.taluka,
                // fatherContactNo: stuformDetails.fatherContactNo,
                // fatherEmailId: stuformDetails.fatherEmailId,
                // isLivingWithGuardians: false,
            }

            const response1 = await registerStudent(studata, token);
            console.log(response1);
            toast.success("Successfully Resistered")
            // Handle successful response
        } catch (error) {
            console.error('Failed to save basic details:', error.message);
            // Handle error response
        }
    };
    const steps = ['Basic Board Details', 'Personal Info', 'HSC Details', 'Upload Documents'];


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const formFilledPercentage = ((activeStep + 1) / steps.length) * 100;

    return (
        <React.Fragment>
            <Container>
                <div className="section-title">
                    <h2 className="text-primary">Basic Registration</h2>
                    <p className="text-dark w-sm-100 w-md-50 mx-auto mb-0">Enter your basic details as per institute establishment records.</p>
                    <p className="text-dark w-sm-100 w-md-50 mx-auto fw-medium"><span className='text-danger me-1'>*</span>Indicates required details</p>
                    <p className="text-dark w-sm-100 w-md-100 mx-auto mb-0">Form Filled: {formFilledPercentage.toFixed(2)}%</p>
                </div>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <div className="registration-box text-start">
                    <Form onSubmit={(e) => handleSubmit(e, formDetails)}>
                        <div>
                            {activeStep === 0 && (
                                <React.Fragment>
                                    {/* Basic Board Details Form Section */}
                                    <h3 className='text-primary border-bottom border-light'><FontAwesomeIcon icon={faAnglesRight} className='me-2' />Basic Board Details</h3>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <FloatingLabel controlId="floatingSelect" label="Admission Type" className='mb-3'>
                                                <Form.Select aria-label="Floating label select example" name="addmissionType" value={formDetails.typehs} onChange={handleChange} required>
                                                    <option>Select</option>
                                                    {addmissionTypes.map(type => (
                                                        <option key={type.id} value={type.id}>{type.addmissionType}</option>
                                                    ))}
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <FloatingLabel controlId="floatingSelect" label="HSC Passing State" className='mb-3'>
                                                <Form.Select aria-label="Floating label select example" name="hscPassState" value={formDetails.state} onChange={handleChange} required>
                                                    <option>Select</option>
                                                    {hscPassStates.map(state => (
                                                        <option key={state.id} value={state.id}>{state.hscPassingState}</option>
                                                    ))}
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={12} lg={3}>
                                            <FloatingLabel controlId="floatingSelect" label="HSC Board" className='mb-3'>
                                                <Form.Select aria-label="HSC Board" name="hscBoard" value={formDetails.board} onChange={handleChange} required>
                                                    <option value="">Select</option>
                                                    {hscBoards.map(board => (
                                                        <option key={board.id} value={board.id}>{board.hscBoardName}</option>
                                                    ))}
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={12} lg={3}>
                                            <FloatingLabel controlId="floatingInput" label="Exam Year" className="mb-3">
                                                <Form.Select
                                                    name="examYear"
                                                    value={formDetails.examYear}
                                                    onChange={handleChange}
                                                    required                                                 >
                                                    <option value="">Select Exam Year</option>
                                                    {years.map((year) => (
                                                        <option key={year} value={year}>{year}</option>
                                                    ))}
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={12} lg={3}>
                                            <FloatingLabel controlId="floatingInput" label="Exam Month" className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    name="examMonth"
                                                    value={formDetails.examMonth}
                                                    placeholder="Enter Exam Month"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={12} lg={3}>
                                            <FloatingLabel controlId="floatingInput" label="HSC Seat No" className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    name="hscSeatNo"
                                                    value={formDetails.hscSeatNo}
                                                    placeholder="Enter HSC Seat No"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </FloatingLabel>
                                        </Col>

                                        <div className='pb-2 mb-2 pb-lg-4 mb-lg-4 border-bottom border-light'>
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <FloatingLabel controlId="floatingInput" label="Registered Email ID" className='mb-3'>
                                                        <Form.Control type="email" placeholder="name@example.com" value={registeredEmail} disabled />
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <FloatingLabel controlId="floatingInput" label="Registered Phone No" className='mb-3'>
                                                        <Form.Control type="text" placeholder="Enter Your Mobile No" value={registeredContact} disabled />
                                                    </FloatingLabel>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Row>
                                </React.Fragment>
                            )}
                            {activeStep === 1 && (
                                <React.Fragment>
                                    {/* Personal Info Form Section */}
                                    <h3 className='text-primary border-bottom border-light'><FontAwesomeIcon icon={faAnglesRight} className='me-2' />Personal Info</h3>

                                    <Row>
                                        <Col xs={12} md={12}>
                                            <FloatingLabel controlId="floatingInput" label="Student Name" className='mb-3'>
                                                <Form.Control type="text"
                                                    placeholder="Person Name"
                                                    name="studentName"
                                                    value={stuformDetails.studentName} onChange={stuhandleChange}
                                                    required />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <FloatingLabel controlId="floatingInput" label="Father Full Name" className='mb-3'>
                                                <Form.Control type="text" placeholder="Person Name" name="fatherName" value={stuformDetails.fatherName} onChange={stuhandleChange} required />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <FloatingLabel controlId="floatingSelect" label="Gender" className='mb-3'>
                                                <Form.Select aria-label="Floating label select example" name="gender" value={stuformDetails.gender} onChange={stuhandleChange} required>
                                                    <option>Select</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <FloatingLabel controlId="floatingInput" label="Adhar Card No" className='mb-3'>
                                                <Form.Control type="text" placeholder="Adhar Card No" name="fullAadharNo" value={stuformDetails.fullAadharNo} onChange={stuhandleChange} required />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <FloatingLabel controlId="dob" label="Date Of Birth" className='mb-3'>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        value={stuformDetails.dob}
                                                        onChange={(date) => {
                                                            stuhandleChange({ target: { name: 'dob', value: date } });
                                                        }}
                                                        renderInput={(params) => <Form.Control {...params} type="date" required />}
                                                    />
                                                </LocalizationProvider>
                                            </FloatingLabel>

                                        </Col>

                                        <Col xs={12} md={6}>
                                            <FloatingLabel controlId="floatingSelect" label="Nationality" className='mb-3'>
                                                <Form.Select aria-label="Floating label select example" required>
                                                    <option>Select</option>
                                                    <option value="1">Indian</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <FloatingLabel controlId="floatingSelect" label="Category " className='mb-3'>

                                                <Form.Select aria-label="Category" name="category" value={stuformDetails.category} onChange={stuhandleChange} required>
                                                    <option value="">Select</option>
                                                    {categories.map(category => (
                                                        <option key={category.id} value={category.id}>{category.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <FloatingLabel controlId="floatingSelect" label="Religion " className='mb-3'>
                                                <Form.Select aria-label="Religion" name="religion" value={stuformDetails.religion} onChange={stuhandleChange} required>
                                                    <option value="">Select</option>
                                                    {religions && religions.map(religion => (
                                                        <option key={religion.id} value={religion.id}>{religion.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <FloatingLabel controlId="floatingSelect" label="Minority" className='mb-3'>
                                                <Form.Select aria-label="Minority" name="minority" value={stuformDetails.minority} onChange={stuhandleChange} required>
                                                    <option value="">Select</option>
                                                    <option value="true">Yes</option>
                                                    <option value="false">No</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <FloatingLabel controlId="floatingInput" label="Present Address(Max 255 Character)" className='mb-3'>
                                                <Form.Control type="text" placeholder="Person Name" name="presentAddress" value={stuformDetails.presentAddress} onChange={stuhandleChange} required />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <FloatingLabel controlId="floatingInput" label="Permanent Address(Max 255 Character)" className='mb-3'>
                                                <Form.Control type="text" placeholder="Person Name" name="permanentAddress" value={stuformDetails.permanentAddress} onChange={stuhandleChange} required />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={6}>
        <FloatingLabel controlId="floatingSelect" label="State" className='mb-3'>
          <Form.Select value={selectedState} onChange={handleStateChange}>
            <option value="">Select State</option>
            {Object.keys(locations).map(state => (
              <option key={state} value={state}>{state.split('_')[1]}</option>
            ))}
          </Form.Select>
        </FloatingLabel>
      </Col>
      <Col xs={12} md={6}>
        <FloatingLabel controlId="floatingSelect" label="District" className='mb-3'>
          <Form.Select value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedState}>
            <option value="">Select District</option>
            {Object.keys(locations[selectedState] || {}).map(district => (
              <option key={district} value={district}>{district.split('_')[1]}</option>
            ))}
          </Form.Select>
        </FloatingLabel>
      </Col>
      <Col xs={12} md={6}>
        <FloatingLabel controlId="floatingSelect" label="Taluka" className='mb-3'>
          <Form.Select value={stuformDetails.taluka} onChange={handleTalukaChange} disabled={!selectedDistrict}>
            <option value="">Select Taluka</option>
            {filteredTalukas.map(taluka => (
              <option key={taluka} value={taluka}>{taluka.split('_')[1]}</option>
            ))}
          </Form.Select>
        </FloatingLabel>
      </Col>
                                        <Col xs={12} md={6}>
                                            <FloatingLabel controlId="floatingInput" label="Pincode" className='mb-3'>
                                                <Form.Control type="text" placeholder="Person Name" name="pincode" value={stuformDetails.pincode} onChange={stuhandleChange} required />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <FloatingLabel controlId="floatingInput" label="Pancard No" className='mb-3'>
                                                <Form.Control type="text" placeholder="Pancard No" name="pancardNo" value={stuformDetails.pancardNo} onChange={stuhandleChange} required />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            )}
                            {activeStep === 2 && (
                                <React.Fragment>
                                    {/* HSC Details Form Section */}
                                    <h3 className='text-primary border-bottom border-light'><FontAwesomeIcon icon={faAnglesRight} className='me-2' />HSC Details</h3>
                                    <Row>
                                        <Col xs={12} md={12}>
                                            <FloatingLabel controlId="floatingInput" label="HSC School Name" className='mb-3'>
                                                <Form.Control type="text" placeholder="Person Name" required />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <FloatingLabel controlId="floatingInput" label="Obtained Marks" className='mb-3'>
                                                <Form.Control type="text" placeholder="Person Name" required />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <FloatingLabel controlId="floatingInput" label="Total Marks" className='mb-3'>
                                                <Form.Control type="text" placeholder="Person Name" required />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <FloatingLabel controlId="floatingInput" label="Percentile" className='mb-3'>
                                                <Form.Control type="text" placeholder="Person Name" required />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>

                                    <h3 className='text-primary border-bottom border-light'><FontAwesomeIcon icon={faAnglesRight} className='me-2' />Additional Details</h3>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <FloatingLabel controlId="floatingInput" label="Father Mobile Number" className='mb-3'>
                                                <Form.Control type="text" placeholder="Person Name" required />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <FloatingLabel controlId="floatingInput" label="Father Email Address" className='mb-3'>
                                                <Form.Control type="text" placeholder="Person Name" required />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <Form.Group>
                                                <Form.Label>Are you living with your parents?</Form.Label>
                                                <div className='mb-3 d-flex gap-3'>
                                                    <Form.Check
                                                        type="radio"
                                                        label="Yes"
                                                        name="livingWithParents"
                                                        id="livingWithParentsYes"
                                                        value="yes"
                                                        onChange={stuhandleChange}
                                                        checked={stuformDetails.isLivingWithGuardians === true}
                                                    />
                                                    <Form.Check
                                                        type="radio"
                                                        label="No"
                                                        name="livingWithParents"
                                                        id="livingWithParentsNo"
                                                        value="no"
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                </React.Fragment>
                            )}
                            {activeStep === 3 && (
                                <React.Fragment>
                                    {/* HSC Details Form Section */}
                                    <h3 className='text-primary border-bottom border-light'><FontAwesomeIcon icon={faAnglesRight} className='me-2' />Upload Documents</h3>
                                    <Row>
                                        <Col xs={12} md={12}>
                                            <Form.Group controlId="formFile" className="mb-3">
                                                <Form.Label>Upload Photo</Form.Label>
                                                <Form.Control type="file" className='choose-photo' />
                                                <p className='info'>Notes : Upload Scanned Copy of Photo (File size must not exceed 02 mb) </p>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            )}
                            <Row>
                                <Col xs={12} md={12}>
                                    <div className='d-flex justify-content-center mt-2 pt-4 border-top'>
                                        {activeStep !== 0 && (
                                            <Button variant="secondary" onClick={handleBack} className='mx-1'>
                                                Back
                                            </Button>
                                        )}
                                        {activeStep !== steps.length - 1 ? (
                                            <Button variant="primary" onClick={handleNext} className='mx-1'>
                                                Next
                                            </Button>
                                        ) : (
                                            <Button variant="primary" type="submit" className='mx-1'>
                                                Submit
                                            </Button>
                                        )}
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

