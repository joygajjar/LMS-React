import axios from 'axios';
import store from '../redux/store';

// Define base URLs
const baseURLs = {
    production: 'https://your-production-server.com/api/',
    development: 'http://192.168.1.35:8083/api/', 
    secondary: 'http://localhost:9095/api/',
    common_service: 'http://localhost:9096/api/',
};

// Create Axios instances for each base URL
const primaryApiSSO = axios.create({
    baseURL: process.env.REACT_APP_NODE_ENV === 'production' ? baseURLs.production : baseURLs.development,
    headers: {
        'Content-Type': 'application/json',
    },
});

const secondaryApiSSO = axios.create({
    baseURL: baseURLs.secondary,
    headers: {
        'Content-Type': 'application/json',
    },
});

const common_serviceSSO = axios.create({
    baseURL: baseURLs.common_service,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to add token to request headers
const addAuthToken = (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

// Add request interceptors to include the token if it exists
primaryApiSSO.interceptors.request.use(addAuthToken, (error) => Promise.reject(error));
secondaryApiSSO.interceptors.request.use(addAuthToken, (error) => Promise.reject(error));

// Optionally, add response interceptors to handle errors globally
const handleError = (error) => {
    if (error.response && error.response.status === 401) {
        // Handle token expiry or unauthorized access here
        // You can dispatch a logout action or show a message to the user
    }
    return Promise.reject(error);
};

primaryApiSSO.interceptors.response.use((response) => response, handleError);
secondaryApiSSO.interceptors.response.use((response) => response, handleError);

// Export Axios instances
export { primaryApiSSO, secondaryApiSSO,common_serviceSSO };
