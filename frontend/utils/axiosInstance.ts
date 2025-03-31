import axios from "axios";

// Vytvoření Axios instance s výchozí konfigurací
const api = axios.create({
  baseURL: "http://localhost:5000/api", // DEV
  // baseURL: "http://express:5000/api", // PROD
  timeout: 2000, // 2 sekund timeout
  withCredentials: true, // Přidání cookies do requestu
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: () => true,
});

export default api;
