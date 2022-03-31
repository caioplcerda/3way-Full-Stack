import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Component } from 'react';
import * as Yup from 'yup';
import AuthService from '../../services/auth.service';

type Props = {};

type State = {
  name: string;
  email: string;
  password: string;
  successful: boolean;
  message: string;
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      name: '',
      email: '',
      password: '',
      successful: false,
      message: '',
    };
  }

  validationSchema() {
    return Yup.object().shape({
      name: Yup.string()
        .test(
          'len',
          'O nome deve ter entre 3 e 60 caracteres.',
          (val: any) => val && val.toString().length >= 3 && val.toString().length <= 60
        )
        .required('O Nome é obrigatório!'),
      email: Yup.string()
        .test(
          'len',
          'O email deve ter entre 15 e 180 caracteres.',
          (val: any) => val && val.toString().length >= 15 && val.toString().length <= 180
        )
        .required('O Email é obrigatório!'),
      password: Yup.string()
        .test(
          'len',
          'A Senha deve ter entre 6 e 12 caracteres.',
          (val: any) => val && val.toString().length >= 6 && val.toString().length <= 12
        )
        .required('A Senha é obrigatória!'),
    });
  }

  handleRegister(user: { name: string; email: string; password: string }) {

    this.setState({
      message: '',
      successful: false,
    });

    AuthService.register(user).then(
      (response: { data: { message: any } }) => {
        this.setState({
          message: response.data.message,
          successful: true,
        });
      },
      (error: { response: { data: { message: any } }; message: any; toString: () => any }) => {
        const resMessage = (error.response && error.message) || error.toString();

        this.setState({
          message: resMessage,
          successful: false,
        });
      }
    );
  }

  render() {
    const { successful, message } = this.state;

    const initialValues = {
      name: '',
      email: '',
      password: '',
    };

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />

          <Formik initialValues={initialValues} validationSchema={this.validationSchema} onSubmit={this.handleRegister}>
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Field name="name" type="text" className="form-control" />
                    <ErrorMessage name="name" component="div" className="alert alert-danger" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="alert alert-danger" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" className="form-control" />
                    <ErrorMessage name="password" component="div" className="alert alert-danger" />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign Up
                    </button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}
