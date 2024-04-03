import React, { useState } from "react";
import { addEmployee } from "../utils/ApiFunctions";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEmployee = () => {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [error, setError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^\d{10}$/;
    return re.test(phoneNumber);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError("");
    setPhoneError("");

    if (!validateEmail(email)) {
      setEmailError("Email không hợp lên");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError("Số điện thoại không hợp lệ");
      return;
    }

    const newEmployee = {
      fullName,
      dateOfBirth,
      email,
      phoneNumber,
      joinDate,
    };
    console.log(newEmployee);
    try {
      const response = await addEmployee(newEmployee);
      if (response) {
        toast.success("Thêm thành công");
        setTimeout(() => {
          navigate("/employees");
        }, 1000);
      } else {
        console.log("fail to add new employee");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="container">
      <ToastContainer autoClose={1000} />
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mt-5 mb-2">Thêm nhân viên mới</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Họ và tên
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dateOfBirth" className="form-label">
                Ngày sinh
              </label>
              <input
                required
                type="date"
                className="form-control"
                id="dateOfBirth"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                required
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <div className="text-danger">{emailError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Số điện thoại
              </label>
              <input
                required
                type="tel"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {phoneError && <div className="text-danger">{phoneError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="joinDate" className="form-label">
                Ngày gia nhập công ty
              </label>
              <input
                required
                type="date"
                className="form-control"
                id="joinDate"
                name="joinDate"
                value={joinDate}
                onChange={(e) => setJoinDate(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 d-md-flex mt-2">
              <button type="submit" className="btn btn-outline-primary ml-5">
                Lưu lại
              </button>
              <Link to={"/employees"} className="btn btn-outline-danger">
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddEmployee;
