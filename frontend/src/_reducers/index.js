import { combineReducers } from "redux";
import user from "./user_reducer";
import feed from "./feed_reducer";

const rootReducer = combineReducers({
    user,
    feed
});

export default rootReducer;