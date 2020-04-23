import React from "react";
import "./comp_style/article_comment_form.scss";

class Article_comment_form extends React.Component {
  state = {
    comments: [],
    creator: [],
  };
  onSubmit(event) {
    var comments = document.getElementById("comments").value;
    let comment = {
      description: comments,
      id_post: 1,
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
      <div class="commetnt_form">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <textarea
              name="comments"
              id="comments"
              cols="90"
              rows="10"
              placeholder="Leave your comment here ..."
            ></textarea>
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
