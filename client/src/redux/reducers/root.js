import {combineReducers} from 'redux';
import signupReducer from './signupReducer';
import loginReducer from './loginReducer';
import tweetReducer from './tweetReducer';

export default combineReducers({
    signup: signupReducer,
    login: loginReducer,
    tweet: tweetReducer,
});