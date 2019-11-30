import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
// import "./index.css";
import Category from "./Category";
import CardDeck from "./CardDeck";
import LoginPage from "./loginPage";
import NavigationBar from "./NavBar";
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
      <div>
        <Router>
          <Switch>
            <Route exact path="/login">

            </Route>

            <Route path="/" component={NavigationBar}>
            </Route>
          </Switch>
        </Router>

        <Router>
          <Route path="/">

          </Route>

          <Route exact path="/Login">
            <LoginPage />
          </Route>

          <Route path="/CardDeck" component={Category} />

        </Router>

      </div>

    );
  }
}

ReactDOM.render(<MainPage />, document.getElementById("root"));

serviceWorker.unregister();
