const initialState = JSON.parse(sessionStorage.getItem("signup")) || {
    openCodeDialog: false,
    codeEntered: false,
    error: false,
    validationError: false,
}

export default function(state = initialState, action) {
    switch(action.type){
        case "INIT_SESSION":
            action.data.error = false;
            return action.data;
        case "NEXT":
            return {
                ...state,
                error: false,
                openCodeDialog: true,
            };
        case "VERIFY":
            return {
                ...state,
                openCodeDialog: false, // assumed
                codeEntered: true,
            }
        case "CANCEL":
            return {
                ...state,
                openCodeDialog: false,
            }
        case "ERROR":
            return {
                ...state,
                error: true,
            }
        case "VALIDATION_ERROR":
            return {
                ...state,
                validationError: true,
            }
        case "REMOVE_ERROR":
            const aState = JSON.parse(sessionStorage.getItem("signup"));
            aState.error = false;
            aState.validationError = false;
            return aState;
        default: 
            state.error = false;
            state.validationError = false;
            return state;
    }
}