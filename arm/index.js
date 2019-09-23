import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class CardDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNo: 0,
      cardLang: "English",
      vocabList: [
        { English: "Dog", Thai: "หมา" },
        { English: "Cat", Thai: "แมว" },
        { English: "Bird", Thai: "นก" }
      ]
    };
  }
  nextCard() {
    if (this.state.cardNo < this.state.vocabList.length - 1) {
      this.setState({
        cardNo: this.state.cardNo + 1
      });
    }
  }
  backCard() {
    if (this.state.cardNo > 0) {
      this.setState({
        cardNo: this.state.cardNo - 1
      });
    }
  }

  flip() {
    if (this.state.cardLang === "English") {
      this.setState({
        cardLang: "Thai"
      });
    } else {
      this.setState({
        cardLang: "English"
      });
    }
  }

  render() {
    return (
      <div>
        <Square
          value={this.state.vocabList[this.state.cardNo][this.state.cardLang]}
          onClick={() => this.flip()}
        ></Square>
        <div>{this.state.cardNo+1}/{this.state.vocabList.length}</div>
        <button onClick={() => this.nextCard()}>Next</button>
        <button onClick={() => this.backCard()}>Back</button>
      </div>
    );
  }
}

ReactDOM.render(<CardDeck />, document.getElementById("root"));
