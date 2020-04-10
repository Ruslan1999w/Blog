import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Link } from "react-router-dom";

class Articles_retrieve extends React.Component {
  state = {
    error: false,
    isLoading: false,
    items: [],
    creator: [],
  };
  componentDidMount() {
    const id = Number(this.props.match.params.number);
    fetch("http://127.0.0.1:8000/articles/" + id, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let creator_list = data.post_creator.map((creat) => {
          return creat;
        });
        console.log(creator_list);
        this.setState({ isLoading: true, items: data, creator: creator_list });
        console.log(this);
      });
  }
  render() {
    const { isLoaded, items, creator } = this.state;
    return (
      <div class="wrapper">
        <div class="title">
          <div class="title-wrap">
            <h1>End of the week, but we stell dont have a host-server.</h1>
          </div>
        </div>
        <div class="book">
          <div class="left">
            <h1>{items.title}</h1>
          </div>
          <div class="right">
            <div class="desc">
              <p> {items.description}</p>
              {creator.map((rate) => (
                <div class="profile-rate">
                  <h1>
                    <Link to={`/users/${rate.id_auth_user.id}`}>
                      {rate.id_auth_user.username}
                    </Link>{" "}
                    4{" "}
                  </h1>
                </div>
              ))}
            </div>
            <div class="im">
              <img src={items.date_publish}></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Articles_retrieve;
