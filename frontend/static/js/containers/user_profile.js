import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { AUTH_USER, boundAUTH_USER } from "../actions/actionTypes";
import { connect } from "react-redux";

class UserProfile extends Component {
  showUser() {
    return this.props.user.map((user) => {
      return (
        <ul>
          <li>{user.login}</li>
          <li>{user.email}</li>
        </ul>
      );
    });
  }

  getToken() {
    return this.props.user[0].token;
  }

  render() {
    return this.getToken();
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(UserProfile);
