import * as React from "react";
import { c } from "../constant";
import { observer, inject } from "mobx-react";
import { ICommonStore } from "../stores/commonStore";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
interface NavProps {}

interface InjectedProps extends NavProps {
  commonStore: ICommonStore;
}

interface ISnackbarCardState {}

@inject(c.STORES.COMMON)
@observer
class SnackbarCard extends React.Component<NavProps, ISnackbarCardState> {
  constructor(props) {
    super(props);
  }

  get injected() {
    return this.props as InjectedProps;
  }

  render() {
    const {
      isAlert,
      isTypeAlert,
      messageAlert,
      toggleNotif
    } = this.injected.commonStore;
    const variantIcon = {
      success: CheckCircleIcon,
      warning: WarningIcon,
      error: ErrorIcon,
      info: InfoIcon
    };
    const bg_color = {
      success: "bg-success",
      warning: "bg-warning",
      error: "bg-danger",
      info: "bg-info"
    };
    const Icon = variantIcon[isTypeAlert];

    return (
      <React.Fragment>
        <Snackbar
          className="mt-5"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={isAlert}
          autoHideDuration={6000}
          onClose={() => toggleNotif(false)}
        >
          <SnackbarContent
            className={bg_color[isTypeAlert]}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar">
                {isAlert && <Icon className="mr-2" />}
                {messageAlert}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                onClick={() => toggleNotif(false)}
              >
                <CloseIcon className="font-18" />
              </IconButton>
            ]}
          />
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default SnackbarCard;
