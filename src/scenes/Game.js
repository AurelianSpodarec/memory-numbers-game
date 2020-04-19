import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';


import Routes from '../Routes';


const browserHistory = createBrowserHistory();

function Game() {

    return (
        <div className="bg">
            <Router history={browserHistory}>

                <Route render={({ location }) => (

                    <Routes location={location} />


                )} />
            </Router >
        </div>
    );
}

export default Game;

