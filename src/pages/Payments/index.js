import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SBreadCrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import Table from "../../components/Table";
import { fetchPayments } from "../../redux/payments/action";
import SAlert from "../../components/Alert";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetch";
import { setAlert } from "../../redux/alert/action";
import { accessPayments } from "../../const/access";

function PaymentsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.alert);
  const payments = useSelector((state) => state.payments);

  const [access, setAccess] = useState({
    create: false,
    delete: false,
    edit: false,
  });

  const checkAccess = () => {
    let { role } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    const access = { create: false, delete: false, edit: false };
    Object.keys(accessPayments).forEach(function (key, index) {
      if (accessPayments[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete talent?",
      text: "This action can't be undo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/payments/${id}`);
        dispatch(
          setAlert(
            true,
            "success",
            `Delete payment ${res.data.data.type} successful`
          )
        );
        dispatch(fetchPayments());
      }
    });
  };

  return (
    <Container className="mt-3">
      <SBreadCrumb second={"Payments"} />

      {access.create && (
        <SButton className={"mb-3"} action={() => navigate("/payments/create")}>
          Create
        </SButton>
      )}

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={payments.status}
        thead={["Type", "Avatar", "Aksi"]}
        data={payments.data}
        tbody={["type", "avatar"]}
        editUrl={access.edit ? `/payments/edit` : null}
        deleteAction={access.delete ? (id) => handleDelete(id) : null}
        withoutPagination
      />
    </Container>
  );
}

export default PaymentsPage;
