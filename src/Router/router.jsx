import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const SingupPage = lazy(() => import("../Components/Singup/singup.jsx"));
const SingInPage = lazy(() => import("../Components/singin/singin.jsx"));
const DashboardPage = lazy(() => import("../Components/Dashboard/dashboard.jsx"));
const TaskListPage = lazy(() => import("../Components/List/tasklist.jsx"));
const AddTaskPage = lazy(() => import("../Components/List/addTask.jsx"));
const EditTaskPage = lazy(() => import("../Components/List/editetask.jsx"));
const PrivateRoute = lazy(() => import("../Components/Authentication/authentication.jsx"));

export default function Mainroute() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><SingupPage /></Suspense>} />
        <Route path="/singin" element={<Suspense fallback={<div>Loading...</div>}><SingInPage /></Suspense>} />

        {/* Private Routes */}
        <Route element={<Suspense fallback={<div>Loading...</div>}><PrivateRoute /></Suspense>}>
          <Route path="/dashboard" element={<Suspense fallback={<div>Loading...</div>}><DashboardPage /></Suspense>} />
          <Route path="/tasklist" element={<Suspense fallback={<div>Loading...</div>}><TaskListPage /></Suspense>} />
          <Route path="/addtask" element={<Suspense fallback={<div>Loading...</div>}><AddTaskPage /></Suspense>} />
          <Route path="/edittask" element={<Suspense fallback={<div>Loading...</div>}><EditTaskPage /></Suspense>} />
        </Route>
      </Routes>
    </Router>
  );
}
