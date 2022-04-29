import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./databaseConnect.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Avatar, { genConfig } from 'react-nice-avatar'
import ShowInfo from "../ShowInfo/showInfo";

class DatabaseConnect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionPage: true,
      showTableComponent: false,
      inputDatabaseUsernameValue: "", 
      inputDatabasePasswordValue: "", 
      inputDatabaseHostValue: "", 
      inputDatabasePortValue: "",
      inputDatabaseNameValue: "",
      inputDatabaseQueryValue: "",
      selectedProyect: "-",
      avaliableProyects: [],
      datasetValues: []
    };
  }
  toggleRender = (RTA) => {
    this.setState({ showConnectionPage: RTA });
  };

  updateDatabaseUsernameValue = (value) => {
    this.setState({ inputDatabaseUsernameValue: value });
  };

  updateDatabasePasswordValue = (value) => {
    this.setState({ inputDatabasePasswordValue: value });
  };

  updateDatabaseHostValue = (value) => {
    this.setState({ inputDatabaseHostValue: value });
  };

  updateDatabasePortValue = (value) => {
    this.setState({ inputDatabasePortValue: value });
  };

  updateDatabaseNameValue = (value) => {
    this.setState({ inputDatabaseNameValue: value });
  };

    updateDatabaseQueryValue = (value) => {
    this.setState({ inputDatabaseQueryValue: value });
  };

  updateShowTableComponent = () => {
    this.setState({ showTableComponent: true });
    this.toggleRender(false);
  };

  loginVerification = (e) => {
    const { inputDatabaseUsernameValue, inputDatabasePasswordValue,
       inputDatabaseHostValue, inputDatabasePortValue,
        inputDatabaseNameValue, inputDatabaseQueryValue } = this.state;
    const options = {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: inputDatabaseUsernameValue,
        password: inputDatabasePasswordValue,
        host: inputDatabaseHostValue, 
        port: inputDatabasePortValue, 
        databaseName: inputDatabaseNameValue, 
        query: inputDatabaseQueryValue
      }),
    };
    fetch("http://localhost:3001/getdata/obtaininfo/", options)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length>0) {
          this.setState({datasetValues: data},
            () => {
              this.updateDatabaseUsernameValue("");
              this.updateDatabasePasswordValue("");
              this.updateDatabaseHostValue("");
              this.updateDatabasePortValue("");
              this.updateDatabaseNameValue("");
              this.updateDatabaseQueryValue("");
              this.updateShowTableComponent();
            }
          );
        } else {
          //Show general error message
        }
      });
  };

  render() {
    const { showConnectionPage, showTableComponent, avaliableProyects } = this.state;
    const {data} = this.props;
    const config = genConfig();
    let Proyects;
    console.log(showTableComponent);
    if (avaliableProyects.length > 0) {
      Proyects = avaliableProyects.map((item, i) => (
        <Dropdown.Item eventKey={item.subject+"_"+i}>{item.subject}</Dropdown.Item>
      ));
    }
    if (showConnectionPage) {
      return (
        <div>
          <Container>
            <Row>
              <Col xs={{ order: "first" }} className="user-info" lg="3">
                <Container>
                  <Row xs="auto">
                    <Col>
                      <Avatar  className="user-image" style={{ width: '13rem', height: '13rem' }}  {...config}/>
                    </Col>
                  </Row>
                  <Row xs="auto" className="user_info">
                    <Col>
                      <h4 className="bienvenido_usuario">¡Bienvenido {data.logedUserFirstName}!</h4>
                    </Col>
                  </Row>
                  <Row xs="auto" className="user_info">
                    <Col>
                      <h5 className="bienvenido_usuario">tus proyectos</h5>
                    </Col>
                  </Row>
                  <Row xs="auto" className="user_info">
                    <Col>
                    <DropdownButton
                      variant="danger"
                      title="Escoge un proyecto"
                      id="dropdown-menu-align-right"
                      className="drop_proyectos"
                      onSelect={this.updateProyectPickerValue}
                    >
                      {Proyects}
                    </DropdownButton>
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col xs lg="9" className="database_login">
                <form>
                  <h3 id="welome">Conectate a tu base de datos!</h3>
                  <div className="form-group">
                    <label>Nombre de usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.inputDatabaseUsernameValue}
                      onInput={(e) =>
                        this.updateDatabaseUsernameValue(e.target.value)
                      }
                      placeholder="Ingresa el nombre de usuario"
                    />
                  </div>
                  <div className="form-group">
                    <label>Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Ingresa la contraseña"
                      value={this.state.inputDatabasePasswordValue}
                      onInput={(e) =>
                        this.updateDatabasePasswordValue(e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Host</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.inputDatabaseHostValue}
                      onInput={(e) =>
                        this.updateDatabaseHostValue(e.target.value)
                      }
                      placeholder="Ingresa el host"
                    />
                  </div>
                  <div className="form-group">
                    <label>Puerto</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.inputDatabasePortValue}
                      onInput={(e) =>
                        this.updateDatabasePortValue(e.target.value)
                      }
                      placeholder="Ingresa el puerto"
                    />
                  </div>
                  <div className="form-group">
                    <label>Nombre de base de datos</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.inputDatabaseNameValue}
                      onInput={(e) =>
                        this.updateDatabaseNameValue(e.target.value)
                      }
                      placeholder="Ingresa el nombre de la base de datos"
                    />
                  </div>
                  <div className="form-group">
                    <label>Query que deseas ejecutar</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.inputDatabaseQueryValue}
                      onInput={(e) =>
                        this.updateDatabaseQueryValue(e.target.value)
                      }
                      placeholder="Ingresa el query SQL"
                    />
                  </div>
                  <button
                    type="button"
                    style={{
                      width: "350px",
                      marginTop: "30px",
                      marginBottom: "10px",
                    }}
                    className="btn btn-primary btn-block"
                    onClick={this.loginVerification}
                  >
                    Conectar
                  </button>
                </form>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    console.log("si llega");
    console.log(showTableComponent);
    if(showTableComponent){
      return (
        <div>
          <ShowInfo showLastPage={this.toggleRender} data={this.state} />
        </div>
      );
    }
   else {
      return <div></div>;
    }
  }
}
export default DatabaseConnect;
