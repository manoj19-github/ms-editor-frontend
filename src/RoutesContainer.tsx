import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EditorsPage from "./pages/EditorsPage";

const RoutesContainer = () => {
  return (
    <Routes>
      <Route path="/:roomId" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/editor/:roomId/:userName" element={<EditorsPage />} />
    </Routes>
  );
};

export default RoutesContainer;
