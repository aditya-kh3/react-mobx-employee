import * as React from "react";
import { observer, inject } from "mobx-react";
import { c } from "../../constant";
import { ICommonStore } from "../../stores/commonStore";
import { IEmployeeStore } from "../../stores/employeeStore";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

interface EmployeeDeleteProps {
  idDelete: string;
  nameDelete: string;
  isOpen: boolean;
  toggleParent(): void;
}

interface InjectedProps extends EmployeeDeleteProps {
  commonStore: ICommonStore;
  employeeStore: IEmployeeStore;
}

interface IEmployeeDeleteState {}

@inject(c.STORES.COMMON)
@inject(c.STORES.EMPLOYEE)
@observer
class EmployeeDelete extends React.Component<
  EmployeeDeleteProps,
  IEmployeeDeleteState
> {
  constructor(props) {
    super(props);
    this.state = {};

    this.onDelete = this.onDelete.bind(this);
  }

  get injected() {
    return this.props as InjectedProps;
  }

  onDelete() {
    this.injected.employeeStore
      .deleteEmployee(this.props.idDelete)
      .then(rsp => {
        this.injected.employeeStore.getListEmployee();
        this.props.toggleParent();
        this.injected.commonStore.toggleNotif(
          true,
          c.ALERT_TYPE.SUCCESS,
          c.LABEL_MESSAGE.DELETE_EMPLOYEE_SUCCESS
        );
      })
      .catch(({}) => {
        this.injected.commonStore.toggleNotif(
          true,
          c.ALERT_TYPE.ERROR,
          this.injected.employeeStore.errors
        );
        this.injected.employeeStore.getListEmployee();
        this.props.toggleParent();
      });
  }

  render() {
    const { nameDelete, toggleParent, isOpen } = this.props;

    return (
      <React.Fragment>
        <Modal
          className="text-center"
          isOpen={isOpen}
          toggle={() => toggleParent()}
        >
          <ModalHeader
            className="font-weight-bolder"
            toggle={() => toggleParent()}
          >
            Delete Employee
          </ModalHeader>
          <ModalBody className="d-flex justify-content-center">
            <span className="col-8 ">
              Are you sure to delete <b>{nameDelete}</b> ?
            </span>
          </ModalBody>
          <ModalFooter className="widht-full d-flex justify-content-center border-hide">
            <Button
              className="col-3"
              outline
              color="secondary"
              onClick={() => toggleParent()}
            >
              Cancel
            </Button>
            <Button
              className="col-3"
              color="danger"
              onClick={() => this.onDelete()}
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default EmployeeDelete;
