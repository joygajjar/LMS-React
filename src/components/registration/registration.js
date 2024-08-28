import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Swal from "sweetalert2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAuth } from "../../auth/hooks/useAuth";
import Loader from "../loadSpinner/loader";
import { useLoading } from "../LoadingContext";
import {
  initialRegistrationData,
  initialStudentData,
  initialCurrentInstituteDetailsData,
} from "../../components/constant/ComponentState";
import {
  getAllCategories,
  getAllReligions,
  registerStudent,
  fetchLocationData,
  getAllInstitutes,
  saveInstituteDetails,
} from "../../services/authService";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export const RegistrationSec = () => {
  const { isLoading, setIsLoading } = useLoading();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [responseStudentInfoData, setResponseData] = useState(null);

  const [formDetails, setFormDetails] = useState(initialRegistrationData);
  const [stuformDetails, setStuformDetails] = useState(initialStudentData); //for personInfo

  const [currentInstituteDetails, setCurrentInstituteDetails] = useState(
    initialCurrentInstituteDetailsData
  ); //for current institute deatils

  const {
    registration,
    getAllAddmissionTypes,
    getAllHSCPassStates,
    getAllHSCBoards,
  } = useAuth();

  const [addmissionTypes, setAddmissionTypes] = useState([]);
  const [hscBoards, setHscBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState("");
  const [hscPassStates, setHSCPassStates] = useState([]);
  const [selectedPassStateId, setSelectedPassStateId] = useState("");

  const [categories, setCategories] = useState([]);
  console.log(categories);
  const [religions, setReligions] = useState([]);

  //LOCATION DEATILS
  const [locations, setLocations] = useState({});
  const [selectedPresentState, setSelectedPresentState] = useState("");
  const [selectedPresentDistrict, setSelectedPresentDistrict] = useState("");
  const [filteredPresentTalukas, setFilteredPresentTalukas] = useState([]);

  const [selectedPermanentState, setSelectedPermanentState] = useState("");
  const [selectedPermanentDistrict, setSelectedPermanentDistrict] =
    useState("");
  const [filteredPermanentTalukas, setFilteredPermanentTalukas] = useState([]);
  
  const [isPermanentSameAsPresent, setIsPermanentSameAsPresent] = useState(false);


  //INSTITUTE DETAILS
  const [institutes, setInstitutes] = useState({});
  const [selectedProgramLevel, setSelectedProgramLevel] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [filteredProgram, setFilteredProgram] = useState([]);

  const { uploadFile } = useAuth(); // Destructure the uploadFile function from the useAuth hook
  const [selectedFile, setSelectedFile] = useState(null);

  const [activeStep, setActiveStep] = useState(0);

  const token = useSelector((state) => state.auth.token);
  const registeredEmail = useSelector((state) => state.auth.user.email);
  const registeredContact = useSelector((state) => state.auth.user.contactNo);
  const years = [];
  for (let year = 1947; year <= 2100; year++) {
    years.push(year);
  }

  const months = [
    { value: "January", label: "Jan" },
    { value: "February", label: "Feb" },
    { value: "March", label: "Mar" },
    { value: "April", label: "Apr" },
    { value: "May", label: "May" },
    { value: "June", label: "Jun" },
    { value: "July", label: "Jul" },
    { value: "August", label: "Aug" },
    { value: "September", label: "Sep" },
    { value: "October", label: "Oct" },
    { value: "November", label: "Nov" },
    { value: "December", label: "Dec" },
  ];

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    setTimeout(() => {
      setIsLoading(false);
      document.body.classList.remove("no-scroll");
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("categoriesData started");

        const addmissionTypesData = await getAllAddmissionTypes();
        setAddmissionTypes(addmissionTypesData);
        console.log(addmissionTypesData);
        const hscPassStatesData = await getAllHSCPassStates();
        setHSCPassStates(hscPassStatesData);

        //personInfo API

        const categoriesData = await getAllCategories();
        console.log("categoriesData", categoriesData);
        setCategories(categoriesData);
        const religionsData = await getAllReligions();
        setReligions(religionsData);

        const locationData = await fetchLocationData();
        setLocations(locationData);

        const instituteData = await getAllInstitutes();
        setInstitutes(instituteData);

      } catch (error) {
        console.error("Failed to fetch dropdown data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchHscBoardsByPassState = async (passStateId) => {
    try {
      const hscBoardsData = await getAllHSCBoards(passStateId);
      setHscBoards(hscBoardsData); // Assuming the API response directly provides an array of boards
    } catch (error) {
      console.error("Error fetching HSC boards:", error);
    }
  };

  const handlePassStateChange = (event) => {
    const passStateId = event.target.value;
    setSelectedPassStateId(passStateId);
    fetchHscBoardsByPassState(passStateId);
    setSelectedBoardId(""); // Reset selected board when pass state changes
  };

  const handleBoardChange = (event) => {
    setSelectedBoardId(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setFormDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStateChange = (event, addressType) => {
    const selectedState = event.target.value;

    if (addressType === "present") {
      setSelectedPresentState(selectedState);
      setSelectedPresentDistrict("");
      setFilteredPresentTalukas([]);
      setStuformDetails((prevDetails) => ({
        ...prevDetails,
        presentState: selectedState,
        presentDistrict: "",
        presentTaluka: "",
      }));
    } else if (addressType === "permanent") {
      setSelectedPermanentState(selectedState);
      setSelectedPermanentDistrict("");
      setFilteredPermanentTalukas([]);
      setStuformDetails((prevDetails) => ({
        ...prevDetails,
        permanentState: selectedState,
        permanentDistrict: "",
        permanentTaluka: "",
      }));
    }
  };

  const handleDistrictChange = (event, addressType) => {
    const selectedDistrict = event.target.value;

    if (addressType === "present") {
      setSelectedPresentDistrict(selectedDistrict);
      setFilteredPresentTalukas(
        Object.keys(locations[selectedPresentState][selectedDistrict] || {})
      );
      setStuformDetails((prevDetails) => ({
        ...prevDetails,
        presentDistrict: selectedDistrict,
        presentTaluka: "",
      }));
    } else if (addressType === "permanent") {
      setSelectedPermanentDistrict(selectedDistrict);
      setFilteredPermanentTalukas(
        Object.keys(locations[selectedPermanentState][selectedDistrict] || {})
      );
      setStuformDetails((prevDetails) => ({
        ...prevDetails,
        permanentDistrict: selectedDistrict,
        permanentTaluka: "",
      }));
    }
  };

  const handleTalukaChange = (event, addressType) => {
    const selectedTaluka = event.target.value;

    if (addressType === "present") {
      setStuformDetails((prevDetails) => ({
        ...prevDetails,
        presentTaluka: selectedTaluka,
      }));
    } else if (addressType === "permanent") {
      setStuformDetails((prevDetails) => ({
        ...prevDetails,
        permanentTaluka: selectedTaluka,
      }));
    }
  };

  const handleProgramLevelChange = (event) => {
    const programLevel = event.target.value;
    setSelectedProgramLevel(programLevel);
    setSelectedInstitute("");
    setFilteredProgram([]);
    setCurrentInstituteDetails((prevDetails) => ({
      ...prevDetails,
      programLevel: programLevel,
      institute: "",
      program: "",
    }));
  };

  const handleInstituteChange = (event) => {
    const institute = event.target.value;
    setSelectedInstitute(institute);
    setFilteredProgram(
      Object.keys(institutes[selectedProgramLevel][institute] || {})
    );
    setCurrentInstituteDetails((prevDetails) => ({
      ...prevDetails,
      institute: institute,
      program: "",
    }));
  };

  const handleProgramChange = (event) => {
    const program = event.target.value;
    setCurrentInstituteDetails((prevDetails) => ({
      ...prevDetails,
      program: program,
    }));
  };

  const stuhandleChange = (event) => {
    const { name, value } = event.target;
    let updatedValue = value;

    if (name === "isLivingWithGuardians") {
      updatedValue = value === "yes"; // Convert 'yes' to true and 'no' to false
    }

    setStuformDetails((prevState) => ({ ...prevState, [name]: updatedValue }));
  };

  const currentInsthandleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setCurrentInstituteDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error("No file selected.");
      return;
    }

    if (selectedFile.size > 1 * 1024 * 1024) {
      toast.error("File size exceeds 2MB limit.");
      return;
    }

    try {
      const response = await uploadFile(selectedFile); // Call the uploadFile function with the selected file

      if (response.status) {
        toast.success(response.data + " " + response.message);
        console.log("File upload response:", response);
      } else {
        toast.error(response.message);
        console.error("Error uploading file:", response.message);
      }
    } catch (error) {
      toast.error(error);
      console.error("Error uploading file:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleRegistrationFormSubmit = async (event, formDetails, token) => {
    event.preventDefault();

    try {
      let formdata = {
        name: formDetails.basicBoardDetailsName,
        hscSeatNo: formDetails.hscSeatNo,
        examMonth: formDetails.examMonth,
        examYear: formDetails.examYear,
        addmissionType: {
          id: formDetails.addmissionType,
        },
        hscPassState: {
          id: selectedPassStateId,
        },
        hscBoard: {
          id: selectedBoardId,
        },
      };
      const response = await registration(formdata, token);

      if (response.status) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Failed to save basic details:", error.message);
    }
  };

  const handleStudentDetailsSubmit = async (event, stuformDetails, token) => {
    event.preventDefault();

    try {
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
          id: stuformDetails.religion,
        },
        minority: stuformDetails.minority,
        presentAddress: stuformDetails.presentAddress,
        permanentAddress: stuformDetails.permanentAddress,

        presentPincode: stuformDetails.presentPincode,
        presentState: stuformDetails.presentState,
        presentDistrict: stuformDetails.presentDistrict,
        presentTaluka: stuformDetails.presentTaluka,

        permanentPincode: stuformDetails.permanentPincode,
        permanentState: stuformDetails.permanentState,
        permanentDistrict: stuformDetails.permanentDistrict,
        permanentTaluka: stuformDetails.permanentTaluka,

        fatherContactNo: stuformDetails.fatherContactNo,
        fatherEmailId: stuformDetails.fatherEmailId,
        isLivingWithGuardians: stuformDetails.isLivingWithGuardians,
        hscSchoolName: stuformDetails.hscSchoolName,
        obtainedMarks: stuformDetails.obtainedMarks,
        totalMarks: stuformDetails.totalMarks,
        percentile: stuformDetails.percentile,
      };

      const response = await registerStudent(studata, token);
      console.log(response);
      setResponseData(response);

      if (response.status) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Failed to save student details:", error.message);
    }
  };

  const handleInstituteDetailsSubmit = async (
    event,
    currentInstituteDetails
  ) => {
    event.preventDefault();
    // Checkbox validation
    const checkBox1 = document.getElementById("exampleCheck1");
    const checkBox2 = document.getElementById("exampleCheck2");
    const checkBox3 = document.getElementById("exampleCheck3");

    if (!checkBox1.checked || !checkBox2.checked || !checkBox3.checked) {
      await Swal.fire({
        title: t("Warning"),
        text: t("You must agree to all terms before proceeding."),
        icon: "warning",
        confirmButtonText: t("OK"),
      });
      return;
    }

    const result = await Swal.fire({
      title: t("Are you sure?"),
      text: t("Do you want to lock your profile?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("Yes, save it!"),
      cancelButtonText: t("Cancel"),
    });

    // Check the user's response
    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        let currentInstititeData = {
          entrollmentNo: currentInstituteDetails.entrollmentNo,
          programLevel: currentInstituteDetails.programLevel,
          institute: currentInstituteDetails.institute,
          program: currentInstituteDetails.program,
        };

        const response = await saveInstituteDetails(currentInstititeData);
        console.log(response);
        toast.success("Successfully Saved Institute Details");
        setIsLoading(false);
        navigate("/pages");
      } catch (error) {
        setIsLoading(false); // Stop loading
        toast.error(error.message);
        console.error("Failed to save institute details:", error.message);
      }
    } else {
      // Handle the case where the user cancels the operation
      toast.info("Save operation cancelled");
    }
  };

  const handleSubmitFunctions = [
    handleRegistrationFormSubmit,
    handleStudentDetailsSubmit,
  ];

  const steps = [
    t("Basic Board Details"),
    t("Student Info"),
    t("Upload Documents"),
    t("Current Institute Details"),
    t("Finish Profile"),
  ];

  const handleNext = async (event) => {
    event.preventDefault();
    if (activeStep < handleSubmitFunctions.length) {
      await handleSubmitFunctions[activeStep](
        event,
        activeStep === 0
          ? formDetails
          : activeStep === 1
          ? stuformDetails
          : currentInstituteDetails,
        token
      );
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const formFilledPercentage = ((activeStep + 1) / steps.length) * 100;

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsPermanentSameAsPresent(isChecked);
    if (isChecked) {
      // Copy present address details to permanent address
      setStuformDetails({
        ...stuformDetails,
        permanentAddress: stuformDetails.presentAddress,
        permanentPincode: stuformDetails.presentPincode,
        permanentTaluka: stuformDetails.presentTaluka,
        permanentState: selectedPresentState,
        permanentDistrict: selectedPresentDistrict,
      });
      setSelectedPermanentState(selectedPresentState);
      setSelectedPermanentDistrict(selectedPresentDistrict);
      setFilteredPermanentTalukas(
        Object.keys(
          locations[selectedPresentState][selectedPresentDistrict] || {}
        )
      );
    } else {
      // Clear permanent address details and related fields
      setStuformDetails({
        ...stuformDetails,
        permanentAddress: "",
        permanentPincode: "",
        permanentTaluka: "",
        permanentState: "",
        permanentDistrict: "",
      });
      setSelectedPermanentState("");
      setSelectedPermanentDistrict("");
      // setFilteredPermanentTalukas('');
    }
  };

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <Container>
        <div className="section-title">
          <h2 className="text-primary">{t("Basic Registration")}</h2>
          <p className="text-dark w-sm-100 w-md-50 mx-auto mb-0">
            {t(
              "Enter your basic details as per institute establishment records."
            )}
          </p>
          <p className="text-dark w-sm-100 w-md-50 mx-auto fw-medium">
            <span className="text-danger me-1">*</span>
            {t("Indicates required details")}
          </p>
          <p className="text-dark w-sm-100 w-md-100 mx-auto mb-0">
            {t("Form Filled")}: {formFilledPercentage.toFixed(2)}%
          </p>
        </div>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="registration-box text-start">
          <Form onSubmit={(e) => handleNext(e)}>
            <div>
              {activeStep === 0 && (
                <React.Fragment>
                  {/* Basic Board Details Form Section */}
                  <h3 className="text-primary border-bottom border-light">
                    <FontAwesomeIcon icon={faAnglesRight} className="me-2" />
                    {t("Basic Board Details")}
                  </h3>
                  <Row>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingSelect"
                        label={t("Admission Type")}
                        className="mb-3"
                      >
                        <Form.Select
                          aria-label="Floating label select example"
                          name="addmissionType"
                          value={formDetails.typehs}
                          onChange={handleChange}
                          required
                        >
                          <option>{t("Select")}</option>
                          {addmissionTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.addmissionType}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={12} lg={3}>
                      <FloatingLabel
                        controlId="floatingSelectHSCPassState"
                        label={t("HSC Pass State")}
                        className="mb-3"
                      >
                        <Form.Select
                          aria-label="HSC Pass State"
                          name="hscPassingState"
                          value={selectedPassStateId}
                          onChange={handlePassStateChange}
                        >
                          <option value="">{t("Select")}</option>
                          {hscPassStates.map((state) => (
                            <option key={state.id} value={state.id}>
                              {state.hscPassingState}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={12} lg={3}>
                      <FloatingLabel
                        controlId="floatingSelectHSCBoard"
                        label={t("HSC Board")}
                        className="mb-3"
                      >
                        <Form.Select
                          aria-label="HSC Board"
                          name="hscBoard"
                          value={selectedBoardId}
                          onChange={handleBoardChange}
                          disabled={!selectedPassStateId}
                          required
                        >
                          <option value="">{t("Select")}</option>
                          {hscBoards.map((board) => (
                            <option key={board.id} value={board.id}>
                              {board.hscBoardName}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>

                    <Col xs={12} md={12} lg={3}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Exam Year")}
                        className="mb-3"
                      >
                        <Form.Select
                          name="examYear"
                          value={formDetails.examYear}
                          onChange={handleChange}
                          required
                        >
                          <option value="">{t("Select")}</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>

                    <Col xs={12} md={12} lg={3}>
                      <FloatingLabel
                        controlId="floatingSelect"
                        label={t("Exam Month")}
                        className="mb-3"
                      >
                        <Form.Select
                          name="examMonth"
                          value={formDetails.examMonth}
                          onChange={handleChange}
                          required
                        >
                          <option value="">{t("Select")}</option>
                          {months.map((month) => (
                            <option key={month.value} value={month.value}>
                              {month.label}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={12} lg={3}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("HSC Seat No")}
                        className="mb-3"
                      >
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

                    <div className="pb-2 mb-2 pb-lg-4 mb-lg-4 border-bottom border-light">
                      <Row>
                        <Col xs={12} md={6}>
                          <FloatingLabel
                            controlId="floatingInput"
                            label={t("Registered Email ID")}
                            className="mb-3"
                          >
                            <Form.Control
                              type="email"
                              placeholder="name@example.com"
                              value={registeredEmail}
                              disabled
                            />
                          </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                          <FloatingLabel
                            controlId="floatingInput"
                            label={t("Registered Phone No")}
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Enter Your Mobile No"
                              value={registeredContact}
                              disabled
                            />
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
                  <h3 className="text-primary border-bottom border-light">
                    <FontAwesomeIcon icon={faAnglesRight} className="me-2" />
                    {t("Personal Info")}
                  </h3>

                  <Row>
                    <Col xs={12} md={12}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Student Name")}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t("Person Name")}
                          name="studentName"
                          value={stuformDetails.studentName}
                          onChange={stuhandleChange}
                          required
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Father Name")}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t("Person Name")}
                          name="fatherName"
                          value={stuformDetails.fatherName}
                          onChange={stuhandleChange}
                          required
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingSelect"
                        label={t("Gender")}
                        className="mb-3"
                      >
                        <Form.Select
                          aria-label={t("Floating label select example")}
                          name="gender"
                          value={stuformDetails.gender}
                          onChange={stuhandleChange}
                          required
                        >
                          <option>{t("Select")}</option>
                          <option value="Male">{t("Male")}</option>
                          <option value="Female">{t("Female")}</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Aadhar Card No")}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t("Aadhar Card No")}
                          name="fullAadharNo"
                          value={stuformDetails.fullAadharNo}
                          onChange={stuhandleChange}
                          required
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="dob"
                        label={t("Date Of Birth")}
                        className="mb-3"
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={dayjs(stuformDetails.dob)}
                            onChange={(date) => {
                              console.log(date);
                              const formattedDate =
                                dayjs(date).format("YYYY-MM-DD");
                              stuhandleChange({
                                target: { name: "dob", value: formattedDate },
                              });
                            }}
                            renderInput={(params) => (
                              <Form.Control {...params} type="date" required />
                            )}
                          />
                        </LocalizationProvider>
                      </FloatingLabel>
                    </Col>

                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingSelect"
                        label={t("Nationality")}
                        className="mb-3"
                      >
                        <Form.Select
                          aria-label={t("Floating label select example")}
                          required
                        >
                          <option>{t("Select")}</option>
                          <option value="1">{t("Indian")}</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingSelect"
                        label={t("Category")}
                        className="mb-3"
                      >
                        <Form.Select
                          aria-label={t("Category")}
                          name="category"
                          value={stuformDetails.category}
                          onChange={stuhandleChange}
                          required
                        >
                          <option value="">{t("Select")}</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {t(category.name)}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingSelect"
                        label={t("Religion")}
                        className="mb-3"
                      >
                        <Form.Select
                          aria-label={t("Religion")}
                          name="religion"
                          value={stuformDetails.religion}
                          onChange={stuhandleChange}
                          required
                        >
                          <option value="">{t("Select")}</option>
                          {religions &&
                            religions.map((religion) => (
                              <option key={religion.id} value={religion.id}>
                                {t(religion.name)}
                              </option>
                            ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingSelect"
                        label={t("Minority")}
                        className="mb-3"
                      >
                        <Form.Select
                          aria-label={t("Minority")}
                          name="minority"
                          value={stuformDetails.minority}
                          onChange={stuhandleChange}
                          required
                        >
                          <option value="">{t("Select")}</option>
                          <option value="true">{t("Yes")}</option>
                          <option value="false">{t("No")}</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={12}>
                      <Form.Check
                        type="checkbox"
                        id="sameAsPresentCheckbox"
                        label={t("Same as Present Address")}
                        checked={isPermanentSameAsPresent}
                        onChange={handleCheckboxChange}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Present Address(Max 255 Character)")}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t("Person Name")}
                          name="presentAddress"
                          value={stuformDetails.presentAddress}
                          onChange={stuhandleChange}
                          disabled={isPermanentSameAsPresent}
                          required
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Permanent Address(Max 255 Character)")}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t("Person Name")}
                          name="permanentAddress"
                          value={stuformDetails.permanentAddress}
                          onChange={stuhandleChange}
                          required
                          disabled={isPermanentSameAsPresent}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingPresentStateSelect"
                        label={t("Present State")}
                        className="mb-3"
                      >
                        <Form.Select
                          value={selectedPresentState}
                          disabled={isPermanentSameAsPresent}
                          onChange={(e) => handleStateChange(e, "present")}
                        >
                          <option value="">{t("Select")}</option>
                          {Object.keys(locations).map((presentState) => (
                            <option key={presentState} value={presentState}>
                              {t(presentState.split("_")[1])}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingPermanentStateSelect"
                        label={t("Permanent State")}
                        className="mb-3"
                      >
                        <Form.Select
                          value={selectedPermanentState}
                          onChange={(e) => handleStateChange(e, "permanent")}
                          disabled={isPermanentSameAsPresent}
                        >
                          <option value="">{t("Select")}</option>
                          {Object.keys(locations).map((permanentState) => (
                            <option key={permanentState} value={permanentState}>
                              {t(permanentState.split("_")[1])}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingPresentDistrictSelect"
                        label={t("Present District")}
                        className="mb-3"
                      >
                        <Form.Select
                          value={selectedPresentDistrict}
                          onChange={(e) => handleDistrictChange(e, "present")}
                          disabled={
                            !selectedPresentState || isPermanentSameAsPresent
                          }
                        >
                          <option value="">{t("Select")}</option>
                          {Object.keys(
                            locations[selectedPresentState] || {}
                          ).map((presentDistrict) => (
                            <option
                              key={presentDistrict}
                              value={presentDistrict}
                            >
                              {t(presentDistrict.split("_")[1])}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingPermanentDistrictSelect"
                        label={t("Permanent District")}
                        className="mb-3"
                      >
                        <Form.Select
                          value={selectedPermanentDistrict}
                          onChange={(e) => handleDistrictChange(e, "permanent")}
                          disabled={
                            !selectedPermanentState || isPermanentSameAsPresent
                          }
                        >
                          <option value="">{t("Select")}</option>
                          {Object.keys(
                            locations[selectedPermanentState] || {}
                          ).map((permanentDistrict) => (
                            <option
                              key={permanentDistrict}
                              value={permanentDistrict}
                            >
                              {t(permanentDistrict.split("_")[1])}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingPresentTalukaSelect"
                        label={t("Present Taluka")}
                        className="mb-3"
                      >
                        <Form.Select
                          value={stuformDetails.presentTaluka}
                          onChange={(e) => handleTalukaChange(e, "present")}
                          disabled={
                            !selectedPresentDistrict|| isPermanentSameAsPresent
                          }
                        >
                          <option value="">{t("Select")}</option>
                          {filteredPresentTalukas.map((presentTaluka) => (
                            <option key={presentTaluka} value={presentTaluka}>
                              {t(presentTaluka.split("_")[1])}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingPermanentTalukaSelect"
                        label={t("Permanent Taluka")}
                        className="mb-3"
                      >
                        <Form.Select
                          value={stuformDetails.permanentTaluka}
                          onChange={(e) => handleTalukaChange(e, "permanent")}
                          disabled={
                            !selectedPermanentDistrict ||
                            isPermanentSameAsPresent
                          }
                        >
                          <option value="">{t("Select")}</option>
                          {filteredPermanentTalukas.map((permanentTaluka) => (
                            <option
                              key={permanentTaluka}
                              value={permanentTaluka}
                            >
                              {t(permanentTaluka.split("_")[1])}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Present Pincode")}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t("Person Name")}
                          name="presentPincode"
                          disabled={isPermanentSameAsPresent}
                          value={stuformDetails.presentPincode}
                          onChange={stuhandleChange}
                          required
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Permanent Pincode")}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t("Person Name")}
                          name="permanentPincode"
                          value={stuformDetails.permanentPincode}
                          onChange={stuhandleChange}
                          required
                          disabled={
                             isPermanentSameAsPresent
                          }
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={12}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Pancard No")}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t("Pancard No")}
                          name="pancardNo"
                          value={stuformDetails.pancardNo}
                          onChange={stuhandleChange}
                          required
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                  <h3 className="text-primary border-bottom border-light">
                    <FontAwesomeIcon icon={faAnglesRight} className="me-2" />
                    {t("HSC Details")}
                  </h3>
                  <Row>
                    <Col xs={12} md={12}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("HSC School Name")}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t("HSC School Name")}
                          name="hscSchoolName"
                          value={stuformDetails.hscSchoolName}
                          onChange={stuhandleChange}
                          required
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={4}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Obtained Marks")}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t("Obtained Marks")}
                          name="obtainedMarks"
                          value={stuformDetails.obtainedMarks}
                          onChange={stuhandleChange}
                          required
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={4}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Total Marks")}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t("Total Marks")}
                          name="totalMarks"
                          value={stuformDetails.totalMarks}
                          onChange={stuhandleChange}
                          required
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={4}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Percentile")}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t("Percentile")}
                          name="percentile"
                          value={stuformDetails.percentile}
                          onChange={stuhandleChange}
                          required
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <h3 className="text-primary border-bottom border-light">
                    <FontAwesomeIcon icon={faAnglesRight} className="me-2" />
                    {t("Additional Details")}
                  </h3>
                  <Row>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Father Mobile Number")}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t("Father Mobile Number")}
                          name="fatherContactNo"
                          value={stuformDetails.fatherContactNo}
                          onChange={stuhandleChange}
                          required
                        />
                      </FloatingLabel>
                    </Col>

                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Father Email Address")}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t("Father Email Address")}
                          name="fatherEmailId"
                          value={stuformDetails.fatherEmailId}
                          onChange={stuhandleChange}
                          required
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={12}>
                      <Form.Group>
                        <Form.Label>
                          {t("Are you living with your parents?")}
                        </Form.Label>
                        <div className="mb-3 d-flex gap-3">
                          <Form.Check
                            type="radio"
                            label={t("Yes")}
                            name="isLivingWithGuardians"
                            id="livingWithParentsYes"
                            value="yes"
                            onChange={stuhandleChange}
                            checked={
                              stuformDetails.isLivingWithGuardians === true
                            }
                          />
                          <Form.Check
                            type="radio"
                            label={t("No")}
                            name="isLivingWithGuardians"
                            id="livingWithParentsNo"
                            value="no"
                            onChange={stuhandleChange}
                            checked={
                              stuformDetails.isLivingWithGuardians === false
                            }
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                </React.Fragment>
              )}

              {activeStep === 2 && (
                <React.Fragment>
                  {/* HSC Details Form Section */}
                  <h3 className="text-primary border-bottom border-light">
                    <FontAwesomeIcon icon={faAnglesRight} className="me-2" />
                    {t("Upload Documents")}
                  </h3>
                  <Row>
                    <Col xs={12} md={12}>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>{t("Upload Photo")}</Form.Label>
                        <Form.Control
                          type="file"
                          className="choose-photo"
                          onChange={handleFileChange}
                        />

                        <p className="info">
                          {t(
                            "Notes : Upload Scanned Copy of Photo (File size must not exceed 02 mb)"
                          )}
                        </p>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" onClick={handleFileUpload}>
                    {t("Upload")}
                  </Button>
                </React.Fragment>
              )}

              {activeStep === 3 && (
                <React.Fragment>
                  {/* HSC Details Form Section */}
                  <h3 className="text-primary border-bottom border-light">
                    <FontAwesomeIcon icon={faAnglesRight} className="me-2" />
                    {t("HSC Details")}
                  </h3>
                  <Row>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingSelect"
                        label={t("Program Level")}
                        className="mb-3"
                      >
                        <Form.Select
                          value={selectedProgramLevel}
                          onChange={handleProgramLevelChange}
                        >
                          <option value="">{t("Select")}</option>
                          {Object.keys(institutes).map((programlevel) => (
                            <option key={programlevel} value={programlevel}>
                              {programlevel.split("_")[1]}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingSelect"
                        label={t("Institutes")}
                        className="mb-3"
                      >
                        <Form.Select
                          value={selectedInstitute}
                          onChange={handleInstituteChange}
                          disabled={!selectedProgramLevel}
                        >
                          <option value="">{t("Select")}</option>
                          {Object.keys(
                            institutes[selectedProgramLevel] || {}
                          ).map((institute) => (
                            <option key={institute} value={institute}>
                              {institute.split("_")[1]}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingSelect"
                        label={t("Program")}
                        className="mb-3"
                      >
                        <Form.Select
                          value={currentInstituteDetails.program}
                          onChange={handleProgramChange}
                          disabled={!selectedInstitute}
                        >
                          <option value="">{t("Select")}</option>
                          {filteredProgram.map((program) => (
                            <option key={program} value={program}>
                              {program.split("_")[1]}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Enrollment No")}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Entrollment No"
                          name="entrollmentNo"
                          value={currentInstituteDetails.entrollmentNo}
                          onChange={currentInsthandleChange}
                          required
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                </React.Fragment>
              )}
              {activeStep === 4 && (
                <React.Fragment>
                  {/* Lock Profile Form Section */}
                  <form>
                    <h3 className="text-primary border-bottom border-light">
                      <FontAwesomeIcon icon={faAnglesRight} className="me-2" />
                      {t("lockProfile")}
                    </h3>

                    <p>
                      {" "}
                      {t("Dear")}{" "}
                      <strong>
                        {responseStudentInfoData.data.studentName}
                      </strong>
                      ,{" "}
                      {t(
                        "You have successfully completed all steps of registration."
                      )}
                      <br></br>
                      {t("Your unique registration id is")}{" "}
                      <strong>
                        {responseStudentInfoData.data.registrationId}
                      </strong>
                    </p>
                    <p>{t("noteId")}</p>
                    <p>
                      <b>{t("readInstructions")}</b>
                    </p>

                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                      >
                        {t("agreeLabel")}
                      </label>
                    </div>

                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck2"
                      >
                        {t("understandLabel1")}
                      </label>
                    </div>

                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck3"
                      >
                        {t("understandLabel2")}
                      </label>
                    </div>
                  </form>
                </React.Fragment>
              )}

              <Row>
                <Col xs={12} md={12}>
                  <div className="d-flex justify-content-center mt-2 pt-4 border-top">
                    {activeStep !== 0 && (
                      <Button
                        variant="secondary"
                        onClick={handleBack}
                        className="mx-1"
                      >
                        {t("Back")}
                      </Button>
                    )}
                    {activeStep !== steps.length - 1 ? (
                      <Button variant="primary" type="submit">
                        {t("NEXT")}
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={(e) =>
                          handleInstituteDetailsSubmit(
                            e,
                            currentInstituteDetails
                          )
                        }
                      >
                        {t("Submit")}
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
  );
};
