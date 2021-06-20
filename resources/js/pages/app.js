import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import 'antd/dist/antd.css';
import Landing from "./views/Landing/Landing";
import PrintView from "./views/PrintView/PrintView"
import StoreRegister from "./views/StoreRegister/StoreRegister";
import './app.scss'
import UserLogin from "./views/Auth/UserLogin/UserLogin";
import history from "./components/history";
import UserRegister from "./views/Auth/UserRegister/UserRegister";

export default class App extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/print">
                        <PrintView />
                    </Route>
                    <Route path="/store-register">
                        <StoreRegister />
                    </Route>
                    <Route path="/user-login">
                        <UserLogin />
                    </Route>
                    <Route path="/user-register">
                        <UserRegister />
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
