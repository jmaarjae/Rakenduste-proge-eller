import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./Pages/HomePage.jsx";
import ItemPage from "./Pages/ItemPage.jsx";
import { BrowserRouter, Route} from "react-router-dom";
import Header from "./Components/Header.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import UserPage from "./Pages/UserPage.jsx";

const root = document.getElementById("app");

ReactDOM.render(
  <BrowserRouter>
    <Route path={"/"} component={Header} />
    <Route path="/" exact component={HomePage} />
    <Route path="/login" exact component={LoginPage} />
    <Route path="/signup" exact component={SignupPage} />
    <Route path="/users/:userId" exact component={UserPage} />
    <Route path="/items/:itemId" exact component={ItemPage} />
  </BrowserRouter>,
  root
);
