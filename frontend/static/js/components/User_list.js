import React from "react";
import ReactDOM from "react-dom";
import User_retrieve from "./User_retrieve";
import { Route, BrowserRouter, Link } from "react-router-dom";

class User_list extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    error: false,
    isLoading: false,
    items: [],
  };
  componentDidMount() {
    fetch("http://127.0.0.1:8000/users/users_list/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ isLoading: true, items: data });
        console.log(this);
      });
  }
  render() {
    const { isLoaded, items } = this.state;
    return (
      <div class="wrapper">
        {items.map((item) => (
          <div class="user_list">
            <div class="user">
              <Link to={`/users/${item.id}`}>{item.username}</Link>
              {item.date_joined}
              <h1>{item.id}</h1>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default User_list;
