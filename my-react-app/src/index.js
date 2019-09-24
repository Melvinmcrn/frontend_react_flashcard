import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Category from './Category';
import CardDeck from './CardDeck';
import * as serviceWorker from './serviceWorker';

function main() {
    return (
        <div className='MainPage'>
            <Category />
            <CardDeck />
        </div>
    );
}

ReactDOM.render(main(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
