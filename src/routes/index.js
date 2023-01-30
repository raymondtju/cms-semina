import { Navigate, Route, Routes } from "react-router-dom";
import GuardRoute from "../components/GuardRoute";
import GuestRoute from "../components/GuestRoute";

import Signin from "../pages/Signin";
import { HomeRoute } from "./HomeRoute";
import { TalentsRoute } from "./TalentsRoute";
import { PaymentsRoute } from "./PaymentsRoute";
import SNavbar from "../components/Navbar";
import { CategoriesRoute } from "./CategoriesRoute";
// import { EventsRoute } from "./EventsRoute";
// import { OrdersRoute } from "./OrdersRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/signin"
        element={
          <GuestRoute>
            <Signin />
          </GuestRoute>
        }
      />
      <Route
        path="/"
        element={
          <>
            <SNavbar />
            <GuardRoute />
          </>
        }
      >
        <Route path="dashboard/*" element={<HomeRoute />} />
        <Route path="categories/*" element={<CategoriesRoute />} />
        <Route path="talents/*" element={<TalentsRoute />} />
        <Route path="payments/*" element={<PaymentsRoute />} />
        {/* <Route path="events/*" element={<EventsRoute />} />
        <Route path="orders/*" element={<OrdersRoute />} /> */}
        <Route path="" element={<Navigate to="/dashboard" replace={true} />} />
      </Route>
    </Routes>
  );
}
