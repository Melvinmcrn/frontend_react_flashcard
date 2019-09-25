import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Category from './Category';
import CardDeck from './CardDeck';
import * as serviceWorker from './serviceWorker';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deckID: null,
        };
    }

    render() {
        return (
            <div className={'MainPage'} >
                <Category deckID={this.state.deckID} />
                <CardDeck deckID={this.state.deckID} />
            </div>
        )
    };
}

ReactDOM.render(<MainPage />, document.getElementById('root'));
// ReactDOM.render(<Category />, document.getElementById('root'));
// ReactDOM.render(<CardDeck />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
