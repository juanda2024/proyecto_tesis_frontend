import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./databaseConnect.css";
import "bootstrap/dist/css/bootstrap.min.css";

class DatabaseConnect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionPage: true,
      inputDatasetNameValue: "",
      inputPassword: "",
      logedUsertoken: "",
      logedUserId: "",
      logedUserFirstName: "",
      logedUserLastName: "",
      logedUserEmail: "",
      logedUserUsername: "",
      logedUserpassword: "",
      logeduserRole: "",
    };
  }
  toggleRender = (RTA) => {
    this.setState({ showConnectionPage: RTA });
  };

  updateDatasetNameValue = (value) => {
    this.setState({ inputDatasetNameValue: value });
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
            },
            () => {
              this.updateEmailInputValue("");
              this.updatePasswordInputValue("");
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
    const { showConnectionPage } = this.state;
    if (showConnectionPage) {
      return (
        <div>
          <Container>
            <Row>
              <Col xs={{ order: "first" }}></Col>
              <Col xs>
                <form>
                  <h3 id="welome">Conectate a tu base de datos!</h3>
                  <div className="form-group">
                    <label>Nombre del dataset</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.inputDatasetNameValue}
                      onInput={(e) =>
                        this.updateDatasetNameValue(e.target.value)
                      }
                      placeholder="Ingresa el nombre del dataset"
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
                      width: "370px",
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
export default DatabaseConnect;
