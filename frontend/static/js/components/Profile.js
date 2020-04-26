import React from "react";
import ReactDOM from "react-dom";
import UserProfile from "../containers/user_profile";
import { connect } from "react-redux";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    comments: [],
    rates: [],
    items: [],
  };

  componentDidMount() {
    fetch("http://127.0.0.1:8000/auth/personal_account/", {
      headers: {
        Authorization: this.props.user,
        method: "GET",
      },
    })
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        console.log(data);
        let comment_list = data.auth_user.map((com) => {
          return com;
        });
        let rate_list = data.users_rate.map((rat) => {
          return rat;
        });

        this.setState({
          items: data,
          comments: comment_list,
          rates: rate_list,
        });
      });
  }

  render() {
    console.log("Profile " + this.props.user[0]);
    const { items, comments, rates } = this.state;
    return (
      <div class="wrapper">
        <div class="profile">
          <div class="info">
            <ul>
              <li>
                <p>Username: {items.username}</p>
              </li>
              <li>
                <p>First name: {items.first_name}</p>
              </li>
              <li>
                <p>Last name: {items.last_name}</p>
              </li>
              <li>
                <p>Joined to us: {items.date_joined}</p>
              </li>
              <li>
                <p>Github: {items.git_reference}</p>
              </li>
            </ul>
          </div>
          <h1>Комментарии</h1>
          {comments.map((comment) => (
            <div class="profile-comments">
              <p>{comment.description}</p>
              <p>{comment.date_publish}</p>
              <p>{comment.like_count}</p>
              <p>{comment.dislike_count}</p>
              <p>Название поста: {comment.id_post.title}</p>
            </div>
          ))}
          <h1>Оценки</h1>
          {rates.map((rate) => (
            <div class="profile-rate">
              <p>
                Оценка: {rate.mark} Название поста: {rate.id_post.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default connect(
  state => ({
    user: state
  }),
)(Profile);

