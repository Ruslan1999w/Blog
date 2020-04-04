import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Link } from "react-router-dom";
import Articles_retrieve from "./Articles_retrieve";

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
        console.log(this);
      });
  }
  render() {
    const { isLoaded, items } = this.state;
    return (
      <div class="wrapper">
        {items.map((item) => (
          <div class="book">
            <div class="left">
              <Route
                path="/articles/:number"
                render={() => <Articles_retrieve pk={item.id_post} />}
              />
              <h1>
                <Link to={`/articles/${item.id_post}`}>{item.title}</Link>
              </h1>
            </div>
            <div class="right">
              <div class="desc">
                <p> {item.description}</p>
                <p>
                  {item.like_count} {item.dislike_count}
                </p>
              </div>
              <div class="im">
                <img src={item.date_publish}></img>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Articles_list;
