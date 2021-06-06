import {
    LOGIN_USER
} from "../_actions/types";


export default (state = {}, action) => {
    switch(action.type){
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload}
            break;
        default:
            return state;
    }
}