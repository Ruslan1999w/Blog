import React from "react";
import ReactDOM from "react-dom";
import "./comp_style/loginform.scss";
class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: "", password: "", first_name: "", last_name: "", email: "", date_joined: "", };

    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit(event) {
    var username = document.getElementById("login-input").value;
    var password = document.getElementById("pass-input").value;
    var first_name = document.getElementById("name-input").value;
    var last_name = document.getElementById("last-input").value;
    var email = document.getElementById("email-input").value;
    var date_joined = new Date();


    let user = {
      username: username,
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      date_joined: date_joined ,
      
    };
    alert(user)
    let response = fetch("http://127.0.0.1:8000/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    });
    if (response) alert(`${this.state.login}, добро пожаловать! ` + response);
    event.preventDefault();
  }


  render() {
    return (
      
      <div class="login-container">
        <form onSubmit={this.onSubmit}>

        <div className="form-group">
          <h2>Registration</h2>
          </div>  


          <div className="form-group">
          <label for="login-input">Login</label>
            <input id="login-input"
                type="text"
            />
          </div>

          <div className="form-group">
          <label for="email-input">Email</label>
            <input id="email-input"
                type="email"
            />
          </div>

          <div className="form-group">
          <label for="pass-input">Password</label>
            <input id="pass-input"
                type="password"
            />
          </div>  


          <div className="form-group">
          <label for="name-input">First Name</label>
            <input id="name-input"
            />
          </div>  

          <div className="form-group">
          <label for="last-input">Last Name</label>
            <input id="last-input"
            />
          </div>  

          <div className="form-group">
            <input type="submit" value="Register" />
          </div>
           

        </form>
      </div>
    );
  }
}

export default RegisterForm;
