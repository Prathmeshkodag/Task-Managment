import React, { useState } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import TaskList from '../List/tasklist';
import { Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
    const [showaddTask, setShowaddTask] = useState(true);
    const navigate=useNavigate()
    const handelLogout=()=>{
        localStorage.removeItem('isAuthorized');
        toast.success('Logout successful!');
        setTimeout(() => {
            navigate('/singin')
        },4500)

    }
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <div role="presentation" >
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            color="inherit"
                           
                            onClick={() => setShowaddTask(true)}
                            sx={{ cursor: "pointer" }}
                        >
                            Task Management
                        </Link>
                        

                    </Breadcrumbs>
                </div>
            </div>
            <div style={{
                position: "fixed",
                bottom: "20px",
                left: "20px",
                width: "100%",
                cursor: "pointer"
            }}>
            <Button onClick={handelLogout} variant="contained" color="error" size="small" sx={{ width:'10%', height: "45px" }}  >Log Out</Button>

            </div>
           <br/>
             <TaskList/>
             <ToastContainer/>
        </>
    )
}
