import React, { useState } from 'react';
import { useHistory } from "react-router-dom"
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";


export default () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");



    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        let body = {
            email: Email,
            password: Password
        };

        dispatch(loginUser(body))
        .then( res => {
            if(res.payload.success){
                history.push('/'); 
            } else {
                alert('다시 시도해주세요');
            }
        })
        .catch(e => console.log(e));
        
    
    }



    return (
        <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '95vh'
        }}>
            <form style = {{display: 'flex', flexDirection: 'column'}}
                onSubmit = {onSubmitHandler}
            >
                
                <label>Email</label>
                <input type = 'email' value={Email} onChange = {onEmailHandler}/>
                <label>Password</label>
                <input type = 'password' value={Password} onChange = {onPasswordHandler}/>

                <br/>

                <button>
                    Log in
                </button>

            </form>
        </div>
    )
}
