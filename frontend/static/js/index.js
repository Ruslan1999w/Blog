import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import "../css/main.scss";

class MyComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Content />
      </React.Fragment>
    );
  }
}
ReactDOM.render(<MyComponent />, document.getElementById("root"));
