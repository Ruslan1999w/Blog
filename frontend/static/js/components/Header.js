import React from "react";
import { Route, Link } from "react-router-dom";
import "./comp_style/style.scss";
import LoginForm from "./LogIn";
import LogOutForm from "./LogOut";
import Articles_list from "./articles/Articles_list";
class Header extends React.Component {
  render() {
    return (
      <div class="header">
        <LogOutForm />
        <LoginForm />
        <Link to="/article">Home</Link>
      </div>
    );
  }
}
export default Header;
