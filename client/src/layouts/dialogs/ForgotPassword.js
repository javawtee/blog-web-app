import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, TextField} from '@material-ui/core';
import {validateEmail} from '../../misc/validator';

export class ForgotPassword extends Component {
    state = {email: "", error: false}
    componentWillReceiveProps = nextProps => {
        if(nextProps.open) this.setState({email: "", error: false})
    }
    onChange = e => this.setState({[e.target.name]: e.target.value})
    onClick = () => {
        if(validateEmail(this.state.email)){
            this.props.forgotPassword(this.state.email);
        } else {
            this.setState({error: true})
        }
    }
  render() {
    const {open, onClose} = this.props;
    return (
        <Dialog id="fpDialog" open={open} onClose={onClose}>
            <div className="container p-5" style={{minWidth: "30vw", minHeight: "30vh"}}>
                <div className="row pl-5">
                    <div className="col">
                        <h4>Password Recovery</h4>
                        <div>
                            We will send a new password to your email <br/>
                            <TextField name="email" value={this.state.email} onChange={this.onChange} placeholder="Enter your email"
                                    onFocus={() => this.setState({email: "", error: false})} autoFocus autoComplete="off"/> <br/>
                            <small style={{display: this.state.error ? "": "none", color: "red"}}>
                                Email might be empty or has incorrect format
                            </small><br/>
                            <button className="btn btn-primary mt-2" onClick={this.onClick}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    )
  }
}

ForgotPassword.propTypes = {
    forgotPassword: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default ForgotPassword
