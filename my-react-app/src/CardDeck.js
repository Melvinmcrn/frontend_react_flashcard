import React from "react";
import "./Flashcard.css";
import "./button.css";
var data = require("./data.json");

class Card extends React.Component {
  render() {
    return this.props.wordList === null ? (
      <div></div>
    ) : (
        <div className="Card" onClick={this.props.onClick}>
          {this.props.wordList[this.props.currentPage]}
        </div>
      );
  }
}

class CardDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: 0,
      currentPage: 0,
      deckID: this.props.deckID,
    };
    this.nextCard = this.nextCard.bind(this);
    this.backCard = this.backCard.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  getWordList(wordID) {
    return this.props.deckID === null ? null : data[this.props.deckID][wordID];
  }

  renderCard(wordID) {
    return this.getWordList(wordID) === null ? null : (
      <Card
        wordList={this.getWordList(wordID)}
        currentPage={this.state.currentPage}
        onClick={this.nextPage}
      />
    );
  }

  nextCard() {
    var tmp = this.state.currentCard + 1;
    if (tmp < data[this.props.deckID].length) {
      this.setState({ currentCard: tmp, currentPage: 0 });
    }
  }

  backCard() {
    var tmp = this.state.currentCard - 1;
    if (tmp >= 0) {
      this.setState({ currentCard: tmp, currentPage: 0 });
    }
  }

  nextPage() {
    var tmp = this.state.currentPage + 1;
    if (tmp < data[this.props.deckID][this.state.currentCard].length) {
      this.setState({ currentPage: tmp });
    } else {
      this.setState({ currentPage: 0 });
    }
  }

  render() {
    if (this.state.deckID !== this.props.deckID) {
      this.setState({
        currentCard: 0,
        currentPage: 0,
        deckID: this.props.deckID,
      });
    }

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
