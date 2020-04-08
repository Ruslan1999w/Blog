import React from "react";
import ReactDOM from "react-dom";

class LogOutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { permission: "19292b0fa328f8bacd9e166f535177c99be151b9" };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    let user = {
      Token: this.state.permission,
    };
    let response = fetch("http://127.0.0.1:8000/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Token " + this.state.permission,
      },
      body: JSON.stringify(user),
    });
    if (response) alert(`${this.state.login}, Chao kakao !` + response.body);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <p>
          <input type="submit" value="LogOut" />
        </p>
      </form>
    );
  }
}

export default LogOutForm;
