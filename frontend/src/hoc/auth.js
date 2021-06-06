import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import { auth } from '../_actions/user_action'

export default (SpecificComponent, option, adminRoute = null) => {
    
    const AuthenticationCheck = (props) => {

        const dispatch = useDispatch();
        const history = useHistory();

        useEffect(() => {
            dispatch(auth())
            .then(res => {
                if(!res.payload.isAuth){
                    if(option){
                        history.push('/login')
                    } 
                } else {
                    if(option === false){
                        alert("로그인 상태에서는 접근 불가능합니다.")
                    }
                }
            })
        }, [])

        return <SpecificComponent/>;
    }

    return AuthenticationCheck
}
