import React from "react";
import "./login.scss";

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
        // console.log(this.state);

        // let loginData = this.state;
        fetch('http://localhost:8080/login', {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state.credentials)
        })
            // .then((result) => { console.log(result); })
            .then((result) => result.json())
            .then((info) => { console.log(info); })
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
        };
    }

    handleChange = (e) => {
        let tempCredentials = this.state.credentials;
        tempCredentials[e.target.name] = e.target.value;
        this.setState({
            credentials: tempCredentials
        })
    }

    submitRegister(e) {

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

                    <button type="button" className="login-btn" onClick={this.submitRegister}>Register</button>
                </div>
            </div>
        );

    }
}


export default LoginPage;
