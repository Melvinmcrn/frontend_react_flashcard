import React from "react";
import "./login.scss";
import axios from "axios";

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoginOpen: true,
            isRegisterOpen: false,
        };
    }

    showLoginBox() {
        this.setState({
            isRegisterOpen: false,
            isLoginOpen: true,
        });
    }

    showRegisterBox() {
        this.setState({
            isRegisterOpen: true,
            isLoginOpen: false,
        });
    }

    render() {
        return (
            <div className="root-container">

                <div className="box-controller">
                    <div className={"controller " + (this.state.isLoginOpen ? "selected-controller" : "")} onClick={this.showLoginBox.bind(this)}>
                        Login
                    </div>
                    <div className={"controller " + (this.state.isRegisterOpen ? "selected-controller" : "")} onClick={this.showRegisterBox.bind(this)}>
                        Register
                    </div>
                </div>

                <div className="box-container">
                    {this.state.isLoginOpen && <LoginBox />}
                    {this.state.isRegisterOpen && <RegisterBox />}
                </div>
            </div>
        );
    }

}

class LoginBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            credentials: { username: '', password: '' },
            errorMessage: '',
        };
        this.submitLogin.bind(this);
        this.handleChange.bind(this);
    }

    handleChange = (e) => {
        let tempCredentials = this.state.credentials;
        tempCredentials[e.target.name] = e.target.value;
        this.setState({
            credentials: tempCredentials
        })
    }

    submitLogin = (e) => {
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:8080/login', {
            credentials: this.state.credentials,
        })
            .then((response) => {
                console.log("LOGIN SUCCESS");
                this.setState({ errorMessage: '' });
                // [TODO] REDIRECT BECAUSE LOGIN SUCCESS
            })
            .catch((error) => {
                console.error(error.response.data);
                switch (error.response.status) {
                    case 700:
                        // username or password missing
                        this.setState({ errorMessage: "PLEASE INPUT USERNAME AND PASSWORD" });
                        break;
                    case 701:
                        // username not found in db
                        this.setState({ errorMessage: "USERNAME NOT FOUND" });
                        break;
                    case 702:
                        // wrong password
                        this.setState({ errorMessage: "WRONG PASSWORD" });
                        break;
                    default:
                        // some error
                        this.setState({ errorMessage: "ERROR! PLEASE TRY AGAIN LATER" });
                        break;
                }
            })
            .then(() => {
                // console.log("Login done.");
            });
    }

    render() {

        return (
            <div className="inner-container">
                <div className="header">
                    Login
                </div>

                <div className="box">

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" className="login-input" placeholder="Username" onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="login-input" placeholder="Password" onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="error-message">{this.state.errorMessage}</div>

                    <button type="button" className="login-btn" onClick={this.submitLogin}>Login</button>
                </div>
            </div>
        );

    }
}

class RegisterBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            credentials: { email: '', username: '', password: '' },
            errorMessage: '',
        };
        this.submitRegister.bind(this);
        this.handleChange.bind(this);
    }

    handleChange = (e) => {
        let tempCredentials = this.state.credentials;
        tempCredentials[e.target.name] = e.target.value;
        this.setState({
            credentials: tempCredentials
        })
    }

    submitRegister = (e) => {
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:8080/register', {
            credentials: this.state.credentials,
        })
            .then((response) => {
                console.log("REGISTER SUCCESS");
                this.setState({ errorMessage: '' });
                // [TODO] REDIRECT BECAUSE REGISTER SUCCESS
            })
            .catch((error) => {
                console.error(error.response.data);
                switch (error.response.status) {
                    case 705:
                        // username or password missing
                        this.setState({ errorMessage: "THIS USERNAME IS ALREADY EXISTED" });
                        break;
                    case 706:
                        // username not found in db
                        this.setState({ errorMessage: error.response.data });
                        break;
                    default:
                        // some error
                        this.setState({ errorMessage: "ERROR! PLEASE TRY AGAIN LATER" });
                        break;
                }
            })
            .then(() => {
                // console.log("Register done.");
            });
    }

    render() {
        return (
            <div className="inner-container">
                <div className="header">
                    Register
                </div>

                <div className="box">

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" className="login-input" placeholder="Email" onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" className="login-input" placeholder="Username" onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="login-input" placeholder="Password" onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="error-message">{this.state.errorMessage}</div>

                    <button type="button" className="login-btn" onClick={this.submitRegister}>Register</button>
                </div>
            </div>
        );

    }
}


export default LoginPage;
