import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from '../../../_actions/user_action';

export default () => {

    const user = useSelector(state => state.user.userData);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSignOutHandler = () => {
        dispatch(logoutUser())
        .then( res => {
            if(res.payload.isAuth === false){
                history.push('/login');
            } 
        })
    }


    return (
        <div style = {{display: 'flex', justifyContent: "space-between", 
            alignItems: 'center', fontSize: "20px", padding: '20px 0px' , 
            borderBottom: "1px solid #dcdcdc" }}
        >
            <a href = '/' style = {{textDecoration: 'none', color: 'black'}}>
                <div
                    style = {{padding: "0px 20px"}}
                >
                    blog
                </div>
            </a>
            
                {user && !user.success ? (
                    <div style = {{display: 'flex', justifyContent: "center", 
                    alignItems: 'center', flexDirection: 'row', padding: "0px 20px"}}
                    >
                            <a href = '/login' style = {{textDecoration: 'none', color: 'black'}}>
                                <div
                                    style = {{padding: "0px 20px"}}
                                >
                                    sign in
                                </div>
                            </a>
                            <a href = '/register' style = {{textDecoration: 'none', color: 'black'}}>
                                <div
                                    style = {{padding: "0px 20px"}}
                                >
                                    sign up
                                </div>
                            </a>
                    </div>
                ) : (
                        <div style = {{padding: "0px 20px"}} onClick = {onSignOutHandler}>
                            Sign Out
                        </div>
                )}
        </div>
    )
}