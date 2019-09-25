import React from "react";
import "./Flashcard.css";
import "./button.css";
var data = require("./data.json");

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    render() {
        return this.props.wordList.length === 0 ? (
            <div></div>
        ) : (
                <div
                    className={this.props.status}
                >
                    {this.props.wordList[this.state.current]}
                </div>
            );
    }
}

class CardDeck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deckID: "Animal" //null,
        };
    }

    setDeck(deckID) {
        this.setState({
            deckID: deckID
        });
    }

    getWordList(wordID) {
        return data[this.state.deckID][wordID];
    }

    renderCard(wordID) {
        return (
            <Card
                wordList={this.getWordList(wordID)}
                status={"Card"}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="Card-Deck">{this.renderCard(0)} </div>
                {/* <button onClick="myFunction()">Click me</button> */}
            </div>
        );
    }
}

export default CardDeck;
