import React from "react";
import { Route, Link } from "react-router-dom";
class Header extends React.Component {
  render() {
    return (
      <div class="header">
        <div class="container">

          <img src="../img/logo.png" alt="Logo"/>

            <ul>

              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/about">About us</Link>
              </li>

              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>

            <input type="button" value="Log in"/>


        </div>

      </div>
    );
  }
}
export default Header;
