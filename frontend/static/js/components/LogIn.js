import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../actions/UserActions';
import './comp_style/loginform.scss';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: '', password: '' };

    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    let user = {
      username: this.state.login,
      password: this.state.password,
    };
    let response = fetch('http://127.0.0.1:8000/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
        } else alert('try again ', response.status);
        return response.json();
      })
      .then((data) => {
        setUser(data.token);
      });

    event.preventDefault();
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onChangeLogin(event) {
    this.setState({ login: event.target.value });
  }

  render() {
    return (
      <div class="login-container">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <h2>Authorization</h2>
          </div>

          <div className="form-group">
            <label for="login-input">Login</label>
            <input
              id="login-input"
              type="text"
              name="login"
              value={this.state.login}
              onChange={this.onChangeLogin}
            />
          </div>

          <div className="form-group">
            <label for="pass-input">Password</label>
            <input
              id="pass-input"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Submit" />
            <a>
              <Link to="/registration">New user?</Link>
            </a>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
    test: store.test,
  };
};

export default connect(mapStateToProps)(LoginForm);
