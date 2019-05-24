import ip from 'ip';

export const authenticateLogin = (email, password, keepLoggedIn) => dispatch => {
    const userIP = ip.address();
    fetch("/user/login", {
        method: "POST",
        headers: {"Accept": "application/json", "Content-Type": "application/json"},
        body: JSON.stringify({email,password, ip:userIP, keepLoggedIn})
    }).then(res => res.json())
    .then(response => {
        if(response.msg === "success"){
            if(password.length < 6){
                // prompt user to change to new password
                dispatch({type:"OPEN_CHANGE"});
            } else {
                storeToken(JSON.stringify(response.token));
                window.location.href = "/";
            }
        } else if(response.msg === "is-logged-in") {
            alert("Account is logged in another device")
        } else {
            alert("Either email or password is wrong");
        }
    })
}

export const logOut = () => dispatch => {
    const token = JSON.parse(sessionStorage.getItem("user"));
    fetch("/user/logout", {
        method: "POST",
        headers: {"Accept": "application/json", "Content-Type": "application/json"},
        body: JSON.stringify({tokenId: token.id, userName: token.name})
    }).then(res => res.json())
    .then(msg => {
        if(msg === "success"){
            removeStorages();
        } else {
            // exception: server crashes or resets
            removeStorages(); // duplicate, but intended
        }
        // logout or force to logout
        return dispatch({type: "AUTHENTICATION", authenticated: false})
    })
}

function storeToken(token){
    localStorage.setItem("user", token);
    sessionStorage.setItem("user", token);
}

function removeStorages(){
    localStorage.clear();
    sessionStorage.clear();
}

export const isAuthenticated = () => dispatch => { 
    if(sessionStorage.getItem("user")){
        // prevent from logging out when user refreshes the page
        // don't need to validate token, token is good through expiration
        return dispatch({type: "AUTHENTICATION", authenticated: true});
    }
    var token = localStorage.getItem("user");
    if(token){
        // user comes back from last login
        token = JSON.parse(token); // token was a JSON string
        const validToken = token.id && token.id !== ""; // token should contain at least id to interact with server
        if(validToken){
            // check whether token is valid in server
            fetch("/user/validate-token", {
                method: "POST",
                headers: {"Accept": "application/json", "Content-Type": "application/json"},
                body: JSON.stringify({tokenId: token.id, userName: token.name})
            }).then(res => res.json())
            .then(msg => {
                if(msg === "validated"){
                    sessionStorage.setItem("user", JSON.stringify(token));
                    dispatch({type: "AUTHENTICATION", authenticated: true});
                } else {
                    // token is either expired or invalid
                    // force to logout
                    removeStorages();
                    var alertMsg = msg === "expired" ? "Session is expired" : "Server cannot authenticate current session";
                    alertMsg = alertMsg.concat("\nPlease login again!");
                    alert(alertMsg);
                    return dispatch({type: "AUTHENTICATION", authenticated: false})
                }
            })
        } else {
            // invalid token, force to logout
            logOut();
            return dispatch({type: "AUTHENTICATION", authenticated: false})
        }
    } else {
        // no token found from last login, not authenticated
        return dispatch({type: "AUTHENTICATION", authenticated: false})
    }
}

export const openForgot = () => dispatch => {
    dispatch({type: "OPEN_FORGOT"})
}

export const closeForgot = () => dispatch => {
    dispatch({type: "CLOSE_FORGOT"})
}

export const forgotPassword = email => dispatch => {
    fetch("/user/forgot-password", {
        method: "POST",
        headers: {"Accept": "application/json", "Content-Type": "application/json"},
        body: JSON.stringify({email})
    }).then(res => res.json())
    .then(msg => {
        switch(msg){
            case "success":
                dispatch({type: "CLOSE_FORGOT"})
                return alert("Recovery email was sent, it may be under SPAM");
            case "failure":
                return alert("Recovery email can't be sent. Try again later!");                       
            case "invalid":
                return alert("Email is not found");
            default: // valid email
                dispatch({type: "CLOSE_FORGOT"})
        }
    })
}

export const closeChange = () => dispatch => {
    dispatch({type: "CLOSE_CHANGE"})
}

export const updatePassword = (email, password) => dispatch => {
    fetch("/user/update-password", {
        method: "POST",
        headers: {"Accept": "application/json", "Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    }).then(res => res.json())
    .then(msg => {
        if(msg === "success") {
            alert("Updated password successfully. Login again!")
            return dispatch({type: "CLOSE_CHANGE"})
        }
        else return alert("Failed to update password. Try again later!")
    })
}