import React, { useState, useEffect } from "react";
import { getStudents, createStudent, updateStudent, deleteStudent } from "../Services/studentService";

const Student = () => {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", phone: "" });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const response = await getStudents();
        setStudents(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            if (editingId) {
                await updateStudent(editingId, form);
            } else {
                await createStudent(form);
            }
    
            setForm({ name: "", email: "", phone: "" });
            setEditingId(null);
            fetchStudents();
    
            import("bootstrap").then((bootstrap) => {
                const addOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasAdd"));
                const editOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasEdit"));
                if (addOffcanvas) addOffcanvas.hide();
                if (editOffcanvas) editOffcanvas.hide();
            });
        } catch (error) {
            console.error("Error saving student:", error);
        }
    };

    const handleEdit = (student) => {
        setForm({ name: student.name, email: student.email, phone: student.phone });
        setEditingId(student.id);
        import("bootstrap").then((bootstrap) => {
            const offcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasEdit"));
            offcanvas.show();
        });
    };

    const handleAddStudentClick = () => {
        setForm({ name: "", email: "", phone: "" });
        setEditingId(null);
        import("bootstrap").then((bootstrap) => {
            const offcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasAdd"));
            offcanvas.show();
        });
    };

    const handleDelete = async (id) => {
        await deleteStudent(id);
        fetchStudents();
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between">
                <h2>Students</h2>
                <button className="btn btn-primary" type="button" onClick={handleAddStudentClick}>
                    Add Student
                </button>
            </div>

            {/* Add Student Offcanvas */}
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasAdd" aria-labelledby="offcanvasAddLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasAddLabel">Add Student</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3"><input type="text" className="form-control mb-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
                        <div className="mb-3"><input type="email" className="form-control mb-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
                        <div className="mb-3"><input type="text" className="form-control mb-2" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></div>
                        <button type="submit" className="btn btn-primary">Add Student</button>
                    </form>
                </div>
            </div>

            {/* Edit Student Offcanvas */}
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasEdit" aria-labelledby="offcanvasEditLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasEditLabel">Edit Student</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3"><input type="text" className="form-control mb-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
                    <div className="mb-3"><input type="email" className="form-control mb-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
                    <div className="mb-3"><input type="text" className="form-control mb-2" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></div>
                        <button type="submit" className="btn btn-primary">Update Student</button>
                    </form>
                </div>
            </div>

            {/* Student List Table */}
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>
                                <button onClick={() => handleEdit(student)} className="btn btn-warning btn-sm me-2">Edit</button>
                                <button onClick={() => handleDelete(student.id)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Student;
