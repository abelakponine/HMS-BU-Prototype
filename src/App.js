import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HMS from './views/hms/hms.jsx';
import Dashboard from './views/hms/dashboard.jsx';

class App extends Component {
    render(){

        return (
                <Router>
                    <Switch>
                        <Route path='/' component={HMS} exact/>
                        <Route path='/dashboard' component={Dashboard}/>
                    </Switch>
                </Router>
            )
        }
}

export default App;