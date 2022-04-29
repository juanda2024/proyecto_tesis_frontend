import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./showInfo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

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
    if (showInfoPage) {
      return (
        <div>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
        </Table>
    </div>
      );
    }
   else {
      return <div></div>;
    }
  }
}
export default ShowInfo;
