import { Routes, Route } from "react-router-dom";

import Talents from "../pages/Talents";
import TalentsCreate from "../pages/Talents/create";
import TalentsEdit from "../pages/Talents/edit";

export function TalentsRoute() {
  return (
    <Routes>
      <Route path="/" element={<Talents />} />
      <Route path="/create" element={<TalentsCreate />} />
      <Route path="/edit/:talentId" element={<TalentsEdit />} />
    </Routes>
  );
}
