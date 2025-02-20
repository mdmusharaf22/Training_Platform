import axios from "axios";

const API_URL = "http://localhost:8000/api/students";

export const getStudents = async () => {
  return await axios.get(API_URL);
};

export const createStudent = async (student) => {
  return await axios.post(`${API_URL}/create`, student);
};

export const updateStudent = async (id, student) => {
  return await axios.put(`${API_URL}/update/${id}`, student);
};

export const deleteStudent = async (id) => {
  return await axios.delete(`${API_URL}/delete/${id}`);
};

