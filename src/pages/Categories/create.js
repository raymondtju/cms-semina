import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import SBreadCrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert";
import CategoriesForm from "./form";
import { postData } from "../../utils/fetch";
import { accessCategories } from "../../const/access";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/alert/action";

export function CategoryCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
  });

  const [alerts, setAlerts] = useState({
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
      await postData(`/cms/categories`, form);
      dispatch(setAlert(true, "danger", "success"));

      navigate("/categories");
      setIsLoading(true);
    } catch (err) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      setAlerts({
        ...alerts,
        status: true,
        type: "danger",
        message: err.response.data.msg,
      });
    }
  };

  return (
    <Container>
      <SBreadCrumb
        second={"Categories"}
        secondUrl={"/categories"}
        third="Create"
      />
      {alerts.status && (
        <SAlert variant={alerts.type} message={alerts.message} />
      )}
      <CategoriesForm
        form={form}
        loading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}
