import axios from 'axios';
import { localizeUser, localizeUsers } from './demoUsers.js';

// A shared HTTP client keeps API calls consistent across the whole app.
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

function getApiErrorMessage(error) {
  if (error.response) {
    const status = error.response.status;
    const statusText = error.response.statusText || 'Request failed';
    return `API request failed with status ${status}: ${statusText}`;
  }

  if (error.request) {
    return 'API request failed: no response received from the server.';
  }

  return error.message || 'API request failed.';
}

function handleApiError(error) {
  throw new Error(getApiErrorMessage(error));
}

export async function getUsers() {
  try {
    const response = await apiClient.get('/users');
    return localizeUsers(response.data);
  } catch (error) {
    handleApiError(error);
  }
}

export async function getUser(id) {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return localizeUser(response.data);
  } catch (error) {
    handleApiError(error);
  }
}

export async function createUser(user) {
  try {
    const response = await apiClient.post('/users', user);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function updateUser(id, user) {
  try {
    const response = await apiClient.put(`/users/${id}`, user);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function deleteUser(id) {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}
