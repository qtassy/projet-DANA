import React from 'react';
import Menu from './Menu.js';
import Home from './Home.js';
import {PrepareCardboard} from './ListModules.js';
import {Transport} from './ListModules.js';
import {BrowserRouter as Router, Route} from "react-router-dom";

class App extends React.Component{
    render(){
        return(
            <>
                <Router>
                    <Menu/>
                    <Route path="/" exact component={Home} />
                    <Route path="/FaireSesCartons" exact component={PrepareCardboard} />
                    <Route path="/LeTransport" exact component={Transport} />
                </Router>
            </>
        )
    }
}

export default App;