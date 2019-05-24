import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {verifyCode} from '../../redux/actions/signup';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import {Dialog} from "@material-ui/core";

const DialogTitle = withStyles(theme => ({
    root: {
      borderBottom: `2px solid #083754`,
      margin: 0,
      padding: theme.spacing.unit * 2,
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing.unit,
      top: theme.spacing.unit,
      color: theme.palette.grey[500],
    },
  }))(props => {
    const { children, classes } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} style={{minWidth:"30vw"}}>
        {children}
      </MuiDialogTitle>
    );
  });

export class SignUpCode extends Component {
  state = {code:""}
  componentWillReceiveProps = nextProps => {
    if(nextProps.open) this.setState({code: ""})
  }
  onChange = e => this.setState({[e.target.name]:e.target.value})
  onClick = () => this.props.verifyCode(this.state.code)
  render() {
    return (
        <Dialog id="signupCodeDialog" open={this.props.open} maxWidth="lg">
            <DialogTitle id="customized-dialog-title">
                <h4>Email verification</h4>
                <small>Code is sent to email, maybe under SPAM</small>
            </DialogTitle>
            <div className="container pt-2">
              <div className="row">
                <div className="col-2">Code:</div>
                <div className="col-4">
                  <input name="code" type="text" maxLength="6" value={this.state.code} onChange={this.onChange} />
                </div>
              </div>
              <div className="row">
                <div className="col-8 mt-2 mb-2">
                  <button className="btn btn-primary" onClick={this.onClick}>Verify</button> &nbsp;
                  <button className="btn btn-danger" onClick={this.props.onClose}>Cancel</button>
                </div>
              </div>
            </div>
        </Dialog>
    )
  }
}

SignUpCode.propTypes = {
  verifyCode: PropTypes.func.isRequired
}

export default connect(null, {verifyCode})(SignUpCode)
