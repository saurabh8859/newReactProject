import React from "react";
import { Link } from "react-router-dom";

import {
    Button,
    Container,
    Row,
    Col,
    Table
} from "reactstrap";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            no_of_users: 0,
            list_of_users: [],
            count_of_users: 0
        }
    }

    componentWillMount() {
        this.setState({
            no_of_users: this.props? this.props.location.state ? this.props.location.state.no_of_users:0:0,
            list_of_users: this.props? this.props.location.state ? this.props.location.state.list_of_users:[]:[],
            count_of_users: this.props? this.props.location.state ? this.props.location.state.count_of_users:0:0
        })
        localStorage.clear();
    }

    render() {
        return (
            <>  
                <main ref="main">
                    <Container style={{ textAlign: "center", paddingTop: "50px", paddingBottom: "80px" }}>
                        <Row xs="2">
                            <Col>
                                <Link 
                                    to={{
                                        pathname: "/addUser",
                                        state: {
                                            no_of_users: this.state.no_of_users,
                                            list_of_users: this.state.list_of_users,
                                            count_of_users: this.state.count_of_users
                                        }
                                    }}
                                    style={{ textDecoration: "none", color: "white" }}>

                                    <Button color="success">
                                        Add User
                                    </Button>
                                </Link>
                            </Col>
                            <Col>
                                <Link 
                                    to={{
                                        pathname: "/removeUser",
                                        state: {
                                            no_of_users: this.state.no_of_users,
                                            list_of_users: this.state.list_of_users,
                                            count_of_users: this.state.count_of_users
                                        }
                                    }}
                                    style={{ textDecoration: "none", color: "white" }}>
                                        
                                    <Button color="danger">
                                        Remove User
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                    {this.state.no_of_users === 0 ?
                    <div style={{ textAlign: "center", display: "block", marginTop: "150px" }}>
                        <p style={{
                            color: "red",
                            fontSize: "30px"
                        }}>No User to show</p>
                    </div> :
                    <Table bordered style={{ textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>User Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Joining Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.list_of_users.map((element => {
                                return(<tr key={element.userId}>
                                    <th scope="row">{element.userId}</th>
                                    <td>{element.name}</td>
                                    <td>{element.email}</td>
                                    <td>{element.address}</td>
                                    <td>{element.joiningDate}</td>
                                </tr>)
                            }))}
                        </tbody>
                    </Table> }
                </main>
            </>
        );
    }
}

export default Home;