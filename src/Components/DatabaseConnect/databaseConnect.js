import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./databaseConnect.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Avatar, { genConfig } from 'react-nice-avatar';
import Form from "react-bootstrap/Form";
import ShowInfo from "../ShowInfo/showInfo";

class DatabaseConnect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionPage: true,
      showTableComponent: false,
      proyectNamesListAvaliable: false,
      inputDatabaseConnectionNameValue: "",
      inputDatabaseUsernameValue: "", 
      inputDatabasePasswordValue: "", 
      inputDatabaseHostValue: "", 
      inputDatabasePortValue: "",
      inputDatabaseNameValue: "",
      inputDatabaseQueryValue: "",
      selectedProyect: "-",
      counterProyects: 0,
      avaliableProyects: [],
      datasetValues: []
    };
  }
  toggleRender = (RTA) => {
    this.setState({ showConnectionPage: RTA });
  };

  updateProyectPickerValue = (value) => {
    this.setState({ selectedProyect: value });
  };

  updateDatabaseConnectionNameValue = (value) => {
    this.setState({ inputDatabaseConnectionNameValue: value });
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

  updateCounterProyectsValue = (value) => {
    this.setState({ counterProyects: value });
  };

  updateShowTableComponent = () => {
    this.setState({ showTableComponent: true });
    this.toggleRender(false);
  };

  afterSetStateFinished() {
    this.setState({ proyectNamesListAvaliable: true });
  }

  loginVerification = (e) => {
    const {selectedProyect, inputDatabaseConnectionNameValue , inputDatabaseUsernameValue, inputDatabasePasswordValue,
       inputDatabaseHostValue, inputDatabasePortValue,
        inputDatabaseNameValue, inputDatabaseQueryValue } = this.state;
    const {data} = this.props;
    let options;
    if(selectedProyect === "-"){
      // intenta crear el registro del proyecto y asociarselo al usuario
      const options = {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "x-access-token": data.logedUsertoken,
        },
        body: JSON.stringify({
          connectionName: inputDatabaseConnectionNameValue,
          username: inputDatabaseUsernameValue,
          password: inputDatabasePasswordValue,
          host: inputDatabaseHostValue, 
          port: inputDatabasePortValue, 
          databaseName: inputDatabaseNameValue, 
          originalQuery: inputDatabaseQueryValue
        }),
      };
      fetch("http://localhost:3001/proyects/register/", options)
      .then((response) => response.json())
      .then((data1) => {
        if(data1 && data1.insertedId){
          const options1 = {
            method: "put",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              "x-access-token": data.logedUsertoken,
            },
            body: JSON.stringify({
              id: data1.insertedId
            }),
          };
          fetch("http://localhost:3001/users/addProyect/"+ data.logedUserId, options1)
          .then((response) => response.json())
          .then((data2) => {
            if (data2 && data2.message === "The user`s proyect was added succesfully!") {
              const options2 = {
                method: "post",
                headers: {
                  Accept: "application/json, text/plain, */*",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  connectionName: inputDatabaseConnectionNameValue,
                  username: inputDatabaseUsernameValue,
                  password: inputDatabasePasswordValue,
                  host: inputDatabaseHostValue, 
                  port: inputDatabasePortValue, 
                  databaseName: inputDatabaseNameValue, 
                  query: inputDatabaseQueryValue
                }),
              };
              fetch("http://localhost:3001/getdata/obtaininfo/", options2)
              .then((response) => response.json())
              .then((data3) => {
                console.log(data3);
                if (data3 && data3.length>0) {
                  this.setState({datasetValues: data3},
                    () => {
                      this.updateDatabaseConnectionNameValue("");
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
                  //Show general error message consulting table info
                }
              });
            } else {
              //Show general error message at relating new connection with current user
            }
          });
        }
        else{
          // Connection already exist
        }
      });
    }
    else{
      fetch("http://localhost:3001/proyects/" + selectedProyect.split("_")[1], {
        method: 'get',
        headers: new Headers({
          'x-access-token': data.logedUsertoken
      }),
      })
      .then((response) => response.json())
      .then((data) => {
        options = {
          method: "post",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            connectionName: data? data[0]? data[0].connectionName? data[0].connectionName: "": "": "",
            username: data? data[0]? data[0].username? data[0].username: "": "": "",
            password: data? data[0]? data[0].password? data[0].password: "": "": "",
            host: data? data[0]? data[0].host? data[0].host: "": "": "",
            port: data? data[0]? data[0].port? data[0].port: "": "": "",
            databaseName: data? data[0]? data[0].databaseName? data[0].databaseName: "": "": "",
            query: data? data[0]? data[0].originalQuery? data[0].originalQuery: "": "": "",
          }),
        };
        fetch("http://localhost:3001/getdata/obtaininfo/", options)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length>0) {
            this.setState({datasetValues: data},
              () => {
                this.updateDatabaseConnectionNameValue("");
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
      });
    }
  };

  componentDidMount() {
    const {data} = this.props;
    let counter = 0; 
    if (data.logedUserProyects.length > 0) {
      for (let index = 0; index < data.logedUserProyects.length; index++) {
        fetch("http://localhost:3001/proyects/" + data.logedUserProyects[index], {
          method: 'get',
          headers: new Headers({
            'x-access-token': data.logedUsertoken
        }),
        })
        .then((response) => response.json())
        .then((data) => {
          this.setState(
            { avaliableProyects: [...this.state.avaliableProyects, data] }
          );
        });
        counter+=1;
        if(counter === data.logedUserProyects.length){
          this.updateCounterProyectsValue(counter);
          this.afterSetStateFinished();
        }   
      }
    }
  }

  render() {
    const {counterProyects, selectedProyect, avaliableProyects, showConnectionPage, showTableComponent, proyectNamesListAvaliable } = this.state;
    const {data} = this.props;
    const config = genConfig();
    let Proyects;
    if (avaliableProyects.length === counterProyects) {
      Proyects = avaliableProyects.map((item, i) => (
          <Dropdown.Item eventKey={item[0].connectionName+"_"+item[0]._id+"_"+i}>{item[0].connectionName}</Dropdown.Item>
        ));
    }
    if (showConnectionPage && proyectNamesListAvaliable) {
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
                      title="Escoge un proyecto  "
                      id="dropdown-menu-align-right"
                      onSelect={this.updateProyectPickerValue}
                    >
                      {Proyects}
                    </DropdownButton>
                    </Col>
                    <Col>
                    <Form.Group>
                    <h5 className="bienvenido_usuario">Proyecto seleccionado</h5>
                    <Form.Control
                      placeholder={selectedProyect.split("_")[0]}
                      value={selectedProyect.split("_")[0]}
                      disabled
                    />
                  </Form.Group>
                  <button
                    type="button"
                    disabled={this.state.selectedProyect === "-"?true:false} 
                    style={{
                      width: "200px",
                      marginTop: "30px",
                    }}
                    className="btn btn-primary btn-block"
                    onClick={this.loginVerification}
                  >
                    Conectarse
                  </button>
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col xs lg="9" className="database_login">
                <form>
                  <h3 id="welome">Crea una conexión a tu base de datos!</h3>
                  <div className="form-group">
                    <label>Nombre de la conexión</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.inputDatabaseConnectionNameValue}
                      onInput={(e) =>
                        this.updateDatabaseConnectionNameValue(e.target.value)
                      }
                      placeholder="Ingresa el nombre con el que quieres guardar esta conexión!"
                    />
                  </div>
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
                      marginTop: "15px",
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
