import React from 'react';
import axios from 'axios';
import { AuthConsumer, } from "../providers/AuthProvider";

//once we wrap the app in this, it won't render components unless the user has been fetched
//need state and lifecyle methods so it should be class
class FetchUser extends React.Component {
  state = { loaded: false, }

  componentDidMount() {
    const { auth: { authenticated, setUser, }, } = this.props;
    if (authenticated) {
      this.loaded();
    } else {
      if (this.checkLocalToken()) {
        axios.get("/api/auth/validate_token")
          .then( res => {
            setUser(res.data.data);
            this.loaded();
          })
          .catch( res => {
            console.log(res);
            this.loaded();
          })
      } else {
        this.loaded();
      }
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (!this.state.loaded) this.loaded();
  // }

  loaded = () => this.setState({ loaded: true, });

  //check to see if token is in local storage
  checkLocalToken = () => {
    const token = localStorage.getItem("access-token");
    return token;
  }


  render() {
    //if loaded is true, render routes, if not don't render routes
    return this.state.loaded ? this.props.children : null;
  }
}

const ConnectedFetchUser = (props) => (
  <AuthConsumer>
    {auth =>
      <FetchUser {...props} auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedFetchUser;