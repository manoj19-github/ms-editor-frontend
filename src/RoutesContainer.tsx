import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EditorsPage from "./pages/EditorsPage";

const RoutesContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/editor/:roomId" element={<EditorsPage />} />
    </Routes>
  );
};

export default RoutesContainer;
