/* eslint-disable react/no-direct-mutation-state */
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ChangeEvent, Component } from "react";
import * as Yup from "yup";
import eventBus from "../../common/EventBus";
import customerService from "../../services/employee.service";
import IEmploye from '../../types/employee.types'

type Props = {};

type State = {
  list: IEmploye[];
  employee: IEmploye;
  successful: boolean;
  message: string;
};

export default class Employee extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleEmployee = this.handleEmployee.bind(this);

    this.state = {
      list: [],
      employee: {},
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

  handleEmployee() {
    this.setState({
      message: "",
      successful: false,
    });

    console.log('Funcionario', this.state.employee);

    customerService.create(this.state.employee).then(
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

  load(employee: IEmploye) {
    this.setState({ employee });
  }

  // updateField(event: ChangeEvent<HTMLInputElement>) {
  //   const employee = { ...this.state.employee };
  //   employee.email = event.target.value;
  //   console.log('employee.email', employee.email);
  //   this.setState({ employee });
  // }

  clear() {
    this.state = {
      list: [],
      employee: {},
      successful: false,
      message: "",
    };
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const employee = { ...this.state.employee, name: e.target.value };
    this.setState(() => ({ employee }));
  }

  onChangeAddress(e: ChangeEvent<HTMLInputElement>) {
    const employee = { ...this.state.employee, address: e.target.value };
    this.setState(() => ({ employee }));
  }

  onChangePhone(e: ChangeEvent<HTMLInputElement>) {
    const employee = { ...this.state.employee, phone: e.target.value };
    this.setState(() => ({ employee }));
  }

  onChangeId(e: ChangeEvent<HTMLInputElement>) {
    const employee = { ...this.state.employee, id: Number(e.target.value) };
    this.setState(() => ({ employee }));
  }

  onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    const employee = { ...this.state.employee, email: e.target.value };
    this.setState(() => ({ employee }));
  }

  onChangeSex(e: ChangeEvent<HTMLInputElement>) {
    const employee = { ...this.state.employee, sex: e.target.value };
    this.setState(() => ({ employee }));
  }

  onChangeBirthday(e: ChangeEvent<HTMLInputElement>) {
    const employee = { ...this.state.employee, birthday: e.target.value };
    this.setState(() => ({ employee }));
  }

  onChangeSalary(e: ChangeEvent<HTMLInputElement>) {
    const employee = { ...this.state.employee, salary: Number(e.target.value) };
    this.setState(() => ({ employee }));
  }

  // onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
  //   this.setState((prevState) => ({
  //     employee: {
  //       ...prevState.employee,
  //       email: e.target.value,
  //     },
  //   }));
  // }

  loadList() {
    customerService.getEmployees().then(
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

  remove(employee: IEmploye) {
    if (window.confirm("Confirm delete?")) {
      customerService.delEmployeeById(Number(employee.id)).then(() => {
        window.alert(employee.name + " deleted successful!");
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
            <th>Sex</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map((employee) => {
      return (
        <tr key={employee.id}>
          <td>{employee.id}</td>
          <td>{employee.name}</td>
          <td>{employee.email}</td>
          <td>{employee.phone}</td>
          <td>{employee.sex}</td>
          <td>
            <button className="btn btn-warning">
              <i
                className="fa fa-pencil"
                onClick={() => this.load(employee)}
              ></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(employee)}
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
            <h2>Register Employee</h2>
          </div>

          <Formik initialValues={initialValues} onSubmit={this.handleEmployee}>
            <Form>
              {
                <div>
                  <Field
                    name="id"
                    type="hidden"
                    value={this.state.employee.id}
                    onChange={this.onChangeId.bind(this)}
                  />
                  <div className="form-group">
                    <label htmlFor="name"> name </label>
                    <Field
                      name="name"
                      type="text"
                      className="form-control"
                      value={this.state.employee.name}
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
                      value={this.state.employee.email}
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
                      value={this.state.employee.phone}
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
                      value={this.state.employee.address}
                      onChange={this.onChangeAddress.bind(this)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="salary"> Salary </label>
                    <Field
                      name="salary"
                      type="number"
                      className="form-control"
                      value={this.state.employee.salary}
                      onChange={this.onChangeSalary.bind(this)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="birthday"> Birthday </label>
                    <Field
                      name="birthday"
                      type="date"
                      className="form-control"
                      value={this.state.employee.birthday}
                      onChange={this.onChangeBirthday.bind(this)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="sex"> Sex </label>
                    <Field
                      type="text"
                      name="sex"
                      className="form-control"
                      value={this.state.employee.sex}
                      onChange={this.onChangeSex.bind(this)}
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
            <h2>Registered Employees</h2>
          </div>
          <div className="card-body">{this.renderTable()}</div>
        </div>
      </div>
    );
  }
}
