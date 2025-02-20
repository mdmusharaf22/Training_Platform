import axios from "axios";

const API_URL = "http://localhost:8000/api";



// Admin enrolls a student in a training
export const optInStudent = async (student_id, training_schedule_id) => {
    return axios.post(`${API_URL}/students/opt-in`, { student_id, training_schedule_id });
};

// Admin removes a student from a training
export const optOutStudent = async (student_id, training_schedule_id) => {
    return axios.post(`${API_URL}/students/opt-out`, { student_id, training_schedule_id });
};

// Get students enrolled in a specific training
export const getStudentsByTraining = async (training_schedule_id) => {
    return axios.get(`${API_URL}/trainings/${training_schedule_id}/students`);
};

// Get all trainings a student is enrolled in
export const getTrainingsByStudent = async (student_id) => {
    return axios.get(`${API_URL}/students/${student_id}/trainings`);
};
