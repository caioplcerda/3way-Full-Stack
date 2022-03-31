import { Component, ReactNode } from 'react';
import eventBus from '../../common/EventBus';
import userService from '../../services/user.service';
import IUser from '../../types/user.types';

type Props = {};

type State = {
  content: IUser[];
};

export default class BoardUser extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  componentDidMount() {
    userService.getUserBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content: (error.response && error.response.data) || error.message || error.toString(),
        });

        if (error.reponse.status === 401) {
          eventBus.dispatch('logout');
        }
      }
    );
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead className="thead-dark">
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.content.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
        </tr>
      );
    });
  }

  render(): ReactNode {
    return (
      <div className="card">
        <div className="card-header">
          <h2>Registered Users</h2>
        </div>
        <div className="card-body">{this.renderTable()}</div>
      </div>
    );
  }
}
