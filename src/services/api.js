// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://myriad-admin-server.azurewebsites.net';

export const login = async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
};

export const fetchDashboardData = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/dashboard/event`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
