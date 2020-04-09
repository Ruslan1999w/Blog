import React from "react";
import { Link } from "react-router-dom";

class Articles_list extends React.Component {
  state = {
    error: false,
    isLoading: false,
    items: [],
  };
  componentDidMount() {
    fetch("http://127.0.0.1:8000/articles/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ isLoading: true, items: data });
      });
  }
  render() {
    const { isLoaded, items } = this.state;
    return (
      <div class="main">
        <div class="container">
          {items.map((item) => (
            <div class="article">
              <div class="left">
                <Link to={`/articles/${item.id_post}`}>
                  <img src={item.image}></img>
                </Link>
              </div>
              <div class="media">
                <div class="desc">
                  <h1>
                    <Link to={`/articles/${item.id_post}`}>{item.title}</Link>
                  </h1>
                  <p> {item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Articles_list;
