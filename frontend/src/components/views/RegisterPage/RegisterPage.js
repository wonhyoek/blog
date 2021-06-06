import React, { useState } from 'react';
import { useHistory } from "react-router-dom"
import axios from "axios";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";


export default () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [Email, setEmail] = useState("");
    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");



    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onUsernameHandler = (event) => {
        setUsername(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {

        event.preventDefault();

        if(Password !== ConfirmPassword){
            alert("비밀번호가 서로 일치하지 않습니다.")
        }
        
        let body = {
            email: Email,
            username: Username,
            password: Password
        };

        dispatch(registerUser(body))
        .then( res => {
            if(res.payload.success){
                history.push('/login');
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
                <label>Username</label>
                <input type = 'text' value={Username} onChange = {onUsernameHandler}/>
                <label>Password</label>
                <input type = 'password' value={Password} onChange = {onPasswordHandler}/>
                <label>Confirm Password</label>
                <input type = 'password' value={ConfirmPassword} onChange = {onConfirmPasswordHandler}/>

                <br/>

                <button>
                    Sign in
                </button>

            </form>
        </div>
    )
}
  
