import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Create an instance of axios with the base URL and headers
const api = axios.create({
	baseURL: BASE_API_URL,
    headers:{
        'Content-Type': 'application/json',
        'api-key': API_KEY,
    }
});

const apiService = {
    getStudentList:() => api.get('/'),
    postNewStudent: (data) => api.post('/', data),
    updateStudent: (id, data) => api.put(`/${id}`, data),
    deleteStudent: (id) => api.delete(`/${id}`),
    getStudentDetail: (id) => api.get(`/${id}`),
}

export default apiService;