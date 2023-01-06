import { Routes, Route } from "react-router-dom";

import { CategoryCreate } from "../pages/Categories/create";
import { CategoryEdit } from "../pages/Categories/edit";
import Categories from "../pages/Categories";

export function CategoriesRoute() {
  return (
    <Routes>
      <Route path="/" element={<Categories />} />
      <Route path="/create" element={<CategoryCreate />} />
      <Route path="/edit/:categoryId" element={<CategoryEdit />} />
    </Routes>
  );
}
