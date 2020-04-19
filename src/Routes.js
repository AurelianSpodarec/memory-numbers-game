import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import BoardScene from './scenes/BoardScene/BoardScene';


const Routing = [
    {
        path: "/",
        component: BoardScene
    },
    // {
    //     path: "/speed-test",
    //     component: SpeedTestScreen,
    // },
    // {
    //     path: "score",
    // },
]

const Routes = ({ location }) => {
    return (
        <Switch location={location}>
            {Routing.map((route =>
                <Route key={route.path} exact path={route.path} component={route.component} />
            ))}
        </Switch>
    )
}

export default Routes;