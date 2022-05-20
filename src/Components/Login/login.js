import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./login.css";
import DatabaseConnect from "../DatabaseConnect/databaseConnect";
import "bootstrap/dist/css/bootstrap.min.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginPage: true,
      showDatabaseConnect: false,
      inputEmail: "",
      inputPassword: "",
      logedUsertoken: "",
      logedUserId: "",
      logedUserFirstName: "",
      logedUserLastName: "",
      logedUserEmail: "",
      logedUserUsername: "",
      logedUserpassword: "",
      logedUserRole: "",
      logedUserProyects: []
    };
  }
  toggleRender = (RTA) => {
    this.setState({ showLoginPage: RTA });
  };

  showDatabaseConnect = () => {
    this.setState({ showDatabaseConnect: true });
    this.toggleRender(false);
  };

  updateEmailInputValue = (value) => {
    this.setState({ inputEmail: value });
  };

  updatePasswordInputValue = (value) => {
    this.setState({ inputPassword: value });
  };

  loginVerification = (e) => {
    const { inputEmail, inputPassword } = this.state;

    const options = {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputEmail,
        password: inputPassword,
      }),
    };
    fetch("http://localhost:3001/users/login/", options)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.message && data.message.includes("succesfully")) {
          this.setState(
            {
              logedUsertoken: data.token ? data.token : "",
              logedUserId: data.user
                ? data.user._id
                  ? data.user._id
                  : ""
                : "",
              logedUserFirstName: data.user
                ? data.user.first_name
                  ? data.user.first_name
                  : ""
                : "",
              logedUserLastName: data.user
                ? data.user.last_name
                  ? data.user.last_name
                  : ""
                : "",
              logedUserEmail: data.user
                ? data.user.email
                  ? data.user.email
                  : ""
                : "",
              logedUserUsername: data.user
                ? data.user.username
                  ? data.user.username
                  : ""
                : "",
              logedUserpassword: data.user
                ? data.user.password
                  ? data.user.password
                  : ""
                : "",
                logedUserRole: data.user
                ? data.user.role
                  ? data.user.role
                  : ""
                : "",
                logedUserProyects: data.user
                ? data.user.proyects
                  ? data.user.proyects.length > 0
                  ? data.user.proyects: ""
                  : ""
                : "",
            },
            () => {
              this.updateEmailInputValue("");
              this.updatePasswordInputValue("");
              this.showDatabaseConnect();
            }
          );
        } else if (
          data &&
          data.message &&
          data.message === "The password is incorrect"
        ) {
          //show alert saying incorrect password
        } else if (
          data &&
          data.message &&
          data.message === "The user with the given email was not found."
        ) {
          //show alert saying email not registered
        } else {
          //Show general error message
        }
      });
  };

  render() {
    const { showLoginPage, showDatabaseConnect } = this.state;
    if (showLoginPage) {
      return (
        <div>
          <Container>
            <Row>
              <Col xs={{ order: "first" }}></Col>
              <Col xs>
                <form>
                  <h3 id="welome">Bienvenido a Avircity</h3>
                  <div className="form-group">
                    <label>Correo electronico</label>
                    <input
                      type="email"
                      className="form-control"
                      value={this.state.inputEmail}
                      onInput={(e) =>
                        this.updateEmailInputValue(e.target.value)
                      }
                      placeholder="Ingresa un correo electronico"
                    />
                  </div>
                  <div className="form-group">
                    <label>Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Ingresa una contraseña"
                      value={this.state.inputPassword}
                      onInput={(e) =>
                        this.updatePasswordInputValue(e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    style={{
                      width: "420px",
                      marginTop: "30px",
                      marginBottom: "10px",
                    }}
                    className="btn btn-primary btn-block"
                    onClick={this.loginVerification}
                  >
                    Ingresar
                  </button>
                  <p className="forgot-password text-right">
                    ¿No tienes una cuenta?<a href="/register"> Registrate</a>
                  </p>
                </form>
              </Col>
              <Col xs={{ order: "last" }}></Col>
            </Row>
          </Container>
        </div>
      );
    }
    if (showDatabaseConnect) {
      return (
        <div>
          <DatabaseConnect showLastPage={this.toggleRender} data={this.state} />
        </div>
      );
    }
   else {
      return <div></div>;
    }
  }
}
export default Login;
