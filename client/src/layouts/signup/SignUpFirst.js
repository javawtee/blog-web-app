import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {nextStep, failValidation, removeError} from '../../redux/actions/signup';
import {validateEmail} from '../../misc/validator';

export class SignUpFirst extends Component {
  state = {
    name: '',
    email: '',
  }

  componentWillReceiveProps(){
    if(this.props.openCodeDialog){
      this.setState({name: '', email: ''})
    }
  }

  onChange = e => {
    this.props.removeError();
    this.setState({[e.target.name]: e.target.value})
  }

  onClick = () => {
    // remove leading, trailing and between words
    // const name = this.state.name.replace(/ +/g, "")
    if(this.state.name.length > 0 && validateEmail(this.state.email)){
      this.props.nextStep(this.state.name, this.state.email);
    } else {
      // invalid inputs
      this.props.failValidation();
    }
  }

  render() {
    return (
      <div className="container pt-3">
        <div className="row" style={{display: this.props.error ? "" : "none", color: "red"}}>
            <div className="col-9">
                <small>
                  Unable to process to next step. Please check possible errors:
                  <ul>
                    <li>Name might be taken</li>
                    <li>Email might be used</li>
                  </ul>
                </small>
            </div>
        </div>
        <div className="row" style={{display: this.props.validationError ? "" : "none", color: "red"}}>
            <div className="col-9">
                <small>
                  Unable to process to next step. Please check possible errors:
                  <ul>
                    <li>Name might be empty</li>
                    <li>Email might be empty or has incorrect format</li>
                  </ul>
                </small>
            </div>
        </div>
        <div className="row">
            <div className="col-2 pl-4">
                Name:
            </div>
            <div className="col-7">
                <input name="name" type="text" maxLength="32" value={this.state.name} onChange={this.onChange}/>
            </div>
        </div>
        <div className="row pt-1">
            <div className="col-2 pl-4">
                Email:
            </div>
            <div className="col-7">
                <input name="email" type="text" maxLength="320" value={this.state.email} onChange={this.onChange}/>
            </div>
        </div>
        <div className="row pt-1">
            <div className="col-2 pt-2 pl-4">
                <button className="btn btn-primary" onClick={this.onClick}>Next</button>
            </div>
            <div className="col pt-2 pl-4">
                <a href="/login">Have an account?</a>
            </div>
        </div>
      </div>
    )
  }
}

SignUpFirst.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  openCodeDialog: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  validationError: PropTypes.bool.isRequired,
  nextStep: PropTypes.func.isRequired,
  failValidation: PropTypes.func.isRequired,
  removeError: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  name: state.signup.name,
  email: state.signup.email,
  openCodeDialog: state.signup.openCodeDialog,
  error: state.signup.error,
  validationError: state.signup.validationError,
})

export default connect(mapStateToProps, {nextStep, failValidation, removeError})(SignUpFirst)
