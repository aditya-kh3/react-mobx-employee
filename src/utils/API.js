import request from "./request";

const useAuth = true;

const Employee = {
  getDetail: id =>
    request(
      {
        url: "/api/v1/employees/" + id,
        method: "GET"
      },
      useAuth
    ),
  getListEmployee: param =>
    request(
      {
        url: "/api/v1/employees" + (param || ""),
        method: "GET"
      },
      useAuth
    ),
  createEmployee: data =>
    request(
      {
        url: "/api/v1/create",
        method: "POST",
        data
      },
      useAuth
    ),
  updateEmployee: (id, data) =>
    request(
      {
        url: "/api/v1/update/" + id,
        method: "PUT",
        data
      },
      useAuth
    ),
  deleteEmployee: id =>
    request(
      {
        url: "/api/v1/delete/" + id,
        method: "DELETE"
      },
      useAuth
    )
};

export default {
  Employee
};
