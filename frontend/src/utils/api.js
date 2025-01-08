import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/whiteboards';

export const saveWhiteboard = async (data) => {
    const response = await axios.post(`${API_BASE_URL}`, data);
    return response.data;
};

export const fetchWhiteboard = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

export const fetchAllWhiteboard = async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
};

export const deleteWhiteboard = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
};

export const updateWhiteboard = async (data) => {
    const response = await axios.put(`${API_BASE_URL}/${data.id}`, data);
    return response.data;
};