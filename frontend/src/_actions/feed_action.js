import axios from "axios";
import { 
    GET_FEEDS,
    GET_FEED_BY_ID,
    DELETE_FEED,
    UPDATE_FEED,
    CREATE_FEED
} from "./types";


export const getFeeds = () => {
    const request = axios.get('/api/feeds')
        .then( res => res.data);

    return {
        type: GET_FEEDS,
        payload: request
    }
}


export const getFeedById = (dataToSubmit) => {
    const request = axios.get(`/api/feeds/${dataToSubmit.id}`)
        .then( res => res.data);

    return {
        type: GET_FEED_BY_ID,
        payload: request
    }
}


export const deleteFeed = (id) => {
    const request = axios.delete(`/api/feeds/${id}`)
        .then( res => res.data );
        console.log(request)

    return {
        type: DELETE_FEED,
        payload: request
    }
}


export const updateFeed = (dataToSubmit, id) => {
    const request = axios.put(`/api/feeds/${id}`, dataToSubmit)
        .then( res => res.data );
    

    return {
        type: UPDATE_FEED,
        payload: request
    }
}


export const createFeed = (dataToSubmit) => {
    const request = axios.post('/api/feeds', dataToSubmit)
        .then( res => res.data );

    return {
        type: CREATE_FEED,
        payload: request
    }
}

