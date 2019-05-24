import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog} from '@material-ui/core';
import {validatePassword} from '../../misc/validator';

export class ChangePassword extends Component {
    state = {
        password: "",
        confirm: "", 
        error: false
    }
    componentWillReceiveProps = nextProps => {
        if(nextProps.open) this.setState({password: "", confirm: "", error: false})
    }
    onChange = e => this.setState({[e.target.name]: e.target.value})
    onClick = () => {
        if(validatePassword(this.state.password, this.state.confirm)){
            this.props.updatePassword(this.state.password);
            this.props.onClose();
        } else {
            this.setState({password:"", confirm:"", error: true})
        }
    }
  render() {
    const {open, onClose} = this.props;
    return (
        <Dialog id="changePasswordDialog" open={open}>
            <div className="container p-5" style={{minWidth: "30vw", minHeight: "30vh"}}>
                <div className="row">
                    <div className="col mb-2"><h4>Update password</h4></div>
                </div>
                <div className="row" style={{display: this.state.error ? "" : "none", color: "red"}}>
                    <div className="col">
                        <small>
                            Unable to update password. Please check possible errors:
                            <ul>
                            <li>Password might be less than 6 characters or too simple</li>
                            <li>Confirmation might be empty or not matching to password</li>
                            </ul>
                        </small>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        Password:
                    </div>
                    <div className="col-7">
                        <input name="password" type="password" maxLength="32" value={this.state.password} onChange={this.onChange}/>
                    </div>
                </div>
                <div className="row pt-1">
                    <div className="col-3">
                        Confirm:
                    </div>
                    <div className="col-7">
                        <input name="confirm" type="password" maxLength="32" value={this.state.confirm} onChange={this.onChange}/>
                    </div>
                </div>
                <div className="row pt-1">
                    <div className="col-11 pt-2 pl-4">
                        <button className="btn btn-primary" onClick={this.onClick}>Update</button> &nbsp;
                        <button className="btn btn-danger" onClick={() => onClose()}>Cancel</button>
                    </div>
                </div>
            </div>
        </Dialog>
    )
  }
}

ChangePassword.propTypes = {
    updatePassword: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default ChangePassword
