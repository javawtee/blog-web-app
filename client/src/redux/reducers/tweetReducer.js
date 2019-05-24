const initialState = {
    tweets: [],
    openTweetDialog: false,
    tweetContent: "",
}

export default function(state = initialState , action) {
    switch(action.type){
        case "OPEN_TWEET":
            return {
                ...state,
                openTweetDialog: true,
                tweetContent: action.tweetContent,
            }
        case "CLOSE_TWEET":
            return {
                ...state,
                openTweetDialog: false,
                tweetContent: "",
            }
        case "FETCH_TWEETS":
            return {
                ...state,
                tweets: action.tweets,
            }
        case "ADD_TWEET":
            return state;
        default:
            return state;
    }
}