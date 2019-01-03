import React from "react";
import { Route, Redirect, } from "react-router-dom";
import { AuthConsumer, } from "../providers/AuthProvider";

//will only allow a user to use this route if they are authenticated
//...rest is spreading the rest of the key value pairs through props
const ProtectedRoute = ({ auth, component: Component, ...rest }) => (
  <AuthConsumer>
    { auth => 
      <Route 
        { ...rest }
        render={ props => (
          auth.authenticated ? 
            <Component {...props} />
          :
            <Redirect 
              to={{
                pathname: "/login",
                state: { from: props.location, },
              }}
            />
        )}
      />
    }
  </AuthConsumer>
)

export default ProtectedRoute;