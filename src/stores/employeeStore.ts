import { observable, action } from "mobx";
import API from "../utils/API";

export interface IEmployeeStore {
  inProgress: boolean;
  errors: any;
  listEmployee: any;
  Employee: any;
  employeeData: any;
  getListEmployee(): Promise<any>;
  getDetailEmployee(employee_id: string): Promise<any>;
  createEmployee(): Promise<any>;
  resetEmployeeData(): Promise<any>;
  updateEmployee(employee_id: string): Promise<any>;
  deleteEmployee(employee_id: string): Promise<any>;
  updateEmployeeData(key: string, value: any): void;
}

export class EmployeeStore {
  @observable
  inProgress = false;

  @observable
  errors = undefined;

  @observable
  listEmployee = [];

  @observable
  Employee = [];

  @observable
  employeeData = {
    name: "",
    salary: "",
    age: ""
  };

  @action
  updateEmployeeData = (key: string, value: any) => {
    this.employeeData[key] = value;
  };

  @action
  resetEmployeeData() {
    this.employeeData = {
      name: "",
      salary: "",
      age: ""
    };
  }

  @action
  getListEmployee() {
    this.inProgress = true;
    this.listEmployee = [];
    return API.Employee.getListEmployee()
      .then(rsp => {
        this.listEmployee = rsp;
      })
      .catch(({ data }) => {
        this.errors = data;
        throw data;
      })
      .finally(() => {
        this.inProgress = false;
      });
  }

  @action
  getDetailEmployee(employee_id: string) {
    this.Employee = [];
    return API.Employee.getDetail(employee_id)
      .then(rsp => {
        this.Employee = rsp;
      })
      .catch(({ data }) => {
        this.errors = data;
        throw data;
      });
  }

  @action
  createEmployee() {
    this.inProgress = true;
    return API.Employee.createEmployee(this.employeeData)
      .then(() => {
        this.resetEmployeeData();
      })
      .catch(({ data }) => {
        this.errors = data;
        throw data;
      })
      .finally(() => {
        this.inProgress = false;
      });
  }

  @action
  updateEmployee(employee_id: string) {
    this.inProgress = true;
    return API.Employee.updateEmployee(employee_id, this.employeeData)
      .then(() => {
        this.resetEmployeeData();
      })
      .catch(({ data }) => {
        this.errors = data;
        throw data;
      })
      .finally(() => {
        this.inProgress = false;
      });
  }

  @action
  deleteEmployee(employee_id: string) {
    this.inProgress = true;
    return API.Employee.deleteEmployee(employee_id)
      .catch(({ data }) => {
        this.errors = data;
        throw data;
      })
      .finally(() => {
        this.inProgress = false;
      });
  }
}

export default new EmployeeStore();
