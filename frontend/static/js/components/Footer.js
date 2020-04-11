import React from "react";
import ReactDOM from "react-dom";

class Footer extends React.Component {
  render() {
    return (
      <div class="footer">
        <div class="links">
          <a href ="https://github.com/Ruslan1999w/Blog">
            <img src="/static/img/github.svg"   alt=""/>
          </a>
          <a>
            <img src="/static/img/vk.svg"   alt=""/>
          </a>
          <a>
            <img src="/static/img/twitter.svg"   alt=""/>
          </a>
        </div>
      <div class="footer-desc">
          
      </div>
       
        <h3>all rights reserved</h3>
        <h4>2020</h4>
      </div>
    );
  }
}
export default Footer;
