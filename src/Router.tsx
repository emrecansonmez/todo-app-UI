import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { DashboardLayout } from "./modules/Dashboard";
import { TaskManager } from "./pages/TaskManager";
import ProtectedRoutes from "./ProtectedRoutes";
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <DashboardLayout />
          </ProtectedRoutes>
        }
      >
        <Route path="taskManager" element={<TaskManager />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
