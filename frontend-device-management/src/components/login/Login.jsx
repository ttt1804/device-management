import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./login.css";

import BackgroundImage from "../../assets/images/background.png";
import Logo from "../../assets/images/logo.png";
import { loginUser } from "../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const hanldeInputChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(account);
    if (response) {
      const decodeJwt = jwtDecode(response.access_token);
      localStorage.setItem("user", decodeJwt.sub);
      localStorage.setItem("access_token", response.access_token);
      toast.success("Đăng nhập thành công");
      setTimeout(() => {
        navigate("/");
      }, 800);
    } else {
      setErrorMessage("Tài khoản hoặc mật khẩu không chính xác.");
    }
  };
  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="sign-in__backdrop"></div>
      <ToastContainer autoClose={800} />
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Đăng nhập</div>
        {errorMessage && (
          <p className="alert alert-danger text-center">{errorMessage}</p>
        )}
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Tài khoản</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tài khoản"
            name="username"
            value={account.username}
            onChange={hanldeInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Nhập mật khẩu"
            value={account.password}
            onChange={hanldeInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Nhớ mật khẩu" />
        </Form.Group>
        <Button className="w-100" variant="primary" type="submit">
          Đăng nhập
        </Button>
        <div className="d-grid justify-content-end">
          <Button className="text-muted px-0" variant="link">
            Quên mật khẩu?
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
