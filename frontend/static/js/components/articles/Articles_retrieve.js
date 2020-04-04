import React from "react";
import ReactDOM from "react-dom";

class Articles_retrieve extends React.Component {
  state = {
    error: false,
    isLoading: false,
    items: [],
  };
  componentDidMount() {
    fetch("http://127.0.0.1:8000/articles/" + this.props.pk, {
      method: "GET",
    })
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
        <div class="book">
          <div class="left">
            <h1>{items.title}</h1>
          </div>
          <div class="right">
            <div class="desc">
              <p> {items.description}</p>
              <p>
                {items.like_count} {items.dislike_count}
              </p>
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
