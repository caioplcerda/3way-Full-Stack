import { ChangeEvent, Component } from "react";
import IIgreja from "../../types/igreja.types";
import * as Yup from "yup";
import igrejaService from "../../services/igreja.service";
import eventBus from "../../common/EventBus";
import { ErrorMessage, Field, Form, Formik } from "formik";

type Props = {};

type State = {
  list: IIgreja[];
  igreja: IIgreja;
  successful: boolean;
  message: string;
};

export default class Igreja extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleIgreja = this.handleIgreja.bind(this);

    this.state = {
      list: [],
      igreja: {},
      successful: false,
      message: "",
    };
  }

  validationSchema() {
    return Yup.object().shape({
      nome: Yup.string().required("O Nome é obrigatório!"),
      endereco: Yup.string().required("O endereco é obrigatório!"),
      bairro: Yup.string().required("O bairro é obrigatório!"),
      responsavel: Yup.string().required("O responsavel é obrigatório!"),
    });
  }

  handleIgreja() {
    this.setState({
      message: "",
      successful: false,
    });

    console.log('Igreja', this.state.igreja);

    igrejaService.create(this.state.igreja).then(
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

  load(igreja: IIgreja) {
    this.setState({ igreja });
  }

  clear() {
    this.state = {
      list: [],
      igreja: {},
      successful: false,
      message: "",
    };
  }

  onChangeId(e: ChangeEvent<HTMLInputElement>) {
    const igreja = { ...this.state.igreja, id: Number(e.target.value) };
    this.setState(() => ({ igreja }));
  }

  onChangeNome(e: ChangeEvent<HTMLInputElement>) {
    const igreja = { ...this.state.igreja, nome: e.target.value };
    this.setState(() => ({ igreja }));
  }

  onChangeEndereco(e: ChangeEvent<HTMLInputElement>) {
    const igreja = { ...this.state.igreja, endereco: e.target.value };
    this.setState(() => ({ igreja }));
  }
   
  onChangeBairro(e: ChangeEvent<HTMLInputElement>) {
    const igreja = { ...this.state.igreja, bairro: e.target.value };
    this.setState(() => ({ igreja }));
  }
   
  onChangeResponsavel(e: ChangeEvent<HTMLInputElement>) {
    const igreja = { ...this.state.igreja, responsavel: e.target.value };
    this.setState(() => ({ igreja }));
  }
   

  loadList() {
    igrejaService.getIgrejas().then(
      (response) => {
        console.log('Ìgrejas', response.data)
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

  remove(igreja: IIgreja) {
    if (window.confirm("Confirm delete?")) {
      igrejaService.delIgrejaById(Number(igreja.id)).then(() => {
        window.alert(igreja.nome + " deleted successful!");
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
            <th>Endereco</th>
            <th>Bairro</th>
            <th>Responsavel</th>
            <th>Açoes</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map((igreja) => {
      return (
        <tr key={igreja.id}>
          <td>{igreja.id}</td>
          <td>{igreja.nome}</td>
          <td>{igreja.endereco}</td>
          <td>{igreja.bairro}</td>
          <td>{igreja.responsavel}</td>
          <td>
            <button className="btn btn-warning">
              <i
                className="fa fa-pencil"
                onClick={() => this.load(igreja)}
              ></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(igreja)}
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
      endereco: "",
      bairro: "",
      responsavel: "",
    };

    return (
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h2>Register Igreja</h2>
          </div>

          <Formik initialValues={initialValues} onSubmit={this.handleIgreja}>
            <Form>
              {
                <div>
                  <Field
                    name="id"
                    type="hidden"
                    value={this.state.igreja.id}
                    onChange={this.onChangeId.bind(this)}
                  />
                  <div className="form-group">
                    <label htmlFor="nome"> Nome </label>
                    <Field
                      name="nome"
                      type="text"
                      className="form-control"
                      value={this.state.igreja.nome}
                      onChange={this.onChangeNome.bind(this)}
                    />
                    <ErrorMessage
                      name="name"
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
                      value={this.state.igreja.endereco}
                      onChange={this.onChangeEndereco.bind(this)}
                    />
                    <ErrorMessage
                      name="endereco"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="bairro"> Bairro </label>
                    <Field
                      name="bairro"
                      type="bairro"
                      className="form-control"
                      value={this.state.igreja.bairro}
                      onChange={this.onChangeBairro.bind(this)}
                    />
                    <ErrorMessage
                      name="bairro"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="responsavel"> Responsavel </label>
                    <Field
                      name="responsavel"
                      type="responsavel"
                      className="form-control"
                      value={this.state.igreja.responsavel}
                      onChange={this.onChangeResponsavel.bind(this)}
                    />
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
            <h2>Registered Igrejas</h2>
          </div>
          <div className="card-body">{this.renderTable()}</div>
        </div>
      </div>
    );
  }

}