import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Articles_list from "./components/articles/Articles_list";
import Articles_retrieve from "./components/articles/Articles_retrieve";
import User_list from "./components/User_list";
import "../css/main.scss";
import Profile from "./components/Profile";

const history = createBrowserHistory();

class MyComponent extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Profile />
        </React.Fragment>
      </BrowserRouter>

      //      <BrowserRouter>

      //        <Route
      //          path="/article/:number"
      //          render={() => <Articles_retrieve pk={item.id_post} history={history} />}
      //        ></Route>
      //        <Route path="/article" component={Articles_list} history={history}></Route>
      //          <Redirect from="/" to="/article"></Redirect>
      //
      //      </BrowserRouter>
    );
  }
}
ReactDOM.render(<MyComponent />, document.getElementById("root"));
