import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    AUTH_USER
} from "../_actions/types";


export default (state = {}, action) => {
    switch(action.type){
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload}
        case REGISTER_USER:
            return { ...state, registerSuccess: action.payload}
        case LOGOUT_USER:
            return { ...state, logoutSuccess: action.payload}
        case AUTH_USER:
            return { ...state, userData: action.payload}
            break;
        default:
            return state;
    }
}