import React, { useState, useEffect } from "react";
import { getCourses, createCourse, updateCourse, deleteCourse } from "../Services/courseService";

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({ title: "", description: "", price: "" });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        const response = await getCourses();
        setCourses(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            if (editingId) {
                // ✅ Ensure update sends the correct ID
                await updateCourse(editingId, form);
            } else {
                await createCourse(form);
            }
    
            // Reset form and editing state AFTER API call is successful
            setForm({ title: "", description: "", price: "" });
            setEditingId(null);
            fetchCourses(); // Refresh the course list
    
            // Close the correct Offcanvas after submission
            import("bootstrap").then((bootstrap) => {
                const addOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasAdd"));
                const editOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById("offcanvasEdit"));
                if (addOffcanvas) addOffcanvas.hide();
                if (editOffcanvas) editOffcanvas.hide();
            });
        } catch (error) {
            console.error("Error saving course:", error);
        }
    };
    

    const handleEdit = (course) => {
        setForm({ title: course.title, description: course.description, price: course.price });
        setEditingId(course.id);

        // Open the edit offcanvas
        import("bootstrap").then((bootstrap) => {
            const offcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasEdit"));
            offcanvas.show();
        });
    };

    // 👉 Reset form when opening "Add Course" Offcanvas
    const handleAddCourseClick = () => {
        setForm({ title: "", description: "", price: "" }); // Reset form
        setEditingId(null); // Ensure it's not in edit mode

        // Open the add offcanvas
        import("bootstrap").then((bootstrap) => {
            const offcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasAdd"));
            offcanvas.show();
        });
    };

    const handleDelete = async (id) => {
        await deleteCourse(id);
        fetchCourses();
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between">
                <h2>Courses</h2>
                <button className="btn btn-primary" type="button" onClick={handleAddCourseClick}>
                    Add Course
                </button>
            </div>

            {/* Add Course Offcanvas */}
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasAdd" aria-labelledby="offcanvasAddLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasAddLabel">Add Course</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" className="form-control mb-2" placeholder="Title"
                                value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control mb-2" placeholder="Description"
                                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required/>
                        </div>
                        <div className="mb-3">
                            <input type="number" className="form-control mb-2" placeholder="Price"
                                value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Course</button>
                    </form>
                </div>
            </div>

            {/* Edit Course Offcanvas */}
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasEdit" aria-labelledby="offcanvasEditLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasEditLabel">Edit Course</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" className="form-control mb-2" placeholder="Title"
                                value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control mb-2" placeholder="Description"
                                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <input type="number" className="form-control mb-2" placeholder="Price"
                                value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Update Course</button>
                    </form>
                </div>
            </div>

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.title}</td>
                            <td>{course.description}</td>
                            <td>₹{course.price}</td>
                            <td>
                                <button onClick={() => handleEdit(course)} className="btn btn-warning btn-sm me-2">Edit</button>
                                <button onClick={() => handleDelete(course.id)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Course;
