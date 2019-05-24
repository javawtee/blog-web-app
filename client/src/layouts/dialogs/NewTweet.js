import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import {Dialog, TextField} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

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
    const { children, classes, onClose } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
export class NewTweet extends Component {
    state = {tweetContent: this.props.tweetContent}
    componentWillReceiveProps = nextProps => {
        const tweetContent = nextProps.open ? nextProps.tweetContent : "";
        this.setState({tweetContent});
    }
    onChange = e => this.setState({[e.target.name]: e.target.value})
    onClose = () => {
        sessionStorage.setItem("tweeting", JSON.stringify({tweetContent: this.state.tweetContent}));
        this.props.onClose();
    }
    tweet = () => {
        sessionStorage.setItem("tweeting", JSON.stringify({tweetContent: this.state.tweetContent}));
        this.props.addTweet();
    }
    render() {
        return (
            <Dialog id="newTweetDialog" open={this.props.open} maxWidth="lg">
                <DialogTitle id="customized-dialog-title" onClose={this.onClose}>
                    New Tweet
                </DialogTitle>
                <div className="container" style={{minWidth:"30vw", minHeight: "40vh"}}>
                    <div className="row mt-2">
                        <div className="col">
                            <TextField name="tweetContent" variant="outlined" multiline fullWidth rows="8" 
                                inputProps={{
                                  maxLength: 1000,
                                }}
                                value={this.state.tweetContent} onChange={this.onChange}/>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col">
                            <span className="float-left">{this.state.tweetContent.length}/1000</span>
                            <button className="btn btn-primary float-right" onClick={this.tweet}>Tweet</button>
                        </div>
                    </div>
                </div>
            </Dialog>
        )
    }
}

NewTweet.propTypes = {
    tweetContent: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    addTweet: PropTypes.func.isRequired,
}

export default NewTweet
  