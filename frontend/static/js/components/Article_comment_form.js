import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Link } from "react-router-dom";
import "./comp_style/article_retrieve.scss";

class Article_comment_form extends React.Component {
  state = {
    comments: [],
    creator: [],
  };
  onSubmit(event) {
    var description = document.getElementById("description").value;
    let comment = {
      description: description,
      id_post: this.props.id_post,
    };
    let response = fetch("http://127.0.0.1:8000/notes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(comment),
    });
    if (response.ok) alert(response.ok);
    event.preventDefault();
  }
  render() {
    const { comments, creator } = this.state;
    return (
      <div class="commetnt">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label for="description">Leave your comment here ...</label>
            <input id="description" type="text" />
          </div>

          <div className="form-group">
            <input type="submit" value="Commit!" />
          </div>
        </form>
      </div>
    );
  }
}
export default Article_comment_form;
