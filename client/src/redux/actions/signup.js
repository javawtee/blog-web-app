import ip from 'ip';

const storeSession = newSession => {
    sessionStorage.setItem("signup", JSON.stringify(newSession))
}

export const initSignUpSession = () => dispatch => {
    if(!sessionStorage.getItem("signup")){
        const signupSession = {
          time: (new Date()).getTime(),
          ip: ip.address(),
          name: '',
          email: '',
          openCodeDialog: false,
          codeEntered: false,
        }
        storeSession(signupSession);
    }
    dispatch({type: "INIT_SESSION", data: JSON.parse(sessionStorage.getItem("signup"))})
}

export const nextStep = (name, email) => dispatch => {
    var signupSession = JSON.parse(sessionStorage.getItem("signup"));
    signupSession.name = name;
    signupSession.email = email;
    signupSession.openCodeDialog = true;
    fetch("/user/sign-up/first", {
        method: "POST",
        headers: {"Accept": "application/json", "Content-Type": "application/json"},
        body: JSON.stringify(signupSession)
    }).then(res => res.json())
    .then(msg => {
        if(msg === "success"){ 
            storeSession(signupSession);
            dispatch({type: "NEXT"})
        } else if(msg === "invalid"){
            signupSession = JSON.parse(sessionStorage.getItem("signup"));
            dispatch({type: "ERROR"})
        } else { // msg: "failure"
            alert("Failed to send email. Try again later!");
        }
    })
}

export const failValidation = () => dispatch => {
    dispatch({type: "VALIDATION_ERROR"})
}

export const removeError = () => dispatch => {
    dispatch({type:"REMOVE_ERROR"})
}

export const verifyCode = code => dispatch => {
    const signupSession = JSON.parse(sessionStorage.getItem("signup"));
    signupSession.code = code;
    // verify code with server
    fetch("/user/sign-up/verify", {
        method: "POST",
        headers: {"Accept": "application/json", "Content-Type": "application/json"},
        body: JSON.stringify(signupSession)
    }).then(res => res.json())
    .then(msg => {
        if(msg === "verified"){
            delete signupSession.code;
            signupSession.openCodeDialog = false;
            signupSession.codeEntered = true;
            storeSession(signupSession);
            return dispatch({type: "VERIFY"})
        } else {
            alert("Code cannot be verified");
        }
    })
}

export const cancelSignUp = cb => dispatch => {
    const signupSession = JSON.parse(sessionStorage.getItem("signup"));
    fetch("/user/sign-up/cancel", {
        method: "POST",
        headers: {"Accept": "application/json", "Content-Type": "application/json"},
        body: JSON.stringify(signupSession)
    }).then(res => res.json())
    .then(msg => {
        if(msg === "success"){
            sessionStorage.removeItem("signup");
            cb();
            dispatch({type: "CANCEL"})
        } else {
            // unknown exception
            alert("EXCEPTION");
            window.location.href = "/";
        }
    })
}

export const completeSignUp = password => () => {
    const signupSession = JSON.parse(sessionStorage.getItem("signup"));
    signupSession.name = signupSession.name.trim(); // remove leading and trailing spaces
    signupSession.password = password;
    fetch("/user/sign-up/final", {
        method: "POST",
        headers: {"Accept": "application/json", "Content-Type": "application/json"},
        body: JSON.stringify(signupSession)
    }).then(res => res.json())
    .then(msg => {
        if(msg === "success"){
           sessionStorage.removeItem("signup");
           window.location.href = "/login";
        } else {
            // unknown exception
            alert("EXCEPTION");
            window.location.href = "/";
        }
    })
}