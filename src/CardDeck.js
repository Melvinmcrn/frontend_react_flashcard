import React from "react";
// import LightSpeed from 'react-reveal/LightSpeed';
// import { useParams } from "react-router-dom";
import "./Flashcard.css";
import "./button.css";
import axios from "axios";
import Fade from 'react-reveal/Fade';
import TransitionGroup from 'react-transition-group/TransitionGroup';
var data = require("./data.json");

class Card extends React.Component {

  sendData = x => {
    this.props.parentCallback(x);
  };

  render() {
    return this.props.wordList === null ? (
      <div></div>
    ) :
      this.props.status !== "Card" ?
        (
          <div className={this.props.status} onClick={this.props.onClick} onTransitionEnd={() => this.sendData(this.props.status)}>
            {this.props.wordList[this.props.currentPage]}
          </div>
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
    let pathArray = this.props.match.url.split("/")
    let deck = pathArray[pathArray.length - 1];
    this.state = {
      status: "Card",
      currentCard: 0,
      currentPage: 0,
      deckID: deck,
      // deckID: this.state.deckID,
      data: [],
      intervalIsSet: false,
    };
    // console.log(this.state);
    this.nextCard = this.nextCard.bind(this);
    this.prevCard = this.prevCard.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 5000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    axios.defaults.withCredentials = true;

    axios.get('http://localhost:8080/CardDeck/' + this.state.deckID, {
      // credentials: this.state.credentials,
    }).then((res) => {
      if (this.state.data !== res.data) {
        this.setState({ data: res.data })
      }
    })
      .catch((error) => {
        console.error(error);

        // UNAUTHORIZED
        if (error.response.status === 401) {
          alert("YOU MUST LOGIN FIRST!");
          window.location.replace('http://localhost:3000/login');
        }
      });

  };

  getWordList(wordID) {
    return this.state.deckID === null ? null : this.state.wordID === null ? null : this.state.data.length === 0 ? null : this.state.data[wordID];
  }

  renderCard(wordID) {
    return this.getWordList(wordID) === null ? null : (
      <Card
        status={this.state.status}
        wordList={this.getWordList(wordID)}
        currentPage={this.state.currentPage}
        onClick={this.changePage}
        parentCallback={this.callbackFunction}
      />
    );
  }

  nextCard() {
    this.setState({ status: "Card Card-left-out", });
  }

  nextCardState() {
    if (this.state.currentCard + 1 < data[this.state.deckID].length) {
      this.setState({ currentCard: this.state.currentCard + 1, currentPage: 0 });
    } else {
      this.setState({ currentCard: 0, currentPage: 0 });
    }
  }

  prevCard() {
    this.setState({ status: "Card Card-right-out", });
  }

  prevCardState() {

    if (this.state.currentCard - 1 >= 0) {
      this.setState({ currentCard: this.state.currentCard - 1, currentPage: 0 });
    } else {
      this.setState({ currentCard: data[this.state.deckID].length - 1, currentPage: 0 });
    }
  }

  changePage() {
    this.setState({ status: "Card Card-flip", });
  }

  changePageState() {
    if (this.state.currentPage + 1 < data[this.state.deckID][this.state.currentCard].length) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    } else {
      this.setState({ currentPage: 0 });
    }
  }

  componentDidUpdate() {
    if (this.state.deckID !== this.state.deckID) {
      this.setState({
        currentCard: 0,
        currentPage: 0,
        deckID: this.state.deckID,
      });
    }
  }

  callbackFunction = childData => {
    switch (childData) {
      case "Card Card-flip":
        this.changePageState();
        this.setState({ status: "Card", });
        break;

      case "Card Card-left-out":
        this.nextCardState();
        this.setState({ status: "Card Card-right-in", });
        break;

      case "Card Card-right-in":
        this.setState({ status: "Card", });
        break;

      case "Card Card-right-out":
        this.prevCardState();
        this.setState({ status: "Card Card-left-in", });
        break;

      case "Card Card-left-in":
        this.setState({ status: "Card", });
        break;

      default:
        this.setState({ status: "Card", });
        break;
    }
  };

  render() {

    return (
      <div className="Card-Deck-container">
        <div className="Card-Deck">
          {this.renderCard(this.state.currentCard)}
        </div>

        <div className={"btnGroup"}>
          <button className={"btn btn-change"} onClick={this.prevCard}>Back</button>
          <button className={"btn btn-change"} onClick={this.nextCard}>Next</button>
        </div>

        {/* <TodoExample /> */}
      </div>




    );
  }
}


class TodoExample extends React.Component {
  constructor(props) {
    super(props);
    this.groupProps = {
      appear: false,
      enter: true,
      exit: true,
    };
    this.state = {
      todo: '',
      todos: [
      ].map((text, id) => ({ id, text })),
    };
    this.state.id = this.state.todos.length;
    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }
  add(event) {
    event.preventDefault();
    this.setState({
      id: this.state.id + 1,
      todos: [
        ...this.state.todos,
        { id: this.state.id, text: this.state.todo || '-' }
      ],
      todo: '',
    });
  }
  remove(event) {
    this.setState({
      todos: this.state.todos.filter(item =>
        item.id !== +event.currentTarget.getAttribute('data-id')
      )
    });

  }
  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }
  render() {
    return (
      <form onSubmit={this.add} autoComplete="off">
        <div className="col-12 mb-2">
          <TransitionGroup {...this.groupProps}>
            {this.state.todos.map((item) =>
              // The next line is what controls
              // animated transitions
              <Fade key={item.id} collapse bottom>
                <div className="card">
                  <div className="card-body justify-content-between">
                    {item.text}
                    <button
                      data-id={item.id}
                      onClick={this.remove}
                      type="button"
                      className="close"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
              </Fade>
            )}
          </TransitionGroup>
        </div>
        <div className="col-10">
          <div className="input-group mt-4 mb-1">
            <input
              type="text"
              className="form-control"
              id='todoField'
              placeholder='Input Word'
              name='todo'
              value={this.state.todo}
              onChange={this.handleChange}
            />
            <div className="input-group-append">
              <button
                onClick={this.add}
                className="btn btn-outline-primary"
                type="button"
              >
                Add Word
            </button>
            <button
                onClick={this.add}
                className="btn btn-outline-success"
                type="button"
              >
                Save Word
            </button>
            </div>
          </div>
          <small id="emailHelp" className="form-text text-muted">
            Language Count: {this.state.todos.length}
          </small>
        </div>
      </form>
    );
  }
}


export default CardDeck;