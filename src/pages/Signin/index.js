import { Card, Container } from "react-bootstrap";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import { config } from "../../configs";
import SAlert from "../../components/Alert";
import SForm from "./Form";

function Signin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${config.url_dev}/cms/auth/signin`, {
        email: form.email,
        password: form.password,
      });

      setAlert({
        ...alert,
        status: false,
      });

      setLoading(true);

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.log(err.response.data.msg);

      setAlert({
        status: true,
        message: err?.response?.data?.msg || "Internal Server Error",
        type: "danger",
      });
      setLoading(false);
    }
  };

  if (localStorage.getItem("token")) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Container md={12}>
      <Card style={{ width: "70%" }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title>Sign In</Card.Title>

          <div>
            {alert.status && (
              <SAlert variant={alert.type} message={alert.message}></SAlert>
            )}
          </div>

          <SForm
            loading={loading}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Signin;
