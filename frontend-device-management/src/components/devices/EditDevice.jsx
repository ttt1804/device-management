import React, { useState, useEffect } from "react";
import { getDeviceById, updateDevice } from "../utils/ApiFunctions";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from 'moment'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditDevice = () => {
  const { id } = useParams();
  const [device, setDevice] = useState({
    qrCode: "",
    deviceCode: "",
    name: "",
    description: "",
    purchaseDate: "",
    color: "",
    deviceType: "",
    status: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const fetchedDevice = await getDeviceById(id);
        fetchedDevice.purchaseDate = moment(fetchedDevice.purchaseDate).format('YYYY-MM-DD');
        setDevice(fetchedDevice);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDevice();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDevice({
      ...device,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDevice(id, device);
      toast.success("Sửa thành công");
      setTimeout(() => {
          navigate("/devices");
        }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container">
      <ToastContainer autoClose={1000} />
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mt-5 mb-2">Sửa thông tin thiết bị</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="deviceCode" className="form-label">
                Mã thiết bị
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="deviceCode"
                name="deviceCode"
                value={device.deviceCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="qrCode" className="form-label">
                Mã QR
              </label>
              <div className="text-center">
                <img src={device.qrCode} alt="QR Code" width="150" height="150" />
              </div>
            </div>
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
                value={device.name}
                onChange={handleInputChange}
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
                value={device.description}
                onChange={handleInputChange}
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
                value={device.purchaseDate}
                onChange={handleInputChange}
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
                value={device.color}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="deviceType" className="form-label">
                Loại thiết bị
              </label>
              <select
                className="form-select"
                id="deviceType"
                name="deviceType"
                onChange={handleInputChange}
                value={device.deviceType}
              >
                <option value={device.deviceType} seleted>
                  {device.deviceType}
                </option>
                <option value="Màn hình">Màn hình</option>
                <option value="Chuột">Chuột</option>
                <option value="PC">PC</option>
                <option value="Laptop">Laptop</option>
                <option value="Điện thoại">Điện thoại</option>
              </select>
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
                value={device.status}
              >
                <option selected></option>
                <option value="Rảnh">Rảnh</option>
                <option value="Đang sử dụng">Đang sử dụng</option>
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

export default EditDevice;
