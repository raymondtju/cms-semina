import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import SBreadcrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import STable from "../../components/Table";
import { accessCategories } from "../../const/access";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/categories/action";
import { deleteData } from "../../utils/fetch";
import SAlert from "../../components/Alert";

export default function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);
  const alert = useSelector((state) => state.alert);

  const [access, setAccess] = useState({
    create: false,
    edit: false,
    delete: false,
  });
  // console.log(access);
  const checkAccess = () => {
    let { role } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : null;

    const access = {
      create: false,
      edit: false,
      delete: false,
    };
    // console.log(Object.keys(accessCategories));
    Object.keys(accessCategories).forEach(function (key, index) {
      // console.log(accessCategories[key]);
      if (accessCategories[key].indexOf(role) > -1) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  const handleDelete = async (id) => {
    await deleteData(`/cms/categories/${id}`);
    dispatch(fetchCategories());
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Container>
      <SBreadcrumb second="Categories" />

      {access.create && (
        <SButton
          action={() => navigate("/categories/create")}
          children="Add Categories"
        />
      )}

      {alert.status && (
        <SAlert variant={alert.alertType} message={alert.message} />
      )}

      <STable
        status={categories.status}
        thead={["Name", "Action"]}
        data={categories.data}
        tbody={["name"]}
        editUrl={access.edit ? `/categories/edit` : null}
        deleteAction={access.delete ? (id) => handleDelete(id) : null}
        // withoutPagination
      ></STable>
    </Container>
  );
}
