import React, { useEffect, useState } from "react";
import { deleteDevice, getAllDevices } from "../utils/ApiFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [devicesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalDevices, setOriginalDevices] = useState([]);

  useEffect(() => {
    getAllDevices()
      .then((data) => {
        setDevices(data);
        setOriginalDevices(data);
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
    Math.ceil(devices.length / devicesPerPage),
    startPage + maxPageNumbersDisplay - 1
  );

  if (endPage - startPage + 1 < maxPageNumbersDisplay) {
    startPage = Math.max(1, endPage - maxPageNumbersDisplay + 1);
  }

  const indexOfLastDevice = currentPage * devicesPerPage;
  const indexOfFirstDevice = indexOfLastDevice - devicesPerPage;
  const currentDevices = devices.slice(indexOfFirstDevice, indexOfLastDevice);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    try {
      await deleteDevice(id);
      setDevices(devices.filter((device) => device.id !== id));
      console.log("Device deleted successfully!");
      toast.success("Xóa thành công!");
    } catch (error) {
     
      console.log(error.message);
      toast.error(error.message + "!");
    }
  };

  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/devices/add-device");
  };


  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setDevices(originalDevices);
    } else {
      const filteredDevices = originalDevices.filter((device) =>
        device.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDevices(filteredDevices);
    }
  };

  return (
    <section className="container-fluid mt-3">
      <ToastContainer autoClose={3000} />
      <div className="d-flex justify-content-between">
        <div>
          <Button className="btn btn-success mt-1" onClick={handleAdd}>
            Thêm thiết bị
          </Button>
        </div>
        <div className="mb-2 search-function input-group-text">
          <input
            type="text"
            className="search-function-input form-control"
            placeholder="Nhập tên thiết bị"
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
            <th>Mã thiết bị</th>
            <th>Mã QR</th>
            <th>Tên thiết bị</th>
            <th>Mô tả</th>
            <th>Ngày mua</th>
            <th>Màu sắc</th>
            <th>Loại thiết bị</th>
            <th>Trạng thái</th>
            <th colSpan={2}>Chức năng</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentDevices.map((device, index) => (
            <tr key={index}>
              <td>{device.id}</td>
              <td>{device.deviceCode}</td>
              <td>
                <Link to={device.qrCode}>Xem</Link>
              </td>
              <td>{device.name}</td>
              <td>{device.description}</td>
              <td>{new Date(device.purchaseDate).toLocaleDateString()}</td>
              <td>{device.color}</td>
              <td>{device.deviceType}</td>
              <td>{device.status}</td>
              <td>
                <Link to={`/devices/edit-device/${device.id}`}>
                  <Button>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </Link>
              </td>
              <td>
                <Button
                  className="btn btn-danger"
                  onClick={() => handleDelete(device.id)}
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
                paginate(Math.ceil(devices.length / devicesPerPage))
              }
              className="page-link"
              disabled={
                currentPage === Math.ceil(devices.length / devicesPerPage)
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

export default Devices;
