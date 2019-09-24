import React from 'react';
import './Flashcard.css';
import './button.css';
var data = require('./data.json');

// class Card extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             wordID: this.props.wordID,
//         }
//         this.deckID = this.props.deckID;
//         // this.wordList = data['wordList'];
//         // this.cur

//     }

//     render() {
//         return (
//             <div className="Card">
//                 {this.wordID}
//             </div>
//         );
//     }
// }

function Card(props) {

    return (props.word === "" ?
        <div></div>
        :
        <div
            className={props.status}
        >
            {props.word}
        </div>
    );
}

class CardDeck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deckID: "Animal",//null,
            wordID: 0,
            status: "Card",
            currentWord: 0,
        }
    }

    setDeck(deckID) {
        this.setState({
            deckID: deckID,
        });
    }

    getWordList() {
        for (let i = 0; i < data.length; i++) {
            if (data[i]['deckID'] === this.state.deckID) {
                console.log("Found deckID: " + this.state.deckID);
                return data[i]['wordList'];
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
        )
    }

    render() {
        // console.log(data);
        return (
            <div className='Card-Deck'>
                {this.renderCard(0)}
            </div>
        );
    }
}


export default CardDeck;