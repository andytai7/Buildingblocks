import React, {Component} from 'react';
import './components/css/App.css';
import Landing from './components/Landing'
import Login from './components/Login'
import { Route, Switch } from 'react-router-dom';
import Choice from "./components/Choice";
import Signup from "./components/Signup";
import LoginWithEmail from './components/LoginWithEmail';
import SignupWithEmail from './components/SignupWithEmail';
import Dashboard from './components/Dashboard';

class App extends Component {
    state = {
        profiles: null,
        userInfo: null
    };

    render() {
        const App = () => (
            <div>
                <Switch>
                    <Route path="/" exact component={Landing}/>
                    <Route path="/choice" render={() => <Choice profiles={this.state.profiles} />}/>
                    <Route path="/login" render={() => <LoginWithEmail profiles={this.state.profiles} />}/>
                    <Route path="/signup" component={SignupWithEmail}/>
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
        );
        return (
            <Switch>
                <App/>
            </Switch>
        );
    }
}

export default App;