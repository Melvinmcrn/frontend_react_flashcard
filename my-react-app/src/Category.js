import React from "react";
import CardDeck from "./CardDeck";
import "./Flashcard.css";
import "./button.css";

var data = require("./data.json")

class Deck extends React.Component {
  render() {
    return (
      <div className="Deck" id={"Deck_" + this.props.value}>
        {data[this.props.value].deckID}
      </div>
    );
  }
}

class Category extends React.Component {
  renderDeck(i) {
    return <Deck value={i} />;
  }

  setDeck(deck) {
    CardDeck.setDeck(deck);
  }

  render() {
    return (
      <div className="Category">
        {this.renderDeck(0)}
        {this.renderDeck(1)}
        {this.renderDeck(2)}
      </div>
    );
  }
}

export default Category;