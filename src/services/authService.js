import api from './api';

export const signup = async (data) => {
    try {
        const response = await api.post('/send-otp', data);
        console.log("auth service response", response)

        return response.data;
    } catch (error) {
        console.log("auth service error", error)
        return error;
    }
}

export const  sendOtp = async (data) => {
    try {
        console.log(data.contact)
        const response = await api.post('/verify-otp', data);
        console.log("auth service response", response)

        return response.data;
    } catch (error) {
        console.log("auth service error", error)
        return error;
    }
}

export const resendOtp = async (data) => {
    try {
        const response = await api.post('/resend-otp', data);
        console.log("auth service response", response);
        return response.data;
    } catch (error) {
        console.log("auth service error", error);
        throw error;
    }
}


