import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./showInfo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Avatar, { genConfig } from 'react-nice-avatar';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

class ShowInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showInfoPage: true
    };
  }
  toggleRender = (RTA) => {
    this.setState({ showInfoPage: RTA });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  deleteColumn = () => {
    this.setState({ showModal: false });
  };
 
  render() {
    const { showInfoPage, showModal} = this.state;
    const {data} = this.props;
    const config = genConfig();
    console.log(data.datasetValues);
    let columns;
    let columnsToPrint = [];
    let rowsToPrint = [];
    columns = Object.keys(data.datasetValues[0])
    for(let i = 0; i < columns.length; i++){
      columnsToPrint.push(<th><center>{columns[i]}
      <button id={columns[i]} className="closing" onClick={this.showModal}><img src="https://icon-library.com/images/icon-delete/icon-delete-16.jpg" height={20} width={20}></img></button>
      <button id="close" className="closing1" onClick={this.showModal}><img src="https://cdn2.iconfinder.com/data/icons/privacy-policy/512/privacy-data-policy-security-12-512.png" height={20} width={20}></img></button></center>
      </th>)
    }
    for(let i = 0; i < data.datasetValues.length; i++){
      let value = []
      for(let j = 0; j < columns.length; j++){
        console.log(data.datasetValues[i])
        console.log(data.datasetValues[i][columns[j]])
        value.push(<td>{data.datasetValues[i][columns[j]].toString()}</td>);
      }
      rowsToPrint.push(<tr>{value}</tr>);
    } 
    if (showInfoPage) {
      return (
        <div>
          <Modal show={showModal} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar columna</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mensaje">Vas a eliminar esta columna para la vista. ¿Estas seguro?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.deleteColumn}>
              Eliminar
            </Button>
            <Button variant="primary" onClick={this.hideModal}>
              Cancelar
            </Button>
          </Modal.Footer>
          </Modal>
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
                </Container>
              </Col>
              <Col xs lg="9" className="database_login">
              <h2></h2>
              <h2>Tu tabla:</h2>
              <Table striped bordered hover className="infoTable">
                    <thead>
                        <tr>
                        {columnsToPrint}
                        </tr>
                    </thead>
                    <tbody>
                        {rowsToPrint}
                    </tbody>
                </Table>
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
export default ShowInfo;
