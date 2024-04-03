import React, { useEffect, useState } from "react";
import { deleteEmployee, getAllEmployees } from "../utils/ApiFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");
  const [originalEmployees, setOriginalEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees()
      .then((data) => {
        setEmployees(data);
        setOriginalEmployees(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const maxPageNumbersDisplay = 5;
  let startPage = Math.max(
    1,
    currentPage - Math.floor(maxPageNumbersDisplay / 2)
  );
  let endPage = Math.min(
    Math.ceil(employees.length / employeesPerPage),
    startPage + maxPageNumbersDisplay - 1
  );

  if (endPage - startPage + 1 < maxPageNumbersDisplay) {
    startPage = Math.max(1, endPage - maxPageNumbersDisplay + 1);
  }

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter((employee) => employee.id !== id));
      console.log("Employee deleted successfully!");
      toast.success("Xóa thành công!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/employees/add-employee");
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setEmployees(originalEmployees);
    } else {
      const filteredEmployees = originalEmployees.filter((employee) =>
        employee.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setEmployees(filteredEmployees);
    }
  };

  return (
    <section className="container-fluid mt-3">
      <ToastContainer autoClose={3000} />
      <div className="d-flex justify-content-between">
        <div>
          <Button className="btn btn-success mt-1" onClick={handleAdd}>
            Thêm nhân viên
          </Button>
        </div>
        <div className="mb-2 search-function input-group-text">
          <input
            type="text"
            className="search-function-input form-control"
            placeholder="Nhập tên nhân viên"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary ml-2" onClick={handleSearch}>
            Tìm kiếm
          </button>
        </div>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="text-center">
          <tr>
            <th>ID</th>
            <th>Mã nhân viên</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Ngày gia nhập công ty</th>
            <th>Ngày nghỉ việc</th>
            <th>Trạng thái</th>
            <th colSpan={2}>Chức năng</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentEmployees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.employeeCode}</td>
              <td>{employee.fullName}</td>
              <td>{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
              <td>{employee.email}</td>
              <td>{employee.phoneNumber}</td>
              <td>{new Date(employee.joinDate).toLocaleDateString()}</td>
              <td>
                {employee.resignationDate
                  ? new Date(employee.resignationDate).toLocaleDateString()
                  : "Không"}
              </td>
              <td>{employee.status}</td>
              <td>
                <Link to={`/employees/edit-employee/${employee.id}`}>
                  <Button>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </Link>
              </td>
              <td>
                <Button
                  className="btn btn-danger"
                  onClick={() => handleDelete(employee.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              onClick={() => paginate(1)}
              className="page-link"
              disabled={currentPage === 1}
            >
              Đầu
            </button>
          </li>
          {[...Array(endPage - startPage + 1).keys()].map((number) => (
            <li key={number + startPage} className="page-item">
              <button
                onClick={() => paginate(number + startPage)}
                className={`page-link ${
                  currentPage === number + startPage ? "active" : ""
                }`}
              >
                {number + startPage}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              onClick={() =>
                paginate(Math.ceil(employees.length / employeesPerPage))
              }
              className="page-link"
              disabled={
                currentPage === Math.ceil(employees.length / employeesPerPage)
              }
            >
              Cuối
            </button>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Employees;
