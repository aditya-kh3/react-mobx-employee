import * as React from "react";
import { observer, inject } from "mobx-react";
import {
  Button,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { IEmployeeStore } from "../../stores/employeeStore";
import { c } from "../../constant";
import EmployeeDelete from "./EmployeeDelete";

interface EmployeeDetailProps {
  data: any;
  isOpen: boolean;
  toggleParent(): void;
}

interface InjectedProps extends EmployeeDetailProps {
  employeeStore: IEmployeeStore;
}

interface EmployeeDetailState {
  modalDelete: boolean;
}

@inject(c.STORES.EMPLOYEE)
@observer
class EmployeeDetail extends React.Component<
  EmployeeDetailProps,
  EmployeeDetailState
> {
  constructor(props) {
    super(props);
    this.state = {
      modalDelete: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
  }

  get injected() {
    return this.props as InjectedProps;
  }

  toggle() {
    this.props.toggleParent();
  }

  toggleDelete() {
    if (this.state.modalDelete) {
      this.props.toggleParent();
    }
    this.setState(prevState => ({
      modalDelete: !prevState.modalDelete
    }));
  }

  render() {
    const { data, isOpen } = this.props;

    return (
      <React.Fragment>
        <Modal
          isOpen={isOpen}
          toggle={this.toggle}
          style={{ maxWidth: "810px" }}
        >
          <ModalHeader
            className="font-weight-bolder pr-5 pl-5 pt-3 pb-3"
            toggle={this.toggle}
          >
            <span className="font-weight-bolder pr-2 mb-1 align-text-top font-22">
              Detail Employee
            </span>
          </ModalHeader>
          <ModalBody className="pr-5 pl-5 pt-4 pb-0">
            <FormGroup className="pb-3">
              <Label className="font-weight-bolder">Name</Label>
              <br />
              <Label className="text-secondary">
                {data.employee_name || "-"}
              </Label>
            </FormGroup>
            <FormGroup className="pb-3">
              <Label className="font-weight-bolder">Age</Label>
              <br />
              <Label className="text-secondary">
                {data.employee_age || "-"}
              </Label>
            </FormGroup>
            <FormGroup className="pb-3">
              <Label className="font-weight-bolder">Salary</Label>
              <br />
              <Label className="text-secondary">
                {data.employee_salary || "-"}
              </Label>
            </FormGroup>
          </ModalBody>
          <ModalFooter className="widht-full d-flex justify-content-center border-hide pb-4 pt-1">
            <Button
              className="col-12 text-danger font-weight-bolder"
              color="link"
              onClick={() => this.toggleDelete()}
            >
              Delete Employee
            </Button>
          </ModalFooter>
        </Modal>
        <EmployeeDelete
          idDelete={data.id}
          nameDelete={data.employee_name}
          isOpen={this.state.modalDelete}
          toggleParent={() => this.toggleDelete()}
        ></EmployeeDelete>
      </React.Fragment>
    );
  }
}

export default EmployeeDetail;
