import axios from "axios";

// Create a reusable Axios instance
const api = axios.create({
  baseURL: "https://coolieapp-backend.onrender.com", // Replace with actual base API
  timeout: 10000,
});

// Example: Interceptor for logging requests & responses
api.interceptors.request.use(
  (config) => {
    console.log("Request:", config.url, config.params || config.data);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response.data);
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;
