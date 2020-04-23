import React from "react";

class Articles_retrieve_all_notes extends React.Component {
  state = {
    comments: [],
  };
  componentDidMount() {
    fetch(
      "http://127.0.0.1:8000/notes/" + this.props.id_post + "/comments_list/",
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ comments: data });
      });
  }
  render() {
    const { comments } = this.state;
    return (
      <div class="comments_list">
        {comments.map((comment) => (
          <div class="comment">
            <p>{comment.description}</p>
          </div>
        ))}
      </div>
    );
  }
}
export default Articles_retrieve_all_notes;
