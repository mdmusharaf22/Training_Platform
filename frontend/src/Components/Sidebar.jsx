import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
      <h4 className="ms-3">Dashboard</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/">Course</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/students">Student</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/training-schedules">Training Schedule</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/student-training">Student Training</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
