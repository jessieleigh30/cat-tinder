import React from "react";
import axios from "axios";


//think of this file as our reducer in redux, this is for auth, it stores the users data
//creating a context, create provider, create consumer

//creating a context for us and storing it in the variable AuthContext
const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;


export class AuthProvider extends React.Component {
  state = { user: null };
  //there is no user yet, so we give it null

  //need 3 functions register, login, logout

  //this will be a form, user, email, password
  //this makes our axios call to actually create user and create a session for user
  handleRegister = (user, history) => {
    axios.post("/api/auth", user)
    //post requests usually take in two things, here it is the user(object) we created
    .then( res => {
      this.setState({ user: res.data.data, });
      history.push("/");
      //we get history from react-router
    })
    .catch ( res => {
      console.log(res);
    })
  }
  //login / logout are handling the tokens

  handleLogin = ( user, history) => {
    axios.post("/api/auth/sign_in", user)
    .then( res => {
      //res.data.data twice is the way it should be, data with user data in it
      this.setState({ user: res.data.data, });
      history.push("/");
    })
    .catch( res => {
      console.log(res);
    })
  }
  handleLogout = (history) => {
    axios.delete("/api/auth/sign_out")
    .then( res => {
      this.setState({ user: null, });
      history.push("/");
    })
  }


  render() {
    return (
      //provider is taking a prop (value)
      //this whole auth provider wraps our whole application
      //any component we create will be a child to our provider
      //these props will be accesible to any child
      //passing the user into the value
      //this eliminates prop drilling
      <AuthContext.Provider value={{
        //this is an object
        ...this.state,
        //is the user authenticated? return true if yes, false if not
        authenticated: this.state.user !== null,
        handleRegister: this.handleRegister,
        //any child of this component will have access to these functions
        handleLogin: this.handleLogin,
        handleLogout: this.handleLogout,
        setUser: (user) => this.setState({ user, })
       }}>
        { this.props.children }
      </AuthContext.Provider>
    )
  }
}