import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import Header from './components/Header';
import Footer from './components/Footer';
import Articles_list from './components/Articles_list';
import Articles_retrieve from './components/Articles_retrieve';
import User_list from './components/User_list';
import User_retrieve from './components/User_retrieve';
import Profile from './components/Profile';
import LoginForm from './components/LogIn';
import CreatePost from './components/CreatePost';
import RegisterForm from './components/Register';
import AboutUs from './components/AboutUs';
import { store } from './store/store';

import '../css/main.scss';

const history = createBrowserHistory();

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

const Person = () => <Profile />;

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/profile" component={Person} />
    <Route path="/articles" component={All_post} />
    <Route path="/login" component={LoginForm} />
    <Route path="/registration" component={RegisterForm} />
    <Route path="/about" component={AboutUs} />
  </Switch>
);

const CreatPost = () => (
  <Route exact path="/createpost" component={CreatePost} />
);

const App = () => (
  <div>
    <Header />
    <Main />
    <Footer />
  </div>
);

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,

  document.getElementById('root')
);
