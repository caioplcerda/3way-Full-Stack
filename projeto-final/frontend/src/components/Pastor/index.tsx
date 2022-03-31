import { ChangeEvent, Component } from "react";
import IPastor from "../../types/pastor.types";
import * as Yup from "yup";
import pastorService from "../../services/pastor.service";
import { ErrorMessage, Field, Form, Formik } from "formik";
import IIgreja from "../../types/igreja.types";
import igrejaService from "../../services/igreja.service";

type Props = {};

type State = {
  list: IPastor[];
  listIgrejas: IIgreja[];
  pastor: IPastor;
  successful: boolean;
  message: string;
};

export default class Pastor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handlePastor = this.handlePastor.bind(this);

    this.state = {
      list: [],
      listIgrejas: [],
      pastor: {},
      successful: false,
      message: "",
    };
  }

  validationSchema() {
    return Yup.object().shape({
      nome: Yup.string().required("O Nome é obrigatório!"),
      email: Yup.string().required("O Email é obrigatório!"),
      telefone: Yup.string().required("O telefone é obrigatório!"),
      endereco: Yup.string().required("O endereco é obrigatório!"),
      igreja: Yup.string().required("A igreja é obrigatória!"),
    });
  }

  handlePastor() {
    this.setState({
      message: "",
      successful: false,
    });

    console.log('Pastor', this.state.pastor);

    pastorService.create(this.state.pastor).then(
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
    this.loadListIgrejas();
  }

  load(pastor: IPastor) {
    this.setState({ pastor });
  }

  clear() {
    this.state = {
      list: [],
      listIgrejas: [],
      pastor: {},
      successful: false,
      message: "",
    };
  }

  onChangeId(e: ChangeEvent<HTMLInputElement>) {
    const pastor = { ...this.state.pastor, id: Number(e.target.value) };
    this.setState(() => ({ pastor }));
  }

  onChangeNome(e: ChangeEvent<HTMLInputElement>) {
    const pastor = { ...this.state.pastor, nome: e.target.value };
    this.setState(() => ({ pastor }));
  }

  onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    const pastor = { ...this.state.pastor, email: e.target.value };
    this.setState(() => ({ pastor }));
  }

  onChangeTelefone(e: ChangeEvent<HTMLInputElement>) {
    const pastor = { ...this.state.pastor, telefone: e.target.value };
    this.setState(() => ({ pastor }));
  }

  onChangeEndereco(e: ChangeEvent<HTMLInputElement>) {
    const pastor = { ...this.state.pastor, endereco: e.target.value };
    this.setState(() => ({ pastor }));
  }

  onChangeIgreja(e: ChangeEvent<HTMLInputElement>) {
    const pastor = { ...this.state.pastor, igreja: e.target.value as IIgreja };
    this.setState(() => ({ pastor }));
  }


  loadList() {
    pastorService.getPastores().then(
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
      }
    );
  }

  loadListIgrejas() {
    igrejaService.getIgrejas().then(
      (response) => {
        this.setState({
          listIgrejas: response.data,
        });
      },
      (error) => {
        this.setState({
          listIgrejas:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  remove(pastor: IPastor) {
    if (window.confirm("Confirm delete?")) {
      pastorService.delPastorById(Number(pastor.id)).then(() => {
        window.alert(pastor.nome + " deleted successful!");
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
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Nome da Igreja</th>
            <th>Açoes</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map((pastor) => {
      return (
        <tr key={pastor.id}>
          <td>{pastor.id}</td>
          <td>{pastor.nome}</td>
          <td>{pastor.email}</td>
          <td>{pastor.telefone}</td>
          <td>{pastor.igreja?.nome}</td>
          <td>
            <button className="btn btn-warning">
              <i
                className="fa fa-pencil"
                onClick={() => this.load(pastor)}
              ></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(pastor)}
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
      nome: "",
      email: "",
      telefone: "",
      endereco: "",
      igreja: "",
    };

    return (
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h2>Register Pastor</h2>
          </div>

          <Formik initialValues={initialValues} onSubmit={this.handlePastor}>
            <Form>
              {
                <div>
                  <Field
                    name="id"
                    type="hidden"
                    value={this.state.pastor.id}
                    onChange={this.onChangeId.bind(this)}                  />
                  <div className="form-group">
                    <label htmlFor="nome"> Nome </label>
                    <Field
                      name="nome"
                      type="text"
                      className="form-control"
                      value={this.state.pastor.nome}
                      onChange={this.onChangeNome.bind(this)}
                      required
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
                      type="text"
                      className="form-control"
                      value={this.state.pastor.email}
                      onChange={this.onChangeEmail.bind(this)}
                      required
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="telefone"> Telefone </label>
                    <Field
                      name="telefone"
                      type="text"
                      className="form-control"
                      value={this.state.pastor.telefone}
                      onChange={this.onChangeTelefone.bind(this)}
                    />
                    <ErrorMessage
                      name="telefone"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="endereco"> Endereco </label>
                    <Field
                      name="endereco"
                      type="endereco"
                      className="form-control"
                      value={this.state.pastor.endereco}
                      onChange={this.onChangeEndereco.bind(this)}
                    />
                    <ErrorMessage
                      name="endereco"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="Igreja"> Igreja </label>
                    <Field
                      as="select"
                      name="igreja"
                      className="form-control"
                      value={this.state.pastor.igreja}
                      onChange={this.onChangeIgreja.bind(this)}
                      required
                    >
                      <option value="">Selecione uma igreja</option>
                      {this.state.listIgrejas.map((igreja) => (
                        <option key={igreja.id} value={igreja.nome}>
                          {igreja.nome}
                        </option>
                      ))}
                    </Field>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                      Create | Update
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
            <h2>Registered Pastores</h2>
          </div>
          <div className="card-body">{this.renderTable()}</div>
        </div>
      </div>
    );
  }

}