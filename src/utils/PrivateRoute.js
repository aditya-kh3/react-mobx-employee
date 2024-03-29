import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";

class PrivateRoute extends Component {
  render() {
    const { commonStore, ...props } = this.props;
    if (commonStore.token) return <Route {...props} />;
    return <Redirect to="/login" />;
  }
}

export default inject("commonStore")(observer(PrivateRoute));
