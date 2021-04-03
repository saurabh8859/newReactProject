import React from "react";
import { Link } from "react-router-dom";

import { Col, Row, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class AddUser extends React.Component {
    constructor() {
        super();
        this.state = {
            no_of_users: 0,
            list_of_users: [],
            count_of_users: 0,
            isNameEmpty: false,
            isEmailEmpty: false,
            isAddressEmpty: false,
            isJoiningDateEmpty: false,
            isEmailValid: false,
            isUserAdded: false,
            isEmailExist: false,
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
            no_of_users: this.props ? this.props.location.state ? this.props.location.state.no_of_users : 0 : 0,
            list_of_users: this.props ? this.props.location.state ? this.props.location.state.list_of_users : [] : [],
            count_of_users: this.props ? this.props.location.state ? this.props.location.state.count_of_users : 0 : 0
        })
    }

    onInputChange(event) {
        if (event.target.name === "name") {
            this.setState({
                isNameEmpty: false,
                [event.target.name]: event.target.value
            })
        }

        else if (event.target.name === "email") {
            this.setState({
                isEmailEmpty: false,
                isEmailValid: false,
                isEmailExist: false,
                [event.target.name]: event.target.value
            })
        }

        else if (event.target.name === "address") {
            this.setState({
                isAddressEmpty: false,
                [event.target.name]: event.target.value
            })
        }

        if (event.target.name === "joiningDate") {
            this.setState({
                isJoiningDateEmpty: false,
                [event.target.name]: event.target.value
            })
        }
    }

    checkEmailExist() {
        const userList = this.state.list_of_users;
        const email = this.state.email;
        var isEmailExist = false;
        userList.forEach((element) => {
            if (element['email'] === email) {
                isEmailExist = true;
            }
        })

        if (isEmailExist) {
            return true;
        }
        else {
            return false;
        }
    }

    validateData() {
        var isNameEmpty = false;
        var isEmailEmpty = false;
        var isAddressEmpty = false;
        var isJoiningDateEmpty = false;
        var isEmailValid = false;
        var isEmailExist = false;
        if (this.state.name === undefined || this.state.name === "") {
            isNameEmpty = true;
        }
        if (this.state.address === undefined || this.state.address === "") {
            isAddressEmpty = true;
        }
        if (this.state.joiningDate === undefined || this.state.joiningDate === "") {
            isJoiningDateEmpty = true;
        }

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        if (this.state.email === undefined || this.state.email === "") {
            isEmailEmpty = true;
        }
        else if (!re.test(String(this.state.email).toLowerCase())) {
            isEmailValid = true;
        }
        else if (this.checkEmailExist()) {
            isEmailExist = true;
        }

        this.setState({
            isNameEmpty: isNameEmpty,
            isEmailEmpty: isEmailEmpty,
            isEmailValid: isEmailValid,
            isJoiningDateEmpty: isJoiningDateEmpty,
            isAddressEmpty: isAddressEmpty,
            isEmailExist: isEmailExist
        })

        if (isNameEmpty || isEmailEmpty || isAddressEmpty || isJoiningDateEmpty || isEmailValid || isEmailExist) {
            return false;
        }
        else {
            return true;
        }
    }

    onSubmitForm() {
        if (this.validateData()) {
            var userId = this.state.name.split(' ')[0].toLowerCase() + this.state.count_of_users;
            var list_of_users = this.state.list_of_users;
            var newUserData = {
                userId: userId,
                name: this.state.name,
                email: this.state.email,
                address: this.state.address,
                joiningDate: this.state.joiningDate
            };

            list_of_users.push(newUserData);

            this.setState({
                no_of_users: this.state.no_of_users + 1,
                isUserAdded: true,
                list_of_users: list_of_users,
                count_of_users: this.state.count_of_users + 1
            });
        }
    }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (localStorage.getItem('user')) {
            this.setState({
                name: userData.name,
                email: userData.email,
                address: userData.address,
                joiningDate: userData.joiningDate
            })
        } else {
            this.setState({
                name: '',
                email: '',
                address: '',
                joiningDate: ''
            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('user', JSON.stringify(nextState));
    }

    render() {
        return (
            <>
                {!this.state.isUserAdded ?
                    <main ref="main">
                        <p style={{ textAlign: "center", marginBottom: "40px", marginTop: "50px", fontSize: "40px", fontWeight: 700, color: "#3c90f7" }}>ADD USER</p>
                        <Form style={{ marginLeft: "200px", marginRight: "200px" }} onKeyDown={this._handleKeyDown}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="Name">Name</Label>
                                        <Input
                                            type="search"
                                            name="name"
                                            id="name"
                                            placeholder="Enter Name"
                                            value={this.state.name}
                                            onChange={this.onInputChange}
                                            invalid={this.state.isNameEmpty ? true : false}
                                        />
                                        {this.state.isNameEmpty ? <FormFeedback> Name can not be Empty </FormFeedback> : " "}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input
                                            type="search"
                                            name="email"
                                            id="email"
                                            placeholder="Enter Email"
                                            value={this.state.email}
                                            onChange={this.onInputChange}
                                            invalid={this.state.isEmailEmpty || this.state.isEmailValid || this.state.isEmailExist ? true : false}
                                        />
                                        {this.state.isEmailEmpty ? <FormFeedback> Email can not be Empty </FormFeedback> : " "}
                                        {this.state.isEmailValid ? <FormFeedback> Email is not valid</FormFeedback> : " "}
                                        {this.state.isEmailExist ? <FormFeedback> Email already exist</FormFeedback> : " "}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="address">Address</Label>
                                <Input
                                    type="search"
                                    name="address"
                                    id="address"
                                    placeholder="Enter Address"
                                    value={this.state.address}
                                    onChange={this.onInputChange}
                                    invalid={this.state.isAddressEmpty ? true : false}
                                />
                                {this.state.isAddressEmpty ? <FormFeedback> Address can not be Empty </FormFeedback> : " "}
                            </FormGroup>
                            <FormGroup>
                                <Label for="joiningDate">Joining Date</Label>
                                <Input
                                    type="date"
                                    name="joiningDate"
                                    id="joiningDate"
                                    value={this.state.joiningDate}
                                    onChange={this.onInputChange}
                                    invalid={this.state.isJoiningDateEmpty ? true : false}
                                />
                                {this.state.isJoiningDateEmpty ? <FormFeedback> Joining Date can not be Empty </FormFeedback> : " "}
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
                                <Button size="sm" color="primary" onClick={this.onSubmitForm} style={{ float: 'right', marginRight: '10px'}}>Add User</Button>
                                </Col>
                            </Row>
                        </Form>
                    </main>
                    :
                    <main ref="main">
                        <div style={{ textAlign: "center", display: "block", marginTop: "250px" }}>
                            <p style={{
                                color: "green",
                                fontSize: "30px"
                            }}>User Added Successfully.</p>
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
                }
            </>
        );
    }
}

export default AddUser;