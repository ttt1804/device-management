import React, { useEffect, useState } from "react";
import {
  addDeviceUsage,
  getAllDevicesDoNotUse,
  getAllEmployeesDoWork,
} from "../utils/ApiFunctions";
import { Link, useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDeviceUsage = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeviceUsage = {
      employeeId,
      deviceId,
      startDate,
      endDate,
      comment,
    };
    console.log(newDeviceUsage);
    try {
      const response = await addDeviceUsage(newDeviceUsage);
      if (response) {
        toast.success("Thêm thành công");
        setTimeout(() => {
          navigate("/device-usages");
        }, 1000);
      } else {
        console.log("fail to add new device usage");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const [employees, setEmployees] = useState([]);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    getAllEmployeesDoWork()
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getAllDevicesDoNotUse()
      .then((data) => {
        setDevices(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="container">
      <ToastContainer autoClose={1000} />
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mt-5 mb-2">Thêm mới việc sử dụng thiết bị</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên nhân viên</label>

              <Autocomplete
                options={employees.map((option) => ({
                  label: option.fullName,
                  value: option.id,
                }))}
                renderInput={(params) => <TextField {...params} />}
                onChange={(event, value) => {
                  setEmployeeId(value.value);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tên thiết bị</label>

              <Autocomplete
                options={devices.map((option) => ({
                  label: option.name,
                  value: option.id,
                }))}
                renderInput={(params) => <TextField {...params} />}
                onChange={(event, value) => {
                  setDeviceId(value.value);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">
                Ngày bắt đầu sử dụng
              </label>
              <input
                required
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endDate" className="form-label">
                Ngày kết thúc sử dụng
              </label>
              <input
                required
                type="date"
                className="form-control"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">
                Chú thích
              </label>
              <textarea
                className="form-control"
                id="comment"
                name="comment"
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <div className="d-grid gap-2 d-md-flex mt-2">
              <button type="submit" className="btn btn-outline-primary ml-5">
                Lưu lại
              </button>
              <Link to={"/device-usages"} className="btn btn-outline-danger">
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddDeviceUsage;
