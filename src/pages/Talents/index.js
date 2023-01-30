import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SearchInput from "../../components/SearchInput";
import SBreadCrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import STable from "../../components/Table";
import SAlert from "../../components/Alert";
import { fetchTalents, setKeyword } from "../../redux/talents/action";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetch";
import { setAlert, clearAlert } from "../../redux/alert/action";
import { accessTalents } from "../../const/access";

function TalentsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const talents = useSelector((state) => state.talents);

  const [access, setAccess] = useState({
    create: false,
    edit: false,
    delete: false,
  });

  const checkAccess = () => {
    let { role } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    const access = { create: false, delete: false, edit: false };
    Object.keys(accessTalents).forEach(function (key, index) {
      if (accessTalents[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchTalents());
  }, [dispatch, talents.keyword]);

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
        const res = await deleteData(`/cms/talents/${id}`);
        dispatch(
          setAlert(
            true,
            "success",
            `Delete talent ${res.data.data.name} successful`
          )
        );
        setTimeout(() => {
          dispatch(clearAlert());
        }, 5000);
        dispatch(fetchTalents());
      }
    });
  };

  return (
    <Container className="mt-3">
      <SBreadCrumb second={"Talents"} />
      {access.create && (
        <div className="mb-3">
          <SButton action={() => navigate("/talents/create")}>Create</SButton>
        </div>
      )}
      <SearchInput
        query={talents.keyword}
        handleChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      {alert.status && (
        <SAlert type={alert.alertType} message={alert.message} />
      )}
      <STable
        status={talents.status}
        thead={["Name", "Role", "Avatar", "Action"]}
        data={talents.data}
        tbody={["name", "role", "avatar"]}
        editUrl={access.edit ? `/talents/edit` : null}
        deleteAction={access.delete ? (id) => handleDelete(id) : null}
        withoutPagination
      />
    </Container>
  );
}

export default TalentsPage;
