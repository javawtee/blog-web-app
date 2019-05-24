import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {completeSignUp, failValidation, cancelSignUp, removeError} from '../../redux/actions/signup';
import {validatePassword} from '../../misc/validator';

export class SignUpFinal extends Component {
  state = {
    password: "",
    confirm: "",
  }
  onChange = e => {
    this.props.removeError();
    this.setState({[e.target.name] : e.target.value});
  }
  onClick = () => {
    if(validatePassword(this.state.password, this.state.confirm)){
      this.props.completeSignUp(this.state.confirm);
    } else {
      // invalid inputs
      this.setState({password: "", confirm: ""})
      this.props.failValidation();
    }
  }
  cancelSignUp = () => {
    if(window.confirm("Are you sure? Cancellation will terminate code")){
      this.props.cancelSignUp(() => window.location.href="/");
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row" style={{display: this.props.validationError ? "" : "none", color: "red"}}>
          <div className="col-9">
              <small>
                Unable to complete signup. Please check possible errors:
                <ul>
                  <li>Password might be less than 6 characters or too simple</li>
                  <li>Confirmation might be empty or not matching to password</li>
                </ul>
              </small>
          </div>
        </div>
        <div className="row">
            <div className="col-2 pl-4">
                Password:
            </div>
            <div className="col-7">
                <input name="password" type="password" maxLength="32" value={this.state.password} onChange={this.onChange}/>
            </div>
        </div>
        <div className="row pt-1">
            <div className="col-2 pl-4">
                Confirm:
            </div>
            <div className="col-7">
                <input name="confirm" type="password" maxLength="32" value={this.state.confirm} onChange={this.onChange}/>
            </div>
        </div>
        <div className="row pt-1">
            <div className="col-11 pt-2 pl-4">
                <button className="btn btn-primary" onClick={this.onClick}>Complete</button> &nbsp;
                <button className="btn btn-danger" onClick={this.cancelSignUp}>Cancel</button>
            </div>
        </div>
      </div>
    )
  }
}

SignUpFinal.propTypes = {
  validationError: PropTypes.bool.isRequired,
  completeSignUp: PropTypes.func.isRequired,
  failValidation: PropTypes.func.isRequired,
  cancelSignUp: PropTypes.func.isRequired,
  removeError: PropTypes.func.isRequired,
}

const mapPropsToState = state => ({
  validationError: state.signup.validationError
})

export default connect(mapPropsToState, {completeSignUp, failValidation, cancelSignUp, removeError})(SignUpFinal)
