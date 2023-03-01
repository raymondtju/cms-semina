import { Routes, Route } from "react-router-dom";

import Events from "../pages/Events";
import EventsCreate from "../pages/Events/create";
import EventsEdit from "../pages/Events/edit";

export function EventsRoute() {
  return (
    <Routes>
      <Route path="/" element={<Events />} />
      <Route path="/create" element={<EventsCreate />} />
      <Route path="/edit/:eventId" element={<EventsEdit />} />
    </Routes>
  );
}
