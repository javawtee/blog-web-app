import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {initSignUpSession, cancelSignUp} from '../../redux/actions/signup';

import SignUpFirst from './SignUpFirst';
import SignUpFinal from './SignUpFinal';
import SignUpCode from '../dialogs/SignUpCode';

export class SignUp extends Component {
  componentDidMount(){
    this.props.initSignUpSession();
  }

  onClose = () => {
    this.props.cancelSignUp(() => this.props.initSignUpSession());
  }

  render() {
    return (
      <div className="container pt-5">
        <div className="row">
            <div className="col">Sign Up for <b>My Blog Site</b></div>
        </div>
        <div className="row pt-1 mt-1">
            { this.props.codeEntered ? <SignUpFinal /> : <SignUpFirst /> }
        </div>
        <div className="row pt-1">
            <SignUpCode open={this.props.openCodeDialog} onClose={this.onClose}/>
        </div>
      </div>
    )
  }
}

SignUp.propTypes = {
  initSignUpSession : PropTypes.func.isRequired,
  cancelSignUp: PropTypes.func.isRequired,
  codeEntered : PropTypes.bool.isRequired,
  openCodeDialog : PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  codeEntered: state.signup.codeEntered,
  openCodeDialog: state.signup.openCodeDialog
})

export default connect(mapStateToProps, {initSignUpSession, cancelSignUp})(SignUp)
