import React from "react";
import ReactDOM from "react-dom";
import "./comp_style/style.scss";

class Articles_list extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    error: false,
    isLoading: false,
    items: []
  };
  componentDidMount() {
    fetch("http://127.0.0.1:8000/users/users_list", {
      headers: {
        Authorization: "Token " + this.props.permission
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ isLoading: true, items: data });
        console.log(this);
      });
  }
  render() {
    const { isLoaded, items } = this.state;
    return (
      <div class="wrapper">
        {items.map(item => (
          <div class="user_list">
            <div class="user">
              <p>{item.username}</p>
              <p> {item.email}</p>
              <br></br>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Articles_list;
