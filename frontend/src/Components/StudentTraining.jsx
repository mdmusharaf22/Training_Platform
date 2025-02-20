import React, { useEffect, useState } from "react";
import { getStudentsByTraining, optInStudent, optOutStudent } from "../Services/studentTrainingService";
import { getTrainingSchedules } from "../Services/trainingScheduleService";
import { getStudents } from "../Services/studentService";

const StudentTraining = () => {
    const [trainings, setTrainings] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedTraining, setSelectedTraining] = useState("");
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");

    useEffect(() => {
        fetchTrainings();
        fetchStudents();
    }, []);

    const fetchTrainings = async () => {
        try {
            const response = await getTrainingSchedules();
            setTrainings(response.data);
        } catch (error) {
            console.error("Error fetching trainings:", error);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await getStudents();
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const fetchEnrolledStudents = async (trainingId) => {
        setSelectedTraining(trainingId);
        try {
            const response = await getStudentsByTraining(trainingId);
            setEnrolledStudents(response.data);
        } catch (error) {
            console.error("Error fetching enrolled students:", error);
        }
    };

    const handleOptIn = async () => {
        if (!selectedTraining || !selectedStudent) return alert("Select a training and student!");
        try {
            await optInStudent(selectedStudent, selectedTraining);
            fetchEnrolledStudents(selectedTraining);
            alert("Student enrolled successfully!");
        } catch (error) {
            console.error("Error enrolling student:", error);
        }
    };

    const handleOptOut = async (studentId) => {
        if (!selectedTraining) return alert("Select a training!");
        try {
            await optOutStudent(studentId, selectedTraining);
            fetchEnrolledStudents(selectedTraining);
            alert("Student removed successfully!");
        } catch (error) {
            console.error("Error removing student:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Admin: Manage Student Training</h2>

            {/* Select Training Schedule */}
            <div className="mb-3">
                <label className="form-label">Select Training</label>
                <select className="form-select" onChange={(e) => fetchEnrolledStudents(e.target.value)}>
                    <option value="">-- Select Training --</option>
                    {trainings.map((training) => (
                        <option key={training.id} value={training.id}>{training.course.title} - {training.date}</option>
                    ))}
                </select>
            </div>

            {/* Select Student to Enroll */}
            <div className="mb-3">
                <label className="form-label">Select Student</label>
                <select className="form-select" onChange={(e) => setSelectedStudent(e.target.value)}>
                    <option value="">-- Select Student --</option>
                    {students.map((student) => (
                        <option key={student.id} value={student.id}>{student.name}</option>
                    ))}
                </select>
            </div>

            <button className="btn btn-primary mb-3" onClick={handleOptIn}>Enroll Student</button>

            {/* Enrolled Students List */}
            <h4>Enrolled Students</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {enrolledStudents.map((student) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => handleOptOut(student.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentTraining;
