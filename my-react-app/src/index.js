import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
// import "./index.css";
import Category from "./Category";
import CardDeck from "./CardDeck";
import LoginPage from "./loginPage";
import * as serviceWorker from "./serviceWorker";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckID: "Animal"
    };
  }

  callbackFunction = childData => {
    this.setState({ deckID: childData });
  };

  render() {
    return (
      <Router>
        <Route path="/">
        </Route>

        <Route path="/Login">
          <LoginPage />
        </Route>

        <Route path="/CardDeck" component={Category} />

        {/* <Route path="/CardDeck" >
          <Category
            deckID={this.state.deckID}
            // parentCallback={this.callbackFunction}
          />
        </Route> */}

        {/* <Route path="/CardDeck">
          <CardDeck />
        </Route> */}

      </Router>

      // <LoginPage />
      //   <div className={"MainPage"}>
      //     <Category
      //       deckID={this.state.deckID}
      //       parentCallback={this.callbackFunction}
      //     />
      //     <CardDeck deckID={this.state.deckID} />
      //   </div>
    );
  }
}

ReactDOM.render(<MainPage />, document.getElementById("root"));

serviceWorker.unregister();
