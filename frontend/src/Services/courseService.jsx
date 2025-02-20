import axios from "axios";

const API_URL = "http://localhost:8000/api/courses";

export const getCourses = async () => {
  return await axios.get(API_URL);
};

export const createCourse = async (course) => {
  return await axios.post(API_URL + "/create", course);
};

export const updateCourse = async (id, course) => {
  return await axios.put(`${API_URL}/update/${id}`, course);
};

export const deleteCourse = async (id) => {
  return await axios.delete(`${API_URL}/delete/${id}`);
};
