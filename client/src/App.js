import React, { Component } from 'react';
import './App.css';

import {Route, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {isAuthenticated} from './redux/actions/login';

import Home from './layouts/Home';
import SignUp from './layouts/signup/SignUp';
import Login from './layouts/Login';
import User from './layouts/User';

class App extends Component {
  state = {authenticated: this.props.authenticated}
  componentDidMount(){
    this.props.isAuthenticated();
  }
  render(){
    return (
        <div className="App">
          <div className="col" style={{position: "fixed", marginLeft: "-5vw"}}>
            <img className="img-fluid" style={{cursor: "pointer", maxWidth: "9vw", maxHeight: "9vh"}} 
                  src="/media/home.png" alt="HOME" 
                  onClick={() => window.location.href="/"} />
          </div>
          <Switch>
            <Route exact path="/" component={() => this.props.authenticated ? <User /> : <Home />}/>
            <Route exact path="/:url(sign-up|login)" component={props => 
              this.props.authenticated ? <Redirect to="/" /> :
                                  props.match.params.url === "sign-up" ? <SignUp /> : <Login />
            } />
            <Route path="*" render={() => <h1 className="pt-3">404 PAGE NOT FOUND</h1>} />
          </Switch>
        </div>
    );
  }
}

const mapPropsToState = state => ({
  authenticated : state.login.authenticated
})

export default connect(mapPropsToState, {isAuthenticated})(App);
