import {
    GET_FEEDS
} from "../_actions/types";


export default (state = {}, action) => {
    switch(action.type){
        case GET_FEEDS:
            const feeds = action.payload.feeds
            return { ...state, feeds}
        
        default:
            return state;
    }
}