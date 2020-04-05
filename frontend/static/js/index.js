import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Articles_list from "./components/articles/Articles_list";
import Articles_retrieve from "./components/articles/Articles_retrieve";
import User_list from "./components/User_list";
import "../css/main.scss";

class MyComponent extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route
          path="/article/:number"
          render={() => <Articles_retrieve pk={item.id_post} />}
        ></Route>
        <Route path="/article" component={Articles_list}></Route>
          <Redirect from="/" to="/article"></Redirect>
      </BrowserRouter>
    );
  }
}
ReactDOM.render(<MyComponent />, document.getElementById("root"));
