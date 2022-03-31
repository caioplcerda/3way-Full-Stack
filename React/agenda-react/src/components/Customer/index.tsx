/* eslint-disable react/no-direct-mutation-state */
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ChangeEvent, Component } from "react";
import * as Yup from "yup";
import eventBus from "../../common/EventBus";
import customerService from "../../services/customer.service";
import ICustomer from "../../types/customer.types";

type Props = {};

type State = {
  list: ICustomer[];
  customer: ICustomer;
  successful: boolean;
  message: string;
};

export default class Customer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleCustomer = this.handleCustomer.bind(this);

    this.state = {
      list: [],
      customer: {},
      successful: false,
      message: "",
    };
  }

  validationSchema() {
    return Yup.object().shape({
      name: Yup.string()
        .test(
          "len",
          "O nome deve ter entre 3 e 60 caracteres.",
          (val: any) =>
            val && val.toString().length >= 3 && val.toString().length <= 60
        )
        .required("O Nome é obrigatório!"),
      email: Yup.string()
        .test(
          "len",
          "O email deve ter entre 15 e 180 caracteres.",
          (val: any) =>
            val && val.toString().length >= 15 && val.toString().length <= 180
        )
        .required("O Email é obrigatório!"),
      phone: Yup.string().required("O telefone é obrigatório!"),
    });
  }

  handleCustomer() {
    this.setState({
      message: "",
      successful: false,
    });

    customerService.create(this.state.customer).then(
      (response: { data: { message: any } }) => {
        this.setState({
          message: response.data.message,
          successful: true,
        });
        this.loadList();
      },
      (error: {
        response: { data: { message: any } };
        message: any;
        toString: () => any;
      }) => {
        const resMessage =
          (error.response && error.message) || error.toString();

        this.setState({
          message: resMessage,
          successful: false,
        });
      }
    );
  }

  componentDidMount() {
    this.loadList();
  }

  load(customer: ICustomer) {
    this.setState({ customer });
  }

  // updateField(event: ChangeEvent<HTMLInputElement>) {
  //   const customer = { ...this.state.customer };
  //   customer.email = event.target.value;
  //   console.log('customer.email', customer.email);
  //   this.setState({ customer });
  // }

  clear() {
    this.state = {
      list: [],
      customer: {},
      successful: false,
      message: "",
    };
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const customer = { ...this.state.customer, name: e.target.value };
    this.setState(() => ({ customer }));
  }

  onChangeAddress(e: ChangeEvent<HTMLInputElement>) {
    const customer = { ...this.state.customer, address: e.target.value };
    this.setState(() => ({ customer }));
  }

  onChangePhone(e: ChangeEvent<HTMLInputElement>) {
    const customer = { ...this.state.customer, phone: e.target.value };
    this.setState(() => ({ customer }));
  }

  onChangeId(e: ChangeEvent<HTMLInputElement>) {
    const customer = { ...this.state.customer, id: Number(e.target.value) };
    this.setState(() => ({ customer }));
  }

  onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    const customer = { ...this.state.customer, email: e.target.value };
    this.setState(() => ({ customer }));
  }

  // onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
  //   this.setState((prevState) => ({
  //     customer: {
  //       ...prevState.customer,
  //       email: e.target.value,
  //     },
  //   }));
  // }

  loadList() {
    customerService.getCustomers().then(
      (response) => {
        this.setState({
          list: response.data,
        });
      },
      (error) => {
        this.setState({
          list:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });

        if (error.reponse.status === 401) {
          eventBus.dispatch("logout");
        }
      }
    );
  }

  remove(customer: ICustomer) {
    if (window.confirm("Confirm delete?")) {
      customerService.delCustomerById(Number(customer.id)).then(() => {
        window.alert(customer.name + " deleted successful!");
        this.loadList();
      });
    }
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map((customer) => {
      return (
        <tr key={customer.id}>
          <td>{customer.id}</td>
          <td>{customer.name}</td>
          <td>{customer.email}</td>
          <td>{customer.phone}</td>
          <td>
            <button className="btn btn-warning">
              <i
                className="fa fa-pencil"
                onClick={() => this.load(customer)}
              ></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(customer)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { successful, message } = this.state;

    const initialValues = {
      id: 0,
      name: "",
      email: "",
      phone: "",
      address: "",
    };

    return (
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h2>Register Customer</h2>
          </div>

          <Formik initialValues={initialValues} onSubmit={this.handleCustomer}>
            <Form>
              {
                <div>
                  <Field
                    name="id"
                    type="hidden"
                    value={this.state.customer.id}
                    onChange={this.onChangeId.bind(this)}
                  />
                  <div className="form-group">
                    <label htmlFor="name"> name </label>
                    <Field
                      name="name"
                      type="text"
                      className="form-control"
                      value={this.state.customer.name}
                      onChange={this.onChangeName.bind(this)}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email"> Email </label>
                    <Field
                      name="email"
                      type="email"
                      className="form-control"
                      value={this.state.customer.email}
                      onChange={this.onChangeEmail.bind(this)}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone"> Phone </label>
                    <Field
                      name="phone"
                      type="phone"
                      className="form-control"
                      value={this.state.customer.phone}
                      onChange={this.onChangePhone.bind(this)}
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address"> Address </label>
                    <Field
                      name="address"
                      type="address"
                      className="form-control"
                      value={this.state.customer.address}
                      onChange={this.onChangeAddress.bind(this)}
                    />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                      Create
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning ml-2"
                      onClick={this.clear}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              }

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
        <div className="card">
          <div className="card-header">
            <h2>Registered Customers</h2>
          </div>
          <div className="card-body">{this.renderTable()}</div>
        </div>
      </div>
    );
  }
}
