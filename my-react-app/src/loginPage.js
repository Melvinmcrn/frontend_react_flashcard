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
        };
        this.submitLogin.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitLogin = (e) => {
        console.log(this.state);

        // let loginData = this.state;
        fetch('http://localhost:8080/register', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
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

        };
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
                        <input type="email" name="email" className="login-input" placeholder="Email" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" className="login-input" placeholder="Username" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="login-input" placeholder="Password" />
                    </div>

                    <button type="button" className="login-btn" onClick={this.submitRegister.bind(this)}>Register</button>
                </div>
            </div>
        );

    }
}


export default LoginPage;
