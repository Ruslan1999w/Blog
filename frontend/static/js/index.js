import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect,Switch, Link, HashRouter } from "react-router-dom";
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
//import All_user form "./components/All_user"

//

//
//
//
//class MyComponent extends React.Component {
//  render() {
//    return (
//      <BrowserRouter>
//        <Route path="/users" component={All_user} history={history} ></Route>
//
//
//          <Route
//            path="/article/:number"
//            render={() => <Articles_retrieve pk={item.id_post} history={history} />}
//          ></Route>
//          <Route path="/article" component={Articles_list} history={history}></Route>
//
//        </BrowserRouter>
//    );
//  }
//}
//ReactDOM.render(<MyComponent />, document.getElementById("root"));

const Home = () => (
  <div>
    <h1>Welcome to the Tornadoes Website!</h1>
  </div>
)

const All_user = () => (
  <Switch>
    <Route exact path='/users' component={User_list}/>
    <Route path='/users/:number' component={User_retrieve}/>
  </Switch>
)



const All_post = () => (
  <Switch>
    <Route exact path='/articles' component={Articles_list}/>
    <Route path='/articles/:number' component={Articles_retrieve}/>
  </Switch>
)
const Main = () => (
  <div>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/users' component={All_user}/>
      <Route path='/articles' component={All_post}/>
    </Switch>
  </div>
)


const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/users'>Users</Link></li>
        <li><Link to='/articles'>Articles</Link></li>
      </ul>
    </nav>
  </header>

)


const App = () => (
    <div>
    <Header />
    <Main />
    </div>
)

ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('root'))



