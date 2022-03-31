import { Component } from 'react';

type Props = {};

type State = {
  content: string;
};

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: 'Home',
    };
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h3>{this.state.content}</h3>
        </div>
      </div>
    );
  }
}
