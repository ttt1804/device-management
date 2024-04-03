import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getHeader = () => {
  const token = localStorage.getItem("access_token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export async function loginUser(account) {
  try {
    const formData = new FormData();
    for (const key in account) {
      formData.append(key, account[key]);
    }
    const response = await api.post("api/login", formData);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
// Employee
export async function getAllEmployees() {
  try {
    const response = await api.get("api/employees", {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllEmployeesDoWork() {
  try {
    const response = await api.get("api/employees/do-work", {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function addEmployee(newEmployee) {
  try {
    const response = await api.post("api/employees", newEmployee, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteEmployee(id) {
  try {
    const response = await api.delete(`/api/employees/${id}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getEmployeeById(id) {
  try {
    const response = await api.get(`/api/employees/${id}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Employee no exit in database");
  }
}

export async function updateEmployee(id, employee) {
  try {
    const response = await api.put(`/api/employees/${id}`, employee, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

// Device
export async function getAllDevices() {
  try {
    const response = await api.get("api/devices", {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllDevicesDoNotUse() {
  try {
    const response = await api.get("api/devices/do-not-use", {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function addDevice(newDevice) {
  try {
    const response = await api.post("api/devices", newDevice, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getDeviceById(id) {
  try {
    const response = await api.get(`/api/devices/${id}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Device not found in database");
  }
}

export async function updateDevice(id, device) {
  try {
    const response = await api.put(`/api/devices/${id}`, device, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteDevice(id) {
  try {
    const response = await api.delete(`/api/devices/${id}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

// Device Usage
export async function getAllDeviceUsages() {
  try {
    const response = await api.get("api/device-usages", {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteDeviceUsage(id) {
  try {
    const response = await api.delete(`/api/device-usages/${id}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function addDeviceUsage(deviceUsage) {
  try {
    const response = await api.post("api/device-usages", deviceUsage, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function updateDeviceUsage(id, deviceUsage) {
  try {
    const response = await api.put(`/api/device-usages/${id}`, deviceUsage, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getDeviceUsageById(id) {
  try {
    const response = await api.get(`/api/device-usages/${id}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Device not found in database");
  }
}
