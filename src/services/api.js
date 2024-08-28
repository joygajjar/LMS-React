import axios from "axios";
import store from "../redux/store";

// Define base URLs
const baseURLs = {
  production: "https://your-production-server.com/api/",
  development: "http://192.168.1.16:8080/api/",
  secondary: "http://localhost:9095/api/",
  common_service: "http://localhost:9096/api/",
};

// Create Axios instances for each base URL
const primaryApi = axios.create({
  baseURL:
    process.env.REACT_APP_NODE_ENV === "production"
      ? baseURLs.production
      : baseURLs.development,
  headers: {
    "Content-Type": "application/json",
  },
});

const secondaryApi = axios.create({
  baseURL: baseURLs.secondary,
  headers: {
    "Content-Type": "application/json",
  },
});

const common_service = axios.create({
  baseURL: baseURLs.common_service,
  headers: {
    "Content-Type": "application/json",
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
primaryApi.interceptors.request.use(addAuthToken, (error) =>
  Promise.reject(error)
);
secondaryApi.interceptors.request.use(addAuthToken, (error) =>
  Promise.reject(error)
);

// Optionally, add response interceptors to handle errors globally
const handleError = (error) => {
  if (error.response && error.response.status === 401) {
    // Handle token expiry or unauthorized access here
    // You can dispatch a logout action or show a message to the user
  }
  return Promise.reject(error);
};

primaryApi.interceptors.response.use((response) => response, handleError);
secondaryApi.interceptors.response.use((response) => response, handleError);

// Export Axios instances
export { primaryApi, secondaryApi, common_service };
