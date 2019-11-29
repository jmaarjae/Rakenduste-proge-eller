import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import ItemPage from "./Pages/ItemPage.jsx";
import Header from "./Components/Header.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import UserPage from "./Pages/UserPage.jsx";
import NotFound from "./Pages/NotFound.jsx";

const authDefaultValue = {
  token: null,
  user: {
    email: null,
    _id: null,
    createdAt: null
  }
};
export const AuthContext = React.createContext(authDefaultValue);

class App extends React.Component {
  state = authDefaultValue;

  handleLogin = ({ token, user }) => {
    this.setState({
      user,
      token
    });
  };

  //history {..props}
  render() {
    return (
      //andmete edastus
      <AuthContext.Provider value={this.state}>
         <BrowserRouter>
          <Route
            path={"/"} component={Header} />
          <Switch>
            <Route
              path={"/"}
              render={props => (
                <Header
                  {...props}
                  token={this.state.token}
                  user={this.state.user}
                />
              )}
            />
            <Route path="/" exact component={HomePage} />
            <Route
              path="/login"
              exact
              render={props => (
                <LoginPage {...props} onLogin={this.handleLogin} />
              )}
            />
            <Route path="/signup" exact component={SignupPage} />
            <Route
              path="/users/:userId"
              exact
              render={props => {
                return <UserPage {...props} user={this.state.user} />;
              }}
            />
            <Route path="/items/:itemId" exact component={ItemPage} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}

const root = document.getElementById("app");

ReactDOM.render(<App />, root);
