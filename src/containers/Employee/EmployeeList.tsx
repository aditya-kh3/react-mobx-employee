import * as React from "react";
import { Button, Input } from "reactstrap";
import Select from "react-select";
import { observer, inject } from "mobx-react";
import { ICommonStore } from "../../stores/commonStore";
import { IEmployeeStore } from "../../stores/employeeStore";
import { c } from "../../constant";

import EmployeeTable from "./EmployeeTable";
import EmployeeAdd from "./EmployeeAdd";

interface EmployeeListProps {}

interface InjectedProps extends EmployeeListProps {
  commonStore: ICommonStore;
  employeeStore: IEmployeeStore;
}

interface IEmployeeListState {
  modalAdd: boolean;
  modalBatchAdd: boolean;
  timeout: any;
}

@inject(c.STORES.COMMON)
@inject(c.STORES.EMPLOYEE)
@observer
class EmployeeList extends React.Component<
  EmployeeListProps,
  IEmployeeListState
> {
  constructor(props) {
    super(props);
    this.state = {
      modalAdd: false,
      modalBatchAdd: false,
      timeout: 0
    };
    this.toggleAdd = this.toggleAdd.bind(this);
  }

  get injected() {
    return this.props as InjectedProps;
  }

  toggleAdd() {
    this.setState(prevState => ({
      modalAdd: !prevState.modalAdd
    }));
  }

  toggleBatchAdd() {
    this.setState(prevState => ({
      modalBatchAdd: !prevState.modalBatchAdd
    }));
  }

  componentWillMount() {
    this.injected.employeeStore.getListEmployee();
  }

  render() {
    return (
      <React.Fragment>
        <div className="pt-6 pb-6 width-full height-full">
          <div className="col-11 col-md-8 p-3 mx-auto">
            <h2 className="font-weight-bolder">Employee</h2>
            <div className="row p-2">
              <div className="col-12 row m-0 p-0 d-flex justify-content-end">
                <div className="col-2 p-2">
                  <Button
                    color="primary"
                    className="width-full"
                    onClick={() => this.toggleAdd()}
                  >
                    Add Employee
                  </Button>
                </div>
              </div>
            </div>
            <EmployeeTable isPreview={false}></EmployeeTable>
          </div>
        </div>
        <EmployeeAdd
          isOpen={this.state.modalAdd}
          toggleParent={() => this.toggleAdd()}
        ></EmployeeAdd>
      </React.Fragment>
    );
  }
}

export default EmployeeList;
