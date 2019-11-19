import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";

class UnprivateRoute extends Component {
  render() {
    const { commonStore, ...props } = this.props;
    if (!commonStore.token) return <Route {...props} />;
    return <Redirect to="/" />;
  }
}

export default inject("commonStore")(observer(UnprivateRoute));
