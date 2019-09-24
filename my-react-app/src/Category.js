import React from "react";
import CardDeck from "./CardDeck";
import "./Flashcard.css";
import "./button.css";

class Deck extends React.Component {
  render() {
    return (
      <div className="Deck" id={"Deck_" + this.props.value}>
        {"Deck " + this.props.value}
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
        {this.renderDeck(1)}
        {this.renderDeck(2)}
        {this.renderDeck(3)}
      </div>
    );
  }
}

export default Category;
