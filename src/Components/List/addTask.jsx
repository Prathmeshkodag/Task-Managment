import React, { useState } from "react";
import { Modal, Box, TextField, Button, MenuItem } from "@mui/material";

const statuses = ["Pending", "In Progress", "Completed"];
const priorities = ["Low", "Medium", "High"];

const AddTaskModal = ({ open, onClose, addTask }) => {
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
    });

    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleAddTask = () => {
        if (newTask.title.trim() && newTask.description.trim()) {
            addTask(newTask);
            setNewTask({ title: "", description: "", status: "Pending", priority: "Medium" });
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "white",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <h3>Add New Task</h3>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={newTask.title}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={newTask.description}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    rows={3}
                />
                <TextField
                    fullWidth
                    select
                    label="Status"
                    name="status"
                    value={newTask.status}
                    onChange={handleChange}
                    margin="normal"
                >
                    {statuses.map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    select
                    label="Priority"
                    name="priority"
                    value={newTask.priority}
                    onChange={handleChange}
                    margin="normal"
                >
                    {priorities.map((priority) => (
                        <MenuItem key={priority} value={priority}>
                            {priority}
                        </MenuItem>
                    ))}
                </TextField>
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="success" onClick={handleAddTask}>
                        Add Task
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddTaskModal;
