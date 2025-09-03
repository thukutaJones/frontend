import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";

// 🔑 Helper to build auth headers
export const getAuthHeader = (token?: string) => {
  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// ✅ Get all services
export const fetchServices = async (token?: string) => {
  const res = await axios.get(`${baseUrl}/api/all-services`, {
    headers: getAuthHeader(token),
  });
  return res.data;
};

// ✅ Create a new service
export const createServiceAPI = async (data: any, token?: string) => {
  const res = await axios.post(`${baseUrl}/api/create-service`, data, {
    headers: getAuthHeader(token),
  });
  return res.data;
};

// ✅ Update a service
export const updateServiceAPI = async (id: string, data: any, token?: string) => {
  const res = await axios.put(`${baseUrl}/api/update-service/${id}`, data, {
    headers: getAuthHeader(token),
  });
  return res.data;
};

// ✅ Delete a service
export const deleteServiceAPI = async (id: string, token?: string) => {
  const res = await axios.delete(`${baseUrl}/api/delete-service/${id}`, {
    headers: getAuthHeader(token),
  });
  return res.data;
};
