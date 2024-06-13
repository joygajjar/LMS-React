import { common_service, primaryApi, secondaryApi } from './api';

export const signup = async (data) => {
    try {
        const response = await primaryApi.post('/send-otp', data);
        console.log("auth service response", response)
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
          return { status: false, message: error.response.data.message };
        }
        return { status: false, message: "An unexpected error occurred" };
      }
}

export const sendOtp = async (data) => {
    try {
        const response = await primaryApi.post('/verify-otp', data);
        console.log("auth service response", response)
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
          return { status: false, message: error.response.data.message };
        }
        return { status: false, message: "An unexpected error occurred" };
      }
}

export const resendOtp = async (data) => {
    try {
      const response = await primaryApi.post('/resend-otp', data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return { status: false, message: error.response.data.message };
      }
      return { status: false, message: "An unexpected error occurred" };
    }
  };

export const login = async (data) => {
    try {
        const response = await primaryApi.post('/login', data);
        console.log("auth service response", response);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
          return { status: false, message: error.response.data.message };
        }
        return { status: false, message: "An unexpected error occurred" };
      }
}

export const forgotPassword = async (data) => {
    try {
        const response = await primaryApi.post('/forgot-password', data);
        console.log("auth service response", response);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
          return { status: false, message: error.response.data.message };
        }
        return { status: false, message: "An unexpected error occurred" };
    }
}

export const resetPassword = async (data) => {
    try {
        const response = await primaryApi.post('/reset-password', data);
        console.log("auth service response", response);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
          return { status: false, message: error.response.data.message };
        }
        return { status: false, message: "An unexpected error occurred" };
    }
}

export const validateToken = async (data) => {
    try {
        const response = await primaryApi.post('/validate-reset-token', data);
        console.log("auth service response", response);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
          return { status: false, message: error.response.data.message };
        }
        return { status: false, message: "An unexpected error occurred" };
    }
}

// Use secondaryApi for saveBasicDetails
export const registration = async (basicDetails) => {
    try {
        const response = await secondaryApi.post('/saveBasicDetails', basicDetails);
        console.log("auth service response", response);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
          return { status: false, message: error.response.data.message };
        }
        return { status: false, message: "An unexpected error occurred" };
    }
}
 
export const getAllAddmissionTypes = async () => {
    try {
        const response = await secondaryApi.get('/addmission-types');
        return response.data.data; // Assuming the data is returned in this format
    } catch (error) {
        if (error.response && error.response.data) {
          return { status: false, message: error.response.data.message };
        }
        return { status: false, message: "An unexpected error occurred" };
    }
}

export const getAllHSCPassStates = async () => {
    try {
        const response = await secondaryApi.get('/hsc-pass-states');
        return response.data.data; // Assuming the data is returned in this format
    } catch (error) {
        if (error.response && error.response.data) {
          return { status: false, message: error.response.data.message };
        }
        return { status: false, message: "An unexpected error occurred" };
    }
}

  export const getAllHSCBoards = async (passStateId) => {
    try {
      const response = await secondaryApi.get(`/hsc-boards?hscPassStateId=${passStateId}`);
      return response.data.data; // Assuming the data is returned in this format
    } catch (error) {
      if (error.response && error.response.data) {
        return { status: false, message: error.response.data.message };
      }
      return { status: false, message: "An unexpected error occurred" };
    }
  };
export const getAllReligions = async () => {
  try {
      const response = await secondaryApi.get(`/religions`);
      return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return { status: false, message: error.response.data.message };
    }
    return { status: false, message: "An unexpected error occurred" };
  }
};

export const getAllCategories = async () => {
  try {
      const response = await secondaryApi.get(`/categories`);
      return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return { status: false, message: error.response.data.message };
    }
    return { status: false, message: "An unexpected error occurred" };
  }
};

export const registerStudent = async (studentData) => {
  try {
      const response = await secondaryApi.post(`/register-student`, studentData);
      return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return { status: false, message: error.response.data.message };
    }
    return { status: false, message: "An unexpected error occurred" };
  }
};

export const fetchLocationData = async () => {
  try {
    const response = await common_service.get(`/allrecord`);
    return response.data;
  } catch (error) {
    console.error('Error fetching location data:', error);
    return null;
  }
};

export const getAllInstitutes = async () => {
  try {
    const response = await common_service.get(`/allInstituteRecord`);
    return response.data;
  } catch (error) {
    console.error('Error fetching institutes data:', error);
    return null;
  }
};

export const saveInstituteDetails = async (currentInstituteDetails) => {
  try {
      const response = await secondaryApi.post('/save-currentInstite-Details', currentInstituteDetails);
      console.log("auth service response", response);
      return response.data;
  } catch (error) {
      if (error.response && error.response.data) {
        return { status: false, message: error.response.data.message };
      }
      return { status: false, message: "An unexpected error occurred" };
  }
}

export const uploadFile = async (file) => {
  try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await secondaryApi.post('/uploadFile', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });

      return response.data;
  } catch (error) {
      if (error.response && error.response.data) {
          return { status: false, message: error.response.data.message };
      }
      return { status: false, message: "An unexpected error occurred" };
  }
};