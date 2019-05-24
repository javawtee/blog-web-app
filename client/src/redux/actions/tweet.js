import {logOut} from './login';

export const openTweet = tweetContent => dispatch => {
    dispatch({type: "OPEN_TWEET", tweetContent})
}

export const closeTweet = () => dispatch => {
    dispatch({type: "CLOSE_TWEET"})
}

export const fetchTweets = () => dispatch => {
    fetch("/tweet/fetch", {
        method: "GET",
        headers: {"Accept": "application/json", "Content-Type": "application/json"},
    }).then(res => res.json())
    .then(response => {
        if(response.msg === "success"){
            dispatch({type:"FETCH_TWEETS", tweets: response.tweets});
        }
        // If failed to fetch, do nothing
    })
}

export const addTweet = tweetContent => dispatch => {
    const token = JSON.parse(sessionStorage.getItem("user"));
    fetch("/tweet/add", {
        method: "POST",
        headers: {"Accept": "application/json", "Content-Type": "application/json"},
        body: JSON.stringify({token, tweetContent})
    }).then(res => res.json())
    .then(msg => {
        if(msg === "success"){
            dispatch({type: "ADD_TWEET"})
        } else if(msg === "failure") {
            alert("Failed to tweet. Try again later!");
            dispatch({type: "CLOSE_TWEET"});
        } else {
            // invalid token found, force to logout
            logOut();
            alert("Server cannot authenticate current session.\nPlease login again");
        }
    })
}