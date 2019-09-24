import React from 'react';
import './Flashcard.css';
import './button.css';
var data = require('./data.json');

class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wordID: this.props.wordID,
        }
    }

    render() {
        return (
            <div className="Card">
                {this.state.wordID}
            </div>
        );
    }
}

class CardDeck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deck: null,
        }
    }

    setDeck(deck) {
        this.setState({
            deck: deck,
        });
    }

    renderCard(wordID) {
        return  (
            <Card
                wordID={wordID}
            />
        )
    }

    render() {
        // console.log(data);
        return (
            <div className='Card-Deck'>
                {this.renderCard('word01')}
            </div>
        );
    }
}


export default CardDeck;