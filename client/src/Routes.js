import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/core/Home.js";
import Signup from "./components/user/Signup.js";
import Signin from "./components/user/Signin.js";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/signin" component={Signin}/>
            </Switch>
        </Router>
    );
};

export default Routes;