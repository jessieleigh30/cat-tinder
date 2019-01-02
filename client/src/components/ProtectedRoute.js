import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from "../providers/AuthProvider";

//...rest just grabs the rest of the component
//this is checking to see if we are authenticated, then render component 
const ProtectedRoute = ({auth, component: Component, ...rest }) => {
  <Route
    {...rest}
    render={ props => (
      auth.authenticated ?
      <Component {...props} />
      :
      //if not authenticate push to login page
      <Redirect 
        to={{
          pathname: "/login",
          state: { from: props.location, }

      }}
      />
    )}
  />
}

const ConnectedProtectedRoute = ( props ) => (
  <AuthConsumer>
    { auth =>
    <ProtectedRoute {...props} auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedProtectedRoute;