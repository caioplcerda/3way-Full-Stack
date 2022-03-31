import { ChangeEvent, Component } from "react";
import IMembro from "../../types/membro.types";
import * as Yup from "yup";
import membroService from "../../services/membro.service";
import eventBus from "../../common/EventBus";
import { ErrorMessage, Field, Form, Formik } from "formik";
import IIgreja from "../../types/igreja.types";
import igrejaService from "../../services/igreja.service";

type Props = {};

type State = {
  list: IMembro[];
  listIgrejas: IIgreja[];
  membro: IMembro;
  successful: boolean;
  message: string;
};

export default class Membro extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleMembro = this.handleMembro.bind(this);

    this.state = {
      list: [],
      listIgrejas: [],
      membro: {},
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
      sexo: Yup.string().required("O sexo é obrigatório!"),
      estado_civil: Yup.string().required("O estado civil é obrigatório!"),
      data_nascimento: Yup.string().required("A data de nascimento é obrigatório!"),
    });
  }

  handleMembro() {
    this.setState({
      message: "",
      successful: false,
    });

    console.log('Membro', this.state.membro);

    membroService.create(this.state.membro).then(
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

  load(membro: IMembro) {
    this.setState({ membro });
  }

  clear() {
    this.state = {
      list: [],
      listIgrejas: [],
      membro: {},
      successful: false,
      message: "",
    };
  }

  onChangeId(e: ChangeEvent<HTMLInputElement>) {
    const membro = { ...this.state.membro, id: Number(e.target.value) };
    this.setState(() => ({ membro }));
  }

  onChangeNome(e: ChangeEvent<HTMLInputElement>) {
    const membro = { ...this.state.membro, nome: e.target.value };
    this.setState(() => ({ membro }));
  }

  onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    const membro = { ...this.state.membro, email: e.target.value };
    this.setState(() => ({ membro }));
  }

  onChangeTelefone(e: ChangeEvent<HTMLInputElement>) {
    const membro = { ...this.state.membro, telefone: e.target.value };
    this.setState(() => ({ membro }));
  }

  onChangeEndereco(e: ChangeEvent<HTMLInputElement>) {
    const membro = { ...this.state.membro, endereco: e.target.value };
    this.setState(() => ({ membro }));
  }
   
  onChangeSexo(e: ChangeEvent<HTMLInputElement>) {
    const membro = { ...this.state.membro, sexo: e.target.value };
    this.setState(() => ({ membro }));
  }
   
  onChangeEstadoCivil(e: ChangeEvent<HTMLInputElement>) {
    const membro = { ...this.state.membro, estado_civil: e.target.value };
    this.setState(() => ({ membro }));
  }
   
  onChangeDataNascimento(e: ChangeEvent<HTMLInputElement>) {
    const membro = { ...this.state.membro, data_nascimento: e.target.value };
    this.setState(() => ({ membro }));
  }

  onChangeIgrejaID(e: ChangeEvent<HTMLInputElement>) {
    const membro = { ...this.state.membro, igreja: e.target.value as IIgreja };
    this.setState(() => ({ membro }));
  }

  onChangeIgreja(e: ChangeEvent<HTMLInputElement>) {
    const membro = { ...this.state.membro, igreja: e.target.value as IIgreja };
    this.setState(() => ({ membro }));
  }
   

  loadList() {
    membroService.getMembros().then(
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

  remove(membro: IMembro) {
    if (window.confirm("Confirm delete?")) {
      membroService.delMembroById(Number(membro.id)).then(() => {
        window.alert(membro.nome + " deleted successful!");
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
            <th>Estado Civil</th>
            <th>Data de Nascimento</th>
            <th>Igreja</th>
            <th>Açoes</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map((membro) => {
      return (
        <tr key={membro.id}>
          <td>{membro.id}</td>
          <td>{membro.nome}</td> 
          <td>{membro.email}</td> 
          <td>{membro.estadoCivil}</td>
          <td>{membro.dataNascimento}</td>
          <td>{membro.igreja?.nome}</td>
          <td>
            <button className="btn btn-warning">
              <i
                className="fa fa-pencil"
                onClick={() => this.load(membro)}
              ></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(membro)}
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
      sexo: "",
      estado_civil: "",
      data_nascimento: "",
    };

    return (
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h2>Register Membro</h2>
          </div>

          <Formik initialValues={initialValues} onSubmit={this.handleMembro}>
            <Form>
              {
                <div>
                  <Field
                    name="id"
                    type="hidden"
                    value={this.state.membro.id}
                    onChange={this.onChangeId.bind(this)}
                  />
                  <div className="form-group">
                    <label htmlFor="nome"> Nome </label>
                    <Field
                      name="nome"
                      type="text"
                      className="form-control"
                      value={this.state.membro.nome}
                      onChange={this.onChangeNome.bind(this)}
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
                      value={this.state.membro.email}
                      onChange={this.onChangeEmail.bind(this)}
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
                      value={this.state.membro.telefone}
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
                      value={this.state.membro.endereco}
                      onChange={this.onChangeEndereco.bind(this)}
                    />
                    <ErrorMessage
                      name="endereco"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="Sexo"> Sexo </label>
                    <Field
                      as="select"
                      name="sexo"
                      className="form-control"
                      value={this.state.membro.sexo}
                      onChange={this.onChangeSexo.bind(this)}
                      required
                    >
                      <option value="">Selecione uma o seu sexo</option>
                      <option value="M" >M</option>
                      <option value="F" >F</option>
                    </Field>
                  </div>

                  <div className="form-group">
                    <label htmlFor="Estado Civil"> Estado Civil </label>
                    <Field
                      as="select"
                      name="estado_civil"
                      className="form-control"
                      value={this.state.membro.estadoCivil}
                      onChange={this.onChangeEstadoCivil.bind(this)}
                      required
                    >
                      <option value="">Selecione o seu estado civil</option>
                      <option value="solteiro" >Solteiro(a)</option>
                      <option value="casado" >Casado(a)</option>
                      <option value="namorando" >Namorando</option>
                    </Field>
                  </div>

                  <div className="form-group">
                    <label htmlFor="data_nascimento"> DataNascimento </label>
                    <Field
                      name="data_nascimento"
                      type="data_nascimento"
                      className="form-control"
                      value={this.state.membro.dataNascimento}
                      onChange={this.onChangeDataNascimento.bind(this)}
                    />
                    <ErrorMessage
                      name="data_nascimento"
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
                      value={this.state.membro.igreja}
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
            <h2>Registered Membros</h2>
          </div>
          <div className="card-body">{this.renderTable()}</div>
        </div>
      </div>
    );
  }

}