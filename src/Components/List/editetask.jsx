import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBInput, MDBBtn, MDBContainer, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import Button from "@mui/material/Button";

export default function EditTaskModal({ modalOpen, setModalOpen, editingTask, setTasks }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "",
        priority: "",
    });

    useEffect(() => {
        if (editingTask) {
            setFormData({
                title: editingTask.title,
                description: editingTask.description,
                status: editingTask.status,
                priority: editingTask.priority,
            });
        }
    }, [editingTask]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const saveEdit = (e) => {
        e.preventDefault();
        const updatedTask = { ...editingTask, ...formData };
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map((task) =>
                task.id === editingTask.id ? updatedTask : task
            );
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return updatedTasks;
        });
        setModalOpen(false);
    };

    return (
        <MDBModal open={modalOpen} setOpen={setModalOpen} tabIndex="-1">
            <MDBModalDialog centered>
                <MDBModalContent>
                    <MDBModalHeader>
                        <h5 className="text-center">Edit Task</h5>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <MDBContainer fluid className="d-flex align-items-center justify-content-center">
                            <MDBCard className="w-100">
                                <MDBCardBody className="px-4">
                                    <form onSubmit={saveEdit}>
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Title"
                                            size="lg"
                                            id="title"
                                            type="text"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                        />
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Description"
                                            size="lg"
                                            id="description"
                                            type="text"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                        />
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Status"
                                            size="lg"
                                            id="status"
                                            type="text"
                                            value={formData.status}
                                            onChange={handleChange}
                                            required
                                        />
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Priority"
                                            size="lg"
                                            id="priority"
                                            type="text"
                                            value={formData.priority}
                                            onChange={handleChange}
                                            required
                                        />

                                        <MDBBtn type="submit" className="w-100 gradient-custom-4" size="lg">
                                            Save Changes
                                        </MDBBtn>
                                    </form>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBContainer>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <Button variant="outlined" color="secondary" onClick={() => setModalOpen(false)}>
                            Cancel
                        </Button>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}
