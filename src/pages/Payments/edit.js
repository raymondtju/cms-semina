import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import SBreadCrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert";
import Form from "./form";
import { getData, postData, updateData } from "../../utils/fetch";
import { setAlert } from "../../redux/alert/action";

function PaymentsEdit() {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    type: "",
    role: "",
    file: "",
    avatar: "",
  });

  const [alerts, setAlerts] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchOnePayments = async () => {
    const res = await getData(`/payments/${paymentId}`);
    setForm({
      ...form,
      type: res.data.data.type,
      role: res.data.data.role,
      avatar: res.data.data.image.name,
      file: res.data.data.image._id,
    });
  };

  useEffect(() => {
    fetchOnePayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append("avatar", file);
    const res = await postData("/cms/images", formData, true);
    return res;
  };

  const handleChange = async (e) => {
    if (e.target.name === "avatar") {
      if (
        e?.target?.files[0]?.type === "image/jpg" ||
        e?.target?.files[0]?.type === "image/png" ||
        e?.target?.files[0]?.type === "image/jpeg"
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          setAlerts({
            ...alerts,
            status: true,
            type: "danger",
            message: "Please select image size less than 3 MB",
          });
          setForm({
            ...form,
            file: "",
            [e.target.name]: "",
          });
        } else {
          const res = await uploadImage(e.target.files[0]);

          setForm({
            ...form,
            file: res.data.data._id,
            [e.target.name]: res.data.data.name,
          });
        }
      } else {
        setAlerts({
          ...alerts,
          status: true,
          type: "danger",
          message: "type image png | jpg | jpeg",
        });
        setForm({
          ...form,
          file: "",
          [e.target.name]: "",
        });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      image: form.file,
      role: form.role,
      type: form.type,
    };

    const res = await updateData(`/payments/${paymentId}`, payload);
    if (res.data.data) {
      dispatch(
        setAlert(
          true,
          "success",
          `Successfully change payment ${res.data.data.type}`
        )
      );
      navigate("/payments");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlerts({
        ...alerts,
        status: true,
        type: "danger",
        message: res.response.data.msg,
      });
    }
  };

  return (
    <Container>
      <SBreadCrumb second={"Payments"} secondUrl={"/payments"} third="Edit" />
      {alerts.status && <SAlert type={alerts.type} message={alerts.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        edit
      />
    </Container>
  );
}

export default PaymentsEdit;
