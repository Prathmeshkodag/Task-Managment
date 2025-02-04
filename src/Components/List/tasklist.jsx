import React, { useState, useEffect } from "react";
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBBtn,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsUpDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditTaskModal from './editetask';
import AddTaskModal from "./addTask";

function createData(id, title, description, status, priority) {
    return { id, title, description, status, priority };
}

const statuses = ["Pending", "In Progress", "Completed"];
const priorities = ["Low", "Medium", "High"];

const initialRows = Array.from({ length: 100 }, (_, index) =>
    createData(
        index + 1,
        `Task ${index + 1}`,
        `This is the description for Task ${index + 1}`,
        statuses[Math.floor(Math.random() * statuses.length)],
        priorities[Math.floor(Math.random() * priorities.length)]
    )
);

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(0);
    const rowsPerPage = 20;
    const [editingTask, setEditingTask] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchTask, setSearchTask] = useState('');
    const [filterTask, setFilterTask] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const open = Boolean(anchorEl);
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks) {
            setTasks(storedTasks);
        } else {
            setTasks(initialRows);
        }
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const startEditing = (task) => {
        setEditingTask(task);
        setModalOpen(true);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handelFilterTask = () => {
        if (filterTask === "") {
            setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
        } else {
            setTasks(tasks.filter((task) => task.status === filterTask));
        }
    };

    useEffect(() => {
        if (filterTask) {
            handelFilterTask();
        }
    }, [filterTask]);

    const removeTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const handleAddTask = (newTask) => {
        const updatedTasks = [{ id: tasks.length + 1, ...newTask }, ...tasks];
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const sortTaskListOnPriority = () => {
        const priorityOrder = { Low: 1, Medium: 2, High: 3 };

        const sortedTasks = [...tasks].sort((a, b) => {
            return sortOrder === "asc"
                ? priorityOrder[a.priority] - priorityOrder[b.priority]
                : priorityOrder[b.priority] - priorityOrder[a.priority];
        });

        setTasks(sortedTasks);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const sortTaskListOnStatus = () => {
        const sortedTasks = [...tasks].sort((a, b) => {
            return sortOrder === "asc"
                ? a.status.localeCompare(b.status)
                : b.status.localeCompare(a.status);
        });
        setTasks(sortedTasks);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    
    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTask.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTask.toLowerCase())
    );

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: '50px', width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: '50px', width: "50%" }}>
                    <div style={{ width: "50%", border: "1px solid black", display: "flex", alignItems: "center", padding: "3px", borderRadius: "5px" }}>
                        <input type="text" style={{ width: '100%', position: 'relative', padding: "3px", border: "none", outline: 'none' }}
                            placeholder="Search"
                            value={searchTask}
                            onChange={(e) => setSearchTask(e.target.value)} />
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ cursor: "pointer" }} />
                    </div>
                    <div style={{ border: "1px solid black", padding: "3px", borderRadius: "5px", cursor: "pointer", width: "50%" }}>
                        <Button id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} sx={{ width: "100%", alignItems: "center", justifyContent: "start" }}>
                            Filter
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            sx={{ width: "100%" }}
                        >
                            <MenuItem onClick={() => { handleClose(); setFilterTask('Completed') }} >Completed</MenuItem>
                            <MenuItem onClick={() => { handleClose(); setFilterTask('In Progress') }}>In Progress</MenuItem>
                            <MenuItem onClick={() => { handleClose(); setFilterTask('Pending') }}>Pending</MenuItem>
                        </Menu>
                    </div>
                </div>
                <div style={{ padding: "3px", borderRadius: "5px", cursor: "pointer", width: "50%", display: "flex", justifyContent: 'end' }}>
                    <Button variant="contained" color="success" size="small" sx={{ width: "20%", height: "45px" }} onClick={() => setAddModalOpen(true)}>Add</Button>
                </div>
            </div>

            <TableContainer >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Status
                                <FontAwesomeIcon
                                    icon={faArrowsUpDown}
                                    onClick={sortTaskListOnStatus}
                                    style={{ cursor: "pointer", marginLeft: "8px", transform: sortOrder === "asc" ? "rotate(0deg)" : "rotate(180deg)" }}
                                />
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Priority
                                <FontAwesomeIcon
                                    icon={faArrowsUpDown}
                                    onClick={sortTaskListOnPriority}
                                    style={{ cursor: "pointer", marginLeft: "8px", transform: sortOrder === "asc" ? "rotate(0deg)" : "rotate(180deg)" }}
                                />
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTasks.length > 0 ? (
                            filteredTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell>{row.priority}</TableCell>
                                    <TableCell>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "start",
                                            alignItems: "center",
                                            gap: "5px"
                                        }}>
                                            <Button variant="contained" color="primary" size="small" onClick={() => startEditing(row)}>
                                                Edit
                                            </Button>
                                            <Button variant="contained" color="error" size="small" onClick={() => removeTask(row.id)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                                    No tasks found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={filteredTasks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5]}
            />
            <AddTaskModal open={addModalOpen} onClose={() => setAddModalOpen(false)} addTask={handleAddTask} />
            <EditTaskModal modalOpen={modalOpen} setModalOpen={setModalOpen} editingTask={editingTask} setTasks={setTasks} />
        </div>
    );
}
