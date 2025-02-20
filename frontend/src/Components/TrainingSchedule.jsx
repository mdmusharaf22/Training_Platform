import React, { useState, useEffect } from "react";
import { getCourses } from "../Services/courseService";
import {
    getTrainingSchedules,
    createTrainingSchedule,
    updateTrainingSchedule,
    deleteTrainingSchedule
} from "../Services/trainingScheduleService";

const TrainingSchedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({ course_id: "", trainer: "", date: "", time: "", duration: "" });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchTrainingSchedules();
        fetchCourses();
    }, []);

    const fetchTrainingSchedules = async () => {
        const response = await getTrainingSchedules();
        setSchedules(response.data);
    };

    const fetchCourses = async () => {
        const response = await getCourses();
        setCourses(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                await updateTrainingSchedule(editingId, form);
            } else {
                await createTrainingSchedule(form);
            }

            setForm({ course_id: "", trainer: "", date: "", time: "", duration: "" });
            setEditingId(null);
            fetchTrainingSchedules();

            // Properly handle Offcanvas
            import("bootstrap").then((bootstrap) => {
                const addOffcanvasElement = document.getElementById("offcanvasAdd");
                const editOffcanvasElement = document.getElementById("offcanvasEdit");

                if (addOffcanvasElement) {
                    const addOffcanvas = bootstrap.Offcanvas.getInstance(addOffcanvasElement) || new bootstrap.Offcanvas(addOffcanvasElement);
                    addOffcanvas.hide();
                }

                if (editOffcanvasElement) {
                    const editOffcanvas = bootstrap.Offcanvas.getInstance(editOffcanvasElement) || new bootstrap.Offcanvas(editOffcanvasElement);
                    editOffcanvas.hide();
                }
            });

        } catch (error) {
            console.error("Error saving schedule:", error);
        }
    };

    const handleEdit = (schedule) => {
        setForm(schedule);
        setEditingId(schedule.id);

        import("bootstrap").then((bootstrap) => {
            const offcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasEdit"));
            offcanvas.show();
        });
    };

    const handleDelete = async (id) => {
        await deleteTrainingSchedule(id);
        fetchTrainingSchedules();
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between">

                <h2>Training Schedules</h2>
                <button className="btn btn-primary" type="button" onClick={() => {
                    setForm({ course_id: "", trainer: "", date: "", time: "", duration: "" });
                    setEditingId(null);
                    import("bootstrap").then((bootstrap) => {
                        const offcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasAdd"));
                        offcanvas.show();
                    });
                }}>
                    Add Schedule
                </button>
            </div>

                {/* Add Schedule Offcanvas */}
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasAdd" aria-labelledby="offcanvasAddLabel">
                    <div className="offcanvas-header">
                        <h5 id="offcanvasAddLabel">Add Training Schedule</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <form onSubmit={handleSubmit}>
                            <select className="form-control mb-2" value={form.course_id} onChange={(e) => setForm({ ...form, course_id: e.target.value })} required>
                                <option value="">Select Course</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>{course.title}</option>
                                ))}
                            </select>
                            <input type="text" className="form-control mb-2" placeholder="Trainer Name" value={form.trainer} onChange={(e) => setForm({ ...form, trainer: e.target.value })} required />
                            <input type="date" className="form-control mb-2" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                            <input type="time" className="form-control mb-2" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
                            <input type="number" className="form-control mb-2" placeholder="Duration (minutes)" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} required />
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>

                {/* Edit Schedule Offcanvas */}
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasEdit" aria-labelledby="offcanvasEditLabel">
                    <div className="offcanvas-header">
                        <h5 id="offcanvasEditLabel">Edit Training Schedule</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <form onSubmit={handleSubmit}>
                            <select className="form-control mb-2" value={form.course_id} onChange={(e) => setForm({ ...form, course_id: e.target.value })} required>
                                <option value="">Select Course</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>{course.title}</option>
                                ))}
                            </select>
                            <input type="text" className="form-control mb-2" placeholder="Trainer Name" value={form.trainer} onChange={(e) => setForm({ ...form, trainer: e.target.value })} required />
                            <input type="date" className="form-control mb-2" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                            <input type="time" className="form-control mb-2" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
                            <input type="number" className="form-control mb-2" placeholder="Duration (minutes)" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} required />
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </div>
                </div>

                {/* Training Schedule Table */}
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Trainer</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Duration</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule) => (
                            <tr key={schedule.id}>
                                <td>{schedule.course?.title || "N/A"}</td>
                                <td>{schedule.trainer}</td>
                                <td>{schedule.date}</td>
                                <td>{schedule.time}</td>
                                <td>{schedule.duration} mins</td>
                                <td>
                                    <button onClick={() => handleEdit(schedule)} className="btn btn-warning btn-sm me-2">Edit</button>
                                    <button onClick={() => handleDelete(schedule.id)} className="btn btn-danger btn-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            );
};

            export default TrainingSchedule;
