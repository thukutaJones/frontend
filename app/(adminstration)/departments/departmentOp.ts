import { baseUrl } from "@/constants/baseUrl";
import axios from "axios";

// ✅ Build auth header
export const getAuthHeader = (token?: string) => {
  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// ✅ Get all
export const fetchDepartmentsAPI = async (token?: string) => {
  const res = await axios.get(`${baseUrl}/api/all-departments`, {
    headers: getAuthHeader(token),
  });
  return res.data;
};

// ✅ Create
export const createDepartment = async (data: any, token?: string) => {
  const res = await axios.post(`${baseUrl}/api/create-department`, data, {
    headers: getAuthHeader(token),
  });
  return res.data;
};

// ✅ Update
export const updateDepartment = async (
  id: string,
  data: any,
  token?: string
) => {
  const res = await axios.put(`${baseUrl}/api/update-department/${id}`, data, {
    headers: getAuthHeader(token),
  });
  return res.data;
};

// ✅ Delete
export const deleteDepartmentAPI = async (id: string, token?: string) => {
  const res = await axios.delete(`${baseUrl}/api/delete-department/${id}`, {
    headers: getAuthHeader(token),
  });
  return res.data;
};
