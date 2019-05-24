import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {authenticateLogin, openForgot, closeForgot, forgotPassword, closeChange, updatePassword} from '../redux/actions/login';
import { Checkbox } from '@material-ui/core';
import ForgotPassword from './dialogs/ForgotPassword';
import ChangePassword from './dialogs/ChangePassword';

export class Login extends Component {
  state = {
      email: "",
      password: "",
      keepLoggedIn: false,
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.openChangePassword) 
        this.setState(prevState => ({email: nextProps.openChangePassword ? prevState.email : "", password: "", keepLoggedIn: false}))
  }
  componentDidMount = () => {
    const signupSession = sessionStorage.getItem("signup");
    if(signupSession){
        const session = JSON.parse(signupSession);
        if(session.openCodeDialog || session.codeEntered)  window.location.href = "/sign-up"
        else sessionStorage.removeItem("signup");
    }
  }
  onChange = e => this.setState({[e.target.name]: e.target.value})
  authenticateLogin = () => this.props.authenticateLogin(this.state.email, this.state.password, this.state.keepLoggedIn);
  render() {
    return (
      <div className="container pt-5">
        <div className="row">
            <div className="col">Login to <b>My Blog Site</b></div>
        </div>
        <div className="row pt-3 pl-3">
            <div className="col-2 pl-4">
                Email:
            </div>
            <div className="col-7">
                <input name="email" type="text" maxLength="320" value={this.state.email} onChange={this.onChange}/>
            </div>
        </div>
        <div className="row pt-1 pl-3">
            <div className="col-2 pl-4">
                Password:
            </div>
            <div className="col-7">
                <input name="password" type="password" maxLength="32" 
                    value={this.state.password} onChange={this.onChange} onFocus={() => this.setState({password:''})}/>
            </div>
        </div>
        <div className="row mt-3">
            <div className="col-5 pl-4">
                <Checkbox onClick={() => this.setState(prev => {return {keepLoggedIn: !prev.keepLoggedIn}})} /> Keep logged in
            </div>
            <div className="col-6">
                <button className="btn btn-primary" onClick={this.authenticateLogin}>Login</button>
            </div>
        </div>
        <div className="row pt-2 pl-4">
            <div className="col-11">
                <a href="/sign-up">Don't have account?</a>
            </div>
        </div>
        <div className="row pt-2 pl-4">
            <div className="col-11">
                <a href="false-link" onClick={e => {e.preventDefault(); this.props.openForgot()}}>Forgot password?</a>
            </div>
        </div>
        <ForgotPassword
            open={this.props.openForgotPassword} 
            onClose={() => this.props.closeForgot()} 
            forgotPassword={email => this.props.forgotPassword(email)}
        />
        <ChangePassword 
            open={this.props.openChangePassword} 
            onClose={() => this.props.closeChange()} 
            updatePassword={password => this.props.updatePassword(this.state.email, password)}
        />
      </div>
    )
  }
}

Login.propTypes = {
    authenticateLogin: PropTypes.func.isRequired,
    openForgotPassword: PropTypes.bool.isRequired,
    openForgot: PropTypes.func.isRequired,
    closeForgot: PropTypes.func.isRequired,
    forgotPassword: PropTypes.func.isRequired,
    closeChange: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired,
}

const mapPropsToState = state => ({
    openForgotPassword: state.login.openForgotPassword,
    openChangePassword: state.login.openChangePassword,
})

export default connect(mapPropsToState, {authenticateLogin, openForgot, closeForgot, forgotPassword, closeChange, updatePassword})(Login)
