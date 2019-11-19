import * as React from "react";
import { observer, inject } from "mobx-react";
import { c } from "../../constant";
import { ICommonStore } from "../../stores/commonStore";
import { IEmployeeStore } from "../../stores/employeeStore";
import {
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label
} from "reactstrap";

import iconMore from "../../images/icons/icon-ellipsis-h.svg";
import EmployeeDetail from "./EmployeeDetail";
import ReactPaginate from "react-paginate";
import EmployeeDelete from "./EmployeeDelete";

interface EmployeeTableProps {
  isPreview: boolean;
}

interface InjectedProps extends EmployeeTableProps {
  commonStore: ICommonStore;
  employeeStore: IEmployeeStore;
}

interface IEmployeeTableState {
  pageSelected: number;
  limit: number;
  modalSendPassAll: boolean;
  modalDetail: boolean;
  modalDelete: boolean;
  modalDeleteMulti: boolean;
  modalOpenMore: boolean;
  modalMore: any;
  modalResetPass: boolean;
  selectMode: boolean;
  selectList: any[];
  nameDelete: string;
  idDelete: string;
  emailEmployee: string;
  employeeDetail: any;
  typePassword: any;
}

@inject(c.STORES.COMMON)
@inject(c.STORES.EMPLOYEE)
@observer
class EmployeeTable extends React.Component<
  EmployeeTableProps,
  IEmployeeTableState
> {
  constructor(props) {
    super(props);
    this.state = {
      pageSelected: 0,
      limit: 10,
      modalSendPassAll: false,
      modalDetail: false,
      modalDelete: false,
      modalDeleteMulti: false,
      modalOpenMore: false,
      modalMore: undefined,
      modalResetPass: false,
      selectMode: false,
      selectList: [],
      nameDelete: "",
      idDelete: "",
      emailEmployee: "",
      employeeDetail: [],
      typePassword: undefined
    };

    this.handlePageClick = this.handlePageClick.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.toggleMore = this.toggleMore.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  get injected() {
    return this.props as InjectedProps;
  }

  handlePageClick = data => {
    let selected = data.selected;
    let skip = Math.ceil(selected * this.state.limit);
    this.setState({
      pageSelected: selected
    });
  };

  toggleDetail(data?) {
    this.setState(prevState => ({
      modalDetail: !prevState.modalDetail,
      employeeDetail: data ? data : []
    }));
  }

  toggleDelete(data?) {
    this.setState(prevState => ({
      modalDelete: !prevState.modalDelete,
      nameDelete: data ? data.employee_name : "",
      idDelete: data ? data.id : ""
    }));
  }

  onDelete() {
    this.injected.employeeStore
      .deleteEmployee(this.state.idDelete)
      .then(rsp => {
        this.injected.employeeStore.getListEmployee();
        this.injected.commonStore.toggleNotif(
          true,
          c.ALERT_TYPE.SUCCESS,
          c.LABEL_MESSAGE.DELETE_EMPLOYEE_SUCCESS
        );
        this.setState(prevState => ({
          modalDelete: !prevState.modalDelete
        }));
      })
      .catch(({}) => {
        this.injected.commonStore.toggleNotif(
          true,
          c.ALERT_TYPE.ERROR,
          this.injected.employeeStore.errors
        );
        this.injected.employeeStore.getListEmployee();
        this.setState(prevState => ({
          modalDelete: !prevState.modalDelete
        }));
      });
  }

  toggleMore(index) {
    this.setState(state => {
      const modalOpenMore =
        state.modalMore === index && state.modalOpenMore ? false : true;
      const modalMore = state.modalMore !== index ? index : undefined;
      return {
        modalOpenMore,
        modalMore
      };
    });
  }

  render() {
    const { isPreview } = this.props;
    const { inProgress, listEmployee } = this.injected.employeeStore;
    const countEmployee = listEmployee.length;
    const pageCount =
      countEmployee > 0 ? Math.ceil(countEmployee / this.state.limit) : 0;

    const start = this.state.limit * this.state.pageSelected;
    const end = this.state.limit * (this.state.pageSelected + 1);

    return (
      <React.Fragment>
        {inProgress ? (
          <div
            className="d-flex justify-content-center pt-5"
            style={{ minHeight: "10rem" }}
          >
            <div className="spinner-border text-primary" role="status" />
            <span className="pl-3 pt-1"> Loading...</span>
          </div>
        ) : listEmployee.length === 0 ? (
          <div className="p-3 text-center">
            <h3 className="pt-3 pb-5">Tidak ada data employee</h3>
          </div>
        ) : (
          <React.Fragment>
            <div className="row p-2">
              <div className="col-5">
                <Label className="text-muted font-14">
                  Showing {start + 1} to{" "}
                  {end > countEmployee ? countEmployee : end} of {countEmployee}{" "}
                  entries.
                </Label>
              </div>
            </div>
            {listEmployee.map((item, index) => {
              if (index >= start && index < end) {
                return (
                  <div className="col p-0 mb-4" key={item.id}>
                    <div className="bg-white card-border-radius m-0 pl-3 pr-3">
                      <div className="row border-bottom pt-2 pb-2 ">
                        <div className="col-12 col-md-6 row my-auto m-0 pt-1 pb-1">
                          <Label className="col-12 col-md-auto font-weight-bolder p-0 m-0 mr-2 align-text-top">
                            {item.employee_name}
                          </Label>
                          <Label className="col-auto font-weight-bolder text-secondary p-0 m-0 mr-2 align-bottom font-14">
                            {"(Age "} {item.employee_age}
                            {")"}
                          </Label>
                        </div>
                        <div className="col-12 col-md-6 text-right d-flex justify-content-between justify-content-md-end">
                          <Button
                            className="m-0 mr-2"
                            onClick={() => this.toggleDetail(item)}
                          >
                            View Detail
                          </Button>
                          <ButtonDropdown
                            isOpen={this.state.modalMore === index}
                            toggle={() => this.toggleMore(index)}
                          >
                            <DropdownToggle color="link">
                              <img
                                className="cursor-pointer"
                                src={iconMore}
                                style={{ width: "16px" }}
                              />
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                className="text-danger"
                                onClick={() => this.toggleDelete(item)}
                              >
                                Delete Employee
                              </DropdownItem>
                            </DropdownMenu>
                          </ButtonDropdown>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </React.Fragment>
        )}
        <div className="p-3">
          <nav
            className="d-flex justify-content-center"
            aria-label="pagination"
          >
            <ReactPaginate
              previousLabel={<span>&laquo;</span>}
              nextLabel={<span>&raquo;</span>}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={this.handlePageClick}
              previousClassName={"page-item"}
              nextClassName={"page-item"}
              breakClassName={"break-me"}
              breakLinkClassName={"page-link cursor-pointer"}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link cursor-pointer"}
              previousLinkClassName={"page-link cursor-pointer"}
              nextLinkClassName={"page-link cursor-pointer"}
              activeClassName={"active"}
              disabledClassName={"disabled cursor-disabled"}
            />
          </nav>
        </div>

        <EmployeeDelete
          idDelete={this.state.idDelete}
          nameDelete={this.state.nameDelete}
          isOpen={this.state.modalDelete}
          toggleParent={() => this.toggleDelete()}
        ></EmployeeDelete>
        <EmployeeDetail
          data={this.state.employeeDetail}
          isOpen={this.state.modalDetail}
          toggleParent={() => this.toggleDetail()}
        ></EmployeeDetail>
      </React.Fragment>
    );
  }
}

export default EmployeeTable;
