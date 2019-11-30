import React from "react";
import { Route, Link, Switch } from 'react-router-dom';
import CardDeck from "./CardDeck";
import "./Flashcard.css";
import "./button.css";
import axios from "axios";

class Deck extends React.Component {
  render() {
    return (
      <div
        className="Deck"
        id={"Deck_" + this.props.deckID}
        onClick={this.props.onClick}
      >
        {this.props.deckID}
      </div>
    );
  }
}

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      didMount: false,
      deckID: "",
      data: [],
      intervalIsSet: false,
    };
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    axios.defaults.withCredentials = true;

    axios.get('http://localhost:8080/CardDeck/', {
      // credentials: this.state.credentials,
    })
      .then((res) => {
        if (this.state.data !== res.data) {
          this.setState({ data: res.data, didMount: true })
        }
      })
      .catch((error) => {

        console.error(error);

        // UNAUTHORIZED
        if (error.response.status === 401) {
          alert("YOU MUST LOGIN FIRST!");
          window.location.replace('http://localhost:3000/login');
        }
      });
  };

  renderDeck(i) {
    return <Link to={"/CardDeck/" + i} key={"deck_" + i}><Deck deckID={i} /></Link>;
  }

  handleClickDeck = i => {
    // this.props.parentCallback(i);
  };


  render() {

    if (!this.state.didMount) {
      return (<div></div>);
    } else {
      return (
        <Switch>
          <Route exact path={this.props.match.url + "/"}>
            <div className="Category">
              {this.state.data.map(str => this.renderDeck(str))}
            </div>
          </Route>

          <Route path={"/CardDeck/:deckID"} component={CardDeck} />
        </Switch>

      );
    }
  }
}

export default Category;
