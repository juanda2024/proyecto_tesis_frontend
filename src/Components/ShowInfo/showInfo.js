import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./showInfo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Avatar, { genConfig } from 'react-nice-avatar';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

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

  // loginVerification = (e) => {
  //   const { inputDatabaseUsernameValue, inputDatabasePasswordValue,
  //      inputDatabaseHostValue, inputDatabasePortValue,
  //       inputDatabaseNameValue, inputDatabaseQueryValue } = this.state;
  //   const options = {
  //     method: "post",
  //     headers: {
  //       Accept: "application/json, text/plain, */*",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username: inputDatabaseUsernameValue,
  //       password: inputDatabasePasswordValue,
  //       host: inputDatabaseHostValue, 
  //       port: inputDatabasePortValue, 
  //       databaseName: inputDatabaseNameValue, 
  //       query: inputDatabaseQueryValue
  //     }),
  //   };
  //   fetch("http://localhost:3001/getdata/obtaininfo/", options)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data && data.length>0) {
  //         this.setState({datasetValues: data},
  //           () => {
  //             this.updateDatabaseUsernameValue("");
  //             this.updateDatabasePasswordValue("");
  //             this.updateDatabaseHostValue("");
  //             this.updateDatabasePortValue("");
  //             this.updateDatabaseNameValue("");
  //             this.updateDatabaseQueryValue("");
  //             this.updateShowTableComponent();
  //           }
  //         );
  //       } else {
  //         //Show general error message
  //       }
  //     });
  // };

  render() {
    const { showInfoPage } = this.state;
    const {data} = this.props;
    const config = genConfig();
    console.log(data.datasetValues);
    let columns;
    let columnsToPrint = [];
    let rowsToPrint = [];
    columns = Object.keys(data.datasetValues[0])
    for(let i = 0; i < columns.length; i++){
      columnsToPrint.push(<th>{columns[i]}</th>)
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
    console.log(rowsToPrint)
    if (showInfoPage) {
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
                </Container>
              </Col>
              <Col xs lg="9" className="database_login">
              <h2></h2>
              <h2>Tu tabla:</h2>
              <Table striped bordered hover>
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
