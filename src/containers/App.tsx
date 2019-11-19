import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Employee from "./Employee/EmployeeList";
import SnackbarCard from "../components/SnackbarCard";

class App extends React.Component<{}, {}> {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/employee" component={Employee} />
          <Redirect from="/" to="/employee" />
        </Switch>
        <SnackbarCard />
      </React.Fragment>
    );
  }
}

export default App;
