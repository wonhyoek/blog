import {
    GET_FEEDS,
    GET_FEED_BY_ID,
    DELETE_FEED,
    UPDATE_FEED,
    CREATE_FEED
} from "../_actions/types";


export default (state = {}, action) => {
    switch(action.type){
        case GET_FEEDS:
            const feeds = action.payload.feeds
            return { ...state, feeds}
        case GET_FEED_BY_ID:
            const feed = action.payload.feed
            return { ...state, feed}
        case DELETE_FEED:
            return { ...state, ...action.payload}
        case UPDATE_FEED:
            return { ...state, ...action.payload}
        case CREATE_FEED:
            return { ...state, ...action.payload}    
        default:
            return state;
    }
}