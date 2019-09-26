import React from "react";
import "./Flashcard.css";
import "./button.css";
var data = require("./data.json");

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status,
      onTransition: false,
    };
  }

  componentDidUpdate() {
    if (this.state.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }

  render() {
    return this.props.wordList === null ? (
      <div></div>
    ) : (
        <div className={this.props.status} onClick={this.props.onClick}>
          {this.props.wordList[this.props.currentPage]}
        </div>
      );
  }
}

class CardDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Card",
      currentCard: 0,
      currentPage: 0,
      deckID: this.props.deckID,
    };
    this.nextCard = this.nextCard.bind(this);
    this.backCard = this.backCard.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  getWordList(wordID) {
    return this.props.deckID === null ? null : data[this.props.deckID][wordID];
  }

  renderCard(wordID) {
    return this.getWordList(wordID) === null ? null : (
      <Card
        status={this.state.status}
        wordList={this.getWordList(wordID)}
        currentPage={this.state.currentPage}
        onClick={this.changePage}
        onAnimationEnd={() => { this.setState({ status: "Card", }) }}
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

  changePage() {
    var tmp = this.state.currentPage + 1;
    // this.setState({ status: "Card Card-flip", });
    if (tmp < data[this.props.deckID][this.state.currentCard].length) {
      this.setState({ currentPage: tmp });
    } else {
      this.setState({ currentPage: 0 });
    }
  }

  componentDidUpdate() {
    if (this.state.deckID !== this.props.deckID) {
      this.setState({
        currentCard: 0,
        currentPage: 0,
        deckID: this.props.deckID,
      });
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
