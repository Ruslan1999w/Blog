import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter,
} from "react-router-dom";
import { createBrowserHistory } from "history";
//import Header from "./components/Header";
import Footer from "./components/Footer";
import Articles_list from "./components/articles/Articles_list";
import Articles_retrieve from "./components/articles/Articles_retrieve";
import User_list from "./components/User_list";
import User_retrieve from "./components/User_retrieve";
import "../css/main.scss";
import Profile from "./components/Profile";
const history = createBrowserHistory();
import CreatePost from "./components/CreatePost";


const Home = () => (
  <div>
    <Articles_list />
  </div>
);

const All_user = () => (
  <Switch>
    <Route exact path="/users" component={User_list} />
    <Route path="/users/:number" component={User_retrieve} />
  </Switch>
);

const All_post = () => (
  <Switch>
    <Route exact path="/articles" component={Articles_list} />
    <Route path="/articles/:number" component={Articles_retrieve} />
  </Switch>
);
const Main = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={All_user} />
      <Route path="/articles" component={All_post} />
    </Switch>
  </div>
);

const CreatPost = () =>(
      <Route exact path='/createpost' component={CreatePost}/>
)

const Header = () => (

  <div class="header">
    <div class="container">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);
const App = () => (
  <div>
    <Header />
    <Main />
  </div>
);

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
