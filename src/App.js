import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import CategoryEdit from "./pages/Categories/edit";
import CategoryCreate from "./pages/Categories/create";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/create" element={<CategoryCreate />} />
        <Route path="/categories/edit/:id" element={<CategoryEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
