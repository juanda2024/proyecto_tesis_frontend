import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./showInfo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Avatar, { genConfig } from "react-nice-avatar";

class ShowInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoPage: true,
    };
  }
  toggleRender = (RTA) => {
    this.setState({ showInfoPage: RTA });
  };

  render() {
    const { showInfoPage } = this.state;
    const { data, lastData } = this.props;
    const config = genConfig();
    //console.log(data.datasetValues);
    let columns;
    let columnsToPrint = [];
    let rowsToPrint = [];
    columns = Object.keys(data.datasetValues[0]);
    for (let i = 0; i < columns.length; i++) {
      columnsToPrint.push(<th>{columns[i]}</th>);
    }
    for (let i = 0; i < data.datasetValues.length; i++) {
      let value = [];
      for (let j = 0; j < columns.length; j++) {
        //console.log(data.datasetValues[i])
        //console.log(data.datasetValues[i][columns[j]])
        value.push(<td>{data.datasetValues[i][columns[j]].toString()}</td>);
      }
      rowsToPrint.push(<tr>{value}</tr>);
    }
    if (showInfoPage) {
      return (
        <div>
          <Container>
            <Row>
              <Col xs={{ order: "first" }} className="user-info" lg="3">
                <Container>
                  <Row xs="auto">
                    <Col>
                      <Avatar
                        className="user-image"
                        style={{ width: "16rem", height: "16rem" }}
                        {...config}
                      />
                    </Col>
                  </Row>
                  <Row xs="auto" className="user_info">
                    <Col>
                      <h4 className="bienvenido_usuario">
                        ¡Bienvenido {lastData.data.logedUserFirstName}!
                      </h4>
                    </Col>
                  </Row>
                  <Row xs="auto" className="user_info">
                    <Col>
                      <h5 className="bienvenido_usuario_logueado">
                        Aquí podrás modificar una copia de la información
                        almacenada en tu base de datos. No te preocupes, tus
                        cambios no se verán reflejados en los datos reales!{" "}
                      </h5>
                    </Col>
                  </Row>
                  <Row xs="auto" className="user_info">
                    <Col>
                      <h5 className="bienvenido_usuario_logueado">
                        Acciones permitidas:{" "}
                      </h5>
                    </Col>
                  </Row>
                  <Row xs="auto" className="user_info">
                    <Col>
                      <img
                        id="hp"
                        src="https://icon-library.com/images/icon-delete/icon-delete-16.jpg"
                        height={20}
                        width={20}
                      ></img>
                      <p className="bienvenido_usuario_logueado">
                        Eliminar columna
                      </p>
                    </Col>
                  </Row>
                  <Row xs="auto" className="user_info">
                    <Col>
                      <img
                        src="https://cdn2.iconfinder.com/data/icons/privacy-policy/512/privacy-data-policy-security-12-512.png"
                        height={20}
                        width={20}
                      ></img>
                      <p className="bienvenido_usuario_logueado">
                        Aplicar privacidad diferencial sobre esta columna!
                      </p>
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col xs lg="9" className="database_login">
                <Table
                  className="table"
                  class="table-responsive"
                  striped
                  bordered
                  hover
                >
                  <thead>
                    <tr>{columnsToPrint}</tr>
                  </thead>
                  <tbody>{rowsToPrint}</tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
export default ShowInfo;
