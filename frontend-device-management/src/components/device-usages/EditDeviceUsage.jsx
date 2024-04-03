import React, { useState, useEffect } from "react";
import {
  getAllDevicesDoNotUse,
  getAllEmployeesDoWork,
  getDeviceUsageById,
  updateDeviceUsage,
} from "../utils/ApiFunctions";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditDeviceUsage = () => {
  const { id } = useParams();
  const [deviceUsage, setDeviceUsage] = useState({
    employeeId: "",
    deviceId: "",
    startDate: "",
    endDate: "",
    comment: "",
  });

  const [isDeviceUsageSet, setIsDeviceUsageSet] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeviceUsage = async () => {
      try {
        const fetchedDeviceUsage = await getDeviceUsageById(id);
        setDeviceUsage({
          employeeId: fetchedDeviceUsage.employee.id,
          employeeFullName: fetchedDeviceUsage.employee.fullName,
          deviceId: fetchedDeviceUsage.device.id,
          deviceName: fetchedDeviceUsage.device.name,
          startDate: moment(fetchedDeviceUsage.startDate).format("YYYY-MM-DD"),
          endDate: moment(fetchedDeviceUsage.endDate).format("YYYY-MM-DD"),
          comment: fetchedDeviceUsage.comment,
        });

        setIsDeviceUsageSet(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeviceUsage();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeviceUsage({
      ...deviceUsage,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDeviceUsage(id, deviceUsage);
      toast.success("Sửa thành công");
      setTimeout(() => {
        navigate("/device-usages");
        }, 1000);
    } catch (error) {
      console.log(error);
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
          <h2 className="mt-5 mb-2">Chỉnh sửa thông tin sử dụng thiết bị</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              {isDeviceUsageSet && (
                <Autocomplete
                  options={employees.map((option) => ({
                    label: option.fullName,
                    value: option.id,
                  }))}
                  defaultValue={{
                    label: deviceUsage.employeeFullName,
                    value: deviceUsage.employeeId,
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(event, value) => {
                    setDeviceUsage({
                      ...deviceUsage,
                      employeeId: value ? value.value : "",
                    });
                  }}
                />
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Tên thiết bị</label>
              {isDeviceUsageSet && (
                <Autocomplete
                  options={devices.map((option) => ({
                    label: option.name,
                    value: option.id,
                  }))}
                  defaultValue={{
                    label: deviceUsage.deviceName,
                    value: deviceUsage.deviceId,
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(event, value) => {
                    setDeviceUsage({
                      ...deviceUsage,
                      deviceId: value ? value.value : "",
                    });
                  }}
                />
              )}
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
                value={deviceUsage.startDate}
                onChange={handleInputChange}
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
                value={deviceUsage.endDate}
                onChange={handleInputChange}
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
                value={deviceUsage.comment}
                onChange={handleInputChange}
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

export default EditDeviceUsage;
