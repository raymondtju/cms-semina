import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SBreadCrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert";
import { useNavigate, useParams } from "react-router-dom";
import CategoriesForm from "./form";
import { getData, updateData } from "../../utils/fetch";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/alert/action";

export function CategoryEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId } = useParams();

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

  const fetchOneCategories = async () => {
    const res = await getData(`/cms/categories/${categoryId}`);
    // console.log(res);
    setForm({ ...form, name: res.data.data.name });
  };

  useEffect(() => {
    fetchOneCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await updateData(`/cms/categories/${categoryId}`, form);
    if (res?.data?.data) {
      dispatch(
        setAlert(
          true,
          "success",
          `berhasil ubah kategori ${res.data.data.name}`
        )
      );
      navigate("/categories");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlerts({
        ...alert,
        status: true,
        type: "danger",
        message: res.response.data.msg,
      });
    }
  };

  return (
    <Container className="mt-3">
      <SBreadCrumb
        textSecound={"Categories"}
        urlSecound={"/categories"}
        textThird="Edit"
      />
      {alerts.status && <SAlert type={alerts.type} message={alerts.message} />}
      <CategoriesForm
        edit
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}
