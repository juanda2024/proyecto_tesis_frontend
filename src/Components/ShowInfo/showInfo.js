import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import "./showInfo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Avatar, { genConfig } from 'react-nice-avatar';
import {CSVLink, CSVDownload} from 'react-csv';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { color } from '@mui/system';

class ShowInfo extends React.Component {
  constructor(props) {
    super(props);
    this.title = React.createRef()
    this.state = {
      showModal: false,
      showInfoPage: true,
      showDPModal: false,
      showNoiseModal: false,
      showSuggestionDeleteModal: false,
      showSuggestionApplyDPModal: false,
      columSelected: "",
      columnDelete: false,
      newData: {datasetValues: []}
    };
  }
  toggleRender = (RTA) => {
    this.setState({ showInfoPage: RTA });
  };

  showModal = (e) => {
    const id = e.target.id;
    this.setState({ columSelected: id });
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  showNoiseModal = (e) => {
    const id = e.target.id;
    this.setState({ columSelected: id });
    this.setState({ showNoiseModal: true });
  };

  showSuggestionDeleteModal = (e) => {
    const id = e.target.id;
    this.setState({ columSelected: id });
    this.setState({ showSuggestionDeleteModal: true });
  };

  hideSuggestionDeleteModal = () => {
    this.setState({ showSuggestionDeleteModal: false });
  };

  showSuggestionApplyDPModal = (e) => {
    const id = e.target.id;
    this.setState({ columSelected: id });
    this.setState({ showSuggestionApplyDPModal: true });
  };

  hideSuggestionApplyDPModal = () => {
    this.setState({ showSuggestionApplyDPModal: false });
  };

  hideNoiseModal = () => {
    this.setState({ showNoiseModal: false });
  };

  showDPModal = (e) => {
    const id = e.target.id;
    this.setState({ columSelected: id });
    this.setState({ showDPModal: true });
  };

  hideDPModal = () => {
    this.setState({ showDPModal: false });
  };
  
  applyDP = (e) => {
    let valueSelected = e.target.parentNode.parentNode.children[1].children[1].value;
    let budgetDP = document.getElementById('basic-url-dp').value;
    var operacionDp;
    if(valueSelected === "Suma"){
      operacionDp = 'sum'
    }
    else if(valueSelected === "Minimo"){
      operacionDp = 'min'
    }
    else if(valueSelected === "Contar"){
      operacionDp = 'count'
    }
    else if(valueSelected === "Maximo"){
      operacionDp = 'max'
    }
    else if(valueSelected === "Promedio"){
      operacionDp = 'average'
    }
    let proyects = this.props.data.avaliableProyects;
    let proyectSelected = this.props.data.selectedProyect.split('_')[1];
    var dbname, dbhost, dbpassword, dbport, dbusername, dbtable, querySplit;
    for(let i = 0; i < proyects.length; i++){
      if(proyects[i][0]["_id"] === proyectSelected){
        dbname = proyects[i][0]["databaseName"]
        dbhost = proyects[i][0]["host"]
        dbpassword = proyects[i][0]["password"]
        dbport = proyects[i][0]["port"]
        dbusername = proyects[i][0]["username"]
        querySplit = proyects[i][0]["originalQuery"].split(" ")
        dbtable = querySplit[querySplit.length-1]
        const options = {
          method: "post",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: dbusername,
            password: dbpassword,
            host: dbhost,
            port: dbport,
            databaseName: dbname
          })
        };
        var url;
        if(valueSelected=='Minimo' || valueSelected=='Maximo'){
          let lower = document.getElementById('basic-url-min').value;
          let upper = document.getElementById('basic-url-max').value;
          url = "http://127.0.0.1:3002/" + operacionDp + "/" + dbtable + "/" + this.state.columSelected + "/" + budgetDP + "/" + lower + "/" + upper
        }
        else{
          url = "http://127.0.0.1:3002/" + operacionDp + "/" + dbtable + "/" + this.state.columSelected + "/" + budgetDP
        }
        fetch(url, options)
        .then((response) => response.json())
        .then((data3) => {
          let budgetDP = document.getElementById('result');
          budgetDP.hidden = false;
          budgetDP.innerHTML = "Resultado: " + data3;
        });
      } 
      break;
    }
  };

  applyOnChange = (e) => {
    let valor = e.target.value;
    let elementoValue = document.getElementById('countValue')
    let minValue = document.getElementById('minValue')
    let maxValue = document.getElementById('maxValue')
    if(valor==="Contar"){
      elementoValue.hidden = false;
      minValue.hidden = true;
      maxValue.hidden = true;
    }
    else if(valor==="Maximo" || valor==="Minimo"){
      minValue.hidden = false;
      maxValue.hidden = false;
    }
    else{
      elementoValue.hidden = true;
      minValue.hidden = true;
      maxValue.hidden = true;
    }
  };

  exportData = (e) => {
    
  }

  deleteColumn = (e) => {
    let proyects = this.props.data.avaliableProyects;
    let proyectSelected = this.props.data.selectedProyect.split('_')[1];
    var dbname, dbhost, dbpassword, dbport, dbusername, dbtable, querySplit;
    for(let i = 0; i < proyects.length; i++){
      if(proyects[i][0]["_id"] === proyectSelected){
        dbname = proyects[i][0]["databaseName"]
        dbhost = proyects[i][0]["host"]
        dbpassword = proyects[i][0]["password"]
        dbport = proyects[i][0]["port"]
        dbusername = proyects[i][0]["username"]
        querySplit = proyects[i][0]["originalQuery"].split(" ")
        dbtable = querySplit[querySplit.length-1]
        const options = {
          method: "post",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: dbusername,
            password: dbpassword,
            host: dbhost,
            port: dbport,
            databaseName: dbname
          })
        };
        let url = "http://localhost:3002/deleteColumn/" + dbtable + "/" + this.state.columSelected;
        fetch(url, options)
        .then(() => {
          const options2 = {
            method: "post",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: dbusername,
              password: dbpassword,
              host: dbhost, 
              port: dbport, 
              databaseName: dbname, 
              query: querySplit.join(" ")
            }),
          };
          fetch("http://localhost:3001/getdata/obtaininfo/", options2)
          .then((response) => response.json())
          .then((data3) => {
            this.setState({ newData: {datasetValues: data3}});
            this.setState({ columnDelete: true });
            this.setState({ showModal: false });
          });
        });
        break;
      } 
    }
  };

  applyNoise = (e) => {
    
    let loadingButton = document.getElementById('loading');
    loadingButton.hidden = false;
    let applyButton = document.getElementById('applyDPNoise');
    applyButton.hidden = true;
    let primary_key = document.getElementById('primary_key_value').value;
    let budget = document.getElementById('noise_budget').value;
    let proyects = this.props.data.avaliableProyects;
    let proyectSelected = this.props.data.selectedProyect.split('_')[1];
    var dbname, dbhost, dbpassword, dbport, dbusername, dbtable, querySplit;
    for(let i = 0; i < proyects.length; i++){
      if(proyects[i][0]["_id"] === proyectSelected){
        dbname = proyects[i][0]["databaseName"]
        dbhost = proyects[i][0]["host"]
        dbpassword = proyects[i][0]["password"]
        dbport = proyects[i][0]["port"]
        dbusername = proyects[i][0]["username"]
        querySplit = proyects[i][0]["originalQuery"].split(" ")
        dbtable = querySplit[querySplit.length-1]
        const options = {
          method: "post",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: dbusername,
            password: dbpassword,
            host: dbhost,
            port: dbport,
            databaseName: dbname
          })
        };
        let url = "http://localhost:3002/applydp/" + dbtable + "/" + primary_key + "/" + this.state.columSelected + "/" + budget;
        fetch(url, options)
        .then(() => {
          console.log(querySplit.join(" ") + "order by " + primary_key)
          const options2 = {
            method: "post",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: dbusername,
              password: dbpassword,
              host: dbhost, 
              port: dbport, 
              databaseName: dbname, 
              query: querySplit.join(" ") + " order by " + primary_key
            }),
          };
          fetch("http://localhost:3001/getdata/obtaininfo/", options2)
          .then((response) => response.json())
          .then((data3) => {
            this.setState({ newData: {datasetValues: data3} });
            this.setState({ columnDelete: true });
            this.setState({ showNoiseModal: false });
          });
        });
        break;
      } 
      
    }
  };

  render() {
    const { showInfoPage, showModal, showDPModal, columSelected, columnDelete, newData, showNoiseModal, showSuggestionDeleteModal, showSuggestionApplyDPModal} = this.state;
    var dataToUse;
    const {data, lastData} = this.props;
    if(columnDelete){
      dataToUse = newData;
    }
    else{
      dataToUse = data;
    }
    
    const config = genConfig();
    let columns;
    let columnsToPrint = [];
    let rowsToPrint = [];
    columns = Object.keys(dataToUse.datasetValues[0]);
    for(let i = 0; i < columns.length; i++){
        if(data.suggestionList.some(suggestion => suggestion.word === columns[i] && suggestion.action === 'delete')){
          columnsToPrint.push(
            <th>
              <div class='col'>
                <div class='row' xs="auto" className="user_info">
                  <div class="col" className="user_info"><button className="closing" onClick={this.showSuggestionDeleteModal}><img id={columns[i]} src="https://d1tq3fcx54x7ou.cloudfront.net/uploads/store/tenant_313/templateswidget/3644/image/large-f38487d9e34dc336a1630d135b7e6163.png" height={20} width={20}></img></button></div>
                  <center className="suggestion_delete">{columns[i]}</center>
                </div>
                <div class='row' xs="auto" className="user_info">   
                    <div class="col" className="user_info"><button className="closing" onClick={this.showModal}><img id={columns[i]} src="https://icon-library.com/images/icon-delete/icon-delete-16.jpg" height={20} width={20}></img></button></div>
                    <div class="col" className="user_info"><button className="closing1" onClick={this.showDPModal}><img id={columns[i]} src="https://cdn2.iconfinder.com/data/icons/privacy-policy/512/privacy-data-policy-security-12-512.png" height={20} width={20}></img></button></div>
                    <div class="col" className="user_info"><button className="closing1" onClick={this.showNoiseModal}><img id={columns[i]} src="https://static.thenounproject.com/png/904739-200.png" height={20} width={20}></img></button></div>
                </div>
              </div>
          </th>);
      }
      else if(data.suggestionList.some(suggestion => suggestion.word === columns[i] && suggestion.action === 'DP')){
        columnsToPrint.push(
          <th>
            <div class='col'>
              <div class='row' xs="auto" className="user_info">
                <div class="col" className="user_info"><button className="closing" onClick={this.showSuggestionApplyDPModal}><img id={columns[i]} src="https://logodix.com/logo/1902534.png" height={20} width={20}></img></button></div>
                <center className="suggestion_DP">{columns[i]}</center>
              </div>
              <div class='row' xs="auto" className="user_info">   
                  <div class="col" className="user_info"><button className="closing" onClick={this.showModal}><img id={columns[i]} src="https://icon-library.com/images/icon-delete/icon-delete-16.jpg" height={20} width={20}></img></button></div>
                  <div class="col" className="user_info"><button className="closing1" onClick={this.showDPModal}><img id={columns[i]} src="https://cdn2.iconfinder.com/data/icons/privacy-policy/512/privacy-data-policy-security-12-512.png" height={20} width={20}></img></button></div>
                  <div class="col" className="user_info"><button className="closing1" onClick={this.showNoiseModal}><img id={columns[i]} src="https://static.thenounproject.com/png/904739-200.png" height={20} width={20}></img></button></div>
              </div>
            </div>
        </th>);
    } 
      else{
        columnsToPrint.push(
          <th>
            <div class='col'>
              <div class='row' className="user_info">
                <center>{columns[i]}</center>
              </div>
              <div class='row' xs="auto" className="user_info">   
                  <div class="col" className="user_info"><button className="closing" onClick={this.showModal}><img id={columns[i]} src="https://icon-library.com/images/icon-delete/icon-delete-16.jpg" height={20} width={20}></img></button></div>
                  <div class="col" className="user_info"><button className="closing1" onClick={this.showDPModal}><img id={columns[i]} src="https://cdn2.iconfinder.com/data/icons/privacy-policy/512/privacy-data-policy-security-12-512.png" height={20} width={20}></img></button></div>
                  <div class="col" className="user_info"><button className="closing1" onClick={this.showNoiseModal}><img id={columns[i]} src="https://static.thenounproject.com/png/904739-200.png" height={20} width={20}></img></button></div>
              </div>
            </div>
        </th>);
      }
    }
    for (let i = 0; i < dataToUse.datasetValues.length; i++) {
      let value = [];
      for (let j = 0; j < columns.length; j++) {
        value.push(<td>{dataToUse.datasetValues[i][columns[j]].toString()}</td>);
      }
      rowsToPrint.push(<tr>{value}</tr>);
    }
    if (showInfoPage) {
      return (
        <div>
          {/* Modal de sugerencia: eliminar columna */}
          <Modal show={showSuggestionDeleteModal} onHide={this.hideSuggestionDeleteModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Sugerencia: eliminar la columna {columSelected}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mensaje">
          <Form.Text id="passwordHelpBlock" muted>
            Te sugerimos eliminar esta columna para su distribuci??n, dado que contiene datos sensibles  
          </Form.Text>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.hideSuggestionDeleteModal}>
              Entendido
            </Button>
          </Modal.Footer>
          </Modal>

          {/* Modal de sugerencia: aplicar DP sobre una columna */}
          <Modal show={showSuggestionApplyDPModal} onHide={this.hideSuggestionApplyDPModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Sugerencia: aplicar privacidad diferencial la columna {columSelected}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mensaje">
          <Form.Text id="passwordHelpBlock" muted>
            Te sugerimos que antes de distribuir la informaci??n de esta columna, apliques privacidad diferencial sobre los datos, dado que contiene posible datos
            que perjudiquen la anonimidad de una persona en especifico.
          </Form.Text>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.hideSuggestionApplyDPModal}>
              Entendido
            </Button>
          </Modal.Footer>
          </Modal>

          {/* Modal de privacidad diferencial */}
          <Modal show={showDPModal} onHide={this.hideDPModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Privacidad Diferencial sobre {columSelected}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mensaje">
          <Form.Text id="passwordHelpBlock" muted>
            ??Que calculo con privacidad diferencial deseas aplicar?
          </Form.Text>
          <Form.Select id="dp_select" onChange={this.applyOnChange}>
            <option value="Suma" selected>Suma</option>
            <option value="Promedio">Promedio</option>
            <option value="Maximo">Maximo</option>
            <option value="Minimo">Minimo</option>
            <option value="Contar">Contar por</option>
          </Form.Select>
          <Form.Text id="countValue" muted hidden={true}>
          Seleccion un valor por el cual desea contar:
          <InputGroup className="mb-3">
            <InputGroup.Text >
              Valor
            </InputGroup.Text>
            <FormControl id="basic-url" aria-describedby="basic-addon3" />
          </InputGroup>
          </Form.Text>
          <Form.Text id="minValue" muted hidden={true}>
          Valor Minimo:
          <InputGroup className="mb-3">
            <InputGroup.Text >
              Valor
            </InputGroup.Text>
            <FormControl id="basic-url-min" aria-describedby="basic-addon3" />
          </InputGroup>
          </Form.Text>
          <Form.Text id="maxValue" muted hidden={true}>
          Valor maximo:
          <InputGroup className="mb-3">
            <InputGroup.Text >
              Valor
            </InputGroup.Text>
            <FormControl id="basic-url-max" aria-describedby="basic-addon3" />
          </InputGroup>
          </Form.Text>
          <Form.Text id="passwordHelpBlock" muted>
          ??Que es el presupuesto de privacidad?

          Numero entero de 0 a infinito, donde entre mas alto sea este numero mas necesidad de proteger la informacion de tu dataset
          <InputGroup className="mb-3">
            <InputGroup.Text >
              Presupuesto de privacidad
            </InputGroup.Text>
            <FormControl id="basic-url-dp" aria-describedby="basic-addon3" />
          </InputGroup>
          </Form.Text>
          <Form.Text id="result" muted hidden={true}>
          Resultado:
          </Form.Text>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.applyDP}>
              Calcular
            </Button>
            <Button variant="secondary" onClick={this.hideDPModal}>
              Cancelar
            </Button>
          </Modal.Footer>
          </Modal>
          {/* Modal de eliminar columna */}
          <Modal show={showModal} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar columna {columSelected}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mensaje">Vas a eliminar esta columna para la vista. ??Estas seguro?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.deleteColumn}>
              Eliminar
            </Button>
            <Button variant="secondary" onClick={this.hideModal}>
              Cancelar
            </Button>
          </Modal.Footer>
          </Modal>
          {/* Modal de agregar ruido */}
          <Modal show={showNoiseModal} onHide={this.hideNoiseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Aplicar ruido con privacidad diferencial sobre {columSelected}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mensaje">
          <Form.Text id="countValue" muted>
          Escribe la Primary Key de tu tabla:
          <InputGroup className="mb-3">
            <InputGroup.Text >
              Primary Key
            </InputGroup.Text>
            <FormControl id="primary_key_value" aria-describedby="basic-addon3" />
          </InputGroup>
          </Form.Text>
          <Form.Text id="passwordHelpBlock" muted>
          ??Que es el presupuesto de privacidad?

          Numero entero de 0 a infinito, donde entre mas alto sea este numero mas necesidad de proteger la informacion de tu dataset
          <InputGroup className="mb-3">
            <InputGroup.Text >
              Presupuesto de privacidad
            </InputGroup.Text>
            <FormControl id="noise_budget" aria-describedby="basic-addon3" />
          </InputGroup>
          </Form.Text>
          </Modal.Body>
          <Modal.Footer>
          <Spinner id='loading' animation="border" role="status" hidden={true}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
            <Button id='applyDPNoise' variant="primary" hidden={false} onClick={this.applyNoise}>
              Aplicar ruido
            </Button>
            <Button variant="secondary" onClick={this.hideNoiseModal}>
              Cancelar
            </Button>
          </Modal.Footer>
          </Modal>
          <Container style={{marginLeft: "0px" }}>
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
                        ??Bienvenido {lastData.data.logedUserFirstName}!
                      </h4>
                    </Col>
                  </Row>
                  <Row xs="auto" className="user_info">
                    <Col>
                      <h5 className="bienvenido_usuario_logueado">
                        Aqu?? podr??s modificar una copia de la informaci??n
                        almacenada en tu base de datos. No te preocupes, tus
                        cambios no se ver??n reflejados en los datos reales!{" "}
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
                    <Col lg={3} className="user_info logo1">
                      <img
                        src="https://icon-library.com/images/icon-delete/icon-delete-16.jpg"
                        height={30}
                        width={30}
                      ></img>
                    </Col>
                    <Col lg={9}>
                    <p className="bienvenido_usuario_logueado">
                        Eliminar columna
                      </p>
                    </Col>
                  </Row>
                  <Row xs="auto" className="user_info">
                    <Col lg={3} className="user_info logo2">
                      <img
                        src="https://cdn2.iconfinder.com/data/icons/privacy-policy/512/privacy-data-policy-security-12-512.png"
                        height={30}
                        width={30}
                      ></img>
                    </Col>
                    <Col lg={9}>
                      <p className="bienvenido_usuario_logueado">
                        Privacidad Diferencial
                      </p>
                    </Col>
                  </Row>
                  <Row xs="auto" className="user_info">
                    <Col lg={3} className="user_info logo2">
                      <img
                        src="https://static.thenounproject.com/png/904739-200.png"
                        height={30}
                        width={30}
                      ></img>
                    </Col>
                    <Col lg={9}>
                      <p className="bienvenido_usuario_logueado">
                        Ruido a datos
                      </p>
                    </Col>
                  </Row>
                  <Row xs="auto" className="user_info">
                    <Col>
                  <CSVLink data={dataToUse.datasetValues} >
                  <button
                    type="button"
                    style={{
                      width: "200px",
                      marginTop: "30px",
                    }}
                    className="btn btn-primary btn-block"
                    onClick={this.exportData}
                  >
                    Exportar cambios
                  </button>
                  </CSVLink>
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
                >
                  <thead>
                    <tr>{columnsToPrint}</tr>
                  </thead>
                  <tbody className='tableBody'>{rowsToPrint}</tbody>
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
