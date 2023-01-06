import { Card, Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import SAlert from "../../components/Alert";
import SForm from "./Form";
import { postData } from "../../utils/fetch";
import { userLogin } from "../../redux/auth/action";

function Signin() {
  // console.log(JSON.parse(localStorage.getItem("auth")));
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    const res = await postData("/cms/auth/signin", form);

    if (res?.data) {
      dispatch(userLogin(res.data.token, res.data.role));
      setAlert({
        ...alert,
        status: false,
      });
      setLoading(true);
      navigate("/");
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setAlert({
        status: true,
        message: res?.response?.data?.msg || "Internal Server Error",
        type: "danger",
      });
    }
  };

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
