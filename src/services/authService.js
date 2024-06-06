import { primaryApi, secondaryApi } from './api';

export const signup = async (data) => {
    try {
        const response = await primaryApi.post('/send-otp', data);
        console.log("auth service response", response)
        return response.data;
    } catch (error) {
        console.log("auth service error", error)
        return error;
    }
}

export const sendOtp = async (data) => {
    try {
        const response = await primaryApi.post('/verify-otp', data);
        console.log("auth service response", response)
        return response.data;
    } catch (error) {
        console.log("auth service error", error)
        return error;
    }
}

export const resendOtp = async (data) => {
    try {
        const response = await primaryApi.post('/resend-otp', data);
        console.log("auth service response", response);
        return response.data;
    } catch (error) {
        console.log("auth service error", error);
        throw error;
    }
}

export const login = async (data) => {
    try {
        const response = await primaryApi.post('/login', data);
        console.log("auth service response", response);
        return response.data;
    } catch (error) {
        console.log("auth service error", error);
        return error;
    }
}

export const forgotPassword = async (data) => {
    try {
        const response = await primaryApi.post('/forgot-password', data);
        console.log("auth service response", response);
        return response.data;
    } catch (error) {
        console.log("auth service error", error);
        return error;
    }
}

export const resetPassword = async (data) => {
    try {
        const response = await primaryApi.post('/reset-password', data);
        console.log("auth service response", response);
        return response.data;
    } catch (error) {
        console.log("auth service error", error);
        return error;
    }
}

export const validateToken = async (data) => {
    try {
        const response = await primaryApi.post('/validate-reset-token', data);
        console.log("auth service response", response);
        return response.data;
    } catch (error) {
        console.log("auth service error", error);
        return error.response ? error.response.data : error;
    }
}

// Use secondaryApi for saveBasicDetails
export const registration = async (basicDetails) => {
    try {
        const response = await secondaryApi.post('/saveBasicDetails', basicDetails);
        console.log("auth service response", response);
        return response.data;
    } catch (error) {
        console.log("basic details service error", error);
        throw error.response ? error.response.data : new Error('Server Error');
    }
}

export const getAllAddmissionTypes = async () => {
    try {
        const response = await secondaryApi.get('/addmission-types');
        return response.data.data; // Assuming the data is returned in this format
    } catch (error) {
        console.error("Failed to fetch addmission types:", error);
        throw error;
    }
}

export const getAllHSCPassStates = async () => {
    try {
        const response = await secondaryApi.get('/hsc-pass-states');
        return response.data.data; // Assuming the data is returned in this format
    } catch (error) {
        console.error("Failed to fetch HSC pass states:", error);
        throw error;
    }
}

export const getAllHSCBoards = async () => {
    try {
        const response = await secondaryApi.get('/hsc-boards');
        return response.data.data; // Assuming the data is returned in this format
    } catch (error) {
        console.error("Failed to fetch HSC boards:", error);
        throw error;
    }
}

export const getAllReligions = async () => {
    try {
        const response = await secondaryApi.get(`/religions`);
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to fetch religions');
    }
};

export const getAllCategories = async () => {
    try {
        const response = await secondaryApi.get(`/categories`);
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to fetch categories');
    }
};

export const registerStudent = async (studentData) => {
    try {
        const response = await secondaryApi.post(`/register-student`, studentData);
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to register student');
    }
};