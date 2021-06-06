import axios from "axios";
import {
    LOGIN_USER
} from "./types";

export const loginUser = (dataToSubmit) => {
    const request = axios.post('/api/users/user/login', dataToSubmit)
        .then( res => res.data );

    return {
        type: "LOGIN_USER",
        payload: request
    }
}