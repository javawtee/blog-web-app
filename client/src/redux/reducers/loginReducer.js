const initialState = {
    authenticated: false,
    openForgotPassword: false,
    openChangePassword: false,
}

export default function(state = initialState , action) {
    const session = JSON.parse(sessionStorage.getItem("user"));
    const name = session ? session.name : '';
    state.name = name;
    if(action.type === "AUTHENTICATION"){
        return {
            ...state,
            authenticated: action.authenticated
        }
    } else if (action.type === "OPEN_FORGOT" || action.type === "CLOSE_FORGOT") {
        return {
            ...state,
            openForgotPassword : action.type === "OPEN_FORGOT" ? true : false
        }
    } else if (action.type === "OPEN_CHANGE" || action.type === "CLOSE_CHANGE") {
        return {
            ...state,
            openChangePassword : action.type === "OPEN_CHANGE" ? true : false
        }
    }
    return state;
}