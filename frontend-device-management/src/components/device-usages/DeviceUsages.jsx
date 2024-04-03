import React, { useEffect, useState } from "react";
import { deleteDeviceUsage, getAllDeviceUsages } from "../utils/ApiFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeviceUsages = () => {
  const [deviceUsages, setDeviceUsages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deviceUsagesPerPage] = useState(10);

  useEffect(() => {
    getAllDeviceUsages()
      .then((data) => {
        setDeviceUsages(data);
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
    Math.ceil(deviceUsages.length / deviceUsagesPerPage),
    startPage + maxPageNumbersDisplay - 1
  );

  if (endPage - startPage + 1 < maxPageNumbersDisplay) {
    startPage = Math.max(1, endPage - maxPageNumbersDisplay + 1);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    try {
      await deleteDeviceUsage(id);
      setDeviceUsages(
        deviceUsages.filter((deviceUsage) => deviceUsage.id !== id)
      );
      console.log("Employee deleted successfully!");
      toast.success("Xóa thành công!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container-fluid mt-3">
      <ToastContainer autoClose={3000} />
      <Link to={"/device-usages/add-device-usages"}>
        <Button className="btn btn-success mb-3">Thêm sử dụng thiết bị</Button>
      </Link>
      <table className="table table-striped table-bordered">
        <thead className="text-center">
          <tr>
            <th>ID</th>
            <th>Tên Nhân viên</th>
            <th>Tên Thiết bị</th>
            <th>Ngày bắt đầu sử dụng</th>
            <th>Ngày kết thúc sử dụng</th>
            <th>Chú thích</th>
            <th colSpan={2}>Chức năng</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {deviceUsages
            .slice(
              (currentPage - 1) * deviceUsagesPerPage,
              currentPage * deviceUsagesPerPage
            )
            .map((usage, index) => (
              <tr key={index}>
                <td>{usage.id}</td>
                <td>{usage.employee.fullName}</td>
                <td>{usage.device.name}</td>
                <td>{new Date(usage.startDate).toLocaleDateString()}</td>
                <td>{new Date(usage.endDate).toLocaleDateString()}</td>
                <td>{usage.comment || "Không"}</td>
                <td>
                  <Link to={`/device-usages/edit-device-usage/${usage.id}`}>
                    <Button>
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </Link>
                </td>
                <td>
                  <Button
                    className="btn btn-danger"
                    onClick={() => handleDelete(usage.id)}
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
                paginate(Math.ceil(deviceUsages.length / deviceUsagesPerPage))
              }
              className="page-link"
              disabled={
                currentPage ===
                Math.ceil(deviceUsages.length / deviceUsagesPerPage)
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

export default DeviceUsages;
