import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";

export function HomeRoute() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}
