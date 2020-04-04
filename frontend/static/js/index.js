import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Articles_list from "./components/articles/Articles_list";
import Articles_retrieve from "./components/articles/Articles_retrieve";
import LoginForm from "./components/LogIn";
import LogOutForm from "./components/LogOut";
import User_list from "./components/User_list";
import "../css/main.scss";

class MyComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* <User_list permission="19292b0fa328f8bacd9e166f535177c99be151b9" />*/}
        {/*<Articles_retrieve pk="12" />*/}
        {/*<LogOutForm />*/}
        {/*<LoginForm />*/}
      </React.Fragment>
    );
  }
}
ReactDOM.render(<MyComponent />, document.getElementById("root"));
