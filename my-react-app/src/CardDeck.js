import React from "react";
import "./Flashcard.css";
import "./button.css";
var data = require("./data.json");

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0
    };
  }

  render() {
    return this.props.wordList.length === 0 ? (
      <div></div>
    ) : (
      <div className={this.props.status}>
        {this.props.wordList[this.state.currentPage]}
      </div>
    );
  }
}

class CardDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: 0
    };
    this.nextCard = this.nextCard.bind(this);
    this.backCard = this.backCard.bind(this);
  }

  getWordList(wordID) {
    return this.props.deckID === null ? null : data[this.props.deckID][wordID];
  }

  renderCard(wordID) {
    return this.getWordList(wordID) === null ? null : (
      <Card wordList={this.getWordList(wordID)} status={"Card"} />
    );
  }

  nextCard() {
    var tmp = this.state.currentCard + 1;
    if (tmp < data[this.props.deckID].length) {
      this.setState({ currentCard: tmp });
    }
  }

  backCard() {
    var tmp = this.state.currentCard - 1;
    if (tmp >= 0) {
      this.setState({ currentCard: tmp });
    }
  }

  render() {
    return (
      <div>
        <div className="Card-Deck">
          {this.renderCard(this.state.currentCard)}
        </div>
        <button onClick={this.backCard}>Back</button>
        <button onClick={this.nextCard}>Next</button>
      </div>
    );
  }
}

export default CardDeck;
