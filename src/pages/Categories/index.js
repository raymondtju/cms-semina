import React from "react";
import { useEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import SBreadcrumb from "../../components/Breadcrumb";
import SNavbar from "../../components/Navbar";
import axios from "axios";
import { config } from "../../configs";
import SButton from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategoriesAPI = async () => {
    try {
      const res = await axios.get(`${config.url_dev}/cms/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTimeout(() => {
        setData(res.data.data);
        setLoading(false);
      }, 4000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // if (!token) {
    //   return <Navigate to="/signin" replace={true} />;
    // }
    getCategoriesAPI();
  }, []);

  return (
    <>
      <SNavbar />

      <Container>
        <SBreadcrumb second="Categories" />
        <SButton
          action={() => navigate("/categories/create")}
          children="Add Categories"
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  <div className="flex item-center justify-center">
                    <Spinner animation="grow" />
                  </div>
                </td>
              </tr>
            ) : (
              data.map((items, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{items.name}</td>
                  <td>{items.name}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
