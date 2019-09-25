import React from "react";
import "./Flashcard.css";
import "./button.css";
var data = require("./data.json");

function Card(props) {
  return props.word === "" ? (
    <div></div>
  ) : (
    <div className={props.status}>{props.word}</div>
  );
}

class CardDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckID: "Animal", //null,
      wordID: 0,
      status: "Card",
      currentWord: 0
    };
  }

  setDeck(deckID) {
    this.setState({
      deckID: deckID
    });
  }

  getWordList() {
    for (let i = 0; i < data.length; i++) {
      if (data[i]["deckID"] === this.state.deckID) {
        console.log("Found deckID: " + this.state.deckID);
        return data[i]["wordList"];
      }
    }
    console.log("No deck found!");
    return [""];
  }

  renderCard(wordID) {
    return (
      <Card
        word={this.getWordList()[this.state.wordID][this.state.currentWord]}
        status={this.state.status}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="Card-Deck">{this.renderCard(0)} </div>
        <button onclick="myFunction()">Click me</button>
      </div>
    );
  }
}

export default CardDeck;
