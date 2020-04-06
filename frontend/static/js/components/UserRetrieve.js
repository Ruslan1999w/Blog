import React from "react";
import ReactDOM from "react-dom";
import "./comp_style/style.scss";



class User_retrieve extends React.Component {
  state = {
    error: false,
    isLoading: false,
    items: [],
  };
  componentDidMount() {
    fetch("http://127.0.0.1:8000/users/" + this.props.pk, {
      method: "GET",
    })
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
        <div class="user">

            <h1>{items.username}</h1>
              <ul>
              <li>{items.last_login}</li>
              <li>{items.date_joined}</li>
              </ul>


        </div>
      </div>
    );
  }
}
export default User_retrieve;