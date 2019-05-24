import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logOut} from '../redux/actions/login';
import {openTweet, closeTweet, fetchTweets, addTweet} from '../redux/actions/tweet';

import NewTweet from './dialogs/NewTweet';

export class User extends Component {
    componentDidMount(){
        // check whether user is tweeting on refreshes
        if(sessionStorage.getItem("tweeting")){
            const tweetContent = JSON.parse(sessionStorage.getItem("tweeting")).tweetContent;
            if(tweetContent.length > 0) this.openTweetDialog(tweetContent)
            else sessionStorage.removeItem("tweeting");
        }
        // fetch tweets
        this.props.fetchTweets();
    }
    logOut = e => {
        e.preventDefault();
        this.props.logOut();
    }
    openTweetDialog = tweetContent => {
        if(typeof(tweetContent) !== "string") tweetContent = ""
        sessionStorage.setItem("tweeting", JSON.stringify({tweetContent}));
        this.props.openTweet(tweetContent);
    }
    validTweetContent = () => {return JSON.parse(sessionStorage.getItem("tweeting")).tweetContent.length > 0}
    closeTweetDialog = () => {
        // check whether user has tweet content
        if(this.validTweetContent()){
            // confirm before close
            if(!window.confirm("Your tweet will be lost. Do you still want to leave?")){
                // If cancel, keep dialog open
                return;
            }
        }
        sessionStorage.removeItem("tweeting");
        this.props.closeTweet();
    }
    addTweet = () => {
        if(this.validTweetContent()){
            // store new tweet in client
            const token = JSON.parse(sessionStorage.getItem("user"));
            const tweetContent = JSON.parse(sessionStorage.getItem("tweeting")).tweetContent;
            this.props.tweets.unshift({time: new Date(), userName: token.name, tweetContent});
            // persist new tweet with server
            this.props.addTweet(tweetContent);
            sessionStorage.removeItem("tweeting");
            this.props.closeTweet();
        } else {
            alert("Tweet must have content");
        }
    }
    calculateElapsedTime = time => {
        const tweetedTime = new Date(Date.parse(time)).getTime();
        var elapsedTime = (new Date()).getTime() - tweetedTime; // in ms
        elapsedTime = Math.floor(elapsedTime / 60000); // in minute
        if(elapsedTime < 60) 
            return <>{elapsedTime > 1 ? elapsedTime + " minutes ago" : elapsedTime === 0 ? "Just now" : elapsedTime + " minute ago"}</>
        elapsedTime = Math.floor(elapsedTime / 60); // in hour
        if(elapsedTime < 24) 
            return <>{elapsedTime} {elapsedTime > 1 ? "hours ago" : "hour ago"}</>
        elapsedTime = Math.floor(elapsedTime / 24); // in day
        return <>{elapsedTime} {elapsedTime > 1 ? "days ago" : "day ago"}</>
    }
  render() {
    const populateTweets = this.props.tweets.map((tweet,id) => 
        <div className="row p-2 mb-2 bg-white border rounded tweet" key={id}>
            <div className="col-2">
                <img className="img-fluid" src="./media/avatar.png" alt="avatar" />
            </div>
            <div className="col">
                <h6>{tweet.userName} <small>&middot; {this.calculateElapsedTime(tweet.time)}</small></h6>
                <p>
                    {tweet.tweetContent}
                </p>
            </div>
        </div>
    )
    return (
      <div className="container pt-2">
        <div className="row">
            <div className="col">
                <span style={{verticalAlign:"-webkit-baseline-middle"}}>
                    Hello, <b>{this.props.name}</b> &nbsp; | &nbsp;
                    <a href="false-link" onClick={this.logOut}>Logout</a>
                    <img className="tweet-img-button rounded float-right" 
                        data-toggle="tooltip" data-placement="bottom" title="New tweet"
                        onClick={this.openTweetDialog}
                        src="./media/tweet.png" alt="new-tweet" 
                    />
                </span>
            </div>
            <div className="w-100">
                <NewTweet open={this.props.openTweetDialog} onClose={this.closeTweetDialog} 
                    tweetContent={this.props.tweetContent} addTweet={this.addTweet}/>
            </div>
        </div>
        <div className="row mt-4 p-4">
            <div className="container">
                {this.props.tweets.length > 0 ? populateTweets : 
                    <>
                        <img className="img-fluid" src="/media/silence.png" alt="silence" /> <br/>
                        <small>The world is falling into a beautiful and quiet night. Break the silence with your tweet ;)</small>
                    </>
                }
            </div>
        </div>
      </div>
    )
  }
}

User.propTypes = {
    name: PropTypes.string.isRequired,
    tweets: PropTypes.array.isRequired,
    openTweetDialog: PropTypes.bool.isRequired,
    openTweet: PropTypes.func.isRequired,
    closeTweet: PropTypes.func.isRequired,
    tweetContent: PropTypes.string,
    addTweet: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired
}

const mapPropsToState = state => ({
    name: state.login.name,
    tweets: state.tweet.tweets,
    openTweetDialog: state.tweet.openTweetDialog,
    tweetContent: state.tweet.tweetContent,
})

export default connect(mapPropsToState, {logOut, openTweet, closeTweet, fetchTweets, addTweet})(User)
