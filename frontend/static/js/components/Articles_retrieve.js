import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Link } from "react-router-dom";
import Articles_comment_form from "./Article_comment_form";
import "./comp_style/article_retrieve.scss";
import Articles_retrieve_all_notes from "./Articles_retrieve_all_notes";
class Articles_retrieve extends React.Component {
  state = {
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
        // console.log(data);
        let creator_list = data.post_creator.map((creat) => {
          return creat;
        });
        // console.log(creator_list);
        this.setState({ id_post: id, items: data, creator: creator_list });
        // console.log(this);
      });
  }
  render() {
    const { items, creator } = this.state;
    return (
      <div class="wrapper">
        <div class="title">
          <div class="title-wrap">
            <h1>End of the week, but we stell dont have a host-server.</h1>
            {creator.map((rate) => (
              <div class="profile-rate">
                <h2>
                  Author:
                  <Link to={`/users/${rate.id_auth_user.id}`}>
                    {rate.id_auth_user.username}
                  </Link>
                </h2>
                <h2>Post-name: {items.title}</h2>
              </div>
            ))}
          </div>
        </div>
        <div class="book">
          <p> {items.description}</p>
          <img src={items.date_publish}></img>
          <Articles_comment_form />
          <Articles_retrieve_all_notes
            id_post={Number(this.props.match.params.number)}
          />
        </div>
      </div>
    );
  }
}
export default Articles_retrieve;
