import React, { useState } from "react";
import { addDevice } from "../utils/ApiFunctions";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDevice = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [color, setColor] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDevice = {
      name,
      description,
      purchaseDate,
      color,
      deviceType,
      status: "Rảnh",
    };
    console.log(newDevice);
    try {
      const response = await addDevice(newDevice);
      if (response) {
        toast.success("Thêm thành công!");
        setTimeout(() => {
          navigate("/devices");
        }, 1000);
      } else {
        console.log("fail to add new device");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showInput, setShowInput] = useState(false);
  const [newDeviceType, setNewDeviceType] = useState("");
  const [options, setOptions] = useState([
    "Màn hình",
    "Chuột",
    "PC",
    "Bàn phím",
    "Laptop",
    "Điện thoại",
  ]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Thêm") {
      setShowInput(true);
    } else {
      setShowInput(false);
      setDeviceType(selectedValue);
    }
  };

  const handleInputChange = (e) => {
    setNewDeviceType(e.target.value);
  };

  const handleAddNewDeviceType = () => {
    if (newDeviceType.trim() !== "") {
      setOptions((prevOptions) => [...prevOptions, newDeviceType]);
      setDeviceType(newDeviceType);
      setShowInput(false);
    }
  };

  return (
    <section className="container">
      <ToastContainer autoClose={1000} />
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mt-5 mb-2">Thêm thiết bị mới</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Tên thiết bị
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Mô tả
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="purchaseDate" className="form-label">
                Ngày đặt
              </label>
              <input
                required
                type="date"
                className="form-control"
                id="purchaseDate"
                name="purchaseDate"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="color" className="form-label">
                Màu sắc
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="color"
                name="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="deviceType" className="form-label">
                Loại thiết bị
              </label>
              <select
                required
                className="form-select"
                id="deviceType"
                name="deviceType"
                value={deviceType}
                onChange={handleSelectChange}
              >
                <option value="">-- Chọn loại thiết bị --</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
                <option value="Thêm">Thêm loại thiết bị</option>
              </select>

              {showInput && (
                <div>
                  <input
                    type="text"
                    value={newDeviceType}
                    onChange={handleInputChange}
                    placeholder="Nhập loại thiết bị mới"
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleAddNewDeviceType}
                  >
                    OK
                  </button>
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Trạng thái
              </label>
              <select
                required
                className="form-select"
                id="status"
                name="status"
                value={status}
                defaultValue={"Rảnh"}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Rảnh" selected>
                  Rảnh
                </option>
                <option value="Đang dùng">Đang dùng</option>
                <option value="Bảo hành">Bảo hành</option>
                <option value="Hỏng">Hỏng</option>
              </select>
            </div>

            <div className="d-grid gap-2 d-md-flex mt-2">
              <button type="submit" className="btn btn-outline-primary ml-5">
                Lưu lại
              </button>
              <Link to={"/devices"} className="btn btn-outline-danger">
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddDevice;
