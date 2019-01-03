import React from "react";
import { Menu } from "semantic-ui-react";
import { AuthConsumer, } from "../providers/AuthProvider";
import { Link, withRouter } from "react-router-dom";

class Navbar extends React.Component {

  rightNavItems = () => { 
    const { auth: {user, handleLogout,}, location } = this.props;

    if (user) { 
      return (
        <Menu.Menu position="right">
          <Menu.Item 
          name="Logout"
          onclick={() => handleLogout(this.props.history)}
          />
        </Menu.Menu>
      )
    } else {
        return (

          //if they are logged in show one thing, if not, show another
          <Menu.Menu position="right">
          <Link to="/login">
            <Menu.Item 
              name="Login"
              id="login"
              active={location.pathname === "/login"}
            />
            </Link>
            <Link to="/register">
            <Menu.Item 
              name="Register"
              id="register"
              active={location.pathname === "/register"}
            />
          </Link>
          </Menu.Menu>
        )
    }
  }

  render() {
    return (
      <div>
        <Menu pointing secondary>
          <Link to="/">
          <Menu.Item
            name="Home"
            id="home"
            active={this.props.location.pathname === "/"}
          />
          </Link>

          { this.rightNavItems() }
        </Menu>
      </div>
    )
  }
}
// this sole purpose is to return the navbar but we are getting the auth object and passing
// it as a prop so we have access to handleLogout etc
 class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer>
        { auth => 
          <Navbar {...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

//need to use withRouter, because Navbar isn't rendered with react router dom so the props
//aren't passed. This gives us access to those props
export default withRouter (ConnectedNavbar); 