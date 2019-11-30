import React from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/NavBar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import icon from "./img/favicon.ico";

class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            // currentPage: 'HELLO',
        }
    }

    // componentWillReceiveProps() {
    //     this.setCurrentPage();
    // }

    // setCurrentPage() {
    //     console.log("YASSS")
    //     let fullLink = document.URL;
    //     let data = fullLink.split("/");
    //     let text = ''
    //     console.log(data)

    //     if (data[data.length - 2] === "CardDeck") {
    //         text="CardDeck";
    //     } else {
    //         text= data[data.length - 1];
    //     }

    //     console.log("TEXT = " + text);

    //     if (this.state.currentPage !== text) {
    //         this.setState({ currentPage: text });
    //     }

    // }

    logout() {

        alert("LOGGED OUT, SEE YOU LATER :D");

        axios.defaults.withCredentials = true;

        axios.get('http://localhost:8080/logout/')
            .then((res) => {
                if (res.status === 200) {
                    window.location.replace("http://localhost:3000/login");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getUsername() {
        axios.defaults.withCredentials = true;

        axios.get('http://localhost:8080/getUsername/')
            .then((res) => {
                if (res.status === 200) {
                    this.setState({ username: res.data });
                } else {
                    console.log(res);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this.getUsername();
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="http://localhost:3000/CardDeck/">
                    <img
                        alt=""
                        src={icon}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Flashcard
            </Navbar.Brand>
                {/* <Nav.Link>{this.state.currentPage}</Nav.Link> */}
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>{this.state.username.length ? "welcome, " + this.state.username : ""}</Navbar.Text>
                    <Button variant="outline-info" onClick={this.logout}>Logout</Button>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavigationBar;