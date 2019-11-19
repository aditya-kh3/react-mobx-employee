import React from "react";
import ReactDOM from "react-dom";
import "./scss/index.scss";
import App from "./containers/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

import MomentUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/id";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import commonStore from "./stores/commonStore";
import employeeStore from "./stores/employeeStore";

moment.locale("id");

const stores = {
  commonStore,
  employeeStore
};

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale="id"
          libInstance={moment}
        >
          <App />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
