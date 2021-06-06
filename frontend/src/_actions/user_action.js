import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    AUTH_USER
} from "./types";

export const loginUser = (dataToSubmit) => {
    const request = axios.post('/api/users/login', dataToSubmit)
        .then( res => res.data );

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export const registerUser = (dataToSubmit) => {
    const request = axios.post('/api/users', dataToSubmit)
        .then( res => res.data );

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export const logoutUser = () => {
    const request = axios.get('/api/users/logout')
        .then( res => res.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export const auth = () => {
    const request = axios.get('/api/users/auth')
        .then( res => res.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}