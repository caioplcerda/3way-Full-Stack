import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import User from './components/User';
import AuthService from './services/auth.service';
import IUser from './types/user.types';
import Igreja from './components/Igreja'
import Membro from './components/Membros';
import Pastor from './components/Pastor';

type Props = {};

type State = {
  currentUser: IUser | undefined;
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  componentWillUnmount() {
    AuthService.logout();
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={'/'} className="navbar-brand">
            3Way
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={'/home'} className="nav-link">
                Home
              </Link>
            </li>

            {currentUser && (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={'/users'} className="nav-link">
                    Users
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={'/igrejas'} className="nav-link">
                    Igrejas
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={'/membros'} className="nav-link">
                    Membros
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={'/pastores'} className="nav-link">
                    Pastores
                  </Link>
                </li>

              </div>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={'/profile'} className="nav-link">
                  {currentUser.name}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={'/login'} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={'/register'} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={['/', '/home']} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/users" component={User} />
            <Route exact path="/igrejas" component={Igreja} />
            <Route exact path="/membros" component={Membro} />
            <Route exact path="/pastores" component={Pastor} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
