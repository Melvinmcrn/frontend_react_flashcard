import React from "react";
import "./Flashcard.css";
import "./button.css";

// var data = require("./data.json");

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
    fetch('http://localhost:8080/CardDeck')
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        this.setState({ data: res })});
  };

  renderDeck(i) {
    return <Deck key={i} deckID={i} onClick={() => this.sendData(i)} />;
  }

  sendData = i => {
    this.props.parentCallback(i);
  };

  render() {
    // var data = 
    return (
      <div className="Category">
        {this.state.data.map(str => this.renderDeck(str))}
        {/* {["Animal", "Fruit", "Color"].map(str => this.renderDeck(str))} */}
      </div>
    );
  }
}

export default Category;
