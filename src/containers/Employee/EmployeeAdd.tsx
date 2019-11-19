import * as React from "react";
import Select from "react-select";
import {
  Button,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { c } from "../../constant";
import { observer, inject } from "mobx-react";
import { ICommonStore } from "../../stores/commonStore";
import { IEmployeeStore } from "../../stores/employeeStore";

interface EmployeeAddProps {
  isOpen: boolean;
  toggleParent(): void;
}

interface InjectedProps extends EmployeeAddProps {
  commonStore: ICommonStore;
  employeeStore: IEmployeeStore;
}

interface EmployeeAddState {
  alertType: string;
  alertMessage: string;
  visible: boolean;
  groupSelected: any;
}

@inject(c.STORES.EMPLOYEE)
@inject(c.STORES.COMMON)
@observer
class EmployeeAdd extends React.Component<EmployeeAddProps, EmployeeAddState> {
  constructor(props) {
    super(props);
    this.state = {
      alertType: "",
      alertMessage: "",
      visible: false,
      groupSelected: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  get injected() {
    return this.props as InjectedProps;
  }

  componentWillReceiveProps() {
    this.setState({
      alertType: "",
      alertMessage: "",
      visible: false,
      groupSelected: null
    });
  }

  componentWillMount() {
    this.injected.employeeStore.resetEmployeeData();
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  toggle() {
    this.props.toggleParent();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.injected.employeeStore
      .createEmployee()
      .then(() => {
        this.injected.employeeStore.getListEmployee();
        this.injected.commonStore.toggleNotif(
          true,
          c.ALERT_TYPE.SUCCESS,
          c.LABEL_MESSAGE.ADD_EMPLOYEE_SUCCESS
        );
        this.props.toggleParent();
      })
      .catch(() => {
        let alertType = c.ALERT_TYPE.DANGER;
        let alertMessage = this.injected.employeeStore.errors;
        this.showAlert(alertType, alertMessage);
      });
  };

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { updateEmployeeData } = this.injected.employeeStore;
    const { name, value } = e.target;
    updateEmployeeData(name, value);
  }

  showAlert(alertType, alertMessage) {
    this.setState({
      alertType: alertType,
      alertMessage: alertMessage,
      visible: true
    });
    window.scrollTo(0, 0);
  }

  render() {
    const { isOpen } = this.props;

    return (
      <React.Fragment>
        <Modal
          isOpen={isOpen}
          toggle={this.toggle}
          style={{ maxWidth: "810px" }}
        >
          <ModalHeader className="pl-4 pr-4" toggle={this.toggle}>
            Add Employee
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
              <FormGroup className="col-12 mx-auto">
                <Alert
                  color={this.state.alertType}
                  isOpen={this.state.visible}
                  toggle={this.onDismiss}
                >
                  {this.state.alertMessage}
                </Alert>
              </FormGroup>
              <FormGroup className="col-12 mx-auto">
                <Label for="name" className="font-weight-bold">
                  Name Employee <b className="text-danger">*</b>
                </Label>
                <Input
                  type="text"
                  name="name"
                  required
                  placeholder="Input Name Employee"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup className="col-12 mx-auto">
                <Label for="email" className="font-weight-bold">
                  Age <b className="text-danger">*</b>
                </Label>
                <Input
                  type="number"
                  name="age"
                  required
                  placeholder="Input Age"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup className="col-12 mx-auto">
                <Label for="phone" className="font-weight-bold">
                  Salary
                </Label>
                <Input
                  type="number"
                  name="salary"
                  placeholder="Input Salary"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter className="col-12 mx-auto width-full pl-4 pr-4">
              <Button className="col-12" color="primary" type="submit">
                Save
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default EmployeeAdd;
