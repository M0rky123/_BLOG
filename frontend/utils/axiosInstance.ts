import axios from "axios";

// Vytvoření Axios instance s výchozí konfigurací
const api = axios.create({
  baseURL: "http://localhost:5000/api", // DEV
  // baseURL: "http://backend:5000/api", // PROD
  timeout: 10000, // 10 sekund timeout
  withCredentials: true, // Přidání cookies do requestu
  validateStatus: () => true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
