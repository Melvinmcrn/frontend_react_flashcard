import React from 'react';
import CardDeck  from './CardDeck';
import './Flashcard.css';
import './button.css';


class Deck extends React.Component {
  render() {
    return (
      <div
        className="Deck"
        id={"Deck_" + this.props.value}
      >
        {'Deck ' + this.props.value}
      </div>
    );
  }
}

class Category extends React.Component {

  getDeck(i) {
    return (
      <Deck
        value={i}
      />
    )
  }

  render() {
    return (
      <div
        className="Category"
      >
        {this.getDeck(1)}
        {this.getDeck(2)}
        {this.getDeck(3)}
      </div>
    );
  }
}

export default Category;
