import React from "react";
import { Link } from "react-router-dom";

class Articles_list extends React.Component {
  state = {
    items: [],
  };

  main_image(item, flag) {
    if (flag == "image") {
      return item.images[0].path_to_image;
    } else {
      return item.post_creator[0].id_auth_user.username;
    }
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/articles/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ items: data });
      });
  }
  render() {
    const { items } = this.state;
    return (
      <div class="wrapper">
        <div class="title">
          <div class="title-wrap">
            <h1>End of the week, but our site steel in production...</h1>
          </div>
        </div>
        <div class="main">
          <div class="container">
            {items.map((item) => (
              <div class="article">
                <div class="left">
                  <Link to={`/articles/${item.id_post}`}>
                    <img src={this.main_image(item, "image")}></img>
                  </Link>
                </div>
                <div class="media">
                  <h1>
                    <Link to={`/articles/${item.id_post}`}>{item.title}</Link>
                  </h1>
                  <p> {item.description}</p>
                  <h2> {this.main_image(item, "author")}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Articles_list;
