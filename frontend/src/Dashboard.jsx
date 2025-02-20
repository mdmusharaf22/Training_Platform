import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Course from "./Components/Course";
import Student from "./Components/Student";
import TrainingSchedule from "./Components/TrainingSchedule";
import StudentTraining from "./Components/StudentTraining";

const Dashboard = () => {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 p-3">
        <Routes>
          <Route path="/" element={<Course />} />
          <Route path="/students" element={<Student />} />
          <Route path="/training-schedules" element={<TrainingSchedule />} />
          <Route path="/student-training" element={<StudentTraining />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
