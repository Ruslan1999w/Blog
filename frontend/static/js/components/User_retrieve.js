import React from "react";
import ReactDOM from "react-dom";

class User_retrieve extends React.Component {
  state = {
    error: false,
    isLoading: false,
    items: [],
  };
  componentDidMount() {
    const id = Number(this.props.match.params.number);
    fetch("http://127.0.0.1:8000/users/" + id, {
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
            <li>Последний раз заходил:{items.last_login}</li>
            <li>Чувак с нами с:{items.date_joined}</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default User_retrieve;
