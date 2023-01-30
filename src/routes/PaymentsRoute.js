import { Routes, Route } from "react-router-dom";

import Payments from "../pages/Payments";
import PaymentsCreate from "../pages/Payments/create";
import PaymentsEdit from "../pages/Payments/edit";

export function PaymentsRoute() {
  return (
    <Routes>
      <Route path="/" element={<Payments />} />
      <Route path="/create" element={<PaymentsCreate />} />
      <Route path="/edit/:paymentId" element={<PaymentsEdit />} />
    </Routes>
  );
}
