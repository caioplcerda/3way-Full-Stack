import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import IUser from '../../types/user.types';

type Props = {};

type State = {
  redirect: string | null;
  userReady: boolean;
  currentUser: IUser;
  token: string;
};

export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: {},
      token: '',
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    const token = AuthService.getToken();

    if (!currentUser) {
      this.setState({
        redirect: '/home',
      });
    }

    this.setState({
      currentUser: currentUser,
      userReady: true,
      token: token,
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {this.state.userReady ? (
          <div>
            <header className="jumbotron">
              <h3>
                <strong>{currentUser.name}</strong> Profile
              </h3>
            </header>
            <p>
              <strong>Token:</strong> {this.state.token.substring(0, 40)} ...{' '}
              {this.state.token.substring(this.state.token.length - 40)}
            </p>
            <p>
              <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}
