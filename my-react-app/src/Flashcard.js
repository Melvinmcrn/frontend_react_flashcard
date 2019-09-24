import React from 'react';
// import logo from './logo.svg';
import './Flashcard.css';

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

function App() {
  return (
    <Category />
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
