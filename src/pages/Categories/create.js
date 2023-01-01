import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import SBreadCrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert";
import CategoriesForm from "./form";
import { config } from "../../configs";
import SNavbar from "../../components/Navbar";

function CategoryCreate() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${config.url_dev}/cms/categories`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/categories");
      setIsLoading(true);
    } catch (err) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: err.response.data.msg,
      });
    }
  };

  return (
    <>
      <SNavbar />

      <Container>
        <SBreadCrumb
          second={"Categories"}
          secondUrl={"/categories"}
          third="Create"
        />
        {alert.status && (
          <SAlert variant={alert.type} message={alert.message} />
        )}
        <CategoriesForm
          form={form}
          loading={isLoading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Container>
    </>
  );
}

export default CategoryCreate;
