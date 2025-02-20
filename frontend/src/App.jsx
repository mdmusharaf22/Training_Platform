import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";

const App = () => {
  return (
    <Router>
      <Dashboard />
    </Router>
  );
};

export default App;
