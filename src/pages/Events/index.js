import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import SBreadCrumb from "../../components/Breadcrumb";
import SearchInput from "../../components/SearchInput";
import { accessEvents } from "../../const/access";
import SButton from "../../components/Button";
import SAlert from "../../components/Alert";
import STable from "../../components/Table";
import {
  fetchEvents,
  setKeyword,
  setTalent,
  setCategory,
} from "../../redux/events/action";
import {
  fetchListCategories,
  fetchListTalents,
} from "../../redux/lists/action";
import SelectBox from "../../components/SelectBox";

export default function Events() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useSelector((state) => state.alert);
  const events = useSelector((state) => state.events);
  const lists = useSelector((state) => state.lists);

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
    Object.keys(accessEvents).forEach(function (key, index) {
      if (accessEvents[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch, events.keyword, events.category, events.talent]);

  useEffect(() => {
    dispatch(fetchListCategories());
    dispatch(fetchListTalents());
  }, [dispatch]);

  const handleDelete = async () => {};

  // console.log("lists.categories");
  // console.log(lists.categories);

  return (
    <Container className="mt-3">
      <SBreadCrumb second={"Events"} />
      {access.create && (
        <div className="mb-3">
          <SButton action={() => navigate("/events/create")}>Create</SButton>
        </div>
      )}
      <Row>
        <Col>
          <SearchInput
            query={events.keyword}
            handleChange={(e) => dispatch(setKeyword(e.target.value))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={"Select Category"}
            name="category"
            value={events.category}
            options={lists.categories}
            isClearable={true}
            handleChange={(e) => dispatch(setCategory(e))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={"Masukan pencarian pembicara"}
            name="talents"
            value={events.talent}
            options={lists.talents}
            isClearable={true}
            handleChange={(e) => dispatch(setTalent(e))}
          />
        </Col>
      </Row>
      {alert.status && (
        <SAlert type={alert.alertType} message={alert.message} />
      )}
      <STable
        status={events.status}
        thead={[
          "Title",
          "Date",
          "Venue",
          "Status",
          "Category",
          "Talent",
          "Action",
        ]}
        data={events.data}
        tbody={[
          "title",
          "date",
          "venueName",
          "statusEvent",
          "categoryName",
          "talentName",
        ]}
        editUrl={`/events/edit`}
        deleteAction={(id) => handleDelete(id)}
        // customAction={(id, status = "") => {
        //   return (
        //     <Button
        //       className={"mx-2"}
        //       variant="primary"
        //       size={"sm"}
        //       action={() => handleChangeStatus(id, status)}
        //     >
        //       Change Status
        //     </Button>
        //   );
        // }}
        withoutPagination
      />
    </Container>
  );
}
