import React from "react";
import { Link } from "react-router-dom";

import { Button, Form, FormGroup, Label, Input, FormFeedback, Col, Row } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class RemoveUser extends React.Component {
    constructor() {
        super();
        this.state = {
            no_of_users: 0,
            list_of_users: [],
            count_of_users: 0,
            isUserIdEmpty: false,
            isUserIdExist: false,
            isUserRemoved: false,
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    _handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.onSubmitForm();
        }
    }

    componentWillMount() {
        this.setState({
            no_of_users: this.props? this.props.location.state ? this.props.location.state.no_of_users:0:0,
            list_of_users: this.props? this.props.location.state ? this.props.location.state.list_of_users:[]:[],
            count_of_users: this.props? this.props.location.state ? this.props.location.state.count_of_users:0:0
        })
    }

    onInputChange(event) {
        this.setState({
            isUserIdEmpty: false,
            isUserIdExist: false,
            [event.target.name]: event.target.value
        });
    }

    checkIfUserIdExist() {
        const userList = this.state.list_of_users;
        const userId = this.state.userId;
        var isUserIdExist = false;
        userList.forEach((element) => {
            if (element['userId'] === userId) {
                isUserIdExist = true;
            }
        })

        if (isUserIdExist === true) {
            return true;
        }
        else {
            return false;
        }
    }

    validateData() {
        var isUserIdExist = false;
        var isUserIdEmpty = false;

        if (this.state.userId === undefined || this.state.userId === "") {
            isUserIdEmpty = true;
        }
        else if (!this.checkIfUserIdExist()) {
            isUserIdExist = true;
        }

        this.setState({
            isUserIdExist: isUserIdExist,
            isUserIdEmpty: isUserIdEmpty
        })
        if (isUserIdEmpty || isUserIdExist) {
            return false;
        }
        else {
            return true;
        }
    }

    onSubmitForm() {
        if (this.validateData()) {
            var userList = this.state.list_of_users;
            userList.forEach((element, index) => {
                if (element['userId'] === this.state.userId) {
                    userList.splice(index, 1);
                }
            });
            this.setState({
                isUserRemoved: true,
                list_of_users: userList,
                no_of_users: this.state.no_of_users - 1
            })
        }
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (localStorage.getItem('user')) {
            this.setState({
                userId: user.userId
            })
        } else {
            this.setState({
                userId: ''
            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('user', JSON.stringify(nextState));
    }

    render() {
        return (
            <>
                {this.state.isUserRemoved ?
                    <main ref="main">
                        <div style={{ textAlign: "center", display: "block", marginTop: "250px" }}>
                            <p style={{
                                color: "green",
                                fontSize: "30px"
                            }}>User Removed Successfully.</p>
                            <Link to={{
                                pathname: "/",
                                state: {
                                    no_of_users: this.state.no_of_users,
                                    list_of_users: this.state.list_of_users,
                                    count_of_users: this.state.count_of_users
                                }
                            }} style={{ textDecoration: "none", color: "white" }}>
                                <Button color="success"> GO BACK TO HOME PAGE </Button>
                            </Link>
                        </div>
                    </main>
                    :
                    this.state.no_of_users !== 0 ?
                        <main ref="main">
                            <p style={{ textAlign: "center", marginBottom: "60px", marginTop: "40px", fontSize: "40px", fontWeight: 700, color: "#3c90f7" }}>REMOVE USER</p>
                            <Form style={{ marginLeft: "200px", marginRight: "200px" }} onKeyDown={this._handleKeyDown}>
                                <FormGroup>
                                    <Label for="userId">User Id</Label>
                                    <Input
                                        type="search"
                                        name="userId"
                                        id="userId"
                                        placeholder="Enter User Id"
                                        value={this.state.userId}
                                        onChange={this.onInputChange}
                                        invalid={this.state.isUserIdEmpty || this.state.isUserIdExist ? true : false}
                                    />
                                    {this.state.isUserIdEmpty ? <FormFeedback> User Id can not be Empty </FormFeedback> : " "}
                                    {this.state.isUserIdExist ? <FormFeedback> User Id not found. </FormFeedback> : " "}
                                </FormGroup>
                                <Row form>
                                <Col>
                                <Link to={{
                                    pathname: "/",
                                    state: {
                                        no_of_users: this.state.no_of_users,
                                        list_of_users: this.state.list_of_users,
                                        count_of_users: this.state.count_of_users
                                    }
                                }} style={{ textDecoration: "none", color: "white" }}>
                                    <Button color="secondary" size="sm" style={{ float: 'right'}}> <FontAwesomeIcon icon={faArrowLeft} /> BACK TO HOME </Button>
                                </Link>
                                <Button size="sm" color="primary" onClick={this.onSubmitForm} style={{ float: 'right', marginRight: '10px'}}>Remove User</Button>
                                </Col>
                            </Row>
                            </Form>
                        </main>
                        :
                        <main ref="main">
                            <div style={{ textAlign: "center", display: "block", marginTop: "250px" }}>
                                <p style={{
                                    color: "red",
                                    fontSize: "30px"
                                }}>There is no user to remove</p>
                                <Link to={{
                                    pathname: "/",
                                    state: {
                                        no_of_users: this.state.no_of_users,
                                        list_of_users: this.state.list_of_users,
                                        count_of_users: this.state.count_of_users
                                    }
                                }} style={{ textDecoration: "none", color: "white" }}>
                                    <Button color="danger"> GO BACK TO HOME PAGE </Button>
                                </Link>
                            </div>
                        </main>
                }
            </>
        );
    }
}

export default RemoveUser;

