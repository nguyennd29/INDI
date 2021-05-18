import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import 'antd/dist/antd.css';
import Landing from "./views/Landing/Landing";
import PrintView from "./views/PrintView/PrintView"
export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/print">
                        <PrintView />
                    </Route>
                    <Route path="/">
                        <Landing />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
