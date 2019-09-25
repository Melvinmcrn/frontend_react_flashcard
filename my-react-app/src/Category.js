import React from "react";
import CardDeck from "./CardDeck";
import "./Flashcard.css";
import "./button.css";

var data = require("./data.json");

class Deck extends React.Component {
  render() {
    return (
      <div className="Deck" id={"Deck_" + this.props.catName}>
        {this.props.catName}
      </div>
    );
  }
}

class Category extends React.Component {
  renderDeck(i) {
    return <Deck catName={i}  />;
  }

  setDeck(deck) {
    CardDeck.setDeck(deck);
  }

  render() {
    return (
      <div className="Category">
        {this.renderDeck("Animal")}
        {this.renderDeck("Fruit")}
        {this.renderDeck("Color")}
      </div>
    );
  }
}

export default Category;
