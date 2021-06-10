import axios from "axios";
import { 
    GET_FEEDS 
} from "./types";


export const getFeeds = () => {
    const request = axios.get('/api/feeds')
        .then( res => res.data);

    return {
        type: GET_FEEDS,
        payload: request
    }
}