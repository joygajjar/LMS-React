
import { useDispatch, useSelector } from "react-redux";
import {
  signup, sendOtp, resendOtp, login, forgotPassword,
  resetPassword, validateToken, registration, getAllHSCPassStates,
  getAllHSCBoards, getAllAddmissionTypes, getAllCategories, getAllReligions,
  registerStudent, fetchLocationData, getAllInstitutes,
  saveInstituteDetails,uploadFile
} from "../../services/authService";
import { loginSuccess } from "../../redux/action";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((store) => store?.auth)

  const handleRegister = async (data) => {
    try {
      const response = await signup(data); // try catch
      console.log("response hook", response);
      return response;
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleSendOtp = async (data) => {
    try {
      const response = await sendOtp(data);
      console.log("response hook", response);
      return response;
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleResendOTP = async (data) => {
    try {
      const response = await resendOtp(data);
      console.log("response hook", response);
      return response;
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await login(credentials);
      console.log("response hook", response);
      let { status, data, message } = response
      console.log(data)
      const payload = {
        token: data.jwtToken,
        user: {
          contactNo: data.contactNo,
          email: data.email
        }
      }
      sessionStorage.setItem('LOGIN_SUCCESS', JSON.stringify(payload))
      const reducer = dispatch(loginSuccess(payload));
      console.log(reducer)
      return response;

    } catch (err) {
      console.log("error", err);
    }
  };

  const handleForgotPassword = async (data) => {
    try {
      const response = await forgotPassword(data);
      console.log("response hook", response);
      return response;
    } catch (err) {
      console.log("error", err);
    }
  }

  const handleresetPassword = async (data) => {
    try {
      const response = await resetPassword(data);
      console.log("response hook", response);
      return response;
    } catch (err) {
      console.log("error", err);
    }
  }

  const handlevalidateToken = async (data) => {
    try {
      const response = await validateToken(data);
      console.log("response hook", response);
      return response;
    } catch (err) {
      console.log("error", err);
    }
  }

  const handleRegisteration = async (data) => {
    try {
      const response = await registration(data);
      console.log("response hook", response)
      return response;
    } catch (err) {
      console.log("error", err);
    }

  }

  const handleGetAllAddmissionTypes = async () => {
    try {
      const response = await getAllAddmissionTypes();
      console.log("response hook", response);
      return response;
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleGetAllHSCPassStates = async () => {
    try {
      const response = await getAllHSCPassStates();
      console.log("response hook", response);
      return response;
    } catch (err) {
      console.log("error", err);
    }
  };


  const handleGetAllHSCBoards = async () => {
    try {
      const response = await getAllHSCBoards();
      console.log("response hook", response);
      return response;
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleGetAllReligions = async () => {
    try {
      const response = await getAllReligions();
      console.log("response hook", response);
      return response;
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleGetAllCategories = async () => {
    console.log("handleGetAllCategories");
    try {
      const response = await getAllCategories();
      console.log("response hook", response);
      return response;
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleRegistreStudent = async () => {
    try {
      const response = await registerStudent();
      console.log("response hook", response);
      return response;
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleGetAllLocation = async () => {
    console.log("handleGetAllCategories");
    try {
      const response = await fetchLocationData();
      console.log("response hook", response);
      return response;
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleGetAllInstitute = async () => {
    console.log("handleGetAllCategories");
    try {
      const response = await getAllInstitutes();
      console.log("response hook", response);
      return response;
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleCurrentInstituteDetails = async () => {
    try {
      const response = await saveInstituteDetails();
      console.log("response hook", response);
      return response;
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleUploadFile = async (file) => {
    try {
        const response = await uploadFile(file);
        console.log("response hook", response);
        return response;
    } catch (err) {
        console.log("error", err);
    }
};

  return {
    signup: handleRegister, sendOtp: handleSendOtp, resendOtp: handleResendOTP, login: handleLogin, forgotPassword: handleForgotPassword, resetPassword: handleresetPassword, validateToken: handlevalidateToken, registration: handleRegisteration, getAllAddmissionTypes: handleGetAllAddmissionTypes,
    getAllHSCPassStates: handleGetAllHSCPassStates,
    getAllHSCBoards: handleGetAllHSCBoards, getAllCategories: handleGetAllCategories, getAllReligions: handleGetAllReligions, registerStudent: handleRegistreStudent, fetchLocationData: handleGetAllLocation, getAllInstitutes: handleGetAllInstitute, saveInstituteDetails :handleCurrentInstituteDetails,uploadFile:handleUploadFile, isAuthenticated
  }
};

