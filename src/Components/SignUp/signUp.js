import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Styles from "./signUp.css";
import "bootstrap/dist/css/bootstrap.min.css";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    const { showMainPage } = this.props;
    showMainPage(false);
    this.state = {
      showSignUpPage: true,
      inputFisrtName: "",
      inputLastName: "",
      inputEmail: "",
      inputUserName: "",
      inputPassword: "",
      logedUsertoken: "",
      logedUserId: "",
      logedUserFirstName: "",
      logedUserLastName: "",
      logedUserEmail: "",
      logedUserUsername: "",
      logedUserpassword: "",
      logedUserRole: "",
    };
  }
  toggleRender = (RTA) => {
    this.setState({ showSignUpPage: RTA });
  };

  updateFirstNameInputValue = (value) => {
    this.setState({ inputFisrtName: value });
  };

  updateLastNameInputValue = (value) => {
    this.setState({ inputLastName: value });
  };

  updateEmailInputValue = (value) => {
    this.setState({ inputEmail: value });
  };

  updateUserNameInputValue = (value) => {
    this.setState({ inputUserName: value });
  };

  updatePasswordInputValue = (value) => {
    this.setState({ inputPassword: value });
  };

  signUpVerification = (e) => {
    const {
      inputFisrtName,
      inputLastName,
      inputEmail,
      inputUserName,
      inputPassword,
    } = this.state;
    const options = {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: inputFisrtName,
        last_name: inputLastName,
        email: inputEmail,
        username: inputUserName,
        password: inputPassword,
        role: "admin"
      }),
    };
    fetch("http://localhost:3001/users/", options)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.setState(
            {
              logedUsertoken: data.user
                ? data.user.token
                  ? data.user.token
                  : ""
                : "",
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
            },
            () => {
              this.updateFirstNameInputValue("");
              this.updateLastNameInputValue("");
              this.updateEmailInputValue("");
              this.updateUserNameInputValue("");
              this.updatePasswordInputValue("");
            }
          );
        } else if (
          data &&
          data.message &&
          data.message === "This username is already taken. try with another"
        ) {
          alert("This username is already taken. try with another");
          //show alert saying username already taken should login
        } else if (
          data &&
          data.message &&
          data.message === "This email is already registered. try to Login"
        ) {
          //show alert saying email already taken should login
        } else {
          //Show general error message
        }
      });
  };

  render() {
    const { showSignUpPage } = this.state;
    if (showSignUpPage) {
      return (
        <div>
          <div style={Styles}></div>
          <Container>
            <Row>
              <Col xs={{ order: "first" }}></Col>
              <Col xs>
                <form>
                  <h3 id="welome">Bienvenido a Avircity</h3>
                  <div className="form-group">
                    <label>Nombres</label>
                    <input
                      type="first_name"
                      className="form-control"
                      value={this.state.inputFisrtName}
                      onInput={(e) =>
                        this.updateFirstNameInputValue(e.target.value)
                      }
                      placeholder="Ingresa tu nombre completo"
                    />
                  </div>
                  <div className="form-group">
                    <label>Apellidos</label>
                    <input
                      type="last_name"
                      className="form-control"
                      value={this.state.inputLastName}
                      onInput={(e) =>
                        this.updateLastNameInputValue(e.target.value)
                      }
                      placeholder="Ingresa tus apellidos"
                    />
                  </div>
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
                    <label>Nombre de usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.inputUserName}
                      onInput={(e) =>
                        this.updateUserNameInputValue(e.target.value)
                      }
                      placeholder="Ingresa un nombre de usuario"
                    />
                  </div>
                  <div className="form-group">
                    <label>Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      value={this.state.inputPassword}
                      onInput={(e) =>
                        this.updatePasswordInputValue(e.target.value)
                      }
                      placeholder="Ingresa una contraseña"
                    />
                  </div>
                  <button
                    type="button"
                    style={{
                      width: "370px",
                      marginTop: "30px",
                      marginBottom: "10px",
                    }}
                    className="btn btn-primary btn-block"
                    onClick={this.signUpVerification}
                  >
                    Registrarse
                  </button>
                </form>
              </Col>
              <Col xs={{ order: "last" }}></Col>
            </Row>
          </Container>
        </div>
      );
    }
    else {
      return <div></div>;
    }
  }
}
export default SignUp;
