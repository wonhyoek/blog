import {
    GET_FEEDS,
    GET_FEED_BY_ID
} from "../_actions/types";


export default (state = {}, action) => {
    switch(action.type){
        case GET_FEEDS:
            const feeds = action.payload.feeds
            return { ...state, feeds}
        case GET_FEED_BY_ID:
            const feed = action.payload.feed
            return { ...state, feed}
        default:
            return state;
    }
}