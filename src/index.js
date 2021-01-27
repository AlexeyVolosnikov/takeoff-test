import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Authorization} from "./authorization/Authorization";
import {Profile} from "./profile/Profile";

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path={"/"} component={Authorization} />
            <Route path="/profile" component={Profile} />
        </Switch>
    </Router>,
  document.getElementById('root')
);
