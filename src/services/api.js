import axios from 'axios';

export const baseURL = 
    process.env.REACT_APP_NODE_ENV === 'production'
        ? 'http://localhost:9094/api/'//production server
        : 'http://localhost:9094/api/';//development server

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;
