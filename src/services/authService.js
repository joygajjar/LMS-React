import { common_service, primaryApi, secondaryApi } from './api';
import axios from 'axios';
export const signup = async (data) => {
    try {
        const response = await primaryApi.post('/auth/signup', data);
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
        const response = await primaryApi.post('/auth/signin', data);
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

export const fetchDocuments = async (email) => {
  try {
      const response = await fetch(`http://localhost:9095/api/student/${email}`);
      if (!response.ok) {
          throw new Error('Failed to fetch documents');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching documents:', error);
  }
};

export const viewDocument = async (fileName) => {
  try {
      const response = await secondaryApi.get(`/download/${encodeURIComponent(fileName)}`, {
          responseType: 'blob',
      });

      let fileType = '';
      if (fileName.endsWith('.pdf')) {
          fileType = 'application/pdf';
      } else if (fileName.endsWith('.png')) {
          fileType = 'image/png';
      } else if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
          fileType = 'image/jpeg';
      } else {
          console.error('Unsupported file type');
          alert('Unsupported file type. Cannot open the document.');
          return;
      }

      const file = new Blob([response.data], { type: fileType });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
  } catch (error) {
      console.error('Error viewing document:', error);
      alert('Error viewing document. Please try again.');
  }
};
export const viewProfile = async (token) => {
  try {
    const response = await secondaryApi.get('/view-profile', {
      headers: {
        Authorization: token,
      },
    });
    return response.data;  // Return response data assuming it's JSON
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;  // Rethrow the error so the caller can handle it
  }
};

export const uploadProfileFile = async (file, email) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);

    const response = await secondaryApi.put('/profile/upload', formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  });

    return response.data;  // Assuming response.data contains updated profile data
  } catch (error) {
    console.error('Error uploading profile file:', error);
    throw error;
  }
};


export const fetchProfileByEmail = async (email) => {
  try {
    const response = await secondaryApi.get(`/profile/${encodeURIComponent(email)}`, {
  
    });

    return response.data;  // Assuming response.data contains profile data
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;
  }
};

