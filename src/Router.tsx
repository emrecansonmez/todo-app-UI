import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { DashboardLayout } from "./modules/Dashboard";
import { TaskManager } from "./pages/TaskManager";
import StickyWall from "./pages/StickyWall";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="taskManager" element={<TaskManager />} />
        <Route path="stickyWall" element={<StickyWall />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
