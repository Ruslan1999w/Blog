import React from "react";
import ReactDOM from "react-dom";
import "./comp_style/about.scss";

class AboutUs extends React.Component {
  render() {
    return (
      <div class="wrapper">
        <div class="title">
          <h1>HR - блог начинающих разработчиков</h1>
        </div>

        <div class="info">
          {" "}
          <p>
            {" "}
            Здесь публикуются статьи по интересным нам темам в IT сфере и не
            только.{" "}
          </p>{" "}
        </div>

        <h1>Создатели</h1>
        <div class="authors">
          <div class="author">
            <h2>Khalim</h2>
            <img src="static/img/users_photo/khalim.jpeg" alt="" />
            <div>
              <p>Some information about me</p>{" "}
            </div>
          </div>

          <div class="author">
            <h2>Ruslan</h2>
            <img src="static/img/users_photo/ruslan.jpg" alt="" />

            <div>
              <p>Some information about me</p>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AboutUs;
