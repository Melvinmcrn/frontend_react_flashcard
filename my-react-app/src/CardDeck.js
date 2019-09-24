import React from 'react';
import './Flashcard.css';
import './button.css';

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

    render() {
        return (
            <div className='Card'>
                {'FUCK'}
            </div>
        );
    }
}


export default CardDeck;