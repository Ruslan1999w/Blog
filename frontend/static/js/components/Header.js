import React from "react";
import ReactDOM from "react-dom";
import "./comp_style/style.scss";
import LoginForm from "./LogIn";
import LogOutForm from "./LogOut";
class Header extends React.Component {
  render() {
    return (
      <div class="header">
        <LogOutForm />
        <LoginForm />
        <ul>
          <li>Logo</li>
          <li>Login</li>
          <li>library</li>
        </ul>
      </div>
    );
  }
}
export default Header;
