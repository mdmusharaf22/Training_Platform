import axios from "axios";

const API_URL = "http://localhost:8000/api/training-schedules";

export const getTrainingSchedules = async () => await axios.get(API_URL);

export const createTrainingSchedule = async (schedule) => 
    await axios.post(API_URL + "/create", schedule);

export const updateTrainingSchedule = async (id, schedule) => 
    await axios.put(`${API_URL}/update/${id}`, schedule);

export const deleteTrainingSchedule = async (id) => 
    await axios.delete(`${API_URL}/delete/${id}`);
