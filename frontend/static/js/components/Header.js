import React from "react";
import { Route, Link } from "react-router-dom";
class Header extends React.Component {
  render() {
    return (
      <div class="header">
        <div class="container">

          <img src="/static/img/logo.png" alt="Logo"/>

            <ul>

              <li>
                <a>
                <Link to="/">Home</Link>
                </a>
                
              </li>

              <li>
              <a>
              <Link to="/about">About us</Link>
                  </a>
               
              </li>

              <li>
              <a>
              <Link to="/profile">Profile</Link>
                  </a>
               
              </li>
            </ul>

            <input type="button" value="Log in"/>


        </div>

      </div>
    );
  }
}
export default Header;
