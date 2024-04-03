import React, { useState, useEffect } from "react";
import { getEmployeeById, updateEmployee } from "../utils/ApiFunctions";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    joinDate: "",
    resignationDate: "",
    status: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const fetchedEmployee = await getEmployeeById(id);
        fetchedEmployee.dateOfBirth = moment(
          fetchedEmployee.dateOfBirth
        ).format("YYYY-MM-DD");
        fetchedEmployee.joinDate = moment(fetchedEmployee.joinDate).format(
          "YYYY-MM-DD"
        );
        fetchedEmployee.resignationDate = fetchedEmployee.resignationDate =
          fetchedEmployee.resignationDate
            ? moment(fetchedEmployee.resignationDate).format("YYYY-MM-DD")
            : null;
        setEmployee(fetchedEmployee);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^\d{10}$/;
    return re.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPhoneError("");

    if (!validateEmail(employee.email)) {
      setEmailError("Email không hợp lên");
      return;
    }

    if (!validatePhoneNumber(employee.phoneNumber)) {
      setPhoneError("Số điện thoại không hợp lệ");
      return;
    }
    try {
      await updateEmployee(id, employee);
      toast.success("Sửa thành công");
      setTimeout(() => {
          navigate("/employees");
        }, 1000);
    } catch (error) {
      setError(error.message);
    }
  };
  
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError('');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <section className="container">
      <ToastContainer autoClose={1000} />
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mt-5 mb-2">Sửa thông tin nhân viên</h2>
          {error && <div className="text-center alert alert-danger">{error}</div>}
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
                value={employee.fullName}
                onChange={handleInputChange}
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
                value={employee.dateOfBirth}
                onChange={handleInputChange}
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
                value={employee.email}
                onChange={handleInputChange}
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
                value={employee.phoneNumber}
                onChange={handleInputChange}
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
                value={employee.joinDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="resignationDate" className="form-label">
                Ngày nghỉ việc
              </label>
              <input
                type="date"
                className="form-control"
                id="resignationDate"
                name="resignationDate"
                value={employee.resignationDate || undefined}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Trạng thái
              </label>
              <select
                className="form-select"
                id="status"
                name="status"
                onChange={handleInputChange}
              >
                <option
                  value="Đang làm việc"
                  selected={employee.status === "Đang làm việc"}
                >
                  Đang làm việc
                </option>
                <option
                  value="Nghỉ việc"
                  selected={employee.status === "Nghỉ việc"}
                >
                  Nghỉ việc
                </option>
              </select>
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

export default EditEmployee;
