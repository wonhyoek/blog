import axios from "axios";
import { 
    GET_FEEDS,
    GET_FEED_BY_ID
} from "./types";


export const getFeeds = () => {
    const request = axios.get('/api/feeds')
        .then( res => res.data);

    return {
        type: GET_FEEDS,
        payload: request
    }
}


export const getFeedById = (dataTOSubmit) => {
    const request = axios.get(`/api/feeds/${dataTOSubmit.id}`)
        .then( res => res.data);

    return {
        type: GET_FEED_BY_ID,
        payload: request
    }
}